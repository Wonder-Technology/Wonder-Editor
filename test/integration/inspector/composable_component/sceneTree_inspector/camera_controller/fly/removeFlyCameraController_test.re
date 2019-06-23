open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("test remove fly camera controller", () => {
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

    describe("if is run", () => {
      beforeEach(() => ControllerTool.setIsRun(true));

      test("unbind flyCameraController event for game view", () => {
        MainEditorInspectorAddComponentTool.addFlyCameraControllerComponent();
        let cameraController =
          GameObjectTool.unsafeGetCurrentSceneTreeNode()
          |> GameObjectComponentEngineService.unsafeGetFlyCameraControllerComponent(
               _,
               StateEngineService.unsafeGetState(),
             );
        FlyCameraEngineService.bindFlyCameraControllerEventForGameView(
          cameraController,
        )
        |> StateLogicService.getAndSetEngineState;

        MainEditorInspectorRemoveComponentTool.removeFlyCameraControllerComponent();

        let engineState = StateEngineService.unsafeGetState();
        FlyCameraEngineService.isBindFlyCameraControllerEventForGameView(
          cameraController,
          engineState,
        )
        |> expect == false;
      });
    });
  });