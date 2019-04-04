open Wonderjs;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("init inspector engine job", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareState = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.initInspectorEngineState(
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
                    {"name": "init_inspector_engine" }
                ]
              }
            ]
             |},
            ~initJobs=
              {|
             [
                {"name": "init_inspector_engine" }
             ]
             |},
            (),
          ),
        (),
      );
    };

    beforeEach(() => {
      sandbox := createSandbox();

      _prepareState();

      StateInspectorEngineService.unsafeGetState()
      |> MainUtils._handleInspectorEngineState
      |> StateInspectorEngineService.setState
      |> ignore;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("add specific gameObjects into inspector engine state", () => {
      describe("add one camera", () => {
        test("scene gameObject children should has one camera", () => {
          let inspectorEngineState =
            StateInspectorEngineService.unsafeGetState();

          inspectorEngineState
          |> InspectorEngineTool.getSceneCameras
          |> Js.Array.length
          |> expect == 1;
        });
        test("set perspective camera's near,far,fovy", () => {
          let inspectorEngineState =
            StateInspectorEngineService.unsafeGetState();
          let cameraProjection =
            inspectorEngineState
            |> InspectorEngineTool.unsafeGetSceneFirstCamera
            |> GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent(
                 _,
                 inspectorEngineState,
               );
          (
            PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraNear(
              cameraProjection,
              inspectorEngineState,
            ),
            PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFar(
              cameraProjection,
              inspectorEngineState,
            ),
            PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFovy(
              cameraProjection,
              inspectorEngineState,
            ),
          )
          |> expect == (0.01, 50000., 60.);
        });
        test("move camera", () => {
          let inspectorEngineState =
            StateInspectorEngineService.unsafeGetState();
          let camera =
            inspectorEngineState
            |> InspectorEngineTool.unsafeGetSceneFirstCamera;
          let transform =
            inspectorEngineState
            |> GameObjectComponentEngineService.unsafeGetTransformComponent(
                 camera,
               );

          inspectorEngineState
          |> TransformEngineService.getLocalPosition(transform)
          |> expect == (0., 0., 1.100000023841858);
        });
      });

      describe("add one direction light", () =>
        test("scene gameObject children should has one direction light", () => {
          let inspectorEngineState =
            StateInspectorEngineService.unsafeGetState();

          inspectorEngineState
          |> InspectorEngineTool.getSceneDirectionLights
          |> Js.Array.length
          |> expect == 1;
        })
      );

      describe("add one empty gameObject", () =>
        test("add the empty gameObject to editorState", () => {
          let editorState = StateEditorService.getState();
          let inspectorEngineState =
            StateInspectorEngineService.unsafeGetState();

          editorState
          |> ParentGameObjectInspectorCanvasEditorService.getParentGameObject
          |> expect
          == (
               inspectorEngineState
               |> InspectorEngineTool.getSceneEmptyGameObject
             );
        })
      );
    });
  });