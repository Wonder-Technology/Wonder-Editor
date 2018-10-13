open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: transform position", () => {
    let sandbox = getSandboxDefaultVal();

    let _beforeEach = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
      );
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "test simulate set currentSceneTreeNode",
      (
        RedoUndoTransformTool.simulateTwiceChangePosition(
          ~firstValue=11.25,
          ~secondValue=15.,
        ),
        _beforeEach,
        () => (),
      ),
      BuildComponentForCurryTool.buildMainEditorTransformComponent,
    );
  });