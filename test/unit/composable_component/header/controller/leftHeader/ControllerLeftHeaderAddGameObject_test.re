open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller leftHeader add gameObject", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );

      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
      ControllerTool.run();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test add box", () => {
      test("test add one box", () => {
        MainEditorLeftHeaderTool.addCube();

        StateEngineService.unsafeGetState()
        |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
        |> Js.Array.length
        |> expect == 5;
      });
      test("test add two boxes", () => {
        MainEditorLeftHeaderTool.addCube();
        MainEditorLeftHeaderTool.addCube();

        StateEngineService.unsafeGetState()
        |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
        |> Js.Array.length
        |> expect == 6;
      });
      describe("test scene tree snapshot", () =>
        test("test add one box", () => {
          MainEditorLeftHeaderTool.addCube();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );
    });

    describe("test add emptyGameObject", () => {
      test("test add one emptyGameObject", () => {
        MainEditorLeftHeaderTool.addEmptyGameObject();

        StateEngineService.unsafeGetState()
        |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
        |> Js.Array.length
        |> expect == 5;
      });
      describe("test scene tree snanpshot", () =>
        test("test add one emptyGameObject", () => {
          MainEditorLeftHeaderTool.addEmptyGameObject();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );
    });

    describe("test add sphere", () => {
      test("test add one sphere", () => {
        MainEditorLeftHeaderTool.addSphere();

        StateEngineService.unsafeGetState()
        |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
        |> Js.Array.length
        |> expect == 5;
      });
      test("test add two spheres", () => {
        MainEditorLeftHeaderTool.addSphere();
        MainEditorLeftHeaderTool.addSphere();

        StateEngineService.unsafeGetState()
        |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
        |> Js.Array.length
        |> expect == 6;
      });

      describe("test scene tree snapshot", () =>
        test("test add one sphere", () => {
          MainEditorLeftHeaderTool.addSphere();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );
    });
  });