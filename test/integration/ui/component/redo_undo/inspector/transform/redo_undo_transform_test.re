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
          let _setSpecificGameObject = (clickTreeNodeIndex) => {
            let component =
              BuildComponentTool.buildSceneTree(SceneTreeTool.buildAppStateSceneGraphFromEngine());
            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerClickEvent(clickTreeNodeIndex)
            );
            MainEditorSceneTool.unsafeGetCurrentGameObject() |> ignore
          };
          beforeEach(
            () => {
              TestTool.closeContractCheck();
              MainEditorSceneTool.initStateAndGl(sandbox);
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
              );
              _setSpecificGameObject(1)
            }
          );
          afterEach(() => TestTool.openContractCheck());
          describe(
            "test snapshot",
            () => {
              describe(
                "test undo operate",
                () => {
                  test(
                    "test not undo",
                    () => {
                      let currentGameObjectTransform =
                        MainEditorSceneTool.getCurrentGameObjectTransform();
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
                        "step from second to first",
                        () => {
                          let currentGameObjectTransform =
                            MainEditorSceneTool.getCurrentGameObjectTransform();
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
                        "step from second to zero",
                        () => {
                          let currentGameObjectTransform =
                            MainEditorSceneTool.getCurrentGameObjectTransform();
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
                            MainEditorSceneTool.getCurrentGameObjectTransform();
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
                        "undo step from second to zero, redo step from zero to first",
                        () => {
                          let currentGameObjectTransform =
                            MainEditorSceneTool.getCurrentGameObjectTransform();
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
                        "undo step from second to zero, redo step from zero to second",
                        () => {
                          let currentGameObjectTransform =
                            MainEditorSceneTool.getCurrentGameObjectTransform();
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
                            MainEditorSceneTool.getCurrentGameObjectTransform();
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
      )
    }
  );