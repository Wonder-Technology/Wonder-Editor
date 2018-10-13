open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: basicMaterial texture", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _simulateTwiceDragTexture = () => {
      let assetTreeData =
        MainEditorAssetTreeTool.BuildAssetTree.Texture.buildTwoTextureAssetTree();

      MainEditorBasicMaterialTool.Drag.dragAssetTextureToMap(
        ~textureNodeId=
          MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
            assetTreeData,
          ),
        (),
      );
      MainEditorBasicMaterialTool.Drag.dragAssetTextureToMap(
        ~textureNodeId=
          MainEditorAssetTreeTool.BuildAssetTree.Texture.getSecondTextureNodeId(
            assetTreeData,
          ),
        (),
      );
    };
    let _beforeEach = () => {
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        () => {
          MainEditorAssetTool.initAssetTree();
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode();
        },
      );
      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;

      MainEditorBasicMaterialTool.changeMaterialTypeToBeBasicMaterial();
    };

    let _afterEach = () => {
      StateHistoryToolEditor.clearAllState();

      StateEditorService.getState()
      |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
      |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
      |> StateEditorService.setState
      |> ignore;
    };

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceDragTexture, _beforeEach, _afterEach),
      BuildComponentForCurryTool.buildBasicMaterial,
    );
  });