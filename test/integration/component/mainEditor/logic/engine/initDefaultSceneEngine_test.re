open Wonderjs;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "engine: test init default scene",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox);
          TestToolUI.initMainEditor(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "add two gameObjects to scene",
        () =>
          GameObjectEngineService.getChildren(
            MainEditorSceneToolEngine.unsafeGetScene(),
            StateEngineService.getState()
          )
          |> Js.Array.length
          |> expect == 3
      );
      describe(
        "add camera",
        () => {
          test(
            "add current camera",
            () =>
              MainEditorCameraControllerToolEngine.getCurrentCameraController(
                StateEngineService.getState()
              )
              |> expect == 0
          );
          test(
            "set perspective camera's near,far,fovy,aspect",
            () => {
              let engineState = StateEngineService.getState();
              let cameraController =
                MainEditorCameraControllerToolEngine.getCurrentCameraController(engineState);
              (
                PerspectiveCamera.getPerspectiveCameraNear(cameraController, engineState),
                PerspectiveCamera.getPerspectiveCameraFar(cameraController, engineState),
                PerspectiveCamera.getPerspectiveCameraAspect(cameraController, engineState),
                PerspectiveCamera.getPerspectiveCameraFovy(cameraController, engineState)
              )
              |> expect == (0.1, 1000., 1.0, 60.)
            }
          );
          test(
            "move camera",
            () => {
              let engineState = StateEngineService.getState();
              let cameraController =
                MainEditorCameraControllerToolEngine.getCurrentCameraController(engineState);
              let gameObject =
                engineState |> CameraController.getCameraControllerGameObject(cameraController);
              let transform =
                engineState |> GameObject.getGameObjectTransformComponent(gameObject);
              engineState
              |> Transform.getTransformLocalPosition(transform)
              |> expect == (0., 0., 40.)
            }
          )
        }
      );
      describe(
        "add box",
        () =>
          describe(
            "test components",
            () => {
              test(
                "add material component",
                () => {
                  let engineState = StateEngineService.getState();
                  let box = MainEditorSceneToolEngine.getBoxInDefaultScene(engineState);
                  engineState
                  |> GameObjectComponentEngineService.hasMaterialComponent(box)
                  |> expect == true
                }
              );
              test(
                "add meshRenderer component",
                () => {
                  let engineState = StateEngineService.getState();
                  let box = MainEditorSceneToolEngine.getBoxInDefaultScene(engineState);
                  engineState
                  |> GameObjectComponentEngineService.hasMeshRendererComponent(box)
                  |> expect == true
                }
              );
              describe(
                "test geometry component",
                () => {
                  test(
                    "add geometry component",
                    () => {
                      let engineState = StateEngineService.getState();
                      let box = MainEditorSceneToolEngine.getBoxInDefaultScene(engineState);
                      engineState
                      |> GameObjectComponentEngineService.hasGeometryComponent(box)
                      |> expect == true
                    }
                  );
                  test(
                    "set config data",
                    () => {
                      open WonderCommonlib;
                      let engineState = StateEngineService.getState();
                      let box = MainEditorSceneToolEngine.getBoxInDefaultScene(engineState);
                      let geometry =
                        engineState |> GameObjectComponentEngineService.getGeometryComponent(box);
                      let configData =
                        engineState
                        |> GeometryEngineService.getConfigData(geometry)
                        |> Js.Option.getExn;
                      (
                        HashMapSystem.unsafeGet("width", configData),
                        HashMapSystem.unsafeGet("height", configData),
                        HashMapSystem.unsafeGet("depth", configData),
                        HashMapSystem.unsafeGet("widthSegment", configData),
                        HashMapSystem.unsafeGet("heightSegment", configData),
                        HashMapSystem.unsafeGet("depthSegment", configData)
                      )
                      |> expect == (5., 5., 5., 1., 1., 1.)
                    }
                  )
                }
              )
            }
          )
      )
    }
  );