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
        )
        |> FakeGlToolEngine.setFakeGl(
             FakeGlToolEngine.buildFakeGl(~sandbox, ()),
           );

      StateEngineService.setState(engineState) |> ignore;

      BrowserDetectToolEngine.setChrome();
    };

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
          let _prepareAndExec = (pageX, pageY) => {
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
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(~pageX, ~pageY, ()),
            );
            EventTool.restore();

            (valueX, valueY);
          };

          let _test = ((pageX, pageY), (locationInViewX, locationInViewY)) => {
            let (valueX, valueY) = _prepareAndExec(pageX, pageY);

            (valueX^, valueY^)
            |> expect == (locationInViewX, locationInViewY);
          };

          test("if is stop, loopBody", () => {
            _prepareMouseEvent(~sandbox, ());
            ControllerTool.setIsRun(false);

            let _ = _prepareAndExec(10, 20);

            let gl = FakeGlToolEngine.getEngineStateGl();
            gl##clearColor |> expect |> toCalled;
          });

          describe("test trigger in scene view", () =>
            describe("test locationInView", () => {
              test("test view has no offsetParent", () => {
                _prepareMouseEvent(~sandbox, ~offsetLeft=1, ~offsetTop=2, ());

                _test((10, 20), (10 - 1, 20 - 2));
              });
              test("test view has offsetParent", () => {
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
                _test((10, 20), (10 - 1 - 11, 20 - 2 - 12));
              });
            })
          );

          describe("test trigger in game view", () =>
            describe("test locationInView", () => {
              test("test view has no offsetParent", () => {
                _prepareMouseEvent(~sandbox, ~offsetLeft=1, ~offsetTop=2, ());
                _test((60, 20), (10 - 1, 20 - 2));
              });
              test("test view has offsetParent", () => {
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
                _test((70, 20), (70 - 50 - 1 - 11, 20 - 2 - 12));
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
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(
                ~pageX=clickPageX,
                ~pageY=clickPageY,
                (),
              ),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getBody(),
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
                  _prepareMouseEvent(
                    ~sandbox,
                    ~offsetLeft=1,
                    ~offsetTop=2,
                    (),
                  );

                  _test((10, 20), (20, 30), (20 - 1, 30 - 2));
                });
                test("test trigger in game view", () => {
                  _prepareMouseEvent(
                    ~sandbox,
                    ~offsetLeft=1,
                    ~offsetTop=2,
                    (),
                  );
                  _test((10, 20), (60, 30), (60 - 1, 30 - 2));
                });
              })
            )
          );

          describe("test eventTarget is game view", () =>
            describe("test locationInView", () =>
              describe("test view has no offsetParent", () => {
                test("test trigger in scene view", () => {
                  _prepareMouseEvent(
                    ~sandbox,
                    ~offsetLeft=1,
                    ~offsetTop=2,
                    (),
                  );
                  _test((60, 20), (20, 30), (20 - 50 - 1, 30 - 2));
                });
                test("test trigger in game view", () => {
                  _prepareMouseEvent(
                    ~sandbox,
                    ~offsetLeft=1,
                    ~offsetTop=2,
                    (),
                  );
                  _test((60, 20), (60, 30), (60 - 50 - 1, 30 - 2));
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
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(
                ~pageX=clickPageX,
                ~pageY=clickPageY,
                (),
              ),
            );
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(
                ~pageX=movePageX,
                ~pageY=movePageY,
                (),
              ),
            );
            EventTool.triggerDomEvent(
              "mouseup",
              EventTool.getBody(),
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
                  _prepareMouseEvent(
                    ~sandbox,
                    ~offsetLeft=1,
                    ~offsetTop=2,
                    (),
                  );

                  _test((60, 20), (20, 30), (20 - 50 - 1, 30 - 2));
                })
              )
            )
          );
        });
      });

      describe("bind keyboard event", () =>
        describe("bind keyup event", () => {
          let _prepareAndExec =
              (
                keyboardEventName,
                keyboardDomEventName,
                (clickPageX, clickPageY),
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
              EventTool.getBody(),
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

            value;
          };

          let _test =
              (
                keyboardEventName,
                keyboardDomEventName,
                (clickPageX, clickPageY),
              ) => {
            let value =
              _prepareAndExec(
                keyboardEventName,
                keyboardDomEventName,
                (clickPageX, clickPageY),
              );

            value^ |> expect == 1;
          };

          test("if is stop, loopBody", () => {
            _prepareKeyboardEvent(~sandbox, ());
            ControllerTool.setIsRun(false);

            let _ =
              _prepareAndExec(KeyUp_editor |> Obj.magic, "keyup", (10, 20));

            let gl = FakeGlToolEngine.getEngineStateGl();
            gl##clearColor |> expect |> toCalled;
          });

          describe("test eventTarget is other", () =>
            describe("do nothing", () => {
              test("not trigger keyup_editor event", () => {
                _prepareKeyboardEvent(~sandbox, ());

                let value =
                  _prepareAndExec(
                    KeyUp_editor |> Obj.magic,
                    "keyup",
                    ((-1), 20),
                  );

                value^ |> expect == 0;
              });
              test("not trigger keyup event", () => {
                _prepareKeyboardEvent(~sandbox, ());

                let value = _prepareAndExec(KeyUp, "keyup", ((-1), 20));

                value^ |> expect == 0;
              });
            })
          );

          describe("test eventTarget is scene view", () =>
            test("trigger keyup_editor event", () => {
              _prepareKeyboardEvent(~sandbox, ());

              _test(KeyUp_editor |> Obj.magic, "keyup", (10, 20));
            })
          );

          describe("test eventTarget is game view", () => {
            test("trigger keyup event", () => {
              _prepareKeyboardEvent(~sandbox, ());

              _test(KeyUp, "keyup", (60, 20));
            });
            test("trigger refresh_inspector event", () => {
              _prepareKeyboardEvent(~sandbox, ());
              let value = [||];
              EventTool.onCustomGlobalEvent(
                EventEditorService.getRefreshInspectorEventName(),
                0,
                (. event, engineState) => {
                  value |> ArrayService.push(1) |> ignore;

                  (engineState, event);
                },
              )
              |> StateLogicService.getAndSetEngineState;

              let _ = _prepareAndExec(KeyUp |> Obj.magic, "keyup", (60, 20));

              value |> expect == [|1, 1|];
            });
          });
        })
      );
    });

    describe("bind dom event to trigger point event", () =>
      describe("bind mouse event to trigger point event", () => {
        let _prepareAndExec = (pointEventName, (pageX, pageY)) => {
          PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
          StateLogicService.getAndSetEngineState(MainUtils.handleEngineState);

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

          EventTool.triggerDomEvent(
            "click",
            EventTool.getBody(),
            MouseEventTool.buildMouseEvent(~pageX, ~pageY, ()),
          );
          EventTool.triggerDomEvent(
            "mousewheel",
            EventTool.getBody(),
            MouseEventTool.buildMouseEvent(),
          );
          EventTool.restore();

          value;
        };

        let _test = (pointEventName, (pageX, pageY)) => {
          let value = _prepareAndExec(pointEventName, (pageX, pageY));

          value^ |> expect == 1;
        };

        test("if is stop, loopBody", () => {
          _prepareMouseEvent(~sandbox, ());
          ControllerTool.setIsRun(false);

          let _ =
            _prepareAndExec(
              EventEditorService.getPointScaleEventName(),
              (10, 20),
            );

          let gl = FakeGlToolEngine.getEngineStateGl();
          gl##clearColor |> expect |> toCalled;
        });

        describe("test eventTarget is other", () =>
          describe("do nothing", () => {
            test("not trigger editor point event", () => {
              _prepareMouseEvent(~sandbox, ());

              let value =
                _prepareAndExec(
                  EventEditorService.getPointScaleEventName(),
                  ((-1), 20),
                );

              value^ |> expect == 0;
            });
            test("not trigger engine point event", () => {
              _prepareMouseEvent(~sandbox, ());

              let value =
                _prepareAndExec(
                  NameEventEngineService.getPointScaleEventName(),
                  ((-1), 20),
                );

              value^ |> expect == 0;
            });
          })
        );

        describe("test eventTarget is scene view", () =>
          test("trigger editor point event", () => {
            _prepareMouseEvent(~sandbox, ());

            _test(EventEditorService.getPointScaleEventName(), (10, 20));
          })
        );

        describe("test eventTarget is game view", () => {
          test("trigger engine point event", () => {
            _prepareMouseEvent(~sandbox, ());

            _test(NameEventEngineService.getPointScaleEventName(), (60, 20));
          });
          test("trigger refresh_inspector event", () => {
            _prepareMouseEvent(~sandbox, ());
            let value = [||];
            EventTool.onCustomGlobalEvent(
              EventEditorService.getRefreshInspectorEventName(),
              0,
              (. event, engineState) => {
                value |> ArrayService.push(1) |> ignore;

                (engineState, event);
              },
            )
            |> StateLogicService.getAndSetEngineState;

            let _ =
              _prepareAndExec(
                NameEventEngineService.getPointScaleEventName(),
                (60, 20),
              );

            value |> expect == [|1, 1|];
          });
        });
      })
    );
  });