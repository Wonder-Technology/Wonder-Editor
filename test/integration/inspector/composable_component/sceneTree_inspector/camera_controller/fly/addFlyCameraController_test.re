open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("test add flyCameraController", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        SceneTreeWidgetService.getWidget(),
      )
      |> StateLogicService.getAndSetEditorState;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("if is run", () => {
      describe(
        "if gameObject has basicCameraView and basicCameraView is active ", () =>
        test("bind flyCameraController event for game view", () => {
          ControllerTool.setIsRun(true);
          let currentBasicCameraView =
            GameObjectTool.unsafeGetCurrentSceneTreeNode()
            |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
                 _,
                 StateEngineService.unsafeGetState(),
               );
          let engineState =
            BasicCameraViewEngineService.activeBasicCameraView(
              currentBasicCameraView,
              StateEngineService.unsafeGetState(),
            );
          engineState |> StateEngineService.setState |> ignore;

          MainEditorInspectorAddComponentTool.addFlyCameraControllerComponent();

          let engineState = StateEngineService.unsafeGetState();
          let currentFlyCameraController =
            GameObjectTool.unsafeGetCurrentSceneTreeNode()
            |> GameObjectComponentEngineService.unsafeGetFlyCameraControllerComponent(
                 _,
                 StateEngineService.unsafeGetState(),
               );
          FlyCameraEngineService.isBindFlyCameraControllerEventForGameView(
            currentFlyCameraController,
            engineState,
          )
          |> expect == true;
        })
      );

      describe("else", () =>
        test("not bind event for game view", () => {
          ControllerTool.setIsRun(true);
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();
          MainEditorInspectorAddComponentTool.addFlyCameraControllerComponent();

          let engineState = StateEngineService.unsafeGetState();
          let currentSceneTreeNode =
            GameObjectTool.unsafeGetCurrentSceneTreeNode();

          engineState
          |> GameObjectComponentEngineService.unsafeGetFlyCameraControllerComponent(
               currentSceneTreeNode,
             )
          |> FlyCameraEngineService.isBindFlyCameraControllerEventForGameView(
               _,
               engineState,
             )
          |> expect == false;
        })
      );
    });
  });