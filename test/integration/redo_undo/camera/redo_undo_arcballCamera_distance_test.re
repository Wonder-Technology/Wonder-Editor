open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: arcballCameraController distance and minDistance", () => {
    let sandbox = getSandboxDefaultVal();

    let _changeDistance = value =>
      MainEditorArcballCameraControllerTool.changeDistanceAndBlur(
        ~cameraController=GameObjectTool.getCurrentGameObjectArcballCamera(),
        ~value,
        (),
      );
    let _changeMinDistance = value =>
      MainEditorArcballCameraControllerTool.changeMinDistanceAndBlur(
        ~cameraController=GameObjectTool.getCurrentGameObjectArcballCamera(),
        ~value,
        (),
      );

    let _simulateChangeDistanceAndChangeMinDistance = () => {
      let value1 = 23.11;
      let value2 = 12.12;

      _changeDistance(value1);
      _changeMinDistance(value2);
    };

    let _beforeEach = () => {
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;

      MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
    };

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    RedoUndoTool.testRedoUndoTwoStep(
      sandbox,
      "prepare first step: set currentSceneTreeNode to be camera",
      (_simulateChangeDistanceAndChangeMinDistance, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildInspectorComponent,
    );
  });