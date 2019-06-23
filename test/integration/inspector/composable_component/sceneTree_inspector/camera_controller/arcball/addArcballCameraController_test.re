open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("test add arcballCameraController", () => {
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
      beforeEach(() => ControllerTool.setIsRun(true));

      describe(
        "if gameObject has basicCameraView and basicCameraView is active ", () =>
        test("bind arcballCameraController event for game view", () => {
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

          MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();

          let engineState = StateEngineService.unsafeGetState();
          let currentArcballCameraController =
            GameObjectTool.unsafeGetCurrentSceneTreeNode()
            |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                 _,
                 StateEngineService.unsafeGetState(),
               );
          ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
            currentArcballCameraController,
            engineState,
          )
          |> expect == true;
        })
      );

      describe("else", () =>
        test("not bind event for game view", () => {
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();

          MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();

          let engineState = StateEngineService.unsafeGetState();
          let currentSceneTreeNode =
            GameObjectTool.unsafeGetCurrentSceneTreeNode();
          (
            engineState
            |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                 currentSceneTreeNode,
               )
          )
          ->(
              ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                engineState,
              )
            )
          |> expect == false;
        })
      );
    });
  });