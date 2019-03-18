

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as EventTool$WonderEditor from "./tool/EventTool.js";
import * as MainUtils$WonderEditor from "../../../src/core/utils/engine/MainUtils.js";
import * as TimeoutTool$WonderEditor from "./tool/TimeoutTool.js";
import * as ArrayService$WonderEditor from "../../../src/service/atom/ArrayService.js";
import * as ControllerTool$WonderEditor from "../../unit/composable_component/controller/tool/ControllerTool.js";
import * as MouseEventTool$WonderEditor from "./tool/MouseEventTool.js";
import * as ViewToolEngine$WonderEditor from "../../tool/engine/ViewToolEngine.js";
import * as FakeGlToolEngine$WonderEditor from "../../tool/engine/FakeGlToolEngine.js";
import * as KeyboardEventTool$WonderEditor from "./tool/KeyboardEventTool.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as EventEditorService$WonderEditor from "../../../src/service/state/editor/event/EventEditorService.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as NameEventEngineService$WonderEditor from "../../../src/service/state/engine/event/NameEventEngineService.js";
import * as BrowserDetectToolEngine$WonderEditor from "../../tool/engine/BrowserDetectToolEngine.js";
import * as PrepareRenderViewJobTool$WonderEditor from "./tool/PrepareRenderViewJobTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";

describe("init event job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareMouseEvent = function (sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, _) {
          var offsetLeft = $staropt$star !== undefined ? $staropt$star : 1;
          var offsetTop = $staropt$star$1 !== undefined ? $staropt$star$1 : 2;
          var offsetParent = $staropt$star$2 !== undefined ? Js_primitive.valFromOption($staropt$star$2) : undefined;
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera\"\n            }\n          ]\n        }\n      ]\n            ", undefined, "\n    [\n\n        {\n              \"name\": \"init_event_for_editor\"\n        },\n            {\n              \"name\": \"init_camera\"\n            }\n    ]\n            ", undefined, /* () */0), undefined, undefined, false, /* () */0);
          MouseEventTool$WonderEditor.prepareWithState(sandbox, StateEngineService$WonderEditor.unsafeGetState(/* () */0), undefined, undefined, offsetLeft, offsetTop, Js_primitive.some(offsetParent), undefined, /* () */0);
          return MouseEventTool$WonderEditor.setPointerLocked();
        };
        var _prepareKeyboardEvent = function (sandbox, _) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera\"\n            }\n          ]\n        }\n      ]\n            ", undefined, "\n    [\n\n        {\n              \"name\": \"init_event_for_editor\"\n        },\n            {\n              \"name\": \"init_camera\"\n            }\n    ]\n            ", undefined, /* () */0), undefined, undefined, false, /* () */0);
          var canvasDom = EventTool$WonderEditor.buildFakeCanvasWithSize(0, 0, /* tuple */[
                0,
                0,
                null
              ]);
          var engineState = FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), ViewToolEngine$WonderEditor.setCanvas(canvasDom, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
          StateEngineService$WonderEditor.setState(engineState);
          return BrowserDetectToolEngine$WonderEditor.setChrome(/* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("bind dom event", (function () {
                describe("bind mouse event", (function () {
                        describe("bind contextmenu event", (function () {
                                return Wonder_jest.test("preventDefault", (function () {
                                              _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                              StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                              var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var stopPropagationFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              EventTool$WonderEditor.triggerDomEvent("contextmenu", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, preventDefaultFunc, stopPropagationFunc, undefined, /* () */0));
                                              EventTool$WonderEditor.restore(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              Sinon.getCallCount(preventDefaultFunc),
                                                              Sinon.getCallCount(stopPropagationFunc)
                                                            ]), /* tuple */[
                                                          1,
                                                          1
                                                        ]);
                                            }));
                              }));
                        describe("bind mousedown event", (function () {
                                var _prepareAndExec = function (pageX, pageY, target) {
                                  PrepareRenderViewJobTool$WonderEditor.setViewRect(100, 50, /* () */0);
                                  StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
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
                                  EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(pageX, pageY, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(target), /* () */0));
                                  EventTool$WonderEditor.restore(/* () */0);
                                  return /* tuple */[
                                          valueX,
                                          valueY
                                        ];
                                };
                                var _test = function (param, param$1, target) {
                                  var match = _prepareAndExec(param[0], param[1], target);
                                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                  match[0][0],
                                                  match[1][0]
                                                ]), /* tuple */[
                                              param$1[0],
                                              param$1[1]
                                            ]);
                                };
                                describe("test set eventTarget to Other", (function () {
                                        Wonder_jest.test("if event->target isn't canvas, set to Other", (function () {
                                                _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                _prepareAndExec(10, 20, EventTool$WonderEditor.buildBodyTarget(/* () */0));
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](EventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0))), /* Other */2);
                                              }));
                                        describe("else", (function () {
                                                return Wonder_jest.test("if mousedown position is out of canvas, set to Other", (function () {
                                                              _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                              _prepareAndExec(-1, 20, EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](EventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0))), /* Other */2);
                                                            }));
                                              }));
                                        describe("test loopBody", (function () {
                                                return Wonder_jest.test("if not run, not loopBody", (function () {
                                                              _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                              ControllerTool$WonderEditor.setIsRun(false);
                                                              _prepareAndExec(10, 20, EventTool$WonderEditor.buildBodyTarget(/* () */0));
                                                              var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                              return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test trigger in scene view", (function () {
                                        describe("test loopBody", (function () {
                                                Wonder_jest.test("if not run, loopBody", (function () {
                                                        _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                        ControllerTool$WonderEditor.setIsRun(false);
                                                        _prepareAndExec(10, 20, EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                        var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                        return Sinon.toCalled(Wonder_jest.Expect[/* expect */0](gl.clearColor));
                                                      }));
                                                return Wonder_jest.test("else, not loopBody", (function () {
                                                              _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                              ControllerTool$WonderEditor.setIsRun(true);
                                                              _prepareAndExec(10, 20, EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                              var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                              return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                            }));
                                              }));
                                        describe("test locationInView", (function () {
                                                Wonder_jest.test("test view has no offsetParent", (function () {
                                                        _prepareMouseEvent(sandbox, 1, 2, undefined, /* () */0);
                                                        return _test(/* tuple */[
                                                                    10,
                                                                    20
                                                                  ], /* tuple */[
                                                                    9,
                                                                    18
                                                                  ], EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                      }));
                                                return Wonder_jest.test("test view has offsetParent", (function () {
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
                                        return /* () */0;
                                      }));
                                describe("test trigger in game view", (function () {
                                        describe("test loopBody", (function () {
                                                Wonder_jest.test("if not run, not loopBody", (function () {
                                                        _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                        ControllerTool$WonderEditor.setIsRun(false);
                                                        _prepareAndExec(60, 20, EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                        var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                        return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                      }));
                                                return Wonder_jest.test("else, not loopBody", (function () {
                                                              _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                              ControllerTool$WonderEditor.setIsRun(true);
                                                              _prepareAndExec(60, 20, EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                              var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                              return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                            }));
                                              }));
                                        describe("test locationInView", (function () {
                                                Wonder_jest.test("test view has no offsetParent", (function () {
                                                        _prepareMouseEvent(sandbox, 1, 2, undefined, /* () */0);
                                                        return _test(/* tuple */[
                                                                    60,
                                                                    20
                                                                  ], /* tuple */[
                                                                    9,
                                                                    18
                                                                  ], EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                      }));
                                                return Wonder_jest.test("test view has offsetParent", (function () {
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
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("bind mousemove event", (function () {
                                var _test = function (param, param$1, param$2) {
                                  PrepareRenderViewJobTool$WonderEditor.setViewRect(100, 50, /* () */0);
                                  StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
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
                                  EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(param[0], param[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                  EventTool$WonderEditor.triggerDomEvent("mousemove", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(param$1[0], param$1[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                  EventTool$WonderEditor.restore(/* () */0);
                                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                  valueX[0],
                                                  valueY[0]
                                                ]), /* tuple */[
                                              param$2[0],
                                              param$2[1]
                                            ]);
                                };
                                describe("test eventTarget is scene view", (function () {
                                        describe("test locationInView", (function () {
                                                describe("test view has no offsetParent", (function () {
                                                        Wonder_jest.test("test trigger in scene view", (function () {
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
                                                        return Wonder_jest.test("test trigger in game view", (function () {
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
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test eventTarget is game view", (function () {
                                        describe("test locationInView", (function () {
                                                describe("test view has no offsetParent", (function () {
                                                        Wonder_jest.test("test trigger in scene view", (function () {
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
                                                        return Wonder_jest.test("test trigger in game view", (function () {
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
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("bind mousedrag event", (function () {
                                describe("test eventTarget is game view", (function () {
                                        describe("test locationInView", (function () {
                                                describe("test view has no offsetParent", (function () {
                                                        return Wonder_jest.test("test trigger in scene view", (function () {
                                                                      _prepareMouseEvent(sandbox, 1, 2, undefined, /* () */0);
                                                                      var param = /* tuple */[
                                                                        60,
                                                                        20
                                                                      ];
                                                                      var param$1 = /* tuple */[
                                                                        20,
                                                                        30
                                                                      ];
                                                                      var param$2 = /* tuple */[
                                                                        -31,
                                                                        28
                                                                      ];
                                                                      PrepareRenderViewJobTool$WonderEditor.setViewRect(100, 50, /* () */0);
                                                                      StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
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
                                                                      EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(param[0], param[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                      EventTool$WonderEditor.triggerDomEvent("mousemove", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(param$1[0], param$1[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                      EventTool$WonderEditor.triggerDomEvent("mouseup", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                      EventTool$WonderEditor.restore(/* () */0);
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                      valueX[0],
                                                                                      valueY[0]
                                                                                    ]), /* tuple */[
                                                                                  param$2[0],
                                                                                  param$2[1]
                                                                                ]);
                                                                    }));
                                                      }));
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("bind keyboard event", (function () {
                        describe("bind keyup event", (function () {
                                var _prepareAndExec = function (keyboardEventName, keyboardDomEventName, param) {
                                  PrepareRenderViewJobTool$WonderEditor.setViewRect(100, 50, /* () */0);
                                  StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                  var value = /* record */[/* contents */0];
                                  StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                          return EventTool$WonderEditor.onKeyboardEvent(keyboardEventName, 0, (function (_, state) {
                                                        value[0] = 1;
                                                        return state;
                                                      }), param);
                                        }));
                                  EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(param[0], param[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                  EventTool$WonderEditor.triggerDomEvent("" + (String(keyboardDomEventName) + ""), EventTool$WonderEditor.getKeyboardEventBindedDom(/* () */0), KeyboardEventTool$WonderEditor.buildKeyboardEvent(undefined, undefined, undefined, undefined, undefined, /* () */0));
                                  EventTool$WonderEditor.restore(/* () */0);
                                  return value;
                                };
                                var _test = function (keyboardEventName, keyboardDomEventName, param) {
                                  var value = _prepareAndExec(keyboardEventName, keyboardDomEventName, /* tuple */[
                                        param[0],
                                        param[1]
                                      ]);
                                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                                };
                                Wonder_jest.test("if is stop, loopBody", (function () {
                                        _prepareKeyboardEvent(sandbox, /* () */0);
                                        ControllerTool$WonderEditor.setIsRun(false);
                                        _prepareAndExec(/* KeyUp_editor */15, "keyup", /* tuple */[
                                              10,
                                              20
                                            ]);
                                        var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                        return Sinon.toCalled(Wonder_jest.Expect[/* expect */0](gl.clearColor));
                                      }));
                                describe("test eventTarget is other", (function () {
                                        describe("do nothing", (function () {
                                                describe("test loopBody", (function () {
                                                        return Wonder_jest.test("if is stop, not loopBody", (function () {
                                                                      _prepareKeyboardEvent(sandbox, /* () */0);
                                                                      ControllerTool$WonderEditor.setIsRun(false);
                                                                      _prepareAndExec(/* KeyUp_editor */15, "keyup", /* tuple */[
                                                                            -1,
                                                                            20
                                                                          ]);
                                                                      var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                                      return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                                    }));
                                                      }));
                                                Wonder_jest.test("not trigger keyup_editor event", (function () {
                                                        _prepareKeyboardEvent(sandbox, /* () */0);
                                                        var value = _prepareAndExec(/* KeyUp_editor */15, "keyup", /* tuple */[
                                                              -1,
                                                              20
                                                            ]);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                                      }));
                                                return Wonder_jest.test("not trigger keyup event", (function () {
                                                              _prepareKeyboardEvent(sandbox, /* () */0);
                                                              var value = _prepareAndExec(/* KeyUp */7, "keyup", /* tuple */[
                                                                    -1,
                                                                    20
                                                                  ]);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test eventTarget is scene view", (function () {
                                        describe("test loopBody", (function () {
                                                Wonder_jest.test("if not run, loopBody", (function () {
                                                        _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                        ControllerTool$WonderEditor.setIsRun(false);
                                                        _prepareAndExec(/* KeyUp_editor */15, "keyup", /* tuple */[
                                                              10,
                                                              20
                                                            ]);
                                                        var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                        return Sinon.toCalled(Wonder_jest.Expect[/* expect */0](gl.clearColor));
                                                      }));
                                                return Wonder_jest.test("else, not loopBody", (function () {
                                                              _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                              ControllerTool$WonderEditor.setIsRun(true);
                                                              _prepareAndExec(/* KeyUp_editor */15, "keyup", /* tuple */[
                                                                    10,
                                                                    20
                                                                  ]);
                                                              var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                              return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                            }));
                                              }));
                                        return Wonder_jest.test("trigger keyup_editor event", (function () {
                                                      _prepareKeyboardEvent(sandbox, /* () */0);
                                                      return _test(/* KeyUp_editor */15, "keyup", /* tuple */[
                                                                  10,
                                                                  20
                                                                ]);
                                                    }));
                                      }));
                                describe("test eventTarget is game view", (function () {
                                        describe("test loopBody", (function () {
                                                Wonder_jest.test("if not run, not loopBody", (function () {
                                                        _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                        ControllerTool$WonderEditor.setIsRun(false);
                                                        _prepareAndExec(/* KeyUp_editor */15, "keyup", /* tuple */[
                                                              60,
                                                              20
                                                            ]);
                                                        var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                        return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                      }));
                                                return Wonder_jest.test("else, not loopBody", (function () {
                                                              _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                              ControllerTool$WonderEditor.setIsRun(true);
                                                              _prepareAndExec(/* KeyUp_editor */15, "keyup", /* tuple */[
                                                                    60,
                                                                    20
                                                                  ]);
                                                              var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                              return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                            }));
                                              }));
                                        Wonder_jest.test("trigger keyup event", (function () {
                                                _prepareKeyboardEvent(sandbox, /* () */0);
                                                return _test(/* KeyUp */7, "keyup", /* tuple */[
                                                            60,
                                                            20
                                                          ]);
                                              }));
                                        describe("trigger refresh_inspector event", (function () {
                                                return Wonder_jest.test("defer 0 ms to exec", (function () {
                                                              Curry._1(TimeoutTool$WonderEditor.buildFakeSetTimeoutFunc, /* () */0);
                                                              _prepareKeyboardEvent(sandbox, /* () */0);
                                                              var value = /* array */[];
                                                              var partial_arg = EventEditorService$WonderEditor.getRefreshInspectorEventName(/* () */0);
                                                              StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                                      return EventTool$WonderEditor.onCustomGlobalEvent(partial_arg, 0, (function ($$event, engineState) {
                                                                                    ArrayService$WonderEditor.push(1, value);
                                                                                    return /* tuple */[
                                                                                            engineState,
                                                                                            $$event
                                                                                          ];
                                                                                  }), param);
                                                                    }));
                                                              _prepareAndExec(/* KeyUp */7, "keyup", /* tuple */[
                                                                    60,
                                                                    20
                                                                  ]);
                                                              var funcArr = Curry._1(TimeoutTool$WonderEditor.getTimeoutFuncArr, /* () */0);
                                                              var match = ArrayService$WonderEditor.unsafeGetFirst(funcArr);
                                                              Curry._1(match[0], /* () */0);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              funcArr.length,
                                                                              value,
                                                                              match[1]
                                                                            ]), /* tuple */[
                                                                          2,
                                                                          /* array */[1],
                                                                          0
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("bind dom event to trigger point event", (function () {
                describe("bind mouse event to trigger point event", (function () {
                        var _prepareAndExec = function (pointEventName, param) {
                          PrepareRenderViewJobTool$WonderEditor.setViewRect(100, 50, /* () */0);
                          StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
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
                          EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(param[0], param[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                          EventTool$WonderEditor.triggerDomEvent("mousewheel", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                          EventTool$WonderEditor.restore(/* () */0);
                          return value;
                        };
                        var _test = function (pointEventName, param) {
                          var value = _prepareAndExec(pointEventName, /* tuple */[
                                param[0],
                                param[1]
                              ]);
                          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                        };
                        describe("test eventTarget is other", (function () {
                                describe("test loopBody", (function () {
                                        return Wonder_jest.test("if is stop, not loopBody", (function () {
                                                      _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                      ControllerTool$WonderEditor.setIsRun(false);
                                                      _prepareAndExec(EventEditorService$WonderEditor.getPointScaleEventName(/* () */0), /* tuple */[
                                                            -1,
                                                            20
                                                          ]);
                                                      var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                      return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                    }));
                                      }));
                                describe("do nothing", (function () {
                                        Wonder_jest.test("not trigger editor point event", (function () {
                                                _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                var value = _prepareAndExec(EventEditorService$WonderEditor.getPointScaleEventName(/* () */0), /* tuple */[
                                                      -1,
                                                      20
                                                    ]);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                              }));
                                        return Wonder_jest.test("not trigger engine point event", (function () {
                                                      _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                      var value = _prepareAndExec(NameEventEngineService$WonderEditor.getPointScaleEventName(/* () */0), /* tuple */[
                                                            -1,
                                                            20
                                                          ]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test eventTarget is scene view", (function () {
                                describe("test loopBody", (function () {
                                        return Wonder_jest.test("if is stop, loopBody", (function () {
                                                      _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                      ControllerTool$WonderEditor.setIsRun(false);
                                                      _prepareAndExec(EventEditorService$WonderEditor.getPointScaleEventName(/* () */0), /* tuple */[
                                                            10,
                                                            20
                                                          ]);
                                                      var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                      return Sinon.toCalled(Wonder_jest.Expect[/* expect */0](gl.clearColor));
                                                    }));
                                      }));
                                return Wonder_jest.test("trigger editor point event", (function () {
                                              _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                              return _test(EventEditorService$WonderEditor.getPointScaleEventName(/* () */0), /* tuple */[
                                                          10,
                                                          20
                                                        ]);
                                            }));
                              }));
                        describe("test eventTarget is game view", (function () {
                                describe("test loopBody", (function () {
                                        return Wonder_jest.test("if is stop, not_ loopBody", (function () {
                                                      _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                      ControllerTool$WonderEditor.setIsRun(false);
                                                      _prepareAndExec(EventEditorService$WonderEditor.getPointScaleEventName(/* () */0), /* tuple */[
                                                            60,
                                                            20
                                                          ]);
                                                      var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                      return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](gl.clearColor)));
                                                    }));
                                      }));
                                Wonder_jest.test("trigger engine point event", (function () {
                                        _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                        return _test(NameEventEngineService$WonderEditor.getPointScaleEventName(/* () */0), /* tuple */[
                                                    60,
                                                    20
                                                  ]);
                                      }));
                                describe("trigger refresh_inspector event", (function () {
                                        return Wonder_jest.test("defer 0 ms to exec", (function () {
                                                      Curry._1(TimeoutTool$WonderEditor.buildFakeSetTimeoutFunc, /* () */0);
                                                      _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                      var value = /* array */[];
                                                      var partial_arg = EventEditorService$WonderEditor.getRefreshInspectorEventName(/* () */0);
                                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                              return EventTool$WonderEditor.onCustomGlobalEvent(partial_arg, 0, (function ($$event, engineState) {
                                                                            ArrayService$WonderEditor.push(1, value);
                                                                            return /* tuple */[
                                                                                    engineState,
                                                                                    $$event
                                                                                  ];
                                                                          }), param);
                                                            }));
                                                      _prepareAndExec(NameEventEngineService$WonderEditor.getPointScaleEventName(/* () */0), /* tuple */[
                                                            60,
                                                            20
                                                          ]);
                                                      var funcArr = Curry._1(TimeoutTool$WonderEditor.getTimeoutFuncArr, /* () */0);
                                                      var match = ArrayService$WonderEditor.unsafeGetFirst(funcArr);
                                                      Curry._1(match[0], /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      funcArr.length,
                                                                      value,
                                                                      match[1]
                                                                    ]), /* tuple */[
                                                                  2,
                                                                  /* array */[1],
                                                                  0
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
