open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "engine:controller transform",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          TestTool.closeContractCheck();
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(sandbox);
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
          )
        }
      );
      afterEach(
        () => {
          restoreSandbox(refJsObjToSandbox(sandbox^));
          TestTool.openContractCheck()
        }
      );
      describe(
        "test change transform",
        () =>
          test(
            "editEngineState and runEngineState's tranform should change",
            () => {
              let currentGameObjectTransform = MainEditorSceneTool.getCurrentGameObjectTransform();
              let value = "155";
              let expectValue = 155.;
              let component =
                BuildComponentTool.buildMainEditorTransformComponent(
                  TestTool.buildEmptyAppState(),
                  currentGameObjectTransform
                );
              BaseEventTool.triggerComponentEvent(
                component,
                TransformEventTool.triggerChangeXEvent(value)
              );
              (
                StateLogicService.getEditEngineState()
                |> TransformEngineService.getLocalPosition(
                     DiffComponentTool.getEditEngineComponent(
                       DiffType.GameObject,
                       MainEditorSceneTool.unsafeGetCurrentGameObject()
                     )
                   ),
                StateLogicService.getRunEngineState()
                |> TransformEngineService.getLocalPosition(
                     MainEditorSceneTool.unsafeGetCurrentGameObject()
                   )
              )
              |> expect == ((expectValue, 0., 0.), (expectValue, 0., 0.))
            }
          )
      )
    }
  );