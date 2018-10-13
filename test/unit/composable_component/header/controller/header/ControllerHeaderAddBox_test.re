open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller header addBox", () => {
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

    describe("test add box", () =>
      describe("box should be added into engineState", () => {
        test("test add one box", () => {
          HeaderTool.addBox();

          StateEngineService.unsafeGetState()
          |> GameObjectUtils.getChildren(
               MainEditorSceneTool.unsafeGetScene(),
             )
          |> Js.Array.length
          |> expect == 5;
        });
        test("test add two boxes", () => {
          HeaderTool.addBox();
          HeaderTool.addBox();

          StateEngineService.unsafeGetState()
          |> GameObjectUtils.getChildren(
               MainEditorSceneTool.unsafeGetScene(),
             )
          |> Js.Array.length
          |> expect == 6;
        });
        describe("test scene tree", () =>
          test("test add one box", () => {
            HeaderTool.addBox();

            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
      })
    );
  });