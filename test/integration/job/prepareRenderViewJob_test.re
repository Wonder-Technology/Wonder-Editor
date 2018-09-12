open Wonderjs;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("test prepare render scen view job and game view job", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareState = () => {
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
                "name": "update_camera"
            },
            {
                "name": "clear_color"
            },
            {
                "name": "clear_buffer"
            },
            {
                "name": "prepare_render_scene_view"
            },
            {
                "name": "get_camera_data"
            },
            {
                "name": "create_basic_render_object_buffer"
            },
            {
                "name": "create_light_render_object_buffer"
            },
            {
                "name": "clear_last_send_component"
            },
            {
                "name": "send_uniform_shader_data"
            },
            {
                "name": "render_basic"
            },
            {
                "name": "front_render_light"
            },
            {
                "name": "render_imgui"
            },
            {
                "name": "prepare_render_game_view"
            },
            {
                "name": "get_camera_data"
            },
            {
                "name": "create_basic_render_object_buffer"
            },
            {
                "name": "create_light_render_object_buffer"
            },
            {
                "name": "clear_last_send_component"
            },
            {
                "name": "send_uniform_shader_data"
            },
            {
                "name": "render_basic"
            },
            {
                "name": "front_render_light"
            },
            {
                "name": "render_imgui"
            },
            {
                "name": "restore"
            }
           ]
         }
       ]
             |},
            (),
          ),
        (),
      );

      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("fix bug", () =>
      test("test active scene camera after two loops", () => {
        PrepareRenderViewJobTool.prepare(_prepareState);

        StateLogicService.getAndSetEngineState(
          DirectorToolEngine.runWithDefaultTime,
        );
        StateLogicService.getAndSetEngineState(
          DirectorToolEngine.runWithDefaultTime,
        );

        let engineState = StateEngineService.unsafeGetState();
        BasicCameraViewEngineService.getActiveBasicCameraView(engineState)
        |> OptionService.unsafeGet
        |>
        expect == PrepareRenderViewJobTool.getSceneActivedBasicCameraView(
                    engineState,
                  );
      })
    );

    describe("test render grid plane", () =>
      test("should draw twice in two loop", () => {
        _prepareState();
        let gl = FakeGlToolEngine.getEngineStateGl();
        let drawElements = gl##drawElements;
        let lines = 2;
        let gl = FakeGlToolEngine.setLines(lines, gl);

        StateLogicService.getAndSetEngineState(MainUtils.handleEngineState);
        IMGUITool.prepareImgui();
        PrepareRenderViewJobTool.setViewRect();

        StateLogicService.getAndSetEngineState(
          DirectorToolEngine.runWithDefaultTime,
        );
        StateLogicService.getAndSetEngineState(
          DirectorToolEngine.runWithDefaultTime,
        );

        drawElements |> withOneArg(lines) |> expect |> toCalledTwice;
      })
    );
  });