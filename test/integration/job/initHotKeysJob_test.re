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
            ~initJobs=
              {j|
                [

                    {
                       "name": "init_hotkeys"
                    },
                    {
                       "name": "init_transform_gizmos"
                    }
                ]
            |j},
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

        MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);

        EventTool.buildFakeDocumentSetToWindow();

        MainUtils._handleEngineState |> StateLogicService.getAndSetEngineState;
      });
      afterEach(() => EventTool.restoreHotKeys());

      describe("test bind undo hot-key", () =>
        test("key down ctrl+z, should execute undo operate", () => {
          MainEditorLeftHeaderTool.addEmptyGameObject();

          triggerUndoHotKeyEvent();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );

      describe("test bind clone hot-key", () =>
        test("key down ctrl+d, should execute clone operate", () => {
          triggerCloneHotKeyEvent();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );

      describe("test bind redo hot-key", () =>
        test("key down ctrl+y, should execute redo operate", () => {
          MainEditorLeftHeaderTool.addEmptyGameObject();
          MainEditorLeftHeaderTool.addEmptyGameObject();

          triggerUndoHotKeyEvent();
          triggerUndoHotKeyEvent();
          triggerRedoHotKeyEvent();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );

      describe("test bind delete hot-key", () =>
        test(
          "key down delete,if has currentSceneTreeNode, should delete it", () => {
          MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();

          triggerDeleteHotKeyEvent();

          BuildComponentTool.buildSceneTree(TestTool.buildEmptyAppState())
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );

      describe("test bind focus hot-key", () => {
        let _getDistance = ((editorState, engineState)) =>
          editorState
          |> SceneViewEditorService.unsafeGetEditCamera
          |. GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
               engineState,
             )
          |. ArcballCameraEngineService.unsafeGetArcballCameraControllerDistance(
               engineState,
             )
          |> FloatService.truncateFloatValue(_, 3);

        let _getTarget = ((editorState, engineState)) =>
          editorState
          |> SceneViewEditorService.unsafeGetEditCamera
          |. GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
               engineState,
             )
          |. ArcballCameraEngineService.unsafeGetArcballCameraControllerTarget(
               engineState,
             )
          |> Vector3Service.truncate(3);

        describe(
          {|
          calc currentSceneTreeNode's all children and its self->aabb;
          use aabb's center as arcball camera controller target;
          use aabb's radius * factor as arcball camera controller distance;
          |},
          () => {
            test("test the currentSceneTreeNode is scene gameObject", () => {
              MainEditorSceneTool.unsafeGetScene()
              |> GameObjectTool.setCurrentSceneTreeNode;

              let engineState = StateEngineService.unsafeGetState();

              let engineState =
                MainEditorSceneTool.unsafeGetScene()
                |. GameObjectComponentEngineService.unsafeGetTransformComponent(
                     engineState,
                   )
                |. TransformEngineService.setScale((3., 1., 1.), engineState);
              let firstChild = MainEditorSceneTool.getFirstCube(engineState);
              let secondChild =
                MainEditorSceneTool.getSecondCube(engineState);
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

              triggerFocusHotKeyEvent();

              (
                _getDistance |> StateLogicService.getStateToGetData,
                _getTarget |> StateLogicService.getStateToGetData,
              )
              |> expect == (22.569, ((-1.5), 0., 0.));
            });

            test("test the currentSceneTreeNode is scene children", () => {
              MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode();

              let engineState = StateEngineService.unsafeGetState();

              let firstChild = MainEditorSceneTool.getFirstCube(engineState);
              let secondChild =
                MainEditorSceneTool.getSecondCube(engineState);

              let engineState =
                firstChild
                |. GameObjectComponentEngineService.unsafeGetTransformComponent(
                     engineState,
                   )
                |. TransformEngineService.setScale((3., 1., 1.), engineState);
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

              triggerFocusHotKeyEvent();

              (
                _getDistance |> StateLogicService.getStateToGetData,
                _getTarget |> StateLogicService.getStateToGetData,
              )
              |> expect == (4.146, (2., 0., 0.));
            });
          },
        );

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
          })
        );
      });

      describe("test bind translation hot-key", () =>
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
        })
      );

      describe("test bind rotation hot-key", () =>
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
        })
      );

      describe("test bind scale hot-key", () =>
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
        })
      );
    });
  });