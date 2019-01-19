open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("test init camera controller", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test bind for game view", () => {
      let _setArballCameraControllerGameObjectToCurrentSceneTreeNode = () => {
        let engineState = StateEngineService.unsafeGetState();
        let (engineState, gameObject, _, _) =
          ArcballCameraControllerToolEngine.createGameObject(engineState);
        engineState |> StateEngineService.setState |> ignore;
        GameObjectTool.setCurrentSceneTreeNode(gameObject);
      };

      let _prepare = pointEventName => {
        _setArballCameraControllerGameObjectToCurrentSceneTreeNode();
        PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
        StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);

        let value = ref(0);
        EventTool.onCustomGlobalEvent(
          pointEventName,
          0,
          (. event, state) => {
            value := 1;
            (state, event);
          },
        )
        |> StateLogicService.getAndSetEngineState;

        value;
      };

      describe(
        "if current scene tree node has arcballCameraController component", () => {
        let _prepareMouseEvent = (~sandbox, ()) => {
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
              "name": "init_event_for_editor"
            },
      {
        "name": "init_camera_controller"
      }
          ]
        }
      ]
            |},
                ~initJobs=
                  {j|
    [

        {
              "name": "init_event_for_editor"
        },
      {
        "name": "init_camera_controller"
      }
    ]
            |j},
                (),
              ),
            (),
          );

          MouseEventTool.prepareWithState(
            ~sandbox,
            ~engineState=StateEngineService.unsafeGetState(),
            (),
          );
          MouseEventTool.setPointerLocked(.);
        };

        let _prepareAndExec = (pointEventName, (pageX, pageY), triggerFunc) => {
          let value = _prepare(pointEventName);

          triggerFunc(pageX, pageY);
          /* EventTool.triggerDomEvent(
               "mousedown",
               EventTool.getBody(),
               MouseEventTool.buildMouseEvent(~pageX, ~pageY, ()),
             );
             EventTool.triggerDomEvent(
               "mousemove",
               EventTool.getBody(),
               MouseEventTool.buildMouseEvent(~pageX, ~pageY, ()),
             );
             EventTool.triggerDomEvent(
               "mouseup",
               EventTool.getBody(),
               MouseEventTool.buildMouseEvent(),
             );
             EventTool.restore(); */

          value;
        };

        describe("trigger refresh_inspector event", () => {
          test("test bind point drag event", () => {
            _prepareMouseEvent(~sandbox, ());

            let value =
              _prepareAndExec(
                EventEditorService.getRefreshInspectorEventName(),
                (60, 20),
                (pageX, pageY) => {
                  EventTool.triggerDomEvent(
                    "mousedown",
                    EventTool.getBody(),
                    MouseEventTool.buildMouseEvent(~pageX, ~pageY, ()),
                  );
                  EventTool.triggerDomEvent(
                    "mousemove",
                    EventTool.getBody(),
                    MouseEventTool.buildMouseEvent(~pageX, ~pageY, ()),
                  );
                  EventTool.triggerDomEvent(
                    "mouseup",
                    EventTool.getBody(),
                    MouseEventTool.buildMouseEvent(),
                  );
                  EventTool.restore();
                },
              );

            value^ |> expect == 1;
          });
          test("test bind point scale event", () => {
            _prepareMouseEvent(~sandbox, ());

            let value =
              _prepareAndExec(
                EventEditorService.getRefreshInspectorEventName(),
                (60, 20),
                (pageX, pageY) => {
                  EventTool.triggerDomEvent(
                    "mousedown",
                    EventTool.getBody(),
                    MouseEventTool.buildMouseEvent(~pageX, ~pageY, ()),
                  );
                  EventTool.triggerDomEvent(
                    "mousewheel",
                    EventTool.getBody(),
                    MouseEventTool.buildMouseEvent(),
                  );
                  EventTool.restore();
                },
              );

            value^ |> expect == 1;
          });
        });
      });

      describe("test bind keydown event", () => {
        let _prepareKeyboardEvent = (~sandbox, ()) => {
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
              "name": "init_event_for_editor"
            },
            {
              "name": "init_camera_controller"
            }
          ]
        }
      ]
            |},
                ~initJobs=
                  {j|
    [

        {
              "name": "init_event_for_editor"
        },
            {
              "name": "init_camera_controller"
            }
    ]
            |j},
                (),
              ),
            (),
          );

          let canvasDom =
            EventTool.buildFakeCanvasWithSize(
              0,
              0,
              (0, 0, Js.Nullable.null),
            );

          let engineState =
            ViewToolEngine.setCanvas(
              canvasDom |> Obj.magic,
              StateEngineService.unsafeGetState(),
            )
            |> FakeGlToolEngine.setFakeGl(
                 FakeGlToolEngine.buildFakeGl(~sandbox, ()),
               );

          StateEngineService.setState(engineState) |> ignore;

          BrowserDetectToolEngine.setChrome();
        };

        describe(
          "if current scene tree node has arcballCameraController component",
          () => {
          let _prepareAndExec = (pointEventName, (pageX, pageY)) => {
            let value = _prepare(pointEventName);

            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(~pageX, ~pageY, ()),
            );
            EventTool.triggerDomEvent(
              "keydown",
              EventTool.getKeyboardEventBindedDom(),
              KeyboardEventTool.buildKeyboardEvent(),
            );
            EventTool.restore();

            value;
          };

          test("trigger refresh_inspector event", () => {
            _prepareKeyboardEvent(~sandbox, ());

            let value =
              _prepareAndExec(
                EventEditorService.getRefreshInspectorEventName(),
                (60, 20),
              );

            value^ |> expect == 1;
          });
        });
      });
    });
  });