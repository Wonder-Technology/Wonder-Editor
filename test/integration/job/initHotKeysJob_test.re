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

    describe("bind document hotKeys event", () => {
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
          KeyboardEventTool.buildKeyboardEvent(
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

      describe("test bind focus hot-key", () =>
        describe(
          {|
          calc currentSceneTreeNode's all children and its self->aabb;
          use aabb's center as arcball camera controller target;
          use aabb's radius * max scale of target gameObject * factor as arcball camera controller distance;
          |},
          () => {
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
              |> expect == (67.708, ((-1.5), 0., 0.));
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
              |> expect == (12.437, (2., 0., 0.));
            });
          },
        )
      );
    });
  });