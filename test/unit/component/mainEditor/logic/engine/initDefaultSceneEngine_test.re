open Wonderjs;

open Wonder_jest;

let _ =
  describe(
    "engine: test init default scene ",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "add camera",
        () => {
          test(
            "add current camera",
            () => {
              let (_, engineState) = MainEditorViewTool.init(sandbox);
              MainEditorCameraControllerToolEngine.getCurrentCameraController(engineState)
              |> expect == 0
            }
          );
          test(
            "set perspective camera's near,far,fovy,aspect",
            () => {
              let (_, engineState) = MainEditorViewTool.init(sandbox);
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
              let (_, engineState) = MainEditorViewTool.init(sandbox);
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
      /* describe
      ("add box",
      (
      () => {
      
      })
      ); */
    }
  );