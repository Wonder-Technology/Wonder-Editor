open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("leftHeader clone gameObject", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("fix bug", () =>
      test("test clone gameObject has script component", () => {
        MainEditorInspectorAddComponentTool.addScriptComponent();

        MainEditorLeftHeaderTool.cloneCurrentSceneTreeNode();

        MainEditorSceneTreeTool.Select.selectGameObject(
          ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
          (),
        );
        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      })
    );
  });