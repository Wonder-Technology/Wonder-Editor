open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: dispose gameObject",
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
        "prepare first step: set currentGameObject",
        () => {
          let _setSpecificGameObject = (clickTreeNodeIndex) => {
            let component = BuildComponentTool.buildSceneTree(SceneTreeToolUI.buildAppStateSceneGraphFromEngine());
            EventToolUI.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerClickEvent(clickTreeNodeIndex)
            )
          };
          describe(
            "test snapshot",
            () => {
              let _simulateDisposeGameObjectTwice = () => {
                let headerComponent =
                  BuildComponentTool.buildHeader(
                    SceneTreeToolUI.buildAppStateSceneGraphFromEngine()
                  );
                MainEditorSceneToolEditor.prepareDefaultScene(() => ());
                StateHistoryToolEditor.clearAllState();
                _setSpecificGameObject(2);
                MainEditorSceneToolEditor.unsafeGetCurrentGameObject()
                |> MainEditorSceneToolEditor.addFakeVboBufferForGameObject;
                EventToolUI.triggerComponentEvent(
                  headerComponent,
                  OperateGameObjectEventTool.triggerClickDispose
                );
                _setSpecificGameObject(1);
                MainEditorSceneToolEditor.unsafeGetCurrentGameObject()
                |> MainEditorSceneToolEditor.addFakeVboBufferForGameObject;
                EventToolUI.triggerComponentEvent(
                  headerComponent,
                  OperateGameObjectEventTool.triggerClickDispose
                )
              };
              beforeEach(
                () => {
                  TestToolEditor.closeContractCheck();
                  TestToolUI.initMainEditor(sandbox)
                }
              );
              afterEach(() => TestToolEditor.openContractCheck());
              describe(
                "test operate disposeGameObject(because the set currentGameObject operation is redoUndoable, so need execute redo/undo operation twice for dispose one gameObject)",
                () => {
                  beforeEach(
                    () => {
                      MainEditorSceneToolEditor.prepareDefaultScene(() => ());
                      StateHistoryToolEditor.clearAllState()
                    }
                  );
                  describe(
                    "test undo operate",
                    () => {
                      test(
                        "test not undo",
                        () => BuildComponentTool.buildSceneTree(SceneTreeToolUI.buildAppStateSceneGraphFromEngine()) |> ReactTestTool.createSnapshotAndMatch
                      );
                      describe(
                        "test undo one step",
                        () => {
                          test(
                            "undo step from second to first",
                            () => {
                              _simulateDisposeGameObjectTwice();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.undo();
                              BuildComponentTool.buildSceneTree(SceneTreeToolUI.buildAppStateSceneGraphFromEngine()) |> ReactTestTool.createSnapshotAndMatch
                            }
                          );
                          describe(
                            "test undo two step",
                            () =>
                              test(
                                "step from second to zero",
                                () => {
                                  _simulateDisposeGameObjectTwice();
                                  StateHistoryToolEditor.undo();
                                  StateHistoryToolEditor.undo();
                                  StateHistoryToolEditor.undo();
                                  StateHistoryToolEditor.undo();
                                  BuildComponentTool.buildSceneTree(SceneTreeToolUI.buildAppStateSceneGraphFromEngine()) |> ReactTestTool.createSnapshotAndMatch
                                }
                              )
                          )
                        }
                      )
                    }
                  );
                  describe(
                    "test redo operate",
                    () => {
                      describe(
                        "test redo one step",
                        () =>
                          test(
                            "undo step from second to zero,redo step from zero to first",
                            () => {
                              _simulateDisposeGameObjectTwice();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.redo();
                              StateHistoryToolEditor.redo();
                              BuildComponentTool.buildSceneTree(SceneTreeToolUI.buildAppStateSceneGraphFromEngine()) |> ReactTestTool.createSnapshotAndMatch
                            }
                          )
                      );
                      describe(
                        "test redo two step",
                        () =>
                          test(
                            "undo step from second to zero,redo step from zero to second",
                            () => {
                              _simulateDisposeGameObjectTwice();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.redo();
                              StateHistoryToolEditor.redo();
                              StateHistoryToolEditor.redo();
                              StateHistoryToolEditor.redo();
                              BuildComponentTool.buildSceneTree(SceneTreeToolUI.buildAppStateSceneGraphFromEngine()) |> ReactTestTool.createSnapshotAndMatch
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
      )
    }
  );