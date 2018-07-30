open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: transform scale", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _simulateTwiceChangeScale = () => {
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
        TransformEventTool.triggerChangeScaleX(firstValue),
      );
      BaseEventTool.triggerComponentEvent(
        component,
        TransformEventTool.triggerBlurScaleX(firstValue),
      );

      BaseEventTool.triggerComponentEvent(
        component,
        TransformEventTool.triggerChangeScaleY(secondValue),
      );
      BaseEventTool.triggerComponentEvent(
        component,
        TransformEventTool.triggerBlurScaleY(secondValue),
      );
    };

    let _beforeEach = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(sandbox, () => ());

      SceneTreeNodeDomTool.OperateTwoLayer.getFirstCubeDomIndex()
      |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;
    };

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "test simulate set currentSceneTreeNode",
      (_simulateTwiceChangeScale, _beforeEach, () => ()),
      BuildComponentForRedoUndoTool.buildMainEditorTransformComponent,
    );
  });