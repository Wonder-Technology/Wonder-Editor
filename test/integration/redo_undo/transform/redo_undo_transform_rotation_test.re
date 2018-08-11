open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: transform rotation", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _simulateTwiceChangeRotation = () => {
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
        TransformEventTool.triggerChangeRotationX(firstValue),
      );
      BaseEventTool.triggerComponentEvent(
        component,
        TransformEventTool.triggerBlurRotationX(firstValue),
      );

      BaseEventTool.triggerComponentEvent(
        component,
        TransformEventTool.triggerChangeRotationY(secondValue),
      );
      BaseEventTool.triggerComponentEvent(
        component,
        TransformEventTool.triggerBlurRotationY(secondValue),
      );
    };

    let _beforeEach = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(sandbox, () => ());

      SceneTreeNodeDomTool.OperateDefaultScene.getFirstCubeDomIndex()
      |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;
    };

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "test simulate set currentSceneTreeNode",
      (_simulateTwiceChangeRotation, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildMainEditorTransformComponent,
    );
  });