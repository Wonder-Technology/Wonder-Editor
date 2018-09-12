open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller cameraView", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test camera bind arcballCameraController event", () =>
      describe(
        "test has two cameras with arcballCameraController component", () => {
        beforeEach(() => {
          MainEditorSceneTool.initState(~sandbox, ());

          ControllerTool.stubRequestAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
          ControllerTool.stubCancelAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
        });
        test(
          "test click run, the current camera arcballCameraController should bind event, the other camera shouldn't bind event",
          () => {
            let (camera1, camera2) =
              AddableComponentTool.getTwoAddedArcballCameraControllerCamera(
                sandbox,
              );

            ControllerTool.run();

            let engineState = StateEngineService.unsafeGetState();

            (
              engineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera1,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                   engineState,
                 ),
              engineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera2,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                   engineState,
                 ),
            )
            |> expect == (false, true);
          },
        );
        test(
          "test click stop, the two camera arcballCameraController shouldn't bind event",
          () => {
          let (camera1, camera2) =
            AddableComponentTool.getTwoAddedArcballCameraControllerCamera(
              sandbox,
            );

          ControllerTool.run();
          ControllerTool.stop();

          let engineState = StateEngineService.unsafeGetState();

          (
            engineState
            |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                 camera1,
               )
            |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                 engineState,
               ),
            engineState
            |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                 camera2,
               )
            |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                 engineState,
               ),
          )
          |> expect == (false, false);
        });

        test(
          "test click run, then change current camera,the target camera should bind event, and the source camera shouldn't bind event",
          () => {
            let (camera1, camera2) =
              AddableComponentTool.getTwoAddedArcballCameraControllerCamera(
                sandbox,
              );

            ControllerTool.run();

            let engineState = StateEngineService.unsafeGetState();

            SceneTreeNodeDomTool.OperateTwoCamera.getFirstCameraDomIndex()
            |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

            MainEditorCameraViewTool.triggerClickSetCurrentCameraEvent();

            (
              engineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera1,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                   engineState,
                 ),
              engineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera2,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                   engineState,
                 ),
            )
            |> expect == (true, false);
          },
        );
      })
    );
  });