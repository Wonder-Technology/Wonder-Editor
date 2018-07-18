open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorInspector", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );
      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("change source to show it's inspector", () => {
      test("if not set currentSelectSource, show nothing", () =>
        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch
      );
      describe("else set currentSelectSource is SceneTree", () => {
        beforeEach(() => {
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode();

          CurrentSelectSourceEditorService.setCurrentSelectSource(
            EditorType.SceneTree,
          )
          |> StateLogicService.getAndSetEditorState;
        });
        test("show currentSceneTreeNode component", () =>
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch
        );
      });
      describe("else set currentSelectSource is Asset", () => {
        beforeEach(() =>
          CurrentSelectSourceEditorService.setCurrentSelectSource(
            EditorType.Asset,
          )
          |> StateLogicService.getAndSetEditorState
        );
        test("show currentNodeId's asset node component", () => {
          let assetTreeDomRecord =
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
          let component = BuildComponentTool.buildAssetComponent();

          assetTreeDomRecord
          |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
          |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(component);

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });
    });
  });