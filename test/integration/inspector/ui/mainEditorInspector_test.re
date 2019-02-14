open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorInspector;

let _ =
  describe("MainEditorInspector", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test should update", () => {
      test("if reatinedProps updateTypeArr include All, should update", () =>
        shouldUpdate(
          OldNewSelfTool.buildNewSelf({
            updateTypeArr: [|UpdateStore.All|] |> Obj.magic,
          }),
        )
        |> expect == true
      );
      test(
        "else if reatinedProps updateTypeArr include Inspector, should update",
        () =>
        shouldUpdate(
          OldNewSelfTool.buildNewSelf({
            updateTypeArr: [|UpdateStore.Inspector|] |> Obj.magic,
          }),
        )
        |> expect == true
      );
      test("else, should not update", () =>
        shouldUpdate(
          OldNewSelfTool.buildNewSelf({
            updateTypeArr: [|UpdateStore.SceneTree|] |> Obj.magic,
          }),
        )
        |> expect == false
      );
    });

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
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();

          CurrentSelectSourceEditorService.setCurrentSelectSource(
            SceneTreeWidgetService.getWidget(),
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
            AssetWidgetService.getWidget(),
          )
          |> StateLogicService.getAndSetEditorState
        );
        test("show currentNodeId's asset node component", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

          MainEditorAssetChildrenNodeTool.selectTextureNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                assetTreeData,
              ),
            (),
          );

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });
    });
  });