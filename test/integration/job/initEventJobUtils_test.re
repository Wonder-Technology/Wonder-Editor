open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("init event job", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareMouseEvent =
        (
          ~sandbox,
          ~offsetLeft=1,
          ~offsetTop=2,
          ~offsetParent=Js.Nullable.undefined,
          (),
        ) => {
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
              "name": "init_camera"
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
              "name": "init_camera"
            }
    ]
            |j},
            (),
          ),
        (),
      );

      MouseEventTool.prepareWithState(
        ~sandbox,
        ~offsetLeft,
        ~offsetTop,
        ~offsetParent,
        ~engineState=StateEngineService.unsafeGetState(),
        (),
      );
      MouseEventTool.setPointerLocked(.);
    };

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
              "name": "init_camera"
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
              "name": "init_camera"
            }
    ]
            |j},
            (),
          ),
        (),
      );

      let canvasDom = EventTool.buildFakeCanvas((0, 0, Js.Nullable.null));

      let engineState =
        ViewToolEngine.setCanvas(
          canvasDom |> Obj.magic,
          StateEngineService.unsafeGetState(),
        );

      StateEngineService.setState(engineState) |> ignore;

      BrowserDetectToolEngine.setChrome();
    };

    let _getCanvas = () =>
      ViewEngineService.unsafeGetCanvas
      |> StateLogicService.getEngineStateToGetData;

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("bind dom event", () => {
      describe("bind mouse event", () => {
        describe("bind contextmenu event", () =>
          test("preventDefault", () => {
            _prepareMouseEvent(~sandbox, ());
            StateLogicService.getAndSetEngineState(
              MainUtils.handleEngineState,
            );

            let preventDefaultFunc = createEmptyStubWithJsObjSandbox(sandbox);
            let stopPropagationFunc =
              createEmptyStubWithJsObjSandbox(sandbox);

            EventTool.triggerDomEvent(
              "contextmenu",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(
                ~preventDefaultFunc,
                ~stopPropagationFunc,
                (),
              ),
            );
            EventTool.restore();

            (
              preventDefaultFunc |> getCallCount,
              stopPropagationFunc |> getCallCount,
            )
            |> expect == (1, 1);
          })
        );

        describe("bind click event", () => {
          let _test =
              ((pageX, pageY), (locationInViewX, locationInViewY), state) => {
            PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
            StateLogicService.getAndSetEngineState(
              MainUtils.handleEngineState,
            );

            let (valueX, valueY) = (ref(0), ref(0));

            EventTool.onMouseEvent(
              Click,
              0,
              (. event: mouseEvent, state) => {
                let (x, y) = event.locationInView;
                valueX := x;
                valueY := y;
                state;
              },
            )
            |> StateLogicService.getAndSetEngineState;

            EventTool.triggerDomEvent(
              "click",
              _getCanvas(),
              MouseEventTool.buildMouseEvent(~pageX, ~pageY, ()),
            );
            EventTool.restore();

            (valueX^, valueY^)
            |> expect == (locationInViewX, locationInViewY);
          };

          describe("test trigger in scene view", () =>
            describe("test locationInView", () => {
              test("test view has no offsetParent", () => {
                let state =
                  _prepareMouseEvent(
                    ~sandbox,
                    ~offsetLeft=1,
                    ~offsetTop=2,
                    (),
                  );

                _test((10, 20), (10 - 1, 20 - 2), state);
              });
              test("test view has offsetParent", () => {
                let state =
                  _prepareMouseEvent(
                    ~sandbox,
                    ~offsetLeft=1,
                    ~offsetTop=2,
                    ~offsetParent=
                      Js.Nullable.return({
                        "offsetLeft": 11,
                        "offsetTop": 12,
                        "offsetParent": Js.Nullable.undefined,
                      }),
                    (),
                  );
                _test((10, 20), (10 - 1 - 11, 20 - 2 - 12), state);
              });
            })
          );

          describe("test trigger in game view", () =>
            describe("test locationInView", () => {
              test("test view has no offsetParent", () => {
                let state =
                  _prepareMouseEvent(
                    ~sandbox,
                    ~offsetLeft=1,
                    ~offsetTop=2,
                    (),
                  );
                _test((60, 20), (10 - 1, 20 - 2), state);
              });
              test("test view has offsetParent", () => {
                let state =
                  _prepareMouseEvent(
                    ~sandbox,
                    ~offsetLeft=1,
                    ~offsetTop=2,
                    ~offsetParent=
                      Js.Nullable.return({
                        "offsetLeft": 11,
                        "offsetTop": 12,
                        "offsetParent": Js.Nullable.undefined,
                      }),
                    (),
                  );
                _test((70, 20), (70 - 50 - 1 - 11, 20 - 2 - 12), state);
              });
            })
          );
        });

        describe("bind mousemove event", () => {
          let _test =
              (
                (clickPageX, clickPageY),
                (movePageX, movePageY),
                (locationInViewX, locationInViewY),
                state,
              ) => {
            PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
            StateLogicService.getAndSetEngineState(
              MainUtils.handleEngineState,
            );

            let (valueX, valueY) = (ref(0), ref(0));

            EventTool.onMouseEvent(
              MouseMove,
              0,
              (. event: mouseEvent, state) => {
                let (x, y) = event.locationInView;
                valueX := x;
                valueY := y;
                state;
              },
            )
            |> StateLogicService.getAndSetEngineState;

            EventTool.triggerDomEvent(
              "click",
              _getCanvas(),
              MouseEventTool.buildMouseEvent(
                ~pageX=clickPageX,
                ~pageY=clickPageY,
                (),
              ),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              _getCanvas(),
              MouseEventTool.buildMouseEvent(
                ~pageX=movePageX,
                ~pageY=movePageY,
                (),
              ),
            );
            EventTool.restore();

            (valueX^, valueY^)
            |> expect == (locationInViewX, locationInViewY);
          };

          describe("test eventTarget is scene view", () =>
            describe("test locationInView", () =>
              describe("test view has no offsetParent", () => {
                test("test trigger in scene view", () => {
                  let state =
                    _prepareMouseEvent(
                      ~sandbox,
                      ~offsetLeft=1,
                      ~offsetTop=2,
                      (),
                    );

                  _test((10, 20), (20, 30), (20 - 1, 30 - 2), state);
                });
                test("test trigger in game view", () => {
                  let state =
                    _prepareMouseEvent(
                      ~sandbox,
                      ~offsetLeft=1,
                      ~offsetTop=2,
                      (),
                    );
                  _test((10, 20), (60, 30), (60 - 1, 30 - 2), state);
                });
              })
            )
          );

          describe("test eventTarget is game view", () =>
            describe("test locationInView", () =>
              describe("test view has no offsetParent", () => {
                test("test trigger in scene view", () => {
                  let state =
                    _prepareMouseEvent(
                      ~sandbox,
                      ~offsetLeft=1,
                      ~offsetTop=2,
                      (),
                    );
                  _test((60, 20), (20, 30), (20 - 50 - 1, 30 - 2), state);
                });
                test("test trigger in game view", () => {
                  let state =
                    _prepareMouseEvent(
                      ~sandbox,
                      ~offsetLeft=1,
                      ~offsetTop=2,
                      (),
                    );
                  _test((60, 20), (60, 30), (60 - 50 - 1, 30 - 2), state);
                });
              })
            )
          );
        });

        describe("bind mousedrag event", () => {
          let _test =
              (
                (clickPageX, clickPageY),
                (movePageX, movePageY),
                (locationInViewX, locationInViewY),
                state,
              ) => {
            PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
            StateLogicService.getAndSetEngineState(
              MainUtils.handleEngineState,
            );

            let (valueX, valueY) = (ref(0), ref(0));

            EventTool.onMouseEvent(
              MouseMove,
              0,
              (. event: mouseEvent, state) => {
                let (x, y) = event.locationInView;
                valueX := x;
                valueY := y;
                state;
              },
            )
            |> StateLogicService.getAndSetEngineState;

            EventTool.triggerDomEvent(
              "click",
              _getCanvas(),
              MouseEventTool.buildMouseEvent(
                ~pageX=clickPageX,
                ~pageY=clickPageY,
                (),
              ),
            );
            EventTool.triggerDomEvent(
              "mousedown",
              ViewEngineService.unsafeGetCanvas
              |> StateLogicService.getEngineStateToGetData,
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              _getCanvas(),
              MouseEventTool.buildMouseEvent(
                ~pageX=movePageX,
                ~pageY=movePageY,
                (),
              ),
            );
            EventTool.triggerDomEvent(
              "mouseup",
              ViewEngineService.unsafeGetCanvas
              |> StateLogicService.getEngineStateToGetData,
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.restore();

            (valueX^, valueY^)
            |> expect == (locationInViewX, locationInViewY);
          };

          describe("test eventTarget is game view", () =>
            describe("test locationInView", () =>
              describe("test view has no offsetParent", () =>
                test("test trigger in scene view", () => {
                  let state =
                    _prepareMouseEvent(
                      ~sandbox,
                      ~offsetLeft=1,
                      ~offsetTop=2,
                      (),
                    );

                  _test((60, 20), (20, 30), (20 - 50 - 1, 30 - 2), state);
                })
              )
            )
          );
        });
      });

      describe("bind keyboard event", () =>
        describe("bind keyup event", () => {
          let _test =
              (
                keyboardEventName,
                keyboardDomEventName,
                (clickPageX, clickPageY),
                state,
              ) => {
            PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
            StateLogicService.getAndSetEngineState(
              MainUtils.handleEngineState,
            );

            let value = ref(0);

            EventTool.onKeyboardEvent(
              keyboardEventName,
              0,
              (. event, state) => {
                value := 1;
                state;
              },
            )
            |> StateLogicService.getAndSetEngineState;

            EventTool.triggerDomEvent(
              "click",
              _getCanvas(),
              MouseEventTool.buildMouseEvent(
                ~pageX=clickPageX,
                ~pageY=clickPageY,
                (),
              ),
            );
            EventTool.triggerDomEvent(
              {j|$keyboardDomEventName|j},
              EventTool.getKeyboardEventBindedDom(),
              KeyboardEventTool.buildKeyboardEvent(),
            );
            EventTool.restore();

            value^ |> expect == 1;
          };

          describe("test eventTarget is scene view", () =>
            test("trigger keyup_editor event", () => {
              let state = _prepareKeyboardEvent(~sandbox, ());

              _test(KeyUp_editor |> Obj.magic, "keyup", (10, 20), state);
            })
          );

          describe("test eventTarget is game view", () =>
            test("trigger keyup event", () => {
              let state = _prepareKeyboardEvent(~sandbox, ());

              _test(KeyUp, "keyup", (60, 20), state);
            })
          );
        })
      );
    });

    describe("bind dom event to trigger point event", () =>
      describe("bind mouse event to trigger point event", () => {
        let _test = (pointTapEventName, (pageX, pageY), state) => {
          PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
          StateLogicService.getAndSetEngineState(MainUtils.handleEngineState);

          let value = ref(0);

          EventTool.onCustomGlobalEvent(
            pointTapEventName,
            0,
            (. event, state) => {
              value := 1;
              (state, event);
            },
          )
          |> StateLogicService.getAndSetEngineState;

          EventTool.triggerDomEvent(
            "click",
            _getCanvas(),
            MouseEventTool.buildMouseEvent(~pageX, ~pageY, ()),
          );
          EventTool.restore();

          value^ |> expect == 1;
        };

        describe("test eventTarget is scene view", () =>
          test("trigger editor point event", () => {
            let state = _prepareKeyboardEvent(~sandbox, ());

            _test(
              EventEditorService.getPointTapEventName(),
              (10, 20),
              state,
            );
          })
        );

        describe("test eventTarget is game view", () =>
          test("trigger engine point event", () => {
            let state = _prepareKeyboardEvent(~sandbox, ());

            _test(
              NameEventEngineService.getPointTapEventName(),
              (60, 20),
              state,
            );
          })
        );
      })
    );
  });