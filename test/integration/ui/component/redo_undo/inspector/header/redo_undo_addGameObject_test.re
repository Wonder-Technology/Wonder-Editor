open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: add gameObject",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "prepare first step: set currentGameObject",
        () => {
          let _setSpecificGameObject = (clickTreeNodeIndex) => {
            let component =
              BuildComponentTool.buildSceneTree(SceneTreeTool.buildAppStateSceneGraphFromEngine());
            BaseEventTool.triggerComponentEvent(
              component,
              SceneTreeEventTool.triggerClickEvent(clickTreeNodeIndex)
            )
          };
          describe(
            "test snapshot",
            () => {
              let _simulateAddGameObjectTwice = () => {
                let headerComponent =
                  BuildComponentTool.buildHeader(
                    SceneTreeTool.buildAppStateSceneGraphFromEngine()
                  );
                BaseEventTool.triggerComponentEvent(
                  headerComponent,
                  OperateGameObjectEventTool.triggerClickAddBox
                );
                BaseEventTool.triggerComponentEvent(
                  headerComponent,
                  OperateGameObjectEventTool.triggerClickAddBox
                )
              };
              beforeEach(
                () => {
                  TestTool.closeContractCheck();
          MainEditorSceneTool.initStateAndGl(sandbox);
                  MainEditorSceneTool.createDefaultScene(sandbox, () => ());
                  StateHistoryToolEditor.clearAllState();
                  _setSpecificGameObject(1)
                }
              );
              afterEach(() => TestTool.openContractCheck());
              describe(
                "test operate addGameObject",
                () => {
                  describe(
                    "test undo operate",
                    () => {
                      test(
                        "test not undo",
                        () => {
                          _simulateAddGameObjectTwice();
                          BuildComponentTool.buildSceneTree(
                            SceneTreeTool.buildAppStateSceneGraphFromEngine()
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
                              _simulateAddGameObjectTwice();
                              StateHistoryToolEditor.undo();
                              BuildComponentTool.buildSceneTree(
                                SceneTreeTool.buildAppStateSceneGraphFromEngine()
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
                              _simulateAddGameObjectTwice();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.undo();
                              BuildComponentTool.buildSceneTree(
                                SceneTreeTool.buildAppStateSceneGraphFromEngine()
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
                        () =>
                          test(
                            "undo step from second to zero,redo step from zero to first",
                            () => {
                              _simulateAddGameObjectTwice();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.redo();
                              BuildComponentTool.buildSceneTree(
                                SceneTreeTool.buildAppStateSceneGraphFromEngine()
                              )
                              |> ReactTestTool.createSnapshotAndMatch
                            }
                          )
                      );
                      describe(
                        "test redo two step",
                        () =>
                          test(
                            "undo step from second to zero,redo step from zero to second",
                            () => {
                              _simulateAddGameObjectTwice();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.undo();
                              StateHistoryToolEditor.redo();
                              StateHistoryToolEditor.redo();
                              BuildComponentTool.buildSceneTree(
                                SceneTreeTool.buildAppStateSceneGraphFromEngine()
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
      )
    }
  );