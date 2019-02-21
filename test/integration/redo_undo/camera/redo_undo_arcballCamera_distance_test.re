open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: arcballCameraController distance and minDistance", () => {
    let sandbox = getSandboxDefaultVal();

    let _changeDistanceAndBlur = value =>
      MainEditorArcballCameraControllerTool.changeDistanceAndBlur(
        ~cameraController=
          GameObjectTool.getCurrentSceneTreeNodeArcballCamera(),
        ~value,
        (),
      );

    let _changeMinDistanceAndBlur = value =>
      MainEditorArcballCameraControllerTool.changeMinDistanceAndBlur(
        ~cameraController=
          GameObjectTool.getCurrentSceneTreeNodeArcballCamera(),
        ~value,
        (),
      );

    let _simulateChangeAndBlurDistanceAndMinDistance = () => {
      let value1 = 23.11;
      let value2 = 12.12;

      _changeDistanceAndBlur(value1);
      _changeMinDistanceAndBlur(value2);
    };

    let _simulateDragDropDistance = () => {
      let firstValue = 10.0;
      let secondValue = 23.11;

      MainEditorArcballCameraControllerTool.changeDistanceAndDragDrop(
        ~cameraController=
          GameObjectTool.getCurrentSceneTreeNodeArcballCamera(),
        ~changeValue=secondValue,
        ~dragDropValue=firstValue,
        (),
      );

      (firstValue, secondValue);
    };

    let _beforeEach = () => {
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        SceneTreeWidgetService.getWidget(),
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
      "test change and blur distance and minDistance",
      (_simulateChangeAndBlurDistanceAndMinDistance, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildInspectorComponent,
    );

    describe("test drag drop distance", () => {
      beforeEach(() => _beforeEach());

      describe("test undo operate", () =>
        describe("test undo one step", () =>
          test("step which from second to first", () => {
            let (firstValue, secondValue) = _simulateDragDropDistance();
            let currentSceneTreeNodeArcballCamera =
              GameObjectTool.getCurrentSceneTreeNodeArcballCamera();

            RedoUndoTool.undoHistoryState();

            ArcballCameraEngineService.unsafeGetArcballCameraControllerDistance(
              currentSceneTreeNodeArcballCamera,
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == firstValue;
          })
        )
      );
    });
  });