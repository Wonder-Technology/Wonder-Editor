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
          TestTool.initMainEditor(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "add two gameObjects to scene",
        () =>
          GameObjectUtils.getChildren(
            MainEditorSceneTool.unsafeGetScene(),
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
              MainEditorCameraTool.getCurrentCameraGameObject(StateEngineService.getState())
              |> Js.Option.isSome
              |> expect == true
          );
          test(
            "set perspective camera's near,far,fovy,aspect",
            () => {
              let engineState = StateEngineService.getState();
              let cameraProjection = MainEditorCameraTool.getCurrentCameraProjection(engineState);
              (
                PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraNear(
                  cameraProjection,
                  engineState
                ),
                PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFar(
                  cameraProjection,
                  engineState
                ),
                PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraAspect(
                  cameraProjection,
                  engineState
                ),
                PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFovy(
                  cameraProjection,
                  engineState
                )
              )
              |> expect == (0.1, 1000., 1.0, 60.)
            }
          );
          test(
            "move camera",
            () => {
              let engineState = StateEngineService.getState();
              let gameObject =
                MainEditorCameraTool.getCurrentCameraGameObject(engineState) |> Js.Option.getExn;
              let transform =
                engineState |> GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject);
              engineState
              |> TransformAPI.getTransformLocalPosition(transform)
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
                  let box = MainEditorSceneTool.getBoxInDefaultScene(engineState);
                  engineState
                  |> GameObjectComponentEngineService.hasBasicMaterialComponent(box)
                  |> expect == true
                }
              );
              test(
                "add meshRenderer component",
                () => {
                  let engineState = StateEngineService.getState();
                  let box = MainEditorSceneTool.getBoxInDefaultScene(engineState);
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
                      let box = MainEditorSceneTool.getBoxInDefaultScene(engineState);
                      engineState
                      |> GameObjectComponentEngineService.hasBoxGeometryComponent(box)
                      |> expect == true
                    }
                  );
                  test(
                    "set config data",
                    () => {
                      open WonderCommonlib;
                      let engineState = StateEngineService.getState();
                      let box = MainEditorSceneTool.getBoxInDefaultScene(engineState);
                      let geometry =
                        engineState
                        |> GameObjectComponentEngineService.getBoxGeometryComponent(box);
                      let configData =
                        engineState |> GeometryEngineService.getConfigData(geometry);
                      (
                        HashMapService.unsafeGet("width", configData),
                        HashMapService.unsafeGet("height", configData),
                        HashMapService.unsafeGet("depth", configData),
                        HashMapService.unsafeGet("widthSegment", configData),
                        HashMapService.unsafeGet("heightSegment", configData),
                        HashMapService.unsafeGet("depthSegment", configData)
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