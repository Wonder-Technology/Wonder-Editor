open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: add folder", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _simulateAddFolderTwice = () => {

      MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

      let component = BuildComponentTool.buildAssetComponent();

      BaseEventTool.triggerComponentEvent(
        component,
        AssetTreeEventTool.triggerAddFolderClick,
      );
      BaseEventTool.triggerComponentEvent(
        component,
        AssetTreeEventTool.triggerAddFolderClick,
      );
    };

    let _beforeEach = () => {
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );


      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    };

    let _afterEach = () => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      StateEditorService.getState()
      |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
      |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
      |> StateEditorService.setState
      |> ignore;
    };

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateAddFolderTwice, _beforeEach, _afterEach),
      BuildComponentTool.buildAssetComponent,
    );
  });