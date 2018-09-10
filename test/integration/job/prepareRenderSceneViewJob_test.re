open Wonderjs;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("prepare render scene view job", () => {
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
{"name": "prepare_render_scene_view" }
           ]
         }
       ]
             |},
            ~loopJobs=
              {|
             [
{"name": "prepare_render_scene_view" }
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

    describe("send imgui->uniform projection mat data", () =>
      test("test", () => {
        PrepareRenderGameViewJobTool.prepare(_prepareState);

        PrepareRenderGameViewJobTool.setViewRect(~width=11, ~height=20, ());
        let gl = FakeGlToolEngine.getEngineStateGl();
        let pos1 = 10;
        gl##getUniformLocation
        |> withTwoArgs(Sinon.matchAny, "u_projectionMat")
        |> returns(pos1);
        StateLogicService.getAndSetEngineState(
          DirectorToolEngine.runWithDefaultTime,
        );

        gl##uniformMatrix4fv
        |> SinonTool.calledWithArg3(
             _,
             pos1,
             Sinon.matchAny,
             Js.Typed_array.Float32Array.make([|
               0.4000000059604645,
               0.,
               0.,
               0.,
               0.,
               (-0.20000000298023224),
               0.,
               0.,
               0.,
               0.,
               (-1.),
               0.,
               (-1.),
               1.,
               0.,
               1.,
             |]),
           )
        |> expect == true;
      })
    );

    describe("test current camera", () =>
      test("test edit camera is active", () => {
        PrepareRenderGameViewJobTool.prepare(_prepareState);

        let engineState =
          StateLogicService.getAndSetEngineState(
            DirectorToolEngine.runWithDefaultTime,
          );

        BasicCameraViewEngineService.getActiveBasicCameraView(engineState)
        |> OptionService.unsafeGet
        |>
        expect == MainEditorCameraTool.getEditCameraBasicCameraView(
                    StateEditorService.getState(),
                    engineState,
                  );
      })
    );
    /* TODO describe(
       "test aspect",
       (
       () => {

       })
       ); */
  });