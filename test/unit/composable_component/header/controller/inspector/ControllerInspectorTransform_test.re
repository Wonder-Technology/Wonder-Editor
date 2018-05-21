open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "controller inspector transform",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          TestTool.closeContractCheck();
          sandbox := createSandbox();
          MainEditorSceneTool.initStateAndGl(~sandbox, ());
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
          );
          ControllerTool.stubRequestAnimationFrame(createEmptyStubWithJsObjSandbox(sandbox));
          ControllerTool.run()
        }
      );
      afterEach(
        () => {
          restoreSandbox(refJsObjToSandbox(sandbox^));
          TestTool.openContractCheck()
        }
      );
      describe(
        "test set transform in engine",
        () =>
          test(
            "current gameObject's tranform should change",
            () => {
              let currentGameObjectTransform = GameObjectTool.getCurrentGameObjectTransform();
              let expectValue = 155.;
              let component =
                BuildComponentTool.buildMainEditorTransformComponent(
                  TestTool.buildEmptyAppState(),
                  currentGameObjectTransform
                );
              BaseEventTool.triggerComponentEvent(
                component,
                TransformEventTool.triggerChangeXEvent(Js.Float.toString(expectValue))
              );
              (
                StateLogicService.getEditEngineState()
                |> TransformEngineService.getLocalPosition(
                     DiffComponentTool.getEditEngineComponent(
                       DiffType.GameObject,
                       GameObjectTool.unsafeGetCurrentGameObject()
                     )
                   ),
                StateLogicService.getRunEngineState()
                |> TransformEngineService.getLocalPosition(
                     GameObjectTool.unsafeGetCurrentGameObject()
                   )
              )
              |> expect == ((expectValue, 0., 0.), (expectValue, 0., 0.))
            }
          )
      );
      describe(
        "test set transform in inspector",
        () =>
          test(
            "inspector tranform should change",
            () => {
            let currentGameObjectTransform = GameObjectTool.getCurrentGameObjectTransform();
              let value = "24.1357";
              let component =
                BuildComponentTool.buildMainEditorTransformComponent(
                  TestTool.buildEmptyAppState(),
                  currentGameObjectTransform
                );
              BaseEventTool.triggerComponentEvent(
                component,
                TransformEventTool.triggerChangeXEvent(value)
              );
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig()
              )
              |> ReactTestTool.createSnapshotAndMatch
            }
          )
      )
    }
  );