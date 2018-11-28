open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("controller inspector cameraView", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      ControllerTool.setIsRun(false);
    });
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
              MainEditorInspectorAddComponentTool.buildTwoAddedArcballCameraControllerCamera(
                sandbox,
              );

            MainEditorSceneTool.setSceneSecondCameraToBeCurrentSceneTreeNode();
            MainEditorCameraViewTool.setCurrentCamera(
              ~cameraView=GameObjectTool.getCurrentGameObjectBasicCameraView(),
              (),
            );

            ControllerTool.run();

            let engineState = StateEngineService.unsafeGetState();
            (
              engineState
              |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                   camera1,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                   engineState,
                 ),
              engineState
              |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                   camera2,
                 )
              |. ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
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
            MainEditorInspectorAddComponentTool.buildTwoAddedArcballCameraControllerCamera(
              sandbox,
            );

          ControllerTool.run();
          ControllerTool.stop();

          let engineState = StateEngineService.unsafeGetState();

          (
            engineState
            |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                 camera1,
               )
            |. ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                 engineState,
               ),
            engineState
            |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                 camera2,
               )
            |. ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                 engineState,
               ),
          )
          |> expect == (false, false);
        });

        describe("test click run and change current camera", () => {
          let _prepareAndExec = () => {
            let (camera1, camera2) =
              MainEditorInspectorAddComponentTool.buildTwoAddedArcballCameraControllerCamera(
                sandbox,
              );
            GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
              camera2,
              StateEngineService.unsafeGetState(),
            )
            |> ArcballCameraEngineService.bindArcballCameraControllerEventForGameView(
                 _,
                 StateEngineService.unsafeGetState(),
               )
            |> StateEngineService.setState
            |> ignore;

            ControllerTool.run();
            MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();
            MainEditorCameraViewTool.setCurrentCamera(
              ~cameraView=GameObjectTool.getCurrentGameObjectBasicCameraView(),
              (),
            );

            (camera1, camera2);
          };

          test(
            "the target camera should bind event, and the source camera shouldn't bind event",
            () => {
              let (camera1, camera2) = _prepareAndExec();

              let engineState = StateEngineService.unsafeGetState();
              (
                engineState
                |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                     camera1,
                   )
                |. ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                     engineState,
                   ),
                engineState
                |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                     camera2,
                   )
                |. ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                     engineState,
                   ),
              )
              |> expect == (true, false);
            },
          );
          test("active source camera->basicCameraView", () => {
            let (camera1, camera2) = _prepareAndExec();

            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();
            GameViewEditorService.getActivedBasicCameraView(editorState)
            |>
            expect == Some(
                        engineState
                        |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                             camera1,
                           ),
                      );
          });
        });
      })
    );
  });