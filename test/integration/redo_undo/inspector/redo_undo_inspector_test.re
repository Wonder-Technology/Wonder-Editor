open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "redo_undo: inspector",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test simulate set currentSceneTreeNode",
        () => {
          beforeEach(
            () => {
              TestTool.closeContractCheck();
              MainEditorSceneTool.initStateAndGl(~sandbox, ());
              MainEditorSceneTool.createDefaultScene(sandbox, () => ());
              StateHistoryToolEditor.clearAllState();
              SceneTreeTool.setSceenTreeSpecificGameObject(1)
            }
          );
          afterEach(
            () => {
              GameObjectTool.clearCurrentSceneTreeNode();
              TestTool.openContractCheck()
            }
          );
          describe(
            "test undo operate",
            () => {
              test(
                "test not undo",
                () =>
                  BuildComponentTool.buildInspectorComponent(
                    TestTool.buildEmptyAppState(),
                    InspectorTool.buildFakeAllShowComponentConfig()
                  )
                  |> ReactTestTool.createSnapshotAndMatch
              );
              describe(
                "test undo one step",
                () =>
                  test(
                    "step which from second to first",
                    () => {
                      StateHistoryToolEditor.undo();
                      BuildComponentTool.buildInspectorComponent(
                        TestTool.buildEmptyAppState(),
                        InspectorTool.buildFakeAllShowComponentConfig()
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
                      StateHistoryToolEditor.undo();
                      StateHistoryToolEditor.undo();
                      BuildComponentTool.buildInspectorComponent(
                        TestTool.buildEmptyAppState(),
                        InspectorTool.buildFakeAllShowComponentConfig()
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