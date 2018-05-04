open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: controller engine",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestTool.closeContractCheck();
          MainEditorSceneTool.initStateAndGl(~sandbox, ());
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
          );
          ControllerTool.setRequest(createEmptyStubWithJsObjSandbox(sandbox));
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
        "test undo operate",
        () => {
          describe(
            "test add gameObject",
            () =>
              test(
                "test undo one step which from second to first",
                () => {
                  let component =
                    BuildComponentTool.buildHeader(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickAddBox
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickAddBox
                  );
                  StateHistoryToolEditor.undo();
                  (
                    StateLogicService.getEditEngineState()
                    |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                    |> Js.Array.length,
                    StateLogicService.getRunEngineState()
                    |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                    |> Js.Array.length
                  )
                  |> expect == (5, 4)
                }
              )
          );
          describe(
            "test dispose gameObject from engine",
            () =>
              test(
                "test undo one step which from second to first",
                () => {
                  let component =
                    BuildComponentTool.buildHeader(
                      SceneTreeTool.buildAppStateSceneGraphFromEngine()
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob
                  );
                  MainEditorSceneTool.setFirstBoxTobeCurrentGameObject();
                  BaseEventTool.triggerComponentEvent(
                    component,
                    OperateGameObjectEventTool.triggerClickDisposeAndExecDisposeJob
                  );
                  StateHistoryToolEditor.undo();
                  (
                    StateLogicService.getEditEngineState()
                    |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                    |> Js.Array.length,
                    StateLogicService.getRunEngineState()
                    |> GameObjectUtils.getChildren(MainEditorSceneTool.unsafeGetScene())
                    |> Js.Array.length
                  )
                  |> expect == (3, 2)
                }
              )
          );
          describe(
            "test add component",
            () =>
              describe(
                "test add sourceInstance component",
                () =>
                  test(
                    "test undo one step which from second to first",
                    () => {
                      let component =
                        BuildComponentTool.buildInspectorComponent(
                          TestTool.buildEmptyAppState(),
                          InspectorTool.buildFakeAllShowComponentConfig()
                        );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        OperateComponentEventTool.triggerClickAddComponentEvent
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        OperateComponentEventTool.triggerClickAddSourceInstanceEvent
                      );
                      StateHistoryToolEditor.undo();
                      (
                        StateLogicService.getEditEngineState()
                        |> GameObjectComponentEngineService.hasSourceInstanceComponent(
                             DiffComponentTool.getEditEngineComponent(
                               DiffType.GameObject,
                               GameObjectTool.unsafeGetCurrentGameObject()
                             )
                           ),
                        StateLogicService.getRunEngineState()
                        |> GameObjectComponentEngineService.hasSourceInstanceComponent(
                             GameObjectTool.unsafeGetCurrentGameObject()
                           )
                      )
                      |> expect == (false, false)
                    }
                  )
              )
          );
          describe(
            "test transform",
            () =>
              test(
                "test undo one step which from second to first",
                () => {
                  let currentGameObjectTransform = GameObjectTool.getCurrentGameObjectTransform();
                  let firstValue = "155";
                  let secondValue = "200";
                  let component =
                    BuildComponentTool.buildMainEditorTransformComponent(
                      TestTool.buildEmptyAppState(),
                      currentGameObjectTransform
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    TransformEventTool.triggerChangeXEvent(firstValue)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    TransformEventTool.triggerBlurXEvent(firstValue)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    TransformEventTool.triggerChangeYEvent(secondValue)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    TransformEventTool.triggerBlurYEvent(secondValue)
                  );
                  StateHistoryToolEditor.undo();
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
                  |> expect == ((155., 0., 0.), (155., 0., 0.))
                }
              )
          );
          describe(
            "fix bug",
            () =>
              test(
                "the undo operate should deep copy current editEngineState and runEngineState",
                () => {
                  let currentGameObjectTransform = GameObjectTool.getCurrentGameObjectTransform();
                  let firstValue = "150";
                  let secondValue = "200";
                  let component =
                    BuildComponentTool.buildMainEditorTransformComponent(
                      TestTool.buildEmptyAppState(),
                      currentGameObjectTransform
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    TransformEventTool.triggerChangeXEvent(firstValue)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    TransformEventTool.triggerBlurXEvent(firstValue)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    TransformEventTool.triggerChangeYEvent(secondValue)
                  );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    TransformEventTool.triggerBlurYEvent(secondValue)
                  );
                  StateHistoryToolEditor.undo();
                  StateHistoryToolEditor.redo();
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
                  |> expect == ((150., 200., 0.), (150., 200., 0.))
                }
              )
          )
        }
      )
    }
  );