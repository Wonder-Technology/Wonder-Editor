open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: transform rotate", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _simulateTwiceChangeRotate = () => {
      let currentGameObjectTransform =
        GameObjectTool.getCurrentSceneTreeNodeTransform();

      let component =
        BuildComponentTool.buildMainEditorTransformComponent(
          TestTool.buildEmptyAppState(),
          currentGameObjectTransform,
        );
      let firstValue = "11.25";
      let secondValue = "15";

      BaseEventTool.triggerComponentEvent(
        component,
        TransformEventTool.triggerChangeRotateX(firstValue),
      );
      BaseEventTool.triggerComponentEvent(
        component,
        TransformEventTool.triggerBlurRotateX(firstValue),
      );

      BaseEventTool.triggerComponentEvent(
        component,
        TransformEventTool.triggerChangeRotateY(secondValue),
      );
      BaseEventTool.triggerComponentEvent(
        component,
        TransformEventTool.triggerBlurRotateY(secondValue),
      );
    };

    let _beforeEach = () => {
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(sandbox, () => ());

      SceneTreeNodeDomTool.OperateTwoLayer.getFirstCubeDomIndex()
      |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;
    };

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "test simulate set currentSceneTreeNode",
      (_simulateTwiceChangeRotate, _beforeEach, () => ()),
      BuildComponentForRedoUndoTool.buildMainEditorTransformComponent,
    );
  });