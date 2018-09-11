open Wonderjs;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("prepare render game view job", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareState = () => {
      MainEditorSceneTool.initStateWithJob(
        ~sandbox,
        ~noWorkerJobRecord=
          NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
            ~initPipelines=
              {|
             [
         {
           "name": "default",
           "jobs": [
             {
               "name": "init_imgui"
             }
           ]
         }
       ]
             |},
            ~initJobs=
              {|
             [
               { "name": "init_imgui" }
             ]
             |},
            ~loopPipelines=
              {|
             [
         {
           "name": "default",
           "jobs": [
{"name": "prepare_render_game_view" }
           ]
         }
       ]
             |},
            ~loopJobs=
              {|
             [
{"name": "prepare_render_game_view" }
             ]
             |},
            (),
          ),
        (),
      );

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
      );
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test current camera", () =>
      test("active scene camera", () => {
        PrepareRenderViewJobTool.prepare(_prepareState);

        let engineState =
          StateLogicService.getAndSetEngineState(
            DirectorToolEngine.runWithDefaultTime,
          );

        let sceneActivedBasicCameraView =
          MainEditorSceneTool.getCameraInDefaultScene(engineState)
          |> GameObjectComponentEngineService.getBasicCameraViewComponent(
               _,
               engineState,
             );
        BasicCameraViewEngineService.getActiveBasicCameraView(engineState)
        |> OptionService.unsafeGet
        |> expect == sceneActivedBasicCameraView;
      })
    );
  });