'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var EventTool$WonderEditor = require("./tool/EventTool.js");
var MouseEventTool$WonderEditor = require("./tool/MouseEventTool.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var InspectorCanvasEventTool$WonderEditor = require("./tool/InspectorCanvasEventTool.js");
var InspectorEventEditorService$WonderEditor = require("../../../src/service/state/editor/event/InspectorEventEditorService.js");
var StateInspectorEngineService$WonderEditor = require("../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");

Wonder_jest.describe("init event for inspector job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("bind dom event", (function (param) {
                return Wonder_jest.describe("bind mouse event", (function (param) {
                              return Wonder_jest.describe("bind mousedrag event", (function (param) {
                                            return Wonder_jest.describe("test event target is inspector", (function (param) {
                                                          return Wonder_jest.describe("test locationInView", (function (param) {
                                                                        return Wonder_jest.test("test trigger mousedragstart, mousedragover, mousedragdrop event", (function (param) {
                                                                                      InspectorCanvasEventTool$WonderEditor.prepareMouseEvent(sandbox, undefined, undefined, 1, 2, /* () */0);
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
                                                                                        59,
                                                                                        18
                                                                                      ];
                                                                                      var param$5 = /* tuple */[
                                                                                        19,
                                                                                        28
                                                                                      ];
                                                                                      var param$6 = /* tuple */[
                                                                                        9,
                                                                                        20
                                                                                      ];
                                                                                      var x1 = /* record */[/* contents */0];
                                                                                      var y1 = /* record */[/* contents */0];
                                                                                      var x2 = /* record */[/* contents */0];
                                                                                      var y2 = /* record */[/* contents */0];
                                                                                      var x3 = /* record */[/* contents */0];
                                                                                      var y3 = /* record */[/* contents */0];
                                                                                      var engineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                      StateInspectorEngineService$WonderEditor.setState(EventTool$WonderEditor.onMouseEvent(/* MouseDragDrop */8, 0, (function ($$event, state) {
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
        return Wonder_jest.describe("bind dom event to trigger point event", (function (param) {
                      return Wonder_jest.describe("bind mouse event to trigger point event", (function (param) {
                                    var _prepareAndExec = function (pointEventName, param) {
                                      var value = /* record */[/* contents */0];
                                      StateLogicService$WonderEditor.getAndSetInspectorEngineState((function (param) {
                                              return EventTool$WonderEditor.onCustomGlobalEvent(pointEventName, 0, (function ($$event, state) {
                                                            value[0] = 1;
                                                            return /* tuple */[
                                                                    state,
                                                                    $$event
                                                                  ];
                                                          }), param);
                                            }));
                                      EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(param[0], param[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                      EventTool$WonderEditor.restore(/* () */0);
                                      return value;
                                    };
                                    Wonder_jest.describe("test event target is Other", (function (param) {
                                            return Wonder_jest.describe("do nothing", (function (param) {
                                                          return Wonder_jest.test("not trigger editor point event", (function (param) {
                                                                        InspectorCanvasEventTool$WonderEditor.prepareMouseEvent(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                                        var value = _prepareAndExec(InspectorEventEditorService$WonderEditor.getPointDragStartEventName(/* () */0), /* tuple */[
                                                                              -1,
                                                                              20
                                                                            ]);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 0);
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test event target is Inspector", (function (param) {
                                                  return Wonder_jest.test("trigger editor point event", (function (param) {
                                                                InspectorCanvasEventTool$WonderEditor.prepareMouseEvent(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                                                                var pointEventName = InspectorEventEditorService$WonderEditor.getPointDragStartEventName(/* () */0);
                                                                var param$1 = /* tuple */[
                                                                  10,
                                                                  20
                                                                ];
                                                                var value = _prepareAndExec(pointEventName, /* tuple */[
                                                                      param$1[0],
                                                                      param$1[1]
                                                                    ]);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), 1);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
