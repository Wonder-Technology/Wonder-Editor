open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("test focus in scene view", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe(
      "bind document hotKeys event, need add hot-key into SettingTool", () => {
      let triggerFocusHotKeyEvent = () =>
        InitHotKeysJobTool.execKeyboardEvent("keydown", 70, ()) |> ignore;

      beforeEach(() => {
        InitHotKeysJobTool.prepareKeyboardEvent(~sandbox, ());

        EventTool.buildFakeDocumentSetToWindow();
      });
      afterEach(() => EventTool.restoreHotKeys());

      describe("test bind focus hot-key", () => {
        let _prepareSceneGameObject =
            (setCurrentGameObjectFunc, targetGameObject, engineState) => {
          setCurrentGameObjectFunc();

          let engineState =
            engineState
            |> GameObjectComponentEngineService.unsafeGetTransformComponent(
                 targetGameObject,
               )
            |> TransformEngineService.setScale(_, (3., 1., 1.), engineState);
          let firstChild = MainEditorSceneTool.getFirstCube(engineState);
          let secondChild = MainEditorSceneTool.getSecondCube(engineState);
          let engineState =
            engineState
            |> TransformGameObjectEngineService.setLocalPosition(
                 firstChild,
                 (2., 0., 0.),
               )
            |> TransformGameObjectEngineService.setLocalPosition(
                 secondChild,
                 ((-3.), 0., 0.),
               );
          engineState |> StateEngineService.setState |> ignore;
        };

        describe("limit distance to 0.2 at min", () => {
          let _unsafeGetEditCameraFlyCameraController =
              ((editorState, engineState)) =>
            (editorState |> SceneViewEditorService.unsafeGetEditCamera)
            ->(
                GameObjectComponentEngineService.unsafeGetFlyCameraControllerComponent(
                  engineState,
                )
              );

          beforeEach(() => {
            MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

            MainUtils._handleEngineState
            |> StateLogicService.getAndSetEngineState;
          });

          test("test", () => {
            let engineState = StateEngineService.unsafeGetState();
            MainEditorSceneTool.getFirstCube(engineState)
            |> GameObjectTool.setCurrentSceneTreeNode;
            let firstChild = MainEditorSceneTool.getFirstCube(engineState);
            let engineState =
              engineState
              |> TransformGameObjectEngineService.setLocalScale(
                   firstChild,
                   (0.001, 0.001, 0.001),
                 );
            engineState |> StateEngineService.setState |> ignore;

            triggerFocusHotKeyEvent();

            let cameraController =
              _unsafeGetEditCameraFlyCameraController
              |> StateLogicService.getStateToGetData;
            FlyCameraEngineService.unsafeGetFlyCameraControllerMoveSpeed(
              cameraController,
            )
            |> StateLogicService.getEngineStateToGetData
            |> FloatTool.truncateFloatValue
            |> expect == 0.002;
          });
        });

        describe("test editCamera has flyCameraController", () => {
          beforeEach(() => {
            MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

            MainUtils._handleEngineState
            |> StateLogicService.getAndSetEngineState;
          });

          describe(
            "calc currentSceneTreeNode's all children and its self->aabb", () => {
            let _getEditCameraTransformPosition =
                ((editorState, engineState)) =>
              editorState
              |> SceneViewEditorService.unsafeGetEditCamera
              |> GameObjectComponentEngineService.unsafeGetTransformComponent(
                   _,
                   engineState,
                 )
              |> TransformEngineService.getLocalPosition(_, engineState);

            describe(
              {|
              use aabb's center and radius calc flyCamera transform position
            |},
              () => {
                let _getEditCameraTransformLocalEulerAngles =
                    ((editorState, engineState)) =>
                  editorState
                  |> SceneViewEditorService.unsafeGetEditCamera
                  |> GameObjectComponentEngineService.unsafeGetTransformComponent(
                       _,
                       engineState,
                     )
                  |> TransformEngineService.getLocalEulerAngles(
                       _,
                       engineState,
                     );

                test("test the currentSceneTreeNode is scene gameObject", () => {
                  let engineState = StateEngineService.unsafeGetState();

                  _prepareSceneGameObject(
                    () =>
                      MainEditorSceneTool.unsafeGetScene()
                      |> GameObjectTool.setCurrentSceneTreeNode,
                    MainEditorSceneTool.unsafeGetScene(),
                    engineState,
                  );

                  triggerFocusHotKeyEvent();

                  _getEditCameraTransformPosition
                  |> StateLogicService.getStateToGetData
                  |> Vector3Service.truncate(2)
                  |> expect == ((-1.5), 0., 22.57);
                });
                test("test the currentSceneTreeNode is scene children", () => {
                  let engineState = StateEngineService.unsafeGetState();

                  _prepareSceneGameObject(
                    () =>
                      MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode(),
                    MainEditorSceneTool.getFirstCube(engineState),
                    engineState,
                  );

                  triggerFocusHotKeyEvent();

                  _getEditCameraTransformPosition
                  |> StateLogicService.getStateToGetData
                  |> Vector3Service.truncate(2)
                  |> expect == (2., 0., 4.15);
                });
                test("test editCamera transform rotation shouldn't change", () => {
                  let engineState = StateEngineService.unsafeGetState();

                  _prepareSceneGameObject(
                    () =>
                      MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode(),
                    MainEditorSceneTool.getFirstCube(engineState),
                    engineState,
                  );

                  let oldLocalEulerAngles =
                    _getEditCameraTransformLocalEulerAngles
                    |> StateLogicService.getStateToGetData
                    |> Vector3Service.truncate(2);

                  triggerFocusHotKeyEvent();

                  _getEditCameraTransformLocalEulerAngles
                  |> StateLogicService.getStateToGetData
                  |> Vector3Service.truncate(2)
                  |> expect == oldLocalEulerAngles;
                });
              },
            );
          });

          describe("set speed", () => {
            let _unsafeGetEditCameraFlyCameraController =
                ((editorState, engineState)) =>
              (editorState |> SceneViewEditorService.unsafeGetEditCamera)
              ->(
                  GameObjectComponentEngineService.unsafeGetFlyCameraControllerComponent(
                    engineState,
                  )
                );

            test("set edit camera->fly move speed", () => {
              let engineState = StateEngineService.unsafeGetState();

              _prepareSceneGameObject(
                () =>
                  MainEditorSceneTool.unsafeGetScene()
                  |> GameObjectTool.setCurrentSceneTreeNode,
                MainEditorSceneTool.unsafeGetScene(),
                engineState,
              );

              triggerFocusHotKeyEvent();

              let cameraController =
                _unsafeGetEditCameraFlyCameraController
                |> StateLogicService.getStateToGetData;
              FlyCameraEngineService.unsafeGetFlyCameraControllerMoveSpeed(
                cameraController,
              )
              |> StateLogicService.getEngineStateToGetData
              |> FloatTool.truncateFloatValue
              |> expect == 0.226;
            });
            test("set edit camera->fly wheel speed", () => {
              let engineState = StateEngineService.unsafeGetState();

              _prepareSceneGameObject(
                () =>
                  MainEditorSceneTool.unsafeGetScene()
                  |> GameObjectTool.setCurrentSceneTreeNode,
                MainEditorSceneTool.unsafeGetScene(),
                engineState,
              );

              triggerFocusHotKeyEvent();

              FlyCameraEngineService.unsafeGetFlyCameraControllerWheelSpeed(
                _unsafeGetEditCameraFlyCameraController
                |> StateLogicService.getStateToGetData,
              )
              |> StateLogicService.getEngineStateToGetData
              |> FloatTool.truncateFloatValue
              |> expect == 0.451;
            });
          });
        });

        describe("test editCamera has arcballCameraController", () => {
          let _unsafeGetEditCameraArcballCameraController =
              ((editorState, engineState)) =>
            (editorState |> SceneViewEditorService.unsafeGetEditCamera)
            ->(
                GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
                  engineState,
                )
              );

          let _getDistance = ((editorState, engineState)) =>
            _unsafeGetEditCameraArcballCameraController((
              editorState,
              engineState,
            ))
            ->(
                ArcballCameraEngineService.unsafeGetArcballCameraControllerDistance(
                  engineState,
                )
              )
            |> FloatService.truncateFloatValue(_, 3);

          let _getTarget = ((editorState, engineState)) =>
            _unsafeGetEditCameraArcballCameraController((
              editorState,
              engineState,
            ))
            ->(
                ArcballCameraEngineService.unsafeGetArcballCameraControllerTarget(
                  engineState,
                )
              )
            |> Vector3Service.truncate(3);

          beforeEach(() => {
            MainEditorSceneTool.createDefaultSceneWithArcballCamera(sandbox);
            MainUtils._handleEngineState
            |> StateLogicService.getAndSetEngineState;
          });

          describe(
            "calc currentSceneTreeNode's all children and its self->aabb", () => {
            describe(
              {|
              use aabb's center as arcball camera controller target;
              use aabb's radius * factor as arcball camera controller distance;
            |},
              () => {
                test("test the currentSceneTreeNode is scene gameObject", () => {
                  let engineState = StateEngineService.unsafeGetState();

                  _prepareSceneGameObject(
                    () =>
                      MainEditorSceneTool.unsafeGetScene()
                      |> GameObjectTool.setCurrentSceneTreeNode,
                    MainEditorSceneTool.unsafeGetScene(),
                    engineState,
                  );

                  triggerFocusHotKeyEvent();

                  (
                    _getDistance |> StateLogicService.getStateToGetData,
                    _getTarget |> StateLogicService.getStateToGetData,
                  )
                  |> expect == (22.569, ((-1.5), 0., 0.));
                });

                test("test the currentSceneTreeNode is scene children", () => {
                  let engineState = StateEngineService.unsafeGetState();

                  _prepareSceneGameObject(
                    () =>
                      MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode(),
                    MainEditorSceneTool.getFirstCube(engineState),
                    engineState,
                  );

                  triggerFocusHotKeyEvent();

                  (
                    _getDistance |> StateLogicService.getStateToGetData,
                    _getTarget |> StateLogicService.getStateToGetData,
                  )
                  |> expect == (4.146, (2., 0., 0.));
                });
              },
            );

            test("set edit camera->arcball move speed", () => {
              let engineState = StateEngineService.unsafeGetState();

              _prepareSceneGameObject(
                () =>
                  MainEditorSceneTool.unsafeGetScene()
                  |> GameObjectTool.setCurrentSceneTreeNode,
                MainEditorSceneTool.unsafeGetScene(),
                engineState,
              );

              triggerFocusHotKeyEvent();

              let cameraController =
                _unsafeGetEditCameraArcballCameraController
                |> StateLogicService.getStateToGetData;
              (
                ArcballCameraEngineService.unsafeGetArcballCameraControllerMoveSpeedX(
                  cameraController,
                )
                |> StateLogicService.getEngineStateToGetData
                |> FloatTool.truncateFloatValue,
                ArcballCameraEngineService.unsafeGetArcballCameraControllerMoveSpeedY(
                  cameraController,
                )
                |> StateLogicService.getEngineStateToGetData
                |> FloatTool.truncateFloatValue,
              )
              |> expect == (0.226, 0.226);
            });
            test("set edit camera->arcball wheel speed", () => {
              let engineState = StateEngineService.unsafeGetState();

              _prepareSceneGameObject(
                () =>
                  MainEditorSceneTool.unsafeGetScene()
                  |> GameObjectTool.setCurrentSceneTreeNode,
                MainEditorSceneTool.unsafeGetScene(),
                engineState,
              );

              triggerFocusHotKeyEvent();

              ArcballCameraEngineService.unsafeGetArcballCameraControllerWheelSpeed(
                _unsafeGetEditCameraArcballCameraController
                |> StateLogicService.getStateToGetData,
              )
              |> StateLogicService.getEngineStateToGetData
              |> FloatTool.truncateFloatValue
              |> expect == 0.451;
            });
          });

          describe("fix bug", () =>
            describe(
              "if currentSceneTreeNode and its all children has no geometry component",
              () => {
              let _prepareAndExec = () => {
                GameObjectTool.setCurrentSceneTreeNode(
                  MainEditorSceneTool.getCameraInDefaultScene
                  |> StateLogicService.getEngineStateToGetData,
                );

                let engineState = StateEngineService.unsafeGetState();

                let camera =
                  MainEditorSceneTool.getCameraInDefaultScene(engineState);

                let pos = (2., 0., 0.);
                let engineState =
                  engineState
                  |> TransformGameObjectEngineService.setLocalPosition(
                       camera,
                       pos,
                     );
                engineState |> StateEngineService.setState |> ignore;

                triggerFocusHotKeyEvent();

                pos;
              };

              test("use currentSceneTreeNode->position as target", () => {
                let pos = _prepareAndExec();

                _getTarget
                |> StateLogicService.getStateToGetData
                |> expect == pos;
              });

              test("use fixed value as distance", () => {
                let _ = _prepareAndExec();

                _getDistance
                |> StateLogicService.getStateToGetData
                |> expect == 3.;
              });
              test("set wheel speed to 0.5", () => {
                let _ = _prepareAndExec();

                ArcballCameraEngineService.unsafeGetArcballCameraControllerWheelSpeed(
                  _unsafeGetEditCameraArcballCameraController
                  |> StateLogicService.getStateToGetData,
                )
                |> StateLogicService.getEngineStateToGetData
                |> FloatTool.truncateFloatValue
                |> expect == 0.5;
              });
            })
          );
        });
      });
    });
  });
