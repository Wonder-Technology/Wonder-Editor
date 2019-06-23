open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

let _ =
  describe("MainEditor FlyCameraController", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test set currentSceneTreeNode to be camera", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          SceneTreeWidgetService.getWidget(),
        )
        |> StateLogicService.getAndSetEditorState;
      });

      test("test ui", () => {
        MainEditorInspectorAddComponentTool.addFlyCameraControllerComponent();

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });

      describe("test change flyCameraController moveSpeed", () =>
        test("test change should set into engine", () => {
          MainEditorInspectorAddComponentTool.addFlyCameraControllerComponent();
          let currentGameObjectFlyCamera =
            GameObjectTool.getCurrentSceneTreeNodeFlyCamera();
          let value = 21.1;

          MainEditorFlyCameraControllerTool.changeMoveSpeedAndBlur(
            ~cameraController=currentGameObjectFlyCamera,
            ~value,
            (),
          );

          (
            FlyCameraEngineService.unsafeGetFlyCameraControllerMoveSpeed(
              currentGameObjectFlyCamera,
            )
            |> StateLogicService.getEngineStateToGetData
          )
          ->(FloatService.truncateFloatValue(5))
          |> expect == value;
        })
      );

      describe("test change flyCameraController rotateSpeed", () =>
        test("test change should set into engine", () => {
          MainEditorInspectorAddComponentTool.addFlyCameraControllerComponent();
          let currentGameObjectFlyCamera =
            GameObjectTool.getCurrentSceneTreeNodeFlyCamera();
          let value = 11.1;

          MainEditorFlyCameraControllerTool.changeRotateSpeedAndBlur(
            ~cameraController=currentGameObjectFlyCamera,
            ~value,
            (),
          );

          (
            FlyCameraEngineService.unsafeGetFlyCameraControllerRotateSpeed(
              currentGameObjectFlyCamera,
            )
            |> StateLogicService.getEngineStateToGetData
          )
          ->(FloatService.truncateFloatValue(5))
          |> expect == value;
        })
      );

      describe("test change flyCameraController wheelSpeed", () =>
        test("test change should set into engine", () => {
          MainEditorInspectorAddComponentTool.addFlyCameraControllerComponent();
          let currentGameObjectFlyCamera =
            GameObjectTool.getCurrentSceneTreeNodeFlyCamera();
          let value = 2.0;

          MainEditorFlyCameraControllerTool.changeWheelSpeedAndBlur(
            ~cameraController=currentGameObjectFlyCamera,
            ~value,
            (),
          );

          (
            FlyCameraEngineService.unsafeGetFlyCameraControllerWheelSpeed(
              currentGameObjectFlyCamera,
            )
            |> StateLogicService.getEngineStateToGetData
          )
          ->(FloatService.truncateFloatValue(5))
          |> expect == value;
        })
      );
    });
  });