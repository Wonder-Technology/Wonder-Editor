open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: controller engine",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test simulate set currentGameObject",
        () =>
          describe(
            "test logic",
            () => {
              beforeEach(
                () => {
                  TestTool.closeContractCheck();
                  TestTool.createAndSetEditorAndEngineStateAndCreateAndSetScene(sandbox);
                  TestToolEngine.setFakeGl(sandbox);
                  AllMaterialToolEngine.prepareForInit();
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
                "test undo operate",
                () => {
                  describe(
                    "test add gameObject",
                    () =>
                      test(
                        "test undo one step, from second to first",
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
                            StateLogicService.getEngineStateForEdit()
                            |> GameObjectUtils.getChildren(
                                 MainEditorSceneTool.unsafeGetScene()
                               )
                            |> Js.Array.length,
                            StateLogicService.getEngineStateForRun()
                            |> GameObjectUtils.getChildren(
                                 MainEditorSceneTool.unsafeGetScene()
                               )
                            |> Js.Array.length
                          )
                          |> expect == (5, 5)
                        }
                      )
                  );
                  describe(
                    "test dispose gameObject from engine",
                    () =>
                      test(
                        "dispose current gameObject, the engineStateForEdit and engineStateForRun's children length should == 3",
                        () => {
                          let component =
                            BuildComponentTool.buildHeader(
                              SceneTreeTool.buildAppStateSceneGraphFromEngine()
                            );
                          BaseEventTool.triggerComponentEvent(
                            component,
                            OperateGameObjectEventTool.triggerClickDispose
                          );
                          MainEditorSceneTool.setFirstBoxTobeCurrentGameObject();
                          BaseEventTool.triggerComponentEvent(
                            component,
                            OperateGameObjectEventTool.triggerClickDispose
                          );
                          StateHistoryToolEditor.undo();
                          (
                            StateLogicService.getEngineStateForEdit()
                            |> GameObjectUtils.getChildren(
                                 MainEditorSceneTool.unsafeGetScene()
                               )
                            |> Js.Array.length,
                            StateLogicService.getEngineStateForRun()
                            |> GameObjectUtils.getChildren(
                                 MainEditorSceneTool.unsafeGetScene()
                               )
                            |> Js.Array.length
                          )
                          |> expect == (3, 3)
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
                            "undo one step",
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
                                StateLogicService.getEngineStateForEdit()
                                |> GameObjectComponentEngineService.hasSourceInstanceComponent(
                                     MainEditorSceneTool.unsafeGetCurrentGameObject()
                                   ),
                                StateLogicService.getEngineStateForRun()
                                |> GameObjectComponentEngineService.hasSourceInstanceComponent(
                                     MainEditorSceneTool.unsafeGetCurrentGameObject()
                                   )
                              )
                              |> expect == (false, false)
                            }
                          )
                      )
                  );
                  describe(
                    "test transform component",
                    () =>
                      test(
                        "test undo one step, from second to first",
                        () => {
                          let currentGameObjectTransform =
                            MainEditorSceneTool.getCurrentGameObjectTransform();
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
                            StateLogicService.getEngineStateForEdit()
                            |> TransformEngineService.getLocalPosition(
                                 MainEditorSceneTool.unsafeGetCurrentGameObject()
                               ),
                            StateLogicService.getEngineStateForRun()
                            |> TransformEngineService.getLocalPosition(
                                 MainEditorSceneTool.unsafeGetCurrentGameObject()
                               )
                          )
                          |> expect == ((155., 0., 0.), (155., 0., 0.))
                        }
                      )
                  )
                }
              )
            }
          )
      )
    }
  );