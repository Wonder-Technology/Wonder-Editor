open Wonderjs;

open StateDataMainType;

open NoWorkerJobType;

open ParseNoWorkerJobService;

let buildNoWorkerInitPipelineConfigWithoutInitMain = () => {|
    [
        {
          "name": "default",
          "jobs": [
            {
              "name": "init_camera"
            },
            {
              "name": "start_time"
            },
            {
              "name": "preget_glslData"
            },
            {
              "name": "init_state"
            },
            {
              "name": "init_basic_material"
            },
            {
              "name": "init_light_material"
            },
            {
              "name": "init_texture"
            }
            ]
        }
    ]
            |};

let buildNoWorkerInitJobConfigWithoutInitMain = () => {|
    [
        {
            "name": "init_camera"
        },
        {
            "name": "start_time"
        },
        {
            "name": "preget_glslData"
        },
        {
            "name": "init_state"
        },
        {
            "name": "init_basic_material"
        },
        {
            "name": "init_light_material"
        },
            {
              "name": "init_texture"
            }
    ]
            |};

let buildNoWorkerLoopPipelineConfig = () => {|
    [
        {
            "name": "default",
            "jobs": [
                {
                    "name": "tick"
                },
                {
                    "name": "dispose"
                },
                {
                    "name": "reallocate_cpu_memory"
                },
                {
                    "name": "update_transform"
                },
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
                }
            ]
        }
    ]
            |};

let buildNoWorkerLoopJobConfig = () => {|
    [
    {
        "name": "tick"
    },
    {
        "name": "update_transform"
    },
    {
        "name": "update_transform_gizmos"
    },
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
            "#AAAAAA"
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
        "name": "draw_outline"
    },
    {
        "name": "prepare_render_scene_view"
    },
    {
        "name": "prepare_render_game_view"
    },
    {
        "name": "restore"
    },
    {
        "name": "set_outline_data"
    },
    {
        "name": "render_transform_gizmos"
    },
      {
        "name": "render_skybox"
      }
]
            |};

let buildNoWorkerJobConfig =
    (
      ~noWorkerSetting={|
        {
        "init_pipeline": "default",
        "loop_pipeline": "default"
    }
    |},
      ~initPipelines={|
             [
                 {
                   "name": "default",
                   "jobs": [
                     {
                       "name": "init_camera"
                     },
                     {
                       "name": "start_time"
                     },
                     {
                       "name": "preget_glslData"
                     },
                     {
                       "name": "init_state"
                     },
                     {
                       "name": "init_basic_material"
                     },
                     {
                       "name": "init_light_material"
                     },
                     {
                         "name":"init_texture"
                     },
                     {
                        "name": "init_imgui"
                     }
                   ]
                 }
               ]
                     |},
      /* buildNoWorkerInitPipelineConfigWithoutInitMain(), */
      ~loopPipelines=buildNoWorkerLoopPipelineConfig(),
      ~initJobs={|
             [
      {
        "name": "create_canvas"
      },
      {
        "name": "init_editor"
      },
      {
        "name": "create_gl"
      },
      {
        "name": "set_full_screen"
      },
      {
        "name": "set_viewport"
      },
      {
        "name": "detect_gl"
      },
      {
        "name": "init_event_for_editor"
      },
      {
        "name": "init_hotkeys"
      },
      {
        "name": "init_transform_gizmos"
      },
      {
        "name": "init_picking"
      },
      {
        "name": "init_camera_controller"
      },
      {
        "name": "init_camera"
      },
      {
        "name": "start_time"
      },
      {
        "name": "preget_glslData"
      },
      {
        "name": "init_state"
      },
      {
        "name": "init_no_material_shader"
      },
      {
        "name": "init_basic_material"
      },
      {
        "name": "init_light_material"
      },
      {
        "name": "init_texture"
      },
      {
        "name": "init_imgui"
      },
      {
        "name": "init_skybox"
      }
    ]
                     |},
      ~loopJobs=buildNoWorkerLoopJobConfig(),
      (),
    ) => (
  noWorkerSetting,
  initPipelines,
  loopPipelines,
  initJobs,
  loopJobs,
);

let buildNoWorkerEmptyJobConfig = () =>
  buildNoWorkerJobConfig(
    ~initPipelines=
      {|
        [
    {
      "name": "default",
      "jobs": [
      ]
    }
  ]
        |},
    ~initJobs={|
        []
        |},
    ~loopPipelines=
      {|
        [
    {
      "name": "default",
      "jobs": [
      ]
    }
  ]
        |},
    ~loopJobs={|
        []
        |},
    (),
  );

let create =
    (
      (noWorkerSetting, initPipelines, loopPipelines, initJobs, loopJobs),
      state: StateDataMainType.state,
    ) => {
  ...state,
  noWorkerJobRecord:
    Some({
      setting: convertSettingToRecord(noWorkerSetting |> Js.Json.parseExn),
      initPipelines:
        convertInitPipelinesToRecord(initPipelines |> Js.Json.parseExn),
      loopPipelines:
        convertLoopPipelinesToRecord(loopPipelines |> Js.Json.parseExn),
      initJobs: convertInitJobsToRecord(initJobs |> Js.Json.parseExn),
      loopJobs: convertLoopJobsToRecord(loopJobs |> Js.Json.parseExn),
    }),
};

let getSetting = state =>
  state.noWorkerJobRecord |> OperateNoWorkerJobService.getSetting;

let getInitPipelines = state =>
  state.noWorkerJobRecord |> OperateNoWorkerJobService.getInitPipelines;

let getInitJobs = state =>
  state.noWorkerJobRecord |> OperateNoWorkerJobService.getInitJobs;

let getLoopPipelines = state =>
  state.noWorkerJobRecord |> OperateNoWorkerJobService.getLoopPipelines;

let getLoopJobs = state =>
  state.noWorkerJobRecord |> OperateNoWorkerJobService.getLoopJobs;

let getInitPipelines = state =>
  state.noWorkerJobRecord |> OperateNoWorkerJobService.getInitPipelines;