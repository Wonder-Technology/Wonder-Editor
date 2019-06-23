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

        describe("if is run", () => {
          beforeEach(() => ControllerTool.setIsRun(true));

          test(
            "set the current camera should unbind the other ones' event and bind the current one's event",
            () => {
              let (camera1, camera2) =
                MainEditorInspectorAddComponentTool.buildTwoAddedArcballCameraControllerCamera(
                  sandbox,
                );

              MainEditorSceneTool.setSceneSecondCameraToBeCurrentSceneTreeNode();
              MainEditorCameraViewTool.setCurrentCamera(
                ~cameraView=
                  GameObjectTool.getCurrentSceneTreeNodeBasicCameraView(),
                (),
              );

              ControllerTool.run();

              let engineState = StateEngineService.unsafeGetState();
              (
                engineState
                |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                     camera1,
                   )
                |> ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                     _,
                     engineState,
                   ),
                engineState
                |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                     camera2,
                   )
                |> ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                     _,
                     engineState,
                   ),
              )
              |> expect == (false, true);
            },
          );
        });

        describe("else if is stop", () => {
          beforeEach(() => ControllerTool.setIsRun(false));

          test(
            "set the current camera shouldn't bind the current one's event", () => {
            let (camera1, camera2) =
              MainEditorInspectorAddComponentTool.buildTwoAddedArcballCameraControllerCamera(
                sandbox,
              );

            let engineState = StateEngineService.unsafeGetState();

            (
              engineState
              |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                   camera1,
                 )
              |> ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                   _,
                   engineState,
                 ),
              engineState
              |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                   camera2,
                 )
              |> ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                   _,
                   engineState,
                 ),
            )
            |> expect == (false, false);
          });
        });

        describe("test change current camera when run", () => {
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

            MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();
            MainEditorCameraViewTool.setCurrentCamera(
              ~cameraView=
                GameObjectTool.getCurrentSceneTreeNodeBasicCameraView(),
              (),
            );

            (camera1, camera2);
          };

          beforeEach(() => ControllerTool.run());

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
                |> ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                     _,
                     engineState,
                   ),
                engineState
                |> GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                     camera2,
                   )
                |> ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
                     _,
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
            |> expect
            == Some(
                 engineState
                 |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
                      camera1,
                    ),
               );
          });
        });
      })
    );

    describe("test camera bind flyCameraController event", () =>
      describe("test has two cameras with flyCameraController component", () => {
        beforeEach(() => {
          MainEditorSceneTool.initState(~sandbox, ());

          ControllerTool.stubRequestAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
          ControllerTool.stubCancelAnimationFrame(
            createEmptyStubWithJsObjSandbox(sandbox),
          );
        });

        describe("if is run", () => {
          beforeEach(() => ControllerTool.setIsRun(true));

          test(
            "set the current camera should unbind the other ones' event and bind the current one's event",
            () => {
              let (camera1, camera2) =
                MainEditorInspectorAddComponentTool.buildTwoAddedFlyCameraControllerCamera(
                  sandbox,
                );

              MainEditorSceneTool.setSceneSecondCameraToBeCurrentSceneTreeNode();
              MainEditorCameraViewTool.setCurrentCamera(
                ~cameraView=
                  GameObjectTool.getCurrentSceneTreeNodeBasicCameraView(),
                (),
              );

              let engineState = StateEngineService.unsafeGetState();
              (
                engineState
                |> GameObjectComponentEngineService.unsafeGetFlyCameraControllerComponent(
                     camera1,
                   )
                |> FlyCameraEngineService.isBindFlyCameraControllerEventForGameView(
                     _,
                     engineState,
                   ),
                engineState
                |> GameObjectComponentEngineService.unsafeGetFlyCameraControllerComponent(
                     camera2,
                   )
                |> FlyCameraEngineService.isBindFlyCameraControllerEventForGameView(
                     _,
                     engineState,
                   ),
              )
              |> expect == (false, true);
            },
          );
        });

        describe("else if is stop", () => {
          beforeEach(() => ControllerTool.setIsRun(false));

          test(
            "set the current camera shouldn't bind the current one's event", () => {
            let (camera1, camera2) =
              MainEditorInspectorAddComponentTool.buildTwoAddedFlyCameraControllerCamera(
                sandbox,
              );

            MainEditorSceneTool.setSceneSecondCameraToBeCurrentSceneTreeNode();
            MainEditorCameraViewTool.setCurrentCamera(
              ~cameraView=
                GameObjectTool.getCurrentSceneTreeNodeBasicCameraView(),
              (),
            );

            let engineState = StateEngineService.unsafeGetState();
            engineState
            |> GameObjectComponentEngineService.unsafeGetFlyCameraControllerComponent(
                 camera2,
               )
            |> FlyCameraEngineService.isBindFlyCameraControllerEventForGameView(
                 _,
                 engineState,
               )
            |> expect == false;
          });
        });

        describe("test change current camera when run", () => {
          let _prepareAndExec = () => {
            let (camera1, camera2) =
              MainEditorInspectorAddComponentTool.buildTwoAddedFlyCameraControllerCamera(
                sandbox,
              );
            GameObjectComponentEngineService.unsafeGetFlyCameraControllerComponent(
              camera2,
              StateEngineService.unsafeGetState(),
            )
            |> FlyCameraEngineService.bindFlyCameraControllerEventForGameView(
                 _,
                 StateEngineService.unsafeGetState(),
               )
            |> StateEngineService.setState
            |> ignore;

            MainEditorSceneTool.setSceneFirstCameraToBeCurrentSceneTreeNode();
            MainEditorCameraViewTool.setCurrentCamera(
              ~cameraView=
                GameObjectTool.getCurrentSceneTreeNodeBasicCameraView(),
              (),
            );

            (camera1, camera2);
          };

          beforeEach(() => ControllerTool.run());

          test(
            "the target camera should bind event, and the source camera shouldn't bind event",
            () => {
              let (camera1, camera2) = _prepareAndExec();

              let engineState = StateEngineService.unsafeGetState();
              (
                engineState
                |> GameObjectComponentEngineService.unsafeGetFlyCameraControllerComponent(
                     camera1,
                   )
                |> FlyCameraEngineService.isBindFlyCameraControllerEventForGameView(
                     _,
                     engineState,
                   ),
                engineState
                |> GameObjectComponentEngineService.unsafeGetFlyCameraControllerComponent(
                     camera2,
                   )
                |> FlyCameraEngineService.isBindFlyCameraControllerEventForGameView(
                     _,
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
            |> expect
            == Some(
                 engineState
                 |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
                      camera1,
                    ),
               );
          });
        });
      })
    );
  });