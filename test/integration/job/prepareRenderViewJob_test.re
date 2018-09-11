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
                "name": "get_camera_data"
            },
            {
                "name": "create_basic_render_object_buffer"
            },
            {
                "name": "create_light_render_object_buffer"
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
            ~loopJobs=
              {|
             [
    {
        "name": "update_camera"
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
        "name": "clear_color",
        "flags": [
            "#20B2AA"
        ]
    },
    {
        "name": "clear_buffer",
        "flags": [
            "COLOR_BUFFER",
            "DEPTH_BUFFER",
            "STENCIL_BUFFER"
        ]
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
        "name": "dispose"
    },
    {
        "name": "reallocate_cpu_memory"
    },
    {
        "name": "render_imgui"
    },
    {
        "name": "prepare_render_scene_view"
    },
    {
        "name": "prepare_render_game_view"
    },
    {
        "name": "restore"
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

        let engineState =
          StateLogicService.getAndSetEngineState(
            DirectorToolEngine.runWithDefaultTime,
          );
        let engineState =
          StateLogicService.getAndSetEngineState(
            DirectorToolEngine.runWithDefaultTime,
          );

        BasicCameraViewEngineService.getActiveBasicCameraView(engineState)
        |> OptionService.unsafeGet
        |> expect == PrepareRenderViewJobTool.getSceneActivedBasicCameraView(engineState)
      })
    );
  });