open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller cameraView", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test camera bind arcballCameraControllerEvent", () =>
      describe(
        "test has two cameras, and those have arcballCameraController", () => {
        beforeEach(() => {
          MainEditorSceneTool.initState(~sandbox, ());

          CurrentSelectSourceEditorService.setCurrentSelectSource(
            EditorType.SceneTree,
          )
          |> StateLogicService.getAndSetEditorState;

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
              AddableComponentTool.getTwoAddedArcballCameraControllerCamera(sandbox);

            ControllerTool.run();

            let runEngineState = StateLogicService.getRunEngineState();

            (
              runEngineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera1,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                   runEngineState,
                 ),
              runEngineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera2,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                   runEngineState,
                 ),
            )
            |> expect == (false, true);
          },
        );
        test(
          "test click stop, the two camera arcballCameraController shouldn't bind event",
          () => {
            let (camera1, camera2) =
              AddableComponentTool.getTwoAddedArcballCameraControllerCamera(sandbox);

            ControllerTool.run();
            ControllerTool.stop();

            let runEngineState = StateLogicService.getRunEngineState();

            (
              runEngineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera1,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                   runEngineState,
                 ),
              runEngineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera2,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                   runEngineState,
                 ),
            )
            |> expect == (false, false);
          },
        );

        test(
          "test click run, then change current camera,the target camera should bind event, and the original camera shouldn't bind event",
          () => {
            let (camera1, camera2) =
              AddableComponentTool.getTwoAddedArcballCameraControllerCamera(sandbox);

            ControllerTool.run();

            let runEngineState = StateLogicService.getRunEngineState();

            SceneTreeNodeDomTool.OperateTwoCamera.getFirstCameraDomIndex()
            |> SceneTreeTool.clearCurrentGameObjectAndSetTreeSpecificGameObject;

            MainEditorCameraViewTool.triggerClickSetCurrentCameraEvent();

            (
              runEngineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera1,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                   runEngineState,
                 ),
              runEngineState
              |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
                   camera2,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEvent(
                   runEngineState,
                 ),
            )
            |> expect == (true, false);
          },
        );
      })
    );
  });