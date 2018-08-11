open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: transform position", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    let _beforeEach = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(sandbox, () => ());

      SceneTreeNodeDomTool.OperateDefaultScene.getFirstCubeDomIndex()
      |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;
    };

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "test simulate set currentSceneTreeNode",
      (
        TransformEventTool.simulateTwiceChangePosition(
          ~firstValue="11.25",
          ~secondValue="15",
        ),
        _beforeEach,
        () => (),
      ),
      BuildComponentForCurryTool.buildMainEditorTransformComponent,
    );
  });