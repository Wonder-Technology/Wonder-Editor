open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("test remove arcball camera controller", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~loopPipelines=
              {|
                   [
                       {
                           "name": "default",
                           "jobs": [
                               {
                                   "name": "dispose"
                               }
                           ]
                       }
                   ]
               |},
            (),
          ),
        (),
      );

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

    describe("if is run", () =>
      test("unbind arcballCameraController event for game view", () => {
        ControllerTool.setIsRun(true);
        MainEditorInspectorAddComponentTool.addArcballCameraControllerComponent();
        let cameraController =
          GameObjectTool.unsafeGetCurrentSceneTreeNode()
          |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
               _,
               StateEngineService.unsafeGetState(),
             );
        ArcballCameraEngineService.bindArcballCameraControllerEventForGameView(
          cameraController,
        )
        |> StateLogicService.getAndSetEngineState;

        MainEditorInspectorRemoveComponentTool.removeArcballCameraControllerComponent();

        let engineState = StateEngineService.unsafeGetState();
        ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
          cameraController,
          engineState,
        )
        |> expect == false;
      })
    );
  });