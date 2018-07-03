open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: rename", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      StateHistoryToolEditor.clearAllState();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("test simulate set currentSceneTreeNode", () => {
      beforeEach(() => {
        TestTool.closeContractCheck();
        MainEditorSceneTool.initStateAndGl(~sandbox, ());
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        );
        SceneTreeTool.setSceenTreeSpecificGameObject(1);
      });
      afterEach(() => TestTool.openContractCheck());

      describe("test undo one step", () =>
        test("step which from second to first", () => {
          let currentGameObjectTransform =
            GameObjectTool.getCurrentSceneTreeNodeTransform();
          TransformEventTool.simulateTwiceChangeEvent(
            currentGameObjectTransform,
          );
          StateHistoryToolEditor.undo();
          BuildComponentTool.buildMainEditorTransformComponent(
            TestTool.buildEmptyAppState(),
            currentGameObjectTransform,
          )
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );
    });
  });