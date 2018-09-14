open Wonderjs;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("init editor job", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareState = () =>
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
{"name": "init_editor" }
           ]
         }
       ]
             |},
            ~initJobs=
              {|
             [
{"name": "init_editor" }
             ]
             |},
            (),
          ),
        (),
      );

    beforeEach(() => {
      sandbox := createSandbox();

      _prepareState();
      StateLogicService.getAndSetEngineState(MainUtils.handleEngineState);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("add specific gameObjects for scene view", () => {
      test("add editCamera as current camera", () =>
        MainEditorCameraTool.getCurrentCameraGameObject(
          StateEngineService.unsafeGetState(),
        )
        |>
        expect == SceneViewEditorService.getEditCamera(
                    StateEditorService.getState(),
                  )
      );

      describe("add grid plane gameObject", () =>
        describe("test components", () => {
          describe("add custom geometry component", () =>
            test("test vertices, indices", () => {
              let engineState = StateEngineService.unsafeGetState();
              let gridPlaneGameObject =
                SceneViewEditorService.unsafeGetGridPlane
                |> StateLogicService.getEditorState;

              let geometry =
                GameObjectComponentEngineService.unsafeGetGeometryComponent(
                  gridPlaneGameObject,
                  engineState,
                );

              let vertices =
                GeometryEngineService.getGeometryVertices(
                  geometry,
                  engineState,
                );
              let indices =
                GeometryEngineService.getGeometryIndices(
                  geometry,
                  engineState,
                );
              (
                vertices |> Js.Typed_array.Float32Array.length,
                indices |> Js.Typed_array.Uint16Array.length,
                vertices
                |> Js.Typed_array.Float32Array.slice(~start=0, ~end_=10),
                indices
                |> Js.Typed_array.Uint16Array.slice(~start=0, ~end_=10),
              )
              |>
              expect == (
                          732,
                          244,
                          Js.Typed_array.Float32Array.make([|
                            (-300.),
                            0.,
                            (-300.),
                            300.,
                            0.,
                            (-300.),
                            (-300.),
                            0.,
                            (-300.),
                            (-300.),
                          |]),
                          Js.Typed_array.Uint16Array.make([|
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                          |]),
                        );
            })
          );
          describe("add meshRenderer component", () =>
            test("drawMode should be Lines", () => {
              let engineState = StateEngineService.unsafeGetState();
              let gridPlaneGameObject =
                SceneViewEditorService.unsafeGetGridPlane
                |> StateLogicService.getEditorState;

              engineState
              |> GameObjectComponentEngineService.getMeshRendererComponent(
                   gridPlaneGameObject,
                 )
              |. MeshRendererEngineService.getDrawMode(engineState)
              |>
              expect == (
                          Wonderjs.DrawModeType.Lines
                          |> Wonderjs.DrawModeType.drawModeToUint8
                        );
            })
          );
          test("add basic material component", () => {
            let engineState = StateEngineService.unsafeGetState();
            let gridPlaneGameObject =
              SceneViewEditorService.unsafeGetGridPlane
              |> StateLogicService.getEditorState;

            engineState
            |> GameObjectComponentEngineService.hasBasicMaterialComponent(
                 gridPlaneGameObject,
               )
            |> expect == true;
          });
        })
      );

      test("not add to scene", () => {
        let sceneAllGameObjects =
          GameObjectEngineService.getAllGameObjects(
            SceneEngineService.getSceneGameObject(
              StateEngineService.unsafeGetState(),
            ),
            StateEngineService.unsafeGetState(),
          );

        (
          sceneAllGameObjects
          |> Js.Array.includes(
               SceneViewEditorService.unsafeGetEditCamera
               |> StateLogicService.getEditorState,
             ),
          sceneAllGameObjects
          |> Js.Array.includes(
               SceneViewEditorService.unsafeGetGridPlane
               |> StateLogicService.getEditorState,
             ),
        )
        |> expect == (false, false);
      });
    });

    describe("build default geometry components", () =>
      test("build cube, sphere components", () =>
        AssetGeometryDataEditorService.getGeometryData(
          StateEditorService.getState(),
        )
        |>
        expect == {defaultCubeGeometryIndex: 1, defaultSphereGeometryIndex: 2}
      )
    );

    describe("add gameObjects to scene", () => {
      describe("add one camera", () => {
        let _getCamera = () => MainEditorSceneTool.getSceneFirstCamera();

        test("active basicCameraView to editor", () => {
          let engineState = StateEngineService.unsafeGetState();
          _getCamera()
          |> GameObjectComponentEngineService.getBasicCameraViewComponent(
               _,
               engineState,
             )
          |> GameViewEditorService.isActiveBasicCameraView(
               _,
               StateEditorService.getState(),
             )
          |> expect == true;
        });
        test("set perspective camera's near,far,fovy", () => {
          let engineState = StateEngineService.unsafeGetState();
          let cameraProjection =
            _getCamera()
            |> GameObjectComponentEngineService.getPerspectiveCameraProjectionComponent(
                 _,
                 engineState,
               );
          (
            PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraNear(
              cameraProjection,
              engineState,
            ),
            PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFar(
              cameraProjection,
              engineState,
            ),
            PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFovy(
              cameraProjection,
              engineState,
            ),
          )
          |> expect == (0.1, 1000., 60.);
        });
        test("move camera", () => {
          let engineState = StateEngineService.unsafeGetState();
          let gameObject = _getCamera() |> OptionService.unsafeGet;
          let transform =
            engineState
            |> GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject);
          engineState
          |> TransformAPI.getTransformLocalPosition(transform)
          |> expect == (0., 0., 40.);
        });
      });

      describe("add box", () =>
        describe("test components", () => {
          test("add material component", () => {
            let engineState = StateEngineService.unsafeGetState();
            let box = MainEditorSceneTool.getBoxInDefaultScene(engineState);

            engineState
            |> GameObjectComponentEngineService.hasLightMaterialComponent(
                 box,
               )
            |> expect == true;
          });
          test("add meshRenderer component", () => {
            let engineState = StateEngineService.unsafeGetState();
            let box = MainEditorSceneTool.getBoxInDefaultScene(engineState);
            engineState
            |> GameObjectComponentEngineService.hasMeshRendererComponent(box)
            |> expect == true;
          });
          describe("test geometry component", () =>
            test("add geometry component", () => {
              let engineState = StateEngineService.unsafeGetState();
              let box = MainEditorSceneTool.getBoxInDefaultScene(engineState);
              engineState
              |> GameObjectComponentEngineService.hasGeometryComponent(box)
              |> expect == true;
            })
          );
        })
      );

      describe("add directionLight gameObject", () =>
        describe("test components", () =>
          describe("test light component", () =>
            test("add light component", () => {
              let engineState = StateEngineService.unsafeGetState();
              let directionLight =
                MainEditorSceneTool.getDirectionLightInDefaultScene(
                  engineState,
                );

              engineState
              |> LightEngineService.hasLightComponent(directionLight)
              |> expect == true;
            })
          )
        )
      );
    });
  });