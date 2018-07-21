open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller header addBox", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      TestTool.closeContractCheck();
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
      );

      ControllerTool.stubRequestAnimationFrame(
        createEmptyStubWithJsObjSandbox(sandbox),
      );
      ControllerTool.run();
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      TestTool.openContractCheck();
    });
    describe("test add box", () =>
      describe(
        "box should be added into EditEngineState and RunEngineState", () => {
        test("test add one box", () => {
          let component =
            BuildComponentTool.buildHeader(
              TestTool.buildAppStateSceneGraphFromEngine(),
            );
          BaseEventTool.triggerComponentEvent(
            component,
            OperateGameObjectEventTool.triggerClickAddBox,
          );
          (
            StateLogicService.getEditEngineState()
            |> GameObjectUtils.getChildren(
                 MainEditorSceneTool.unsafeGetScene(),
               )
            |> Js.Array.length,
            StateLogicService.getRunEngineState()
            |> GameObjectUtils.getChildren(
                 MainEditorSceneTool.unsafeGetScene(),
               )
            |> Js.Array.length,
          )
          |> expect == (5, 4);
        });
        test("test add two boxes", () => {
          let component =
            BuildComponentTool.buildHeader(
              TestTool.buildAppStateSceneGraphFromEngine(),
            );
          BaseEventTool.triggerComponentEvent(
            component,
            OperateGameObjectEventTool.triggerClickAddBox,
          );
          BaseEventTool.triggerComponentEvent(
            component,
            OperateGameObjectEventTool.triggerClickAddBox,
          );
          (
            StateLogicService.getEditEngineState()
            |> GameObjectUtils.getChildren(
                 MainEditorSceneTool.unsafeGetScene(),
               )
            |> Js.Array.length,
            StateLogicService.getRunEngineState()
            |> GameObjectUtils.getChildren(
                 MainEditorSceneTool.unsafeGetScene(),
               )
            |> Js.Array.length,
          )
          |> expect == (6, 5);
        });
        describe("test scene tree", () =>
          test("test add one box", () => {
            let component =
              BuildComponentTool.buildHeader(
                TestTool.buildAppStateSceneGraphFromEngine(),
              );
            BaseEventTool.triggerComponentEvent(
              component,
              OperateGameObjectEventTool.triggerClickAddBox,
            );
            BuildComponentTool.buildSceneTree(
              TestTool.buildAppStateSceneGraphFromEngine(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );
      })
    );
  });