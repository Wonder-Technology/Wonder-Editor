open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("init hotKeys job", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareKeyboardEvent = (~sandbox, ()) =>
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
                      {
                        "name": "init_hotkeys"
                      },
                      {
                         "name": "init_transform_gizmos"
                      }
                    ]
                  }
                ]
            |},
            ~loopPipelines=
              {|
                     [
                         {
                             "name": "default",
                             "jobs": [
                                 {
                                     "name": "dispose"
                                 }
                             ]
                         }
                     ]
                 |},
            (),
          ),
        (),
      );

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe(
      "bind document hotKeys event, need add hot-key into SettingTool", () => {
      let _execKeyboardEvent =
          (
            keyboardDomEventName,
            keyCode,
            ~ctrlKey=false,
            ~altKey=false,
            ~shiftKey=false,
            (),
          ) =>
        EventTool.triggerDomEvent(
          keyboardDomEventName,
          EventTool.getDocument(),
          KeyboardEventTool.buildKeyboardDomEvent(
            ~ctrlKey,
            ~altKey,
            ~shiftKey,
            ~keyCode,
            (),
          ),
        );

      let triggerRedoHotKeyEvent = () =>
        _execKeyboardEvent("keydown", 89, ~ctrlKey=true, ()) |> ignore;

      let triggerUndoHotKeyEvent = () =>
        _execKeyboardEvent("keydown", 90, ~ctrlKey=true, ()) |> ignore;

      let triggerCloneHotKeyEvent = () =>
        _execKeyboardEvent("keydown", 68, ~ctrlKey=true, ()) |> ignore;

      let triggerDeleteHotKeyEvent = () =>
        _execKeyboardEvent("keydown", 46, ()) |> ignore;

      let triggerFocusHotKeyEvent = () =>
        _execKeyboardEvent("keydown", 70, ()) |> ignore;

      let triggerTranslationHotKeyEvent = () =>
        _execKeyboardEvent("keydown", 49, ()) |> ignore;

      let triggerRotationHotKeyEvent = () =>
        _execKeyboardEvent("keydown", 50, ()) |> ignore;

      let triggerScaleHotKeyEvent = () =>
        _execKeyboardEvent("keydown", 51, ()) |> ignore;

      beforeEach(() => {
        _prepareKeyboardEvent(~sandbox, ());

        EventTool.buildFakeDocumentSetToWindow();
      });
      afterEach(() => EventTool.restoreHotKeys());

      describe("test bind undo hot-key", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

          MainUtils._handleEngineState
          |> StateLogicService.getAndSetEngineState;
        });

        test("key down ctrl+z, should execute undo operate", () => {
          MainEditorLeftHeaderTool.addEmptyGameObject();

          triggerUndoHotKeyEvent();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });

      describe("test bind clone hot-key", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

          MainUtils._handleEngineState
          |> StateLogicService.getAndSetEngineState;
        });

        test("key down ctrl+d, should execute clone operate", () => {
          EventListenerTool.buildFakeDom()
          |> EventListenerTool.stubGetElementByIdReturnFakeDom;
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();

          triggerCloneHotKeyEvent();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });

      describe("test bind redo hot-key", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

          MainUtils._handleEngineState
          |> StateLogicService.getAndSetEngineState;
        });

        test("key down ctrl+y, should execute redo operate", () => {
          MainEditorLeftHeaderTool.addEmptyGameObject();
          MainEditorLeftHeaderTool.addEmptyGameObject();

          triggerUndoHotKeyEvent();
          triggerUndoHotKeyEvent();
          triggerRedoHotKeyEvent();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });

      describe("test bind delete hot-key", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

          MainUtils._handleEngineState
          |> StateLogicService.getAndSetEngineState;
        });

        describe("key down delete", () => {
          test("if has currentSceneTreeNode, should delete it", () => {
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();

            triggerDeleteHotKeyEvent();

            BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
            |> ReactTestTool.createSnapshotAndMatch;
          });
          test("else if has current asset tree node, should delete it", () => {
            GameObjectTool.clearCurrentSceneTreeNode();
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.buildOneFolderAssetTree();
            MainEditorAssetTreeTool.Select.selectFolderNode(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Folder.TwoLayer.getFirstFolderNodeId(
                  assetTreeData,
                ),
              (),
            );

            triggerDeleteHotKeyEvent();

            BuildComponentTool.buildAssetTree()
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });
      });

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
              },
            );
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

      describe("test bind translation hot-key", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

          MainUtils._handleEngineState
          |> StateLogicService.getAndSetEngineState;
        });

        test(
          "key down 1, should set current transform gizmo type is translation",
          () => {
          StateEditorService.getState()
          |> CurrentTransformGizmoSceneViewEditorService.mark(
               SceneViewType.Scale,
             )
          |> StateEditorService.setState;

          triggerTranslationHotKeyEvent();

          StateEditorService.getState()
          |> CurrentTransformGizmoSceneViewEditorService.getCurrentGizmoType
          |> expect == SceneViewType.Translation;
        });
      });

      describe("test bind rotation hot-key", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

          MainUtils._handleEngineState
          |> StateLogicService.getAndSetEngineState;
        });

        test(
          "key down 2, should set current transform gizmo type is rotation", () => {
          StateEditorService.getState()
          |> CurrentTransformGizmoSceneViewEditorService.mark(
               SceneViewType.Scale,
             )
          |> StateEditorService.setState;

          triggerRotationHotKeyEvent();

          StateEditorService.getState()
          |> CurrentTransformGizmoSceneViewEditorService.getCurrentGizmoType
          |> expect == SceneViewType.Rotation;
        });
      });

      describe("test bind scale hot-key", () => {
        beforeEach(() => {
          MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

          MainUtils._handleEngineState
          |> StateLogicService.getAndSetEngineState;
        });

        test(
          "key down 3, should set current transform gizmo type is scale", () => {
          StateEditorService.getState()
          |> CurrentTransformGizmoSceneViewEditorService.mark(
               SceneViewType.Translation,
             )
          |> StateEditorService.setState;

          triggerScaleHotKeyEvent();

          StateEditorService.getState()
          |> CurrentTransformGizmoSceneViewEditorService.getCurrentGizmoType
          |> expect == SceneViewType.Scale;
        });
      });
    });
  });