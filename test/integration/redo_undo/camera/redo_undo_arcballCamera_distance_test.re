open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: arcballCameraController distance and minDistance", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initStateAndGl(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    let _changeDistance = value => {
      let component =
        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        );

      BaseEventTool.triggerComponentEvent(
        component,
        MainEditorCameraTool.triggerChangeArcballDistance(value),
      );

      BaseEventTool.triggerComponentEvent(
        component,
        MainEditorCameraTool.triggerBlurArcballDistance(value),
      );
    };
    let _changeMinDistance = value => {
      let component =
        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        );

      BaseEventTool.triggerComponentEvent(
        component,
        MainEditorCameraTool.triggerChangeArcballMinDistance(value),
      );

      BaseEventTool.triggerComponentEvent(
        component,
        MainEditorCameraTool.triggerBlurArcballMinDistance(value),
      );
    };

    let _simulateChangeDistanceAndChangeMinDistance = () => {
      let value1 = 23.11;
      let value2 = 12.12;

      _changeDistance(value1);
      _changeMinDistance(value2);
    };

    let _beforeEach = () => {
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setCameraTobeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;

      MainEditorCameraTool.addArcballCameraComponentToCamera();
    };

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode to be camera",
      (_simulateChangeDistanceAndChangeMinDistance, _beforeEach, () => ()),
      BuildComponentForRedoUndoTool.buildInspectorComponent,
    );
  });