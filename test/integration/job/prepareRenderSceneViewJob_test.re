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

      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("send imgui->uniform projection mat data", () =>
      test("test", () => {
        PrepareRenderViewJobTool.prepare(_prepareState);

        PrepareRenderViewJobTool.setViewRect(~width=11, ~height=20, ());
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

    describe("test current camera", () => {
      test("active edit camera", () => {
        PrepareRenderViewJobTool.prepare(_prepareState);

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
      });

      describe("test aspect", () =>
        test("has no aspect", () => {
          PrepareRenderViewJobTool.prepare(_prepareState);

          let engineState =
            StateLogicService.getAndSetEngineState(
              DirectorToolEngine.runWithDefaultTime,
            );

          BasicCameraViewEngineService.getActiveBasicCameraView(engineState)
          |> OptionService.unsafeGet
          |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
               _,
               engineState,
             )
          |> GameObjectComponentEngineService.getPerspectiveCameraProjectionComponent(
               _,
               engineState,
             )
          |> PerspectiveCameraProjectionEngineService.getPerspectiveCameraAspect(
               _,
               engineState,
             )
          |> expect == None;
        })
      );

      describe("test send pMatrix", () => {
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
        "name": "prepare_render_scene_view"
    }
]
             |},
                (),
              ),
            (),
          );

          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
        };

        test("send pMatrix of the view aspect", () => {
          _prepareState();
          let gl = FakeGlToolEngine.getEngineStateGl();
          let pos1 = 10;
          gl##getUniformLocation
          |> withTwoArgs(Sinon.matchAny, "u_pMatrix")
          |> returns(pos1);
          StateLogicService.getAndSetEngineState(MainUtils.handleEngineState);
          IMGUITool.prepareImgui();
          PrepareRenderViewJobTool.setViewRect(~width=200, ~height=150, ());

          StateLogicService.getAndSetEngineState(
            DirectorToolEngine.runWithDefaultTime,
          );

          gl##uniformMatrix4fv
          |> expect
          |> toCalledWith([|
               pos1,
               Sinon.matchAny,
               Js.Typed_array.Float32Array.make([|
                 1.299038052558899,
                 0.,
                 0.,
                 0.,
                 0.,
                 1.7320507764816284,
                 0.,
                 0.,
                 0.,
                 0.,
                 (-1.0002000331878662),
                 (-1.),
                 0.,
                 0.,
                 (-0.20002000033855438),
                 0.,
               |])
               |> Obj.magic,
             |]);
        });
      });
    });
  });