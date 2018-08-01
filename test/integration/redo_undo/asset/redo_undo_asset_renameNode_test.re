open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: asset rename node", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    let _triggerInspectorRenameEvent = (inspectorComponent, newName) => {
      BaseEventTool.triggerComponentEvent(
        inspectorComponent,
        AssetTreeInspectorTool.triggerRenameChangeEvent(newName),
      );
      BaseEventTool.triggerComponentEvent(
        inspectorComponent,
        AssetTreeInspectorTool.triggerRenameBlurEvent(newName),
      );
    };

    let _simulateRenameNodeTwice = () => {
      let assetTreeDomRecord =
        MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
      let component = BuildComponentTool.buildAssetComponent();

      assetTreeDomRecord
      |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstJsonDomIndex
      |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

      let inspectorComponent =
        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        );

      _triggerInspectorRenameEvent(inspectorComponent, "mickeyJson");

      assetTreeDomRecord
      |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
      |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(component);

      let inspectorComponent =
        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        );

      _triggerInspectorRenameEvent(inspectorComponent, "mickeyFolder");

      BaseEventTool.triggerComponentEvent(
        component,
        AssetTreeEventTool.clickRootAssetTreeNode,
      );
    };

    let _beforeEach = () => {
      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );
      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.Asset,
      )
      |> StateLogicService.getAndSetEditorState;
    };

    let _afterEach = () =>
      StateEditorService.getState()
      |> AssetCurrentNodeDataEditorService.clearCurrentNodeData
      |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
      |> StateEditorService.setState
      |> ignore;

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode",
      (_simulateRenameNodeTwice, _beforeEach, _afterEach),
      BuildComponentTool.buildAssetComponent,
    );
  });