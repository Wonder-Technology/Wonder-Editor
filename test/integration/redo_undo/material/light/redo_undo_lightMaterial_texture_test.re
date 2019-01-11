open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: lightMaterial texture", () => {
    let sandbox = getSandboxDefaultVal();
    let _getFromArray = (array, index) =>
      ArrayService.unsafeGetNth(index, array);

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

      MainEditorLightMaterialTool.Drag.dragAssetTextureToMap(
        ~textureNodeId=
          MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
            assetTreeData,
          ),
        (),
      );
      MainEditorLightMaterialTool.Drag.dragAssetTextureToMap(
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
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();
        },
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        SceneTreeWidgetService.getWidget(),
      )
      |> StateLogicService.getAndSetEditorState;
    };

    let _afterEach = () => {
      StateHistoryToolEditor.clearAllState();

      StateEditorService.getState()
      |> CurrentNodeIdAssetEditorService.clearCurrentNodeId
      |> SelectedFolderNodeIdInAssetTreeAssetEditorService.clearSelectedFolderNodeIdInAssetTree
      |> StateEditorService.setState
      |> ignore;
    };

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateTwiceDragTexture, _beforeEach, _afterEach),
      BuildComponentForCurryTool.buildLightMaterial,
    );
  });