open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: lightMaterial texture", () => {
    let sandbox = getSandboxDefaultVal();
    let _getFromArray = (array, index) => ArrayService.getNth(index, array);

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _simulateTwiceDragTexture = () => {
      let assetTreeDomRecord =
        MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

      let firstTextureDomIndex =
        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex;
      let secondTextureDomIndex =
        assetTreeDomRecord
        |> MainEditorAssetNodeTool.OperateTwoLayer.getSecondTextureDomIndex;

      firstTextureDomIndex |> MainEditorMaterialTool.triggerFileDragStartEvent;

      MainEditorMaterialTool.triggerDragTextureToGameObjectMaterial();

      secondTextureDomIndex |> MainEditorMaterialTool.triggerFileDragStartEvent;

      MainEditorMaterialTool.triggerDragTextureToGameObjectMaterial();
    };
    let _beforeEach = () => {
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        () => {
          MainEditorAssetTool.initAssetTree();
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode();
        },
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;
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
      BuildComponentForCurryTool.buildLightMaterial,
    );
  });