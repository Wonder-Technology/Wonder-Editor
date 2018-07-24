open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: asset remove node", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _simulateAddFolderTwice = () => {
      let assetTreeDomRecord =
        MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
      let component = BuildComponentTool.buildAssetComponent();

      assetTreeDomRecord
      |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
      |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

      BaseEventTool.triggerComponentEvent(
        component,
        AssetTreeEventTool.triggerRemoveNodeClick,
      );

      assetTreeDomRecord
      |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
      |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(component);

      BaseEventTool.triggerComponentEvent(
        component,
        AssetTreeEventTool.triggerRemoveNodeClick,
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