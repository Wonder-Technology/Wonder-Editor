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

      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test imgui", () =>
      describe("test imgui func", () =>
        test("set empty func", () => {
          PrepareRenderViewJobTool.prepare(_prepareState);

          let engineState =
            StateLogicService.getAndSetEngineState(
              DirectorToolEngine.runWithDefaultTime,
            );

          IMGUITool.containMultiline(
            IMGUITool.unsafeGetIMGUIFuncStr(engineState)
            |> StringTool.removeNewLinesAndSpaces,
            [
              {|
                function (_, _$1, engineState) {
                  return engineState;
                }
      |}
              |> StringTool.removeNewLinesAndSpaces,
            ],
          )
          |> expect == true;
        })
      )
    );

    describe("test current camera", () =>
      test("active scene camera", () => {
        PrepareRenderViewJobTool.prepare(_prepareState);

        let engineState =
          StateLogicService.getAndSetEngineState(
            DirectorToolEngine.runWithDefaultTime,
          );

        BasicCameraViewEngineService.getActiveBasicCameraView(engineState)
        |> OptionService.unsafeGet
        |>
        expect == PrepareRenderViewJobTool.getSceneActivedBasicCameraView(
                    engineState,
                  );
      })
    );

    describe("test viewport", () =>
      test("test viewport data", () => {
        PrepareRenderViewJobTool.prepare(_prepareState);
        PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());

        let engineState =
          StateLogicService.getAndSetEngineState(
            DirectorToolEngine.runWithDefaultTime,
          );

        DeviceManagerEngineService.getViewport(engineState)
        |> expect == Some((50, 0, 50, 50));
      })
    );

    describe("shouldn't render grid plane", () => {
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

      test("test not draw", () => {
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

        drawElements |> withOneArg(lines) |> expect |> not_ |> toCalled;
      });
    });
  });