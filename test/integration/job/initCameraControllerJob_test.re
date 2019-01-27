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

      let _prepare = () => {
        _setArballCameraControllerGameObjectToCurrentSceneTreeNode();
        PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
        StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);
        /* let value = ref(0);
           EventTool.onCustomGlobalEvent(
             pointEventName,
             0,
             (. event, state) => {
               value := 1;
               (state, event);
             },
           )
           |> StateLogicService.getAndSetEngineState;

           value; */
      };

      let _judgeRefreshInspector = dispatchFuncStub =>
        dispatchFuncStub
        |> expect
        |> toCalledWith([|
             AppStore.UpdateAction(Update([|UpdateStore.Inspector|])),
           |]);

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

        let _prepareAndExec = ((pageX, pageY), triggerFunc) => {
          /* let value = _prepare(pointEventName); */

          _prepare();

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
          /* value; */
        };

        describe("trigger refresh_inspector event", () => {
          test("test bind point drag event", () => {
            let dispatchFuncStub = ReactTool.createDispatchFuncStub(sandbox);
            _prepareMouseEvent(~sandbox, ());

            _prepareAndExec(
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

            _judgeRefreshInspector(dispatchFuncStub);
          });
          test("test bind point scale event", () => {
            let dispatchFuncStub = ReactTool.createDispatchFuncStub(sandbox);
            _prepareMouseEvent(~sandbox, ());

            _prepareAndExec(
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

            _judgeRefreshInspector(dispatchFuncStub);
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
          let _prepareAndExec = ((pageX, pageY)) => {
            _prepare();

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
          };

          test("trigger refresh_inspector event", () => {
            let dispatchFuncStub = ReactTool.createDispatchFuncStub(sandbox);
            _prepareKeyboardEvent(~sandbox, ());

            _prepareAndExec((60, 20));

            _judgeRefreshInspector(dispatchFuncStub);
          });
        });
      });
    });
  });