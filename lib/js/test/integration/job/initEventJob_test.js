'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Log$WonderLog = require("wonder-log/lib/js/src/Log.js");
var LogUtils$WonderEditor = require("../../../src/core/utils/console/LogUtils.js");
var EventTool$WonderEditor = require("./tool/EventTool.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var ControllerTool$WonderEditor = require("../../unit/composable_component/controller/tool/ControllerTool.js");
var MouseEventTool$WonderEditor = require("./tool/MouseEventTool.js");
var ViewToolEngine$WonderEditor = require("../../tool/engine/ViewToolEngine.js");
var FakeGlToolEngine$WonderEditor = require("../../tool/engine/FakeGlToolEngine.js");
var KeyboardEventTool$WonderEditor = require("./tool/KeyboardEventTool.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var BrowserDetectToolEngine$WonderEditor = require("../../tool/engine/BrowserDetectToolEngine.js");
var PrepareRenderViewJobTool$WonderEditor = require("./tool/PrepareRenderViewJobTool.js");
var TargetEventEditorService$WonderEditor = require("../../../src/service/state/editor/event/TargetEventEditorService.js");
var GameViewEventEditorService$WonderEditor = require("../../../src/service/state/editor/event/GameViewEventEditorService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var SceneViewEventEditorService$WonderEditor = require("../../../src/service/state/editor/event/SceneViewEventEditorService.js");

Wonder_jest.describe("init event job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareMouseEvent = function (sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
          var offsetLeft = $staropt$star !== undefined ? $staropt$star : 1;
          var offsetTop = $staropt$star$1 !== undefined ? $staropt$star$1 : 2;
          var offsetParent = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera\"\n            }\n          ]\n        }\n      ]\n            ", undefined, "\n    [\n\n        {\n              \"name\": \"init_event_for_editor\"\n        },\n            {\n              \"name\": \"init_camera\"\n            }\n    ]\n            ", undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
          MouseEventTool$WonderEditor.prepareWithState(sandbox, StateEngineService$WonderEditor.unsafeGetState(/* () */0), undefined, undefined, offsetLeft, offsetTop, Caml_option.some(offsetParent), undefined, undefined, /* () */0);
          return MouseEventTool$WonderEditor.setPointerLocked();
        };
        var _prepareKeyboardEvent = function (sandbox, param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera\"\n            }\n          ]\n        }\n      ]\n            ", undefined, "\n    [\n\n        {\n              \"name\": \"init_event_for_editor\"\n        },\n            {\n              \"name\": \"init_camera\"\n            }\n    ]\n            ", undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
          var canvasDom = EventTool$WonderEditor.buildFakeCanvasWithSize(0, 0, /* tuple */[
                0,
                0,
                null
              ]);
          var engineState = FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), ViewToolEngine$WonderEditor.setCanvas(canvasDom, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
          StateEngineService$WonderEditor.setState(engineState);
          return BrowserDetectToolEngine$WonderEditor.setChrome(/* () */0);
        };
        var _prepareViewAndInit = function (param) {
          PrepareRenderViewJobTool$WonderEditor.setViewRect(100, 50, /* () */0);
          return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("bind dom event", (function (param) {
                Wonder_jest.describe("bind mouse event", (function (param) {
                        Wonder_jest.describe("bind contextmenu event", (function (param) {
                                return Wonder_jest.test("preventDefault", (function (param) {
                                              _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                              StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                              var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var stopPropagationFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              EventTool$WonderEditor.triggerDomEvent("contextmenu", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(preventDefaultFunc), Caml_option.some(stopPropagationFunc), undefined, /* () */0));
                                              EventTool$WonderEditor.restore(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              Sinon.getCallCount(preventDefaultFunc),
                                                              Sinon.getCallCount(stopPropagationFunc)
                                                            ]), /* tuple */[
                                                          1,
                                                          1
                                                        ]);
                                            }));
                              }));
                        Wonder_jest.describe("bind mousewheel event", (function (param) {
                                var _prepareAndExec = function (pageX, pageY, target) {
                                  _prepareViewAndInit(/* () */0);
                                  var valueX = /* record */[/* contents */0];
                                  var valueY = /* record */[/* contents */0];
                                  StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                          return EventTool$WonderEditor.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                        var match = $$event[/* locationInView */2];
                                                        valueX[0] = match[0];
                                                        valueY[0] = match[1];
                                                        return state;
                                                      }), param);
                                        }));
                                  EventTool$WonderEditor.triggerDomEvent("mousewheel", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(target), /* () */0));
                                  EventTool$WonderEditor.restore(/* () */0);
                                  return /* tuple */[
                                          valueX,
                                          valueY
                                        ];
                                };
                                return Wonder_jest.describe("set event target", (function (param) {
                                              return Wonder_jest.test("if event->target isn't canvas, set to Other", (function (param) {
                                                            _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                            _prepareAndExec(10, 20, EventTool$WonderEditor.buildBodyTarget(/* () */0));
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TargetEventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0))), /* Other */2);
                                                          }));
                                            }));
                              }));
                        Wonder_jest.describe("bind mousedown event", (function (param) {
                                var _prepareAndExec = function (pageX, pageY, target) {
                                  _prepareViewAndInit(/* () */0);
                                  var valueX = /* record */[/* contents */0];
                                  var valueY = /* record */[/* contents */0];
                                  StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                          return EventTool$WonderEditor.onMouseEvent(/* MouseDown */2, 0, (function ($$event, state) {
                                                        var match = $$event[/* locationInView */2];
                                                        valueX[0] = match[0];
                                                        valueY[0] = match[1];
                                                        return state;
                                                      }), param);
                                        }));
                                  EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(target), /* () */0));
                                  EventTool$WonderEditor.restore(/* () */0);
                                  return /* tuple */[
                                          valueX,
                                          valueY
                                        ];
                                };
                                var _test = function (param, param$1, target) {
                                  var match = _prepareAndExec(param[0], param[1], target);
                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                  match[0][0],
                                                  match[1][0]
                                                ]), /* tuple */[
                                              param$1[0],
                                              param$1[1]
                                            ]);
                                };
                                Wonder_jest.describe("test set event target to Other", (function (param) {
                                        Wonder_jest.test("if event->target isn't canvas, set to Other", (function (param) {
                                                _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                _prepareAndExec(10, 20, EventTool$WonderEditor.buildBodyTarget(/* () */0));
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TargetEventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0))), /* Other */2);
                                              }));
                                        return Wonder_jest.describe("else", (function (param) {
                                                      return Wonder_jest.test("if mousedown position is out of canvas, set to Other", (function (param) {
                                                                    _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                                    _prepareAndExec(-1, 20, EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TargetEventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0))), /* Other */2);
                                                                  }));
                                                    }));
                                      }));
                                Wonder_jest.describe("test trigger in scene view", (function (param) {
                                        Wonder_jest.describe("test loopBody", (function (param) {
                                                Wonder_jest.test("if not run, not loopBody", (function (param) {
                                                        _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                        ControllerTool$WonderEditor.setIsRun(false);
                                                        _prepareAndExec(10, 20, EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                        var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                        return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                      }));
                                                return Wonder_jest.test("else, not loopBody", (function (param) {
                                                              _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                              ControllerTool$WonderEditor.setIsRun(true);
                                                              _prepareAndExec(10, 20, EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                              var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                              return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                            }));
                                              }));
                                        return Wonder_jest.describe("test locationInView", (function (param) {
                                                      Wonder_jest.test("test view has no offsetParent", (function (param) {
                                                              _prepareMouseEvent(sandbox, 1, 2, undefined, /* () */0);
                                                              return _test(/* tuple */[
                                                                          10,
                                                                          20
                                                                        ], /* tuple */[
                                                                          9,
                                                                          18
                                                                        ], EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                            }));
                                                      return Wonder_jest.test("test view has offsetParent", (function (param) {
                                                                    _prepareMouseEvent(sandbox, 1, 2, {
                                                                          offsetLeft: 11,
                                                                          offsetTop: 12,
                                                                          offsetParent: undefined
                                                                        }, /* () */0);
                                                                    return _test(/* tuple */[
                                                                                10,
                                                                                20
                                                                              ], /* tuple */[
                                                                                -2,
                                                                                6
                                                                              ], EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                                  }));
                                                    }));
                                      }));
                                return Wonder_jest.describe("test trigger in game view", (function (param) {
                                              Wonder_jest.describe("test loopBody", (function (param) {
                                                      Wonder_jest.test("if not run, not loopBody", (function (param) {
                                                              _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                              ControllerTool$WonderEditor.setIsRun(false);
                                                              _prepareAndExec(60, 20, EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                              var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                              return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                            }));
                                                      return Wonder_jest.test("else, not loopBody", (function (param) {
                                                                    _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                                    ControllerTool$WonderEditor.setIsRun(true);
                                                                    _prepareAndExec(60, 20, EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                                    var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                                    return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                                  }));
                                                    }));
                                              return Wonder_jest.describe("test locationInView", (function (param) {
                                                            Wonder_jest.test("test view has no offsetParent", (function (param) {
                                                                    _prepareMouseEvent(sandbox, 1, 2, undefined, /* () */0);
                                                                    return _test(/* tuple */[
                                                                                60,
                                                                                20
                                                                              ], /* tuple */[
                                                                                9,
                                                                                18
                                                                              ], EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                                  }));
                                                            return Wonder_jest.test("test view has offsetParent", (function (param) {
                                                                          _prepareMouseEvent(sandbox, 1, 2, {
                                                                                offsetLeft: 11,
                                                                                offsetTop: 12,
                                                                                offsetParent: undefined
                                                                              }, /* () */0);
                                                                          return _test(/* tuple */[
                                                                                      70,
                                                                                      20
                                                                                    ], /* tuple */[
                                                                                      8,
                                                                                      6
                                                                                    ], EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                                        }));
                                                          }));
                                            }));
                              }));
                        Wonder_jest.describe("bind mousemove event", (function (param) {
                                var _test = function (param, param$1, param$2) {
                                  _prepareViewAndInit(/* () */0);
                                  var valueX = /* record */[/* contents */0];
                                  var valueY = /* record */[/* contents */0];
                                  StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                          return EventTool$WonderEditor.onMouseEvent(/* MouseMove */4, 0, (function ($$event, state) {
                                                        var match = $$event[/* locationInView */2];
                                                        valueX[0] = match[0];
                                                        valueY[0] = match[1];
                                                        return state;
                                                      }), param);
                                        }));
                                  EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(param[0], param[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                  EventTool$WonderEditor.triggerDomEvent("mousemove", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(param$1[0], param$1[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                  EventTool$WonderEditor.restore(/* () */0);
                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                  valueX[0],
                                                  valueY[0]
                                                ]), /* tuple */[
                                              param$2[0],
                                              param$2[1]
                                            ]);
                                };
                                Wonder_jest.describe("test event target is scene view", (function (param) {
                                        return Wonder_jest.describe("test locationInView", (function (param) {
                                                      return Wonder_jest.describe("test view has no offsetParent", (function (param) {
                                                                    Wonder_jest.test("test trigger in scene view", (function (param) {
                                                                            _prepareMouseEvent(sandbox, 1, 2, undefined, /* () */0);
                                                                            return _test(/* tuple */[
                                                                                        10,
                                                                                        20
                                                                                      ], /* tuple */[
                                                                                        20,
                                                                                        30
                                                                                      ], /* tuple */[
                                                                                        19,
                                                                                        28
                                                                                      ]);
                                                                          }));
                                                                    return Wonder_jest.test("test trigger in game view", (function (param) {
                                                                                  _prepareMouseEvent(sandbox, 1, 2, undefined, /* () */0);
                                                                                  return _test(/* tuple */[
                                                                                              10,
                                                                                              20
                                                                                            ], /* tuple */[
                                                                                              60,
                                                                                              30
                                                                                            ], /* tuple */[
                                                                                              59,
                                                                                              28
                                                                                            ]);
                                                                                }));
                                                                  }));
                                                    }));
                                      }));
                                return Wonder_jest.describe("test event target is game view", (function (param) {
                                              return Wonder_jest.describe("test locationInView", (function (param) {
                                                            return Wonder_jest.describe("test view has no offsetParent", (function (param) {
                                                                          Wonder_jest.test("test trigger in scene view", (function (param) {
                                                                                  _prepareMouseEvent(sandbox, 1, 2, undefined, /* () */0);
                                                                                  return _test(/* tuple */[
                                                                                              60,
                                                                                              20
                                                                                            ], /* tuple */[
                                                                                              20,
                                                                                              30
                                                                                            ], /* tuple */[
                                                                                              -31,
                                                                                              28
                                                                                            ]);
                                                                                }));
                                                                          return Wonder_jest.test("test trigger in game view", (function (param) {
                                                                                        _prepareMouseEvent(sandbox, 1, 2, undefined, /* () */0);
                                                                                        return _test(/* tuple */[
                                                                                                    60,
                                                                                                    20
                                                                                                  ], /* tuple */[
                                                                                                    60,
                                                                                                    30
                                                                                                  ], /* tuple */[
                                                                                                    9,
                                                                                                    28
                                                                                                  ]);
                                                                                      }));
                                                                        }));
                                                          }));
                                            }));
                              }));
                        return Wonder_jest.describe("bind mousedrag event", (function (param) {
                                      return Wonder_jest.describe("test event target is game view", (function (param) {
                                                    return Wonder_jest.describe("test locationInView", (function (param) {
                                                                  return Wonder_jest.describe("test view has no offsetParent", (function (param) {
                                                                                return Wonder_jest.test("test trigger mousedragstart, mousedragover, mousedragdrop event in scene view", (function (param) {
                                                                                              _prepareMouseEvent(sandbox, 1, 2, undefined, /* () */0);
                                                                                              var param$1 = /* tuple */[
                                                                                                60,
                                                                                                20
                                                                                              ];
                                                                                              var param$2 = /* tuple */[
                                                                                                20,
                                                                                                30
                                                                                              ];
                                                                                              var param$3 = /* tuple */[
                                                                                                10,
                                                                                                22
                                                                                              ];
                                                                                              var param$4 = /* tuple */[
                                                                                                9,
                                                                                                18
                                                                                              ];
                                                                                              var param$5 = /* tuple */[
                                                                                                -31,
                                                                                                28
                                                                                              ];
                                                                                              var param$6 = /* tuple */[
                                                                                                -41,
                                                                                                20
                                                                                              ];
                                                                                              _prepareViewAndInit(/* () */0);
                                                                                              var x1 = /* record */[/* contents */0];
                                                                                              var y1 = /* record */[/* contents */0];
                                                                                              var x2 = /* record */[/* contents */0];
                                                                                              var y2 = /* record */[/* contents */0];
                                                                                              var x3 = /* record */[/* contents */0];
                                                                                              var y3 = /* record */[/* contents */0];
                                                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                              StateEngineService$WonderEditor.setState(EventTool$WonderEditor.onMouseEvent(/* MouseDragDrop */8, 0, (function ($$event, state) {
                                                                                                          var match = $$event[/* locationInView */2];
                                                                                                          x3[0] = match[0];
                                                                                                          y3[0] = match[1];
                                                                                                          return state;
                                                                                                        }), EventTool$WonderEditor.onMouseEvent(/* MouseDragOver */7, 0, (function ($$event, state) {
                                                                                                              var match = $$event[/* locationInView */2];
                                                                                                              x2[0] = match[0];
                                                                                                              y2[0] = match[1];
                                                                                                              return state;
                                                                                                            }), EventTool$WonderEditor.onMouseEvent(/* MouseDragStart */6, 0, (function ($$event, state) {
                                                                                                                  var match = $$event[/* locationInView */2];
                                                                                                                  x1[0] = match[0];
                                                                                                                  y1[0] = match[1];
                                                                                                                  return state;
                                                                                                                }), engineState))));
                                                                                              EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(param$1[0], param$1[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                                              EventTool$WonderEditor.triggerFirstMouseDragOverEvent(MouseEventTool$WonderEditor.buildMouseDomEvent(param$2[0], param$2[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                                              EventTool$WonderEditor.triggerDomEvent("mouseup", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(param$3[0], param$3[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                                              EventTool$WonderEditor.restore(/* () */0);
                                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                              /* tuple */[
                                                                                                                x1[0],
                                                                                                                y1[0]
                                                                                                              ],
                                                                                                              /* tuple */[
                                                                                                                x2[0],
                                                                                                                y2[0]
                                                                                                              ],
                                                                                                              /* tuple */[
                                                                                                                x3[0],
                                                                                                                y3[0]
                                                                                                              ]
                                                                                                            ]), /* tuple */[
                                                                                                          /* tuple */[
                                                                                                            param$4[0],
                                                                                                            param$4[1]
                                                                                                          ],
                                                                                                          /* tuple */[
                                                                                                            param$5[0],
                                                                                                            param$5[1]
                                                                                                          ],
                                                                                                          /* tuple */[
                                                                                                            param$6[0],
                                                                                                            param$6[1]
                                                                                                          ]
                                                                                                        ]);
                                                                                            }));
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("bind keyboard event", (function (param) {
                              return Wonder_jest.describe("bind keyup event", (function (param) {
                                            var _prepareAndExec = function (keyboardEventName, keyboardDomEventName, param) {
                                              _prepareViewAndInit(/* () */0);
                                              var value = /* record */[/* contents */0];
                                              StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                      return EventTool$WonderEditor.onKeyboardEvent(keyboardEventName, 0, (function ($$event, state) {
                                                                    value[0] = 1;
                                                                    return state;
                                                                  }), param);
                                                    }));
                                              EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(param[0], param[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                              EventTool$WonderEditor.triggerDomEvent("" + (String(keyboardDomEventName) + ""), EventTool$WonderEditor.getKeyboardEventBindedDom(/* () */0), KeyboardEventTool$WonderEditor.buildKeyboardDomEvent(undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                              EventTool$WonderEditor.restore(/* () */0);
                                              return value;
                                            };
                                            var _test = function (keyboardEventName, keyboardDomEventName, param) {
                                              var value = _prepareAndExec(keyboardEventName, keyboardDomEventName, /* tuple */[
                                                    param[0],
                                                    param[1]
                                                  ]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                                            };
                                            Wonder_jest.test("if is stop, not loopBody", (function (param) {
                                                    _prepareKeyboardEvent(sandbox, /* () */0);
                                                    ControllerTool$WonderEditor.setIsRun(false);
                                                    _prepareAndExec(/* KeyUp_SceneView */19, "keyup", /* tuple */[
                                                          10,
                                                          20
                                                        ]);
                                                    var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                    return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                  }));
                                            Wonder_jest.describe("test event target is Other", (function (param) {
                                                    return Wonder_jest.describe("do nothing", (function (param) {
                                                                  Wonder_jest.describe("test loopBody", (function (param) {
                                                                          return Wonder_jest.test("if is stop, not loopBody", (function (param) {
                                                                                        _prepareKeyboardEvent(sandbox, /* () */0);
                                                                                        ControllerTool$WonderEditor.setIsRun(false);
                                                                                        _prepareAndExec(/* KeyUp_SceneView */19, "keyup", /* tuple */[
                                                                                              -1,
                                                                                              20
                                                                                            ]);
                                                                                        var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                                                        return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                                                      }));
                                                                        }));
                                                                  Wonder_jest.test("not trigger keyup_editor event", (function (param) {
                                                                          _prepareKeyboardEvent(sandbox, /* () */0);
                                                                          var value = _prepareAndExec(/* KeyUp_SceneView */19, "keyup", /* tuple */[
                                                                                -1,
                                                                                20
                                                                              ]);
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                                                        }));
                                                                  return Wonder_jest.test("not trigger keyup event", (function (param) {
                                                                                _prepareKeyboardEvent(sandbox, /* () */0);
                                                                                var value = _prepareAndExec(/* KeyUp_GameView */9, "keyup", /* tuple */[
                                                                                      -1,
                                                                                      20
                                                                                    ]);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                                                              }));
                                                                }));
                                                  }));
                                            Wonder_jest.describe("test event target is scene view", (function (param) {
                                                    Wonder_jest.describe("test loopBody", (function (param) {
                                                            Wonder_jest.test("if not run, not loopBody", (function (param) {
                                                                    _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                                    ControllerTool$WonderEditor.setIsRun(false);
                                                                    _prepareAndExec(/* KeyUp_SceneView */19, "keyup", /* tuple */[
                                                                          10,
                                                                          20
                                                                        ]);
                                                                    var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                                    return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                                  }));
                                                            return Wonder_jest.test("else, not loopBody", (function (param) {
                                                                          _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                                          ControllerTool$WonderEditor.setIsRun(true);
                                                                          _prepareAndExec(/* KeyUp_SceneView */19, "keyup", /* tuple */[
                                                                                10,
                                                                                20
                                                                              ]);
                                                                          var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                                          return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                                        }));
                                                          }));
                                                    return Wonder_jest.test("trigger keyup_editor event", (function (param) {
                                                                  _prepareKeyboardEvent(sandbox, /* () */0);
                                                                  return _test(/* KeyUp_SceneView */19, "keyup", /* tuple */[
                                                                              10,
                                                                              20
                                                                            ]);
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("test event target is game view", (function (param) {
                                                          Wonder_jest.describe("test loopBody", (function (param) {
                                                                  Wonder_jest.test("if not run, not loopBody", (function (param) {
                                                                          _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                                          ControllerTool$WonderEditor.setIsRun(false);
                                                                          _prepareAndExec(/* KeyUp_SceneView */19, "keyup", /* tuple */[
                                                                                60,
                                                                                20
                                                                              ]);
                                                                          var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                                          return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                                        }));
                                                                  return Wonder_jest.test("else, not loopBody", (function (param) {
                                                                                _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                                                ControllerTool$WonderEditor.setIsRun(true);
                                                                                _prepareAndExec(/* KeyUp_SceneView */19, "keyup", /* tuple */[
                                                                                      60,
                                                                                      20
                                                                                    ]);
                                                                                var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                                                return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                                              }));
                                                                }));
                                                          return Wonder_jest.test("trigger keyup event", (function (param) {
                                                                        _prepareKeyboardEvent(sandbox, /* () */0);
                                                                        return _test(/* KeyUp_GameView */9, "keyup", /* tuple */[
                                                                                    60,
                                                                                    20
                                                                                  ]);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("bind dom event to trigger point event", (function (param) {
                return Wonder_jest.describe("bind mouse event to trigger point event", (function (param) {
                              var _prepareAndExec = function (pointEventName, param) {
                                var pageY = param[1];
                                var pageX = param[0];
                                _prepareViewAndInit(/* () */0);
                                var value = /* record */[/* contents */0];
                                StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                        return EventTool$WonderEditor.onCustomGlobalEvent(pointEventName, 0, (function ($$event, state) {
                                                      value[0] = 1;
                                                      return /* tuple */[
                                                              state,
                                                              $$event
                                                            ];
                                                    }), param);
                                      }));
                                EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                EventTool$WonderEditor.triggerDomEvent("mousewheel", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                EventTool$WonderEditor.restore(/* () */0);
                                return value;
                              };
                              var _test = function (pointEventName, param) {
                                var value = _prepareAndExec(pointEventName, /* tuple */[
                                      param[0],
                                      param[1]
                                    ]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                              };
                              Wonder_jest.describe("test event target is Other", (function (param) {
                                      Wonder_jest.describe("test loopBody", (function (param) {
                                              return Wonder_jest.test("if is stop, not loopBody", (function (param) {
                                                            _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                            ControllerTool$WonderEditor.setIsRun(false);
                                                            _prepareAndExec(SceneViewEventEditorService$WonderEditor.getPointScaleEventName(/* () */0), /* tuple */[
                                                                  -1,
                                                                  20
                                                                ]);
                                                            var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                            return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                          }));
                                            }));
                                      return Wonder_jest.describe("do nothing", (function (param) {
                                                    Wonder_jest.test("not trigger editor point event", (function (param) {
                                                            _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                            var value = _prepareAndExec(SceneViewEventEditorService$WonderEditor.getPointScaleEventName(/* () */0), /* tuple */[
                                                                  -1,
                                                                  20
                                                                ]);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                                          }));
                                                    return Wonder_jest.test("not trigger engine point event", (function (param) {
                                                                  _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                                  var value = _prepareAndExec(GameViewEventEditorService$WonderEditor.getPointScaleEventName(/* () */0), /* tuple */[
                                                                        -1,
                                                                        20
                                                                      ]);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                                                }));
                                                  }));
                                    }));
                              Wonder_jest.describe("test event target is scene view", (function (param) {
                                      Wonder_jest.describe("test loopBody", (function (param) {
                                              return Wonder_jest.test("if is stop, not loopBody", (function (param) {
                                                            _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                            ControllerTool$WonderEditor.setIsRun(false);
                                                            _prepareAndExec(SceneViewEventEditorService$WonderEditor.getPointScaleEventName(/* () */0), /* tuple */[
                                                                  10,
                                                                  20
                                                                ]);
                                                            var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                            return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                          }));
                                            }));
                                      return Wonder_jest.test("trigger editor point event", (function (param) {
                                                    _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                    return _test(SceneViewEventEditorService$WonderEditor.getPointScaleEventName(/* () */0), /* tuple */[
                                                                10,
                                                                20
                                                              ]);
                                                  }));
                                    }));
                              return Wonder_jest.describe("test event target is game view", (function (param) {
                                            Wonder_jest.describe("test loopBody", (function (param) {
                                                    return Wonder_jest.test("if is stop, not loopBody", (function (param) {
                                                                  _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                                  ControllerTool$WonderEditor.setIsRun(false);
                                                                  _prepareAndExec(SceneViewEventEditorService$WonderEditor.getPointScaleEventName(/* () */0), /* tuple */[
                                                                        60,
                                                                        20
                                                                      ]);
                                                                  var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                                  return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                                }));
                                                  }));
                                            return Wonder_jest.test("trigger engine point event", (function (param) {
                                                          _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                          return _test(GameViewEventEditorService$WonderEditor.getPointScaleEventName(/* () */0), /* tuple */[
                                                                      60,
                                                                      20
                                                                    ]);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test handle error", (function (param) {
                      return Wonder_jest.test("throw error shouldn't unbind event", (function (param) {
                                    _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                    _prepareViewAndInit(/* () */0);
                                    var value1 = /* record */[/* contents */0];
                                    var value2 = /* record */[/* contents */0];
                                    var partial_arg = SceneViewEventEditorService$WonderEditor.getPointScaleEventName(/* () */0);
                                    StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                            return EventTool$WonderEditor.onCustomGlobalEvent(partial_arg, 0, (function ($$event, state) {
                                                          value1[0] = value1[0] + 1 | 0;
                                                          Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("throw fatal", "", "", ""));
                                                          value2[0] = value2[0] + 1 | 0;
                                                          return /* tuple */[
                                                                  state,
                                                                  $$event
                                                                ];
                                                        }), param);
                                          }));
                                    EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(10, 20, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                    EventTool$WonderEditor.triggerDomEvent("mousewheel", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(10, 20, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                    EventTool$WonderEditor.triggerDomEvent("mousewheel", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                    EventTool$WonderEditor.restore(/* () */0);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                    value1[0],
                                                    value2[0]
                                                  ]), /* tuple */[
                                                2,
                                                0
                                              ]);
                                  }));
                    }));
      }));

/*  Not a pure module */
