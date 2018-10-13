open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: dispose gameObject", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("prepare first step: set currentSceneTreeNode", () => {
      beforeEach(() => {
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
              ~loopPipelines=
                {|
                [
                    {
                        "name": "default",
                        "jobs": [
                            {
                                "name": "dispose"
                            }
                        ]
                    }
                ]
            |},
              (),
            ),
          (),
        );

        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
        );
      });
      let _simulateDisposeGameObjectTwice = () => {
        MainEditorSceneTool.setSecondBoxToBeCurrentSceneTreeNode();

        MainEditorSceneTreeHeaderTool.disposeCurrentSceneTreeNode();

        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode();

        MainEditorSceneTreeHeaderTool.disposeCurrentSceneTreeNode();
      };
      describe(
        "test operate disposeGameObject(because the set currentSceneTreeNode operation is redoUndoable, so need execute redo/undo operation twice for dispose one gameObject)",
        () => {
          describe("test undo operate", () => {
            test("test not undo", () => {
              _simulateDisposeGameObjectTwice();

              BuildComponentTool.buildSceneTree(
                TestTool.buildAppStateSceneGraphFromEngine(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });
            describe("test undo one step", () => {
              test("undo step which from second to first", () => {
                _simulateDisposeGameObjectTwice();

                RedoUndoTool.undoHistoryState();

                BuildComponentTool.buildSceneTree(
                  TestTool.buildAppStateSceneGraphFromEngine(),
                )
                |> ReactTestTool.createSnapshotAndMatch;
              });
              describe("test undo two step", () =>
                test("step which from second to zero", () => {
                  _simulateDisposeGameObjectTwice();

                  RedoUndoTool.undoHistoryState();
                  RedoUndoTool.undoHistoryState();

                  BuildComponentTool.buildSceneTree(
                    TestTool.buildAppStateSceneGraphFromEngine(),
                  )
                  |> ReactTestTool.createSnapshotAndMatch;
                })
              );
            });
          });
          describe("test redo operate", () => {
            describe("test redo one step", () =>
              test(
                "undo step which from second to zero,redo step which from zero to first",
                () => {
                _simulateDisposeGameObjectTwice();

                RedoUndoTool.undoHistoryState();
                RedoUndoTool.undoHistoryState();
                RedoUndoTool.redoHistoryState();

                BuildComponentTool.buildSceneTree(
                  TestTool.buildAppStateSceneGraphFromEngine(),
                )
                |> ReactTestTool.createSnapshotAndMatch;
              })
            );
            describe("test redo two step", () =>
              test(
                "undo step which from second to zero,redo step which from zero to second",
                () => {
                _simulateDisposeGameObjectTwice();
                RedoUndoTool.undoHistoryState();
                RedoUndoTool.undoHistoryState();
                RedoUndoTool.redoHistoryState();
                RedoUndoTool.redoHistoryState();
                BuildComponentTool.buildSceneTree(
                  TestTool.buildAppStateSceneGraphFromEngine(),
                )
                |> ReactTestTool.createSnapshotAndMatch;
              })
            );
          });
        },
      );
    });
  });