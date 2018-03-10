open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: sceneTree",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "get scene tree from engine",
        () => {
          let _simulateTwiceDragEvent = () => {
            let component =
              BuildComponentTool.buildSceneTree(
                SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
              );
            EventToolUI.triggerComponentEvent(component, SceneTreeEventTool.triggerDragStart(2));
            EventToolUI.triggerComponentEvent(component, SceneTreeEventTool.triggerDragEnter(0));
            EventToolUI.triggerComponentEvent(component, SceneTreeEventTool.triggerDragDrop(0));
            let component2 =
              BuildComponentTool.buildSceneTree(
                SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
              );
            EventToolUI.triggerComponentEvent(component2, SceneTreeEventTool.triggerDragStart(1));
            EventToolUI.triggerComponentEvent(component2, SceneTreeEventTool.triggerDragEnter(0));
            EventToolUI.triggerComponentEvent(component2, SceneTreeEventTool.triggerDragDrop(0))
          };
          beforeEach(
            () => {
              TestToolEditor.closeContractCheck();
              TestToolUI.initMainEditor(sandbox);
              MainEditorSceneToolEditor.prepareDefaultScene(
                MainEditorSceneToolEditor.setFirstBoxTobeCurrentGameObject
              );
              StateHistoryToolEditor.clearAllState()
            }
          );
          afterEach(() => TestToolEditor.openContractCheck());
          describe(
            "test snapshot",
            () => {
              describe(
                "test undo operate",
                () => {
                  test(
                    "test not undo",
                    () => {
                      _simulateTwiceDragEvent();
                      BuildComponentTool.buildSceneTree(
                        SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
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
                          _simulateTwiceDragEvent();
                          /* the undo function not exec */
                          StateHistoryToolEditor.undo(); 
                          BuildComponentTool.buildSceneTree(
                            SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
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
                          _simulateTwiceDragEvent();
                          StateHistoryToolEditor.undo();  
                          StateHistoryToolEditor.undo();
                          BuildComponentTool.buildSceneTree(
                            SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
                          )
                          |> ReactTestTool.createSnapshotAndMatch
                        }
                      )
                  );
                  describe(
                    "test undo three step",
                    () =>
                      test(
                        "if current step is zero, undo should do nothing",
                        () => {
                          _simulateTwiceDragEvent();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          BuildComponentTool.buildSceneTree(
                            SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
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
                        "if not exec undo, redo one step should do nothing",
                        () => {
                          _simulateTwiceDragEvent();
                          StateHistoryToolEditor.redo();
                          BuildComponentTool.buildSceneTree(
                            SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
                          )
                          |> ReactTestTool.createSnapshotAndMatch
                        }
                      );
                      test(
                        "undo step from second to zero, redo step from zero to first",
                        () => {
                          _simulateTwiceDragEvent();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.redo();
                          BuildComponentTool.buildSceneTree(
                            SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
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
                          _simulateTwiceDragEvent();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.redo();
                          StateHistoryToolEditor.redo();
                          BuildComponentTool.buildSceneTree(
                            SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
                          )
                          |> ReactTestTool.createSnapshotAndMatch
                        }
                      )
                  );
                  describe(
                    "test redo three step",
                    () =>
                      test(
                        "test if current step is last step, redo should do nothing",
                        () => {
                          _simulateTwiceDragEvent();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.undo();
                          StateHistoryToolEditor.redo();
                          StateHistoryToolEditor.redo();
                          StateHistoryToolEditor.redo();
                          BuildComponentTool.buildSceneTree(
                            SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
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