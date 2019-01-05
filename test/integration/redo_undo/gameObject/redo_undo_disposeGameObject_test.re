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
      let _simulateTwiceDisposeGameObject = () => {
        MainEditorSceneTool.setSecondBoxToBeCurrentSceneTreeNode();

        MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();

        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode();

        MainEditorLeftHeaderTool.disposeCurrentSceneTreeNode();
      };

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

      describe(
        "test operate disposeGameObject(because the set currentSceneTreeNode operation is redoUndoable, so need execute redo/undo operation twice for dispose one gameObject)",
        () => {
          describe("test undo operate", () => {
            test("test not undo", () => {
              _simulateTwiceDisposeGameObject();

              BuildComponentTool.buildSceneTree(
                TestTool.buildEmptyAppState(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            });
            describe("test undo one step", () => {
              test("undo step which from second to first", () => {
                _simulateTwiceDisposeGameObject();

                RedoUndoTool.undoHistoryState();

                BuildComponentTool.buildSceneTree(
                  TestTool.buildEmptyAppState(),
                )
                |> ReactTestTool.createSnapshotAndMatch;
              });
              describe("test undo two step", () =>
                test("step which from second to zero", () => {
                  _simulateTwiceDisposeGameObject();

                  RedoUndoTool.undoHistoryState();
                  RedoUndoTool.undoHistoryState();

                  BuildComponentTool.buildSceneTree(
                    TestTool.buildEmptyAppState(),
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
                _simulateTwiceDisposeGameObject();

                RedoUndoTool.undoHistoryState();
                RedoUndoTool.undoHistoryState();
                RedoUndoTool.redoHistoryState();

                BuildComponentTool.buildSceneTree(
                  TestTool.buildEmptyAppState(),
                )
                |> ReactTestTool.createSnapshotAndMatch;
              })
            );
            describe("test redo two step", () =>
              test(
                "undo step which from second to zero,redo step which from zero to second",
                () => {
                _simulateTwiceDisposeGameObject();
                RedoUndoTool.undoHistoryState();
                RedoUndoTool.undoHistoryState();
                RedoUndoTool.redoHistoryState();
                RedoUndoTool.redoHistoryState();
                BuildComponentTool.buildSceneTree(
                  TestTool.buildEmptyAppState(),
                )
                |> ReactTestTool.createSnapshotAndMatch;
              })
            );
          });
        },
      );
    });
  });