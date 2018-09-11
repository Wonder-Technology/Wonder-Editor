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

    describe("test imgui", () => {
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
                 (-0.10000000149011612),
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

      describe("test imgui func", () => {
        describe("if game view imgui exist", () =>
          test("should set game view imgui + gizmo imgui", () => {
            PrepareRenderViewJobTool.prepare(_prepareState);

            let editorState = StateEditorService.getState();
            let gameViewIMGUIFunc =
              Obj.magic((. _, apiJsObj, engineState) => {
                let label = apiJsObj##label;
                let engineState =
                  label(. (100., 30., 300., 200.), "imgui", 0, engineState);

                engineState;
              });
            let gameViewIMGUICustomData = Obj.magic(10);

            editorState
            |> IMGUIEditorService.setGameViewIMGUIFunc(gameViewIMGUIFunc)
            |> IMGUIEditorService.setGameViewIMGUICustomData(
                 gameViewIMGUICustomData,
               )
            |> StateEditorService.setState
            |> ignore;

            let engineState =
              StateLogicService.getAndSetEngineState(
                DirectorToolEngine.runWithDefaultTime,
              );

            IMGUITool.unsafeGetIMGUIFuncStr(engineState)
            |> StringTool.removeNewLinesAndSpaces
            |>
            expect == (
                        {|function (param, apiJsObj, engineState) {
                var match = param[1];
                var match$1 = param[0];
                var engineState$1 = match$1[1](match$1[0], apiJsObj, engineState);
                return match[0](match[1], apiJsObj, engineState$1);
              }|}
                        |> StringTool.removeNewLinesAndSpaces
                      );
          })
        );

        describe("else", () =>
          test("should set gizmo imgui", () => {
            PrepareRenderViewJobTool.prepare(_prepareState);

            let editorState = StateEditorService.getState();

            editorState
            |> IMGUIEditorService.removeGameViewIMGUIFunc
            |> IMGUIEditorService.removeGameViewIMGUICustomData
            |> StateEditorService.setState
            |> ignore;

            let engineState =
              StateLogicService.getAndSetEngineState(
                DirectorToolEngine.runWithDefaultTime,
              );

            IMGUITool.containMultiline(
              IMGUITool.unsafeGetIMGUIFuncStr(engineState)
              |> WonderLog.Log.print
              |> StringTool.removeNewLinesAndSpaces,
              [
                {|

                        var match = SceneViewEditorService$WonderEditor.unsafeGetViewRect(StateEditorService$WonderEditor.getState( /* () */0));
                        var viewHeight = match[3];
                        var viewWidth = match[2];
      |}
                |> StringTool.removeNewLinesAndSpaces,
                {|
var engineState = _drawPointLight(500, scene, _drawDirectionLight(500, scene, state));
                        return reduceOneParamFunc(function (engineState, sceneCameraGameObject) {
                          var match = getTransformPosition(unsafeGetGameObjectTransformComponent(sceneCameraGameObject, engineState), engineState);
                          var z = match[2];
                          var y = match[1];
                          var x = match[0];
                          var match$1 = _getDeepWidthAndHeight(80, 80, maxDistance, _getDistanceWithTwoGameObject( /* tuple */[x, y, z], _getEditCameraPosition(editCamera, engineState)));
                          var imageHeight = match$1[1];
                          var imageWidth = match$1[0];
                          var match$2 = _convertAnchorFromTopLeftToCenter( /* tuple */[imageWidth, imageHeight], convertWorldToScreen(unsafeGetGameObjectBasicCameraViewComponent(editCamera, engineState), unsafeGetGameObjectPerspectiveCameraProjectionComponent(editCamera, engineState), /* tuple */[x, y, z, viewWidth, viewHeight], engineState));
                          return imageFunc( /* tuple */[match$2[0], match$2[1], imageWidth, imageHeight], /* tuple */[0, 0, 1, 1], "camera", engineState);
                        }, engineState, _getSceneCameras(scene$1, engineState));
                        |}
                |> StringTool.removeNewLinesAndSpaces,
              ],
            )
            |> expect == true;
          })
        );
      });
    });

    describe("test viewport", () =>
      test("test viewport data", () => {
        PrepareRenderViewJobTool.prepare(_prepareState);
        let width = 100;
        let height = 50;
        PrepareRenderViewJobTool.setViewRect(~width, ~height, ());

        let engineState =
          StateLogicService.getAndSetEngineState(
            DirectorToolEngine.runWithDefaultTime,
          );

        DeviceManagerEngineService.getViewport(engineState)
        |> expect == Some((0, 0, width / 2, height));
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

        let engineState =
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

        let engineState =
          StateLogicService.getAndSetEngineState(
            DirectorToolEngine.runWithDefaultTime,
          );

        scissor |> expect |> toCalledWith([|0, 0, width / 2, height|]);
      });
    });

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
          PrepareRenderViewJobTool.setViewRect(~width=400, ~height=150, ());

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

    describe("should render grid plane", () => {
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

      test("test draw", () => {
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

        drawElements |> withOneArg(lines) |> expect |> toCalledOnce;
      });
    });
  });