open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller leftHeader addCube", () => {
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

    describe("test add cube", () =>
      describe("cube should be added into engineState", () => {
        test("test add one cube", () => {
          MainEditorLeftHeaderTool.addCube();

          StateEngineService.unsafeGetState()
          |> GameObjectUtils.getChildren(
               MainEditorSceneTool.unsafeGetScene(),
             )
          |> Js.Array.length
          |> expect == 5;
        });
        test("test add two cubees", () => {
          MainEditorLeftHeaderTool.addCube();
          MainEditorLeftHeaderTool.addCube();

          StateEngineService.unsafeGetState()
          |> GameObjectUtils.getChildren(
               MainEditorSceneTool.unsafeGetScene(),
             )
          |> Js.Array.length
          |> expect == 6;
        });
        describe("test scene tree", () =>
          test("test add one cube", () => {
            MainEditorLeftHeaderTool.addCube();

            BuildComponentTool.buildSceneTree(
              TestTool.buildEmptyAppState(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
      })
    );
  });