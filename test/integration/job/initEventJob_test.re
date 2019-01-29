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

      /* _insertCanvasDomToBody(.); */

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

      let canvasDom =
        EventTool.buildFakeCanvasWithSize(0, 0, (0, 0, Js.Nullable.null));

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
              MainUtils._handleEngineState,
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

        describe("bind mousedown event", () => {
          let _prepareAndExec = (pageX, pageY, target) => {
            PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
            StateLogicService.getAndSetEngineState(
              MainUtils._handleEngineState,
            );

            let (valueX, valueY) = (ref(0), ref(0));

            EventTool.onMouseEvent(
              MouseDown,
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
              "mousedown",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(~pageX, ~pageY, ~target, ()),
            );
            EventTool.restore();

            (valueX, valueY);
          };

          let _test =
              ((pageX, pageY), (locationInViewX, locationInViewY), target) => {
            let (valueX, valueY) = _prepareAndExec(pageX, pageY, target);

            (valueX^, valueY^)
            |> expect == (locationInViewX, locationInViewY);
          };

          describe("test set eventTarget to Other", () => {
            test("if event->target isn't canvas, set to Other", () => {
              _prepareMouseEvent(~sandbox, ());

              let _ = _prepareAndExec(10, 20, EventTool.buildBodyTarget());

              TargetEventEditorService.getEventTarget(
                StateEditorService.getState(),
              )
              |> expect == EventType.Other;
            });

            describe("else", () =>
              test("if mousedown position is out of canvas, set to Other", () => {
                _prepareMouseEvent(~sandbox, ());

                let _ =
                  _prepareAndExec(-1, 20, EventTool.buildCanvasTarget());

                TargetEventEditorService.getEventTarget(
                  StateEditorService.getState(),
                )
                |> expect == EventType.Other;
              })
            );

            describe("test loopBody", () =>
              test("if not run, not loopBody", () => {
                _prepareMouseEvent(~sandbox, ());
                ControllerTool.setIsRun(false);

                let _ = _prepareAndExec(10, 20, EventTool.buildBodyTarget());

                let gl = FakeGlToolEngine.getEngineStateGl();
                gl##clearColor |> expect |> not_ |> toCalled;
              })
            );
          });

          describe("test trigger in scene view", () => {
            describe("test loopBody", () => {
              test("if not run, loopBody", () => {
                _prepareMouseEvent(~sandbox, ());
                ControllerTool.setIsRun(false);

                let _ =
                  _prepareAndExec(10, 20, EventTool.buildCanvasTarget());

                let gl = FakeGlToolEngine.getEngineStateGl();
                gl##clearColor |> expect |> toCalled;
              });
              test("else, not loopBody", () => {
                _prepareMouseEvent(~sandbox, ());
                ControllerTool.setIsRun(true);

                let _ =
                  _prepareAndExec(10, 20, EventTool.buildCanvasTarget());

                let gl = FakeGlToolEngine.getEngineStateGl();
                gl##clearColor |> expect |> not_ |> toCalled;
              });
            });

            describe("test locationInView", () => {
              test("test view has no offsetParent", () => {
                _prepareMouseEvent(~sandbox, ~offsetLeft=1, ~offsetTop=2, ());

                _test(
                  (10, 20),
                  (10 - 1, 20 - 2),
                  EventTool.buildCanvasTarget(),
                );
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
                _test(
                  (10, 20),
                  (10 - 1 - 11, 20 - 2 - 12),
                  EventTool.buildCanvasTarget(),
                );
              });
            });
          });

          describe("test trigger in game view", () => {
            describe("test loopBody", () => {
              test("if not run, not loopBody", () => {
                _prepareMouseEvent(~sandbox, ());
                ControllerTool.setIsRun(false);

                let _ =
                  _prepareAndExec(60, 20, EventTool.buildCanvasTarget());

                let gl = FakeGlToolEngine.getEngineStateGl();
                gl##clearColor |> expect |> not_ |> toCalled;
              });
              test("else, not loopBody", () => {
                _prepareMouseEvent(~sandbox, ());
                ControllerTool.setIsRun(true);

                let _ =
                  _prepareAndExec(60, 20, EventTool.buildCanvasTarget());

                let gl = FakeGlToolEngine.getEngineStateGl();
                gl##clearColor |> expect |> not_ |> toCalled;
              });
            });

            describe("test locationInView", () => {
              test("test view has no offsetParent", () => {
                _prepareMouseEvent(~sandbox, ~offsetLeft=1, ~offsetTop=2, ());
                _test(
                  (60, 20),
                  (10 - 1, 20 - 2),
                  EventTool.buildCanvasTarget(),
                );
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
                _test(
                  (70, 20),
                  (70 - 50 - 1 - 11, 20 - 2 - 12),
                  EventTool.buildCanvasTarget(),
                );
              });
            });
          });
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
              MainUtils._handleEngineState,
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
              "mousedown",
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
                (dropPageX, dropPageY),
                (dragStartLocationInViewX, dragStartLocationInViewY),
                (dragOverLocationInViewX, dragOverLocationInViewY),
                (dragDropLocationInViewX, dragDropLocationInViewY),
              ) => {
            PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
            StateLogicService.getAndSetEngineState(
              MainUtils._handleEngineState,
            );

            let (x1, y1, x2, y2, x3, y3) = (
              ref(0),
              ref(0),
              ref(0),
              ref(0),
              ref(0),
              ref(0),
            );
            let engineState = StateEngineService.unsafeGetState();

            engineState
            |> EventTool.onMouseEvent(
                 MouseDragStart,
                 0,
                 (. event: mouseEvent, state) => {
                   let (x, y) = event.locationInView;
                   x1 := x;
                   y1 := y;
                   state;
                 },
               )
            |> EventTool.onMouseEvent(
                 MouseDragOver,
                 0,
                 (. event: mouseEvent, state) => {
                   let (x, y) = event.locationInView;
                   x2 := x;
                   y2 := y;
                   state;
                 },
               )
            |> EventTool.onMouseEvent(
                 MouseDragDrop,
                 0,
                 (. event: mouseEvent, state) => {
                   let (x, y) = event.locationInView;
                   x3 := x;
                   y3 := y;
                   state;
                 },
               )
            |> StateEngineService.setState
            |> ignore;

            EventTool.triggerDomEvent(
              "mousedown",
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
            EventTool.triggerDomEvent(
              "mouseup",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(
                ~pageX=dropPageX,
                ~pageY=dropPageY,
                (),
              ),
            );
            EventTool.restore();

            ((x1^, y1^), (x2^, y2^), (x3^, y3^))
            |>
            expect == (
                        (dragStartLocationInViewX, dragStartLocationInViewY),
                        (dragOverLocationInViewX, dragOverLocationInViewY),
                        (dragDropLocationInViewX, dragDropLocationInViewY),
                      );
          };

          describe("test eventTarget is game view", () =>
            describe("test locationInView", () =>
              describe("test view has no offsetParent", () =>
                test(
                  "test trigger mousedragstart, mousedragover, mousedragdrop event in scene view",
                  () => {
                    _prepareMouseEvent(
                      ~sandbox,
                      ~offsetLeft=1,
                      ~offsetTop=2,
                      (),
                    );

                    _test(
                      (60, 20),
                      (20, 30),
                      (10, 22),
                      (60 - 50 - 1, 20 - 2),
                      (20 - 50 - 1, 30 - 2),
                      (10 - 50 - 1, 22 - 2),
                    );
                  },
                )
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
            MainUtils._handleEngineState
            |> StateLogicService.getAndSetEngineState;

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
              "mousedown",
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
              _prepareAndExec(
                KeyUp_SceneView |> Obj.magic,
                "keyup",
                (10, 20),
              );

            let gl = FakeGlToolEngine.getEngineStateGl();
            gl##clearColor |> expect |> toCalled;
          });

          describe("test eventTarget is other", () =>
            describe("do nothing", () => {
              describe("test loopBody", () =>
                test("if is stop, not loopBody", () => {
                  _prepareKeyboardEvent(~sandbox, ());
                  ControllerTool.setIsRun(false);

                  let _ =
                    _prepareAndExec(
                      KeyUp_SceneView |> Obj.magic,
                      "keyup",
                      ((-1), 20),
                    );

                  let gl = FakeGlToolEngine.getEngineStateGl();
                  gl##clearColor |> expect |> not_ |> toCalled;
                })
              );

              test("not trigger keyup_editor event", () => {
                _prepareKeyboardEvent(~sandbox, ());

                let value =
                  _prepareAndExec(
                    KeyUp_SceneView |> Obj.magic,
                    "keyup",
                    ((-1), 20),
                  );

                value^ |> expect == 0;
              });
              test("not trigger keyup event", () => {
                _prepareKeyboardEvent(~sandbox, ());

                let value =
                  _prepareAndExec(KeyUp_GameView, "keyup", ((-1), 20));

                value^ |> expect == 0;
              });
            })
          );

          describe("test eventTarget is scene view", () => {
            describe("test loopBody", () => {
              test("if not run, loopBody", () => {
                _prepareMouseEvent(~sandbox, ());
                ControllerTool.setIsRun(false);

                let _ =
                  _prepareAndExec(
                    KeyUp_SceneView |> Obj.magic,
                    "keyup",
                    (10, 20),
                  );

                let gl = FakeGlToolEngine.getEngineStateGl();
                gl##clearColor |> expect |> toCalled;
              });
              test("else, not loopBody", () => {
                _prepareMouseEvent(~sandbox, ());
                ControllerTool.setIsRun(true);

                let _ =
                  _prepareAndExec(
                    KeyUp_SceneView |> Obj.magic,
                    "keyup",
                    (10, 20),
                  );

                let gl = FakeGlToolEngine.getEngineStateGl();
                gl##clearColor |> expect |> not_ |> toCalled;
              });
            });

            test("trigger keyup_editor event", () => {
              _prepareKeyboardEvent(~sandbox, ());

              _test(KeyUp_SceneView |> Obj.magic, "keyup", (10, 20));
            });
          });

          describe("test eventTarget is game view", () => {
            describe("test loopBody", () => {
              test("if not run, not loopBody", () => {
                _prepareMouseEvent(~sandbox, ());
                ControllerTool.setIsRun(false);

                let _ =
                  _prepareAndExec(
                    KeyUp_SceneView |> Obj.magic,
                    "keyup",
                    (60, 20),
                  );

                let gl = FakeGlToolEngine.getEngineStateGl();
                gl##clearColor |> expect |> not_ |> toCalled;
              });
              test("else, not loopBody", () => {
                _prepareMouseEvent(~sandbox, ());
                ControllerTool.setIsRun(true);

                let _ =
                  _prepareAndExec(
                    KeyUp_SceneView |> Obj.magic,
                    "keyup",
                    (60, 20),
                  );

                let gl = FakeGlToolEngine.getEngineStateGl();
                gl##clearColor |> expect |> not_ |> toCalled;
              });
            });

            test("trigger keyup event", () => {
              _prepareKeyboardEvent(~sandbox, ());

              _test(KeyUp_GameView, "keyup", (60, 20));
            });
            /* describe("trigger refresh_inspector event", () =>
                 test("defer 0 ms to exec", () => {
                   TimeoutTool.buildFakeSetTimeoutFunc();
                   _prepareKeyboardEvent(~sandbox, ());
                   let value = [||];
                   EventTool.onCustomGlobalEvent(
                     SceneViewEventEditorService.getRefreshInspectorEventName(),
                     0,
                     (. event, engineState) => {
                       value |> ArrayService.push(1) |> ignore;

                       (engineState, event);
                     },
                   )
                   |> StateLogicService.getAndSetEngineState;

                   let _ =
                     _prepareAndExec(KeyUp_GameView |> Obj.magic, "keyup", (60, 20));

                   let funcArr = TimeoutTool.getTimeoutFuncArr();
                   let (func, time) = funcArr |> ArrayService.unsafeGetFirst;
                   func();
                   (funcArr |> Js.Array.length, value, time)
                   |> expect == (2, [|1|], 0);
                 })
               ); */
          });
        })
      );
    });

    describe("bind dom event to trigger point event", () =>
      describe("bind mouse event to trigger point event", () => {
        let _prepareAndExec = (pointEventName, (pageX, pageY)) => {
          PrepareRenderViewJobTool.setViewRect(~width=100, ~height=50, ());
          StateLogicService.getAndSetEngineState(
            MainUtils._handleEngineState,
          );

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

          value;
        };

        let _test = (pointEventName, (pageX, pageY)) => {
          let value = _prepareAndExec(pointEventName, (pageX, pageY));

          value^ |> expect == 1;
        };

        describe("test eventTarget is other", () => {
          describe("test loopBody", () =>
            test("if is stop, not loopBody", () => {
              _prepareMouseEvent(~sandbox, ());
              ControllerTool.setIsRun(false);

              let _ =
                _prepareAndExec(
                  SceneViewEventEditorService.getPointScaleEventName(),
                  ((-1), 20),
                );

              let gl = FakeGlToolEngine.getEngineStateGl();
              gl##clearColor |> expect |> not_ |> toCalled;
            })
          );

          describe("do nothing", () => {
            test("not trigger editor point event", () => {
              _prepareMouseEvent(~sandbox, ());

              let value =
                _prepareAndExec(
                  SceneViewEventEditorService.getPointScaleEventName(),
                  ((-1), 20),
                );

              value^ |> expect == 0;
            });
            test("not trigger engine point event", () => {
              _prepareMouseEvent(~sandbox, ());

              let value =
                _prepareAndExec(
                  GameViewEventEditorService.getPointScaleEventName(),
                  ((-1), 20),
                );

              value^ |> expect == 0;
            });
          });
        });

        describe("test eventTarget is scene view", () => {
          describe("test loopBody", () =>
            test("if is stop, loopBody", () => {
              _prepareMouseEvent(~sandbox, ());
              ControllerTool.setIsRun(false);

              let _ =
                _prepareAndExec(
                  SceneViewEventEditorService.getPointScaleEventName(),
                  (10, 20),
                );

              let gl = FakeGlToolEngine.getEngineStateGl();
              gl##clearColor |> expect |> toCalled;
            })
          );

          test("trigger editor point event", () => {
            _prepareMouseEvent(~sandbox, ());

            _test(
              SceneViewEventEditorService.getPointScaleEventName(),
              (10, 20),
            );
          });
        });

        describe("test eventTarget is game view", () => {
          describe("test loopBody", () =>
            test("if is stop, not_ loopBody", () => {
              _prepareMouseEvent(~sandbox, ());
              ControllerTool.setIsRun(false);

              let _ =
                _prepareAndExec(
                  SceneViewEventEditorService.getPointScaleEventName(),
                  (60, 20),
                );

              let gl = FakeGlToolEngine.getEngineStateGl();
              gl##clearColor |> expect |> not_ |> toCalled;
            })
          );

          test("trigger engine point event", () => {
            _prepareMouseEvent(~sandbox, ());

            _test(
              GameViewEventEditorService.getPointScaleEventName(),
              (60, 20),
            );
          });
          /* describe("trigger refresh_inspector event", () =>
               test("defer 0 ms to exec", () => {
                 TimeoutTool.buildFakeSetTimeoutFunc();
                 _prepareMouseEvent(~sandbox, ());
                 let value = [||];
                 EventTool.onCustomGlobalEvent(
                   SceneViewEventEditorService.getRefreshInspectorEventName(),
                   0,
                   (. event, engineState) => {
                     value |> ArrayService.push(1) |> ignore;

                     (engineState, event);
                   },
                 )
                 |> StateLogicService.getAndSetEngineState;

                 let _ =
                   _prepareAndExec(
                     GameViewEventEditorService.getPointScaleEventName(),
                     (60, 20),
                   );

                 let funcArr = TimeoutTool.getTimeoutFuncArr();
                 let (func, time) = funcArr |> ArrayService.unsafeGetFirst;
                 func();
                 (funcArr |> Js.Array.length, value, time)
                 |> expect == (2, [|1|], 0);
               })
             ); */
        });
      })
    );
  });