open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: flyCameraController moveSpeed ", () => {
    let sandbox = getSandboxDefaultVal();

    let _changeMoveSpeedAndBlur = (cameraController, value) =>
      MainEditorFlyCameraControllerTool.changeMoveSpeedAndBlur(
        ~cameraController,
        ~value,
        (),
      );

    let _simulateChangeAndBlurMoveSpeed = () => {
      let value1 = 23.11;
      let value2 = 12.12;
      let flyCameraController =
        GameObjectTool.getCurrentSceneTreeNodeFlyCamera();

      _changeMoveSpeedAndBlur(flyCameraController, value1);
      _changeMoveSpeedAndBlur(flyCameraController, value2);
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

      MainEditorInspectorAddComponentTool.addFlyCameraControllerComponent();
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
      "test change and blur moveSpeed",
      (_simulateChangeAndBlurMoveSpeed, _beforeEach, () => ()),
      BuildComponentForCurryTool.buildInspectorComponent,
    );
  });