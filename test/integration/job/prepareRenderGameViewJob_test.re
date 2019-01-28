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
        ~isInitJob=false,
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

          StateLogicService.getAndSetEngineState(
            DirectorToolEngine.runWithDefaultTime,
          );

          let engineState = StateEngineService.unsafeGetState();
          let str =
            IMGUITool.unsafeGetIMGUIFuncStr(engineState)
            |> StringTool.removeNewLinesAndSpaces;
          TestCoverageTool.isTestCoverage(str) ?
            true |> expect == true :
            IMGUITool.containMultiline(
              str,
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

    describe("test current camera", () => {
      describe("if scene has active camera", () =>
        test("active it", () => {
          PrepareRenderViewJobTool.prepare(_prepareState);

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

      describe("else", () =>
        test("unactive all cameras", () => {
          PrepareRenderViewJobTool.prepare(_prepareState);
          StateEditorService.getState()
          |> GameViewEditorService.removeActivedBasicCameraView
          |> StateEditorService.setState
          |> ignore;

          StateLogicService.getAndSetEngineState(
            DirectorToolEngine.runWithDefaultTime,
          );

          let engineState = StateEngineService.unsafeGetState();
          BasicCameraViewEngineService.getActiveBasicCameraView(engineState)
          |> expect == None;
        })
      );
    });

    describe("test viewport", () =>
      test("test viewport data", () => {
        PrepareRenderViewJobTool.prepare(_prepareState);
        let width = 100;
        let height = 50;
        PrepareRenderViewJobTool.setViewRect(~width, ~height, ());

        StateLogicService.getAndSetEngineState(
          DirectorToolEngine.runWithDefaultTime,
        );

        let engineState = StateEngineService.unsafeGetState();
        DeviceManagerEngineService.getViewport(engineState)
        |> expect == Some((width / 2, 0, width / 2, height));
      })
    );

    describe("test scissor", () => {
      test("enable scissor test", () => {
        PrepareRenderViewJobTool.prepare(_prepareState);

        StateLogicService.getAndSetEngineState(
          DeviceManagerEngineService.setScissorTest(false),
        );

        let gl = FakeGlToolEngine.getEngineStateGl();
        let enable = gl##enable;
        let test = 3;
        FakeGlToolEngine.setScissorTest(test, gl) |> ignore;

        StateLogicService.getAndSetEngineState(
          DirectorToolEngine.runWithDefaultTime,
        );

        enable |> withOneArg(test) |> expect |> toCalledOnce;
      });
      test("scissor viewport zone", () => {
        PrepareRenderViewJobTool.prepare(_prepareState);
        let width = 100;
        let height = 50;
        PrepareRenderViewJobTool.setViewRect(~width, ~height, ());
        let gl = FakeGlToolEngine.getEngineStateGl();
        let scissor = gl##scissor;

        StateLogicService.getAndSetEngineState(
          DirectorToolEngine.runWithDefaultTime,
        );

        scissor |> expect |> toCalledWith([|width / 2, 0, width / 2, height|]);
      });
    });

    describe("shouldn't render grid plane", () => {
      let _prepareState = () => {
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~isInitJob=false,
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

        StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);
        IMGUITool.prepareImgui();
        PrepareRenderViewJobTool.setViewRect();

        StateLogicService.getAndSetEngineState(
          DirectorToolEngine.runWithDefaultTime,
        );

        drawElements |> withOneArg(lines) |> expect |> not_ |> toCalled;
      });
    });
  });