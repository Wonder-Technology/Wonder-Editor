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
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );

      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
      ControllerTool.run();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test add cube", () => {
      test("test add one cube", () => {
        MainEditorLeftHeaderTool.addCube();

        StateEngineService.unsafeGetState()
        |> HierarchyGameObjectEngineService.getChildren(MainEditorSceneTool.unsafeGetScene())
        |> Js.Array.length
        |> expect == 5;
      });
      test("test add two cubees", () => {
        MainEditorLeftHeaderTool.addCube();
        MainEditorLeftHeaderTool.addCube();

        StateEngineService.unsafeGetState()
        |> HierarchyGameObjectEngineService.getChildren(MainEditorSceneTool.unsafeGetScene())
        |> Js.Array.length
        |> expect == 6;
      });
      test(
        "the added cube's geometry's name should be Wonder-Default-Cube", () => {
        let addedCubeUid = GameObjectTool.getNewGameObject();
        let engineState = StateEngineService.unsafeGetState();

        MainEditorLeftHeaderTool.addCube();

        engineState
        |> GameObjectComponentEngineService.unsafeGetGeometryComponent(
             addedCubeUid,
           )
        |. GeometryEngineService.unsafeGetGeometryName(engineState)
        |> expect == "Wonder-Default-Cube";
      });

      describe("test scene tree snapshot", () =>
        test("test add one cube", () => {
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
        |> HierarchyGameObjectEngineService.getChildren(MainEditorSceneTool.unsafeGetScene())
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
        |> HierarchyGameObjectEngineService.getChildren(MainEditorSceneTool.unsafeGetScene())
        |> Js.Array.length
        |> expect == 5;
      });
      test("test add two spheres", () => {
        MainEditorLeftHeaderTool.addSphere();
        MainEditorLeftHeaderTool.addSphere();

        StateEngineService.unsafeGetState()
        |> HierarchyGameObjectEngineService.getChildren(MainEditorSceneTool.unsafeGetScene())
        |> Js.Array.length
        |> expect == 6;
      });
      test(
        "the added sphere's geometry's name should be Wonder-Default-Sphere",
        () => {
        let addedSphereUid = GameObjectTool.getNewGameObject();
        let engineState = StateEngineService.unsafeGetState();

        MainEditorLeftHeaderTool.addSphere();

        engineState
        |> GameObjectComponentEngineService.unsafeGetGeometryComponent(
             addedSphereUid,
           )
        |. GeometryEngineService.unsafeGetGeometryName(engineState)
        |> expect == "Wonder-Default-Sphere";
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
