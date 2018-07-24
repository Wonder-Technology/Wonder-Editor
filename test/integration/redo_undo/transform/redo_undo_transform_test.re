open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: transform", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    let _beforeEach = () => {
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(sandbox, () => ());

      SceneTreeNodeDomTool.OperateTwoLayer.getFirstCubeDomIndex()
      |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;
    };

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "test simulate set currentSceneTreeNode",
      (
        TransformEventTool.simulateTwiceChangeEvent(
          ~firstValue="11.25",
          ~secondValue="15",
        ),
        _beforeEach,
        () => (),
      ),
      BuildComponentForRedoUndoTool.buildMainEditorTransformComponent,
    );
  });