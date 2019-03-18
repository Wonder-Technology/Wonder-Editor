

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../src/core/utils/console/LogUtils.js";
import * as EventTool$WonderEditor from "./tool/EventTool.js";
import * as MainUtils$WonderEditor from "../../../src/core/utils/engine/MainUtils.js";
import * as ControllerTool$WonderEditor from "../../unit/composable_component/controller/tool/ControllerTool.js";
import * as MouseEventTool$WonderEditor from "./tool/MouseEventTool.js";
import * as ViewToolEngine$WonderEditor from "../../tool/engine/ViewToolEngine.js";
import * as FakeGlToolEngine$WonderEditor from "../../tool/engine/FakeGlToolEngine.js";
import * as KeyboardEventTool$WonderEditor from "./tool/KeyboardEventTool.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as BrowserDetectToolEngine$WonderEditor from "../../tool/engine/BrowserDetectToolEngine.js";
import * as PrepareRenderViewJobTool$WonderEditor from "./tool/PrepareRenderViewJobTool.js";
import * as TargetEventEditorService$WonderEditor from "../../../src/service/state/editor/event/TargetEventEditorService.js";
import * as GameViewEventEditorService$WonderEditor from "../../../src/service/state/editor/event/GameViewEventEditorService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as SceneViewEventEditorService$WonderEditor from "../../../src/service/state/editor/event/SceneViewEventEditorService.js";

describe("init event job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareMouseEvent = function (sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
          var offsetLeft = $staropt$star !== undefined ? $staropt$star : 1;
          var offsetTop = $staropt$star$1 !== undefined ? $staropt$star$1 : 2;
          var offsetParent = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera\"\n            }\n          ]\n        }\n      ]\n            ", undefined, "\n    [\n\n        {\n              \"name\": \"init_event_for_editor\"\n        },\n            {\n              \"name\": \"init_camera\"\n            }\n    ]\n            ", undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
          MouseEventTool$WonderEditor.prepareWithState(sandbox, StateEngineService$WonderEditor.unsafeGetState(/* () */0), undefined, undefined, offsetLeft, offsetTop, Caml_option.some(offsetParent), undefined, /* () */0);
          return MouseEventTool$WonderEditor.setPointerLocked();
        };
        var _prepareKeyboardEvent = function (sandbox, param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera\"\n            }\n          ]\n        }\n      ]\n            ", undefined, "\n    [\n\n        {\n              \"name\": \"init_event_for_editor\"\n        },\n            {\n              \"name\": \"init_camera\"\n            }\n    ]\n            ", undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
          var canvasDom = EventTool$WonderEditor.buildFakeCanvasWithSize(0, 0, /* tuple */[
                0,
                0,
                null
              ]);
          var engineState = FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), ViewToolEngine$WonderEditor.setCanvas(canvasDom, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
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
        describe("bind dom event", (function () {
                describe("bind mouse event", (function () {
                        describe("bind contextmenu event", (function () {
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
                        describe("bind mousewheel event", (function () {
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
                                describe("set event target", (function () {
                                        return Wonder_jest.test("if event->target isn't canvas, set to Other", (function (param) {
                                                      _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                      _prepareAndExec(10, 20, EventTool$WonderEditor.buildBodyTarget(/* () */0));
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TargetEventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0))), /* Other */2);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("bind mousedown event", (function () {
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
                                describe("test set event target to Other", (function () {
                                        Wonder_jest.test("if event->target isn't canvas, set to Other", (function (param) {
                                                _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                _prepareAndExec(10, 20, EventTool$WonderEditor.buildBodyTarget(/* () */0));
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TargetEventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0))), /* Other */2);
                                              }));
                                        describe("else", (function () {
                                                return Wonder_jest.test("if mousedown position is out of canvas, set to Other", (function (param) {
                                                              _prepareMouseEvent(sandbox, undefined, undefined, undefined, /* () */0);
                                                              _prepareAndExec(-1, 20, EventTool$WonderEditor.buildCanvasTarget(/* () */0));
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TargetEventEditorService$WonderEditor.getEventTarget(StateEditorService$WonderEditor.getState(/* () */0))), /* Other */2);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test trigger in scene view", (function () {
                                        describe("test loopBody", (function () {
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
                                        describe("test locationInView", (function () {
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
                                        return /* () */0;
                                      }));
                                describe("test trigger in game view", (function () {
                                        describe("test loopBody", (function () {
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
                                        describe("test locationInView", (function () {
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
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("bind mousemove event", (function () {
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
                                describe("test event target is scene view", (function () {
                                        describe("test locationInView", (function () {
                                                describe("test view has no offsetParent", (function () {
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
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test event target is game view", (function () {
                                        describe("test locationInView", (function () {
                                                describe("test view has no offsetParent", (function () {
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
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("bind mousedrag event", (function () {
                                describe("test event target is game view", (function () {
                                        describe("test locationInView", (function () {
                                                describe("test view has no offsetParent", (function () {
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
                                                                      EventTool$WonderEditor.triggerDomEvent("mousemove", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(param$2[0], param$2[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
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
                                describe("test event target is other", (function () {
                                        describe("do nothing", (function () {
                                                describe("test loopBody", (function () {
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
                                        return /* () */0;
                                      }));
                                describe("test event target is scene view", (function () {
                                        describe("test loopBody", (function () {
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
                                describe("test event target is game view", (function () {
                                        describe("test loopBody", (function () {
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
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("bind dom event to trigger point event", (function () {
                describe("bind mouse event to trigger point event", (function () {
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
                        describe("test event target is other", (function () {
                                describe("test loopBody", (function () {
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
                                describe("do nothing", (function () {
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
                                return /* () */0;
                              }));
                        describe("test event target is scene view", (function () {
                                describe("test loopBody", (function () {
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
                        describe("test event target is game view", (function () {
                                describe("test loopBody", (function () {
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
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test handle error", (function () {
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
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
