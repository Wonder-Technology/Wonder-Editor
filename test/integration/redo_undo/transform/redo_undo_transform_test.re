open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: transform",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _simulateTwiceChangeEvent = (currentGameObjectTransform) => {
        let component =
          BuildComponentTool.buildMainEditorTransformComponent(
            TestTool.buildEmptyAppState(),
            currentGameObjectTransform
          );
        BaseEventTool.triggerComponentEvent(
          component,
          TransformEventTool.triggerChangeXEvent("11.25")
        );
        BaseEventTool.triggerComponentEvent(
          component,
          TransformEventTool.triggerBlurXEvent("11.25")
        );
        BaseEventTool.triggerComponentEvent(
          component,
          TransformEventTool.triggerChangeYEvent("15")
        );
        BaseEventTool.triggerComponentEvent(component, TransformEventTool.triggerBlurYEvent("15"))
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          StateHistoryToolEditor.clearAllState()
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test simulate set currentGameObject",
        () => {
          beforeEach(
            () => {
              TestTool.closeContractCheck();
              MainEditorSceneTool.initStateAndGl(sandbox);
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
              );
              SceneTreeTool.setSceenTreeSpecificGameObject(1)
            }
          );
          afterEach(() => TestTool.openContractCheck());
          describe(
            "test undo operate",
            () => {
              test(
                "test not undo",
                () => {
                  let currentGameObjectTransform = GameObjectTool.getCurrentGameObjectTransform();
                  _simulateTwiceChangeEvent(currentGameObjectTransform);
                  BuildComponentTool.buildMainEditorTransformComponent(
                    TestTool.buildEmptyAppState(),
                    currentGameObjectTransform
                  )
                  |> ReactTestTool.createSnapshotAndMatch
                }
              );
              describe(
                "test undo one step",
                () =>
                  test(
                    "step which from second to first",
                    () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentGameObjectTransform();
                      _simulateTwiceChangeEvent(currentGameObjectTransform);
                      StateHistoryToolEditor.undo();
                      BuildComponentTool.buildMainEditorTransformComponent(
                        TestTool.buildEmptyAppState(),
                        currentGameObjectTransform
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              );
              describe(
                "test undo two step",
                () =>
                  test(
                    "step which from second to zero",
                    () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentGameObjectTransform();
                      _simulateTwiceChangeEvent(currentGameObjectTransform);
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.undo();
                      BuildComponentTool.buildMainEditorTransformComponent(
                        TestTool.buildEmptyAppState(),
                        currentGameObjectTransform
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              )
            }
          );
          describe(
            "test redo operate",
            () => {
              describe(
                "test redo one step",
                () => {
                  test(
                    "if not exec undo, redo one step, not change",
                    () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentGameObjectTransform();
                      _simulateTwiceChangeEvent(currentGameObjectTransform);
                      StateHistoryToolEditor.redo();
                      BuildComponentTool.buildMainEditorTransformComponent(
                        TestTool.buildEmptyAppState(),
                        currentGameObjectTransform
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  );
                  test(
                    "undo step which from second to zero, redo step which from zero to first",
                    () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentGameObjectTransform();
                      _simulateTwiceChangeEvent(currentGameObjectTransform);
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.redo();
                      BuildComponentTool.buildMainEditorTransformComponent(
                        TestTool.buildEmptyAppState(),
                        currentGameObjectTransform
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
                }
              );
              describe(
                "test redo two step",
                () =>
                  test(
                    "undo step which from second to zero, redo step which from zero to second",
                    () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentGameObjectTransform();
                      _simulateTwiceChangeEvent(currentGameObjectTransform);
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.redo();
                      StateHistoryToolEditor.redo();
                      BuildComponentTool.buildMainEditorTransformComponent(
                        TestTool.buildEmptyAppState(),
                        currentGameObjectTransform
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              );
              describe(
                "test redo three step",
                () =>
                  test(
                    "test if current step is last step, execute redo, not change",
                    () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentGameObjectTransform();
                      _simulateTwiceChangeEvent(currentGameObjectTransform);
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.redo();
                      StateHistoryToolEditor.redo();
                      StateHistoryToolEditor.redo();
                      BuildComponentTool.buildMainEditorTransformComponent(
                        TestTool.buildEmptyAppState(),
                        currentGameObjectTransform
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              )
            }
          )
        }
      )
    }
  );