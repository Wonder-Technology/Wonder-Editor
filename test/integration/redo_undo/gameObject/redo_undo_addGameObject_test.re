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
        "prepare first step: set currentSceneTreeNode",
        () => {
          let _simulateAddGameObjectTwice = () => {
            let headerComponent =
              BuildComponentTool.buildHeader(TestTool.buildAppStateSceneGraphFromEngine());
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
              MainEditorSceneTool.initStateAndGl(~sandbox, ());
              MainEditorSceneTool.createDefaultScene(sandbox, () => ());
              StateHistoryToolEditor.clearAllState();
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
                  _simulateAddGameObjectTwice();
                  BuildComponentTool.buildSceneTree(
                    TestTool.buildAppStateSceneGraphFromEngine()
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
                      _simulateAddGameObjectTwice();
                      StateHistoryToolEditor.undo();
                      BuildComponentTool.buildSceneTree(
                        TestTool.buildAppStateSceneGraphFromEngine()
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
                      _simulateAddGameObjectTwice();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.undo();
                      BuildComponentTool.buildSceneTree(
                        TestTool.buildAppStateSceneGraphFromEngine()
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
                    "undo step which from second to zero,redo step which from zero to first",
                    () => {
                      _simulateAddGameObjectTwice();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.redo();
                      BuildComponentTool.buildSceneTree(
                        TestTool.buildAppStateSceneGraphFromEngine()
                      )
                      |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              );
              describe(
                "test redo two step",
                () =>
                  test(
                    "undo step which from second to zero,redo step which from zero to second",
                    () => {
                      _simulateAddGameObjectTwice();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.redo();
                      StateHistoryToolEditor.redo();
                      BuildComponentTool.buildSceneTree(
                        TestTool.buildAppStateSceneGraphFromEngine()
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