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
          TestTool.createAndSetEditorAndEngineStateAndCreateAndSetScene(sandbox);
          MainEditorSceneTool.createDefaultScene(
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
            "its should have sourceInstance component after add it",
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
                StateLogicService.getEngineStateForEdit()
                |> TransformEngineService.getLocalPosition(
                     MainEditorSceneTool.unsafeGetCurrentGameObject()
                   ),
                StateLogicService.getEngineStateForRun()
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