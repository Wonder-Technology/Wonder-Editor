

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as EventTool$WonderEditor from "../job/tool/EventTool.js";
import * as MainUtils$WonderEditor from "../../../src/core/utils/engine/MainUtils.js";
import * as MouseEventTool$WonderEditor from "../job/tool/MouseEventTool.js";
import * as KeyboardEventTool$WonderEditor from "../job/tool/KeyboardEventTool.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as TransformEngineService$WonderEditor from "../../../src/service/state/engine/TransformEngineService.js";
import * as PrepareRenderViewJobTool$WonderEditor from "../job/tool/PrepareRenderViewJobTool.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as ArcballCameraControllerToolEngine$WonderEditor from "../../tool/engine/ArcballCameraControllerToolEngine.js";
import * as ArcballCameraControllerLogicService$WonderEditor from "../../../src/service/stateTuple/logic/ArcballCameraControllerLogicService.js";

describe("test arcball cameraController event", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareMouseEvent = function (sandbox, _) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera\"\n            }\n          ]\n        }\n      ]\n            ", undefined, "\n    [\n\n        {\n              \"name\": \"init_event_for_editor\"\n        },\n            {\n              \"name\": \"init_camera\"\n            }\n    ]\n            ", undefined, /* () */0), undefined, undefined, false, /* () */0);
          MouseEventTool$WonderEditor.prepareWithState(sandbox, StateEngineService$WonderEditor.unsafeGetState(/* () */0), undefined, undefined, undefined, undefined, /* () */0);
          return MouseEventTool$WonderEditor.setPointerLocked();
        };
        var _prepareMouseEventForTestKeyboardEvent = function (sandbox, bindEventFunc, _) {
          _prepareMouseEvent(sandbox, /* () */0);
          MouseEventTool$WonderEditor.prepareForPointerLock(sandbox);
          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
          var match = ArcballCameraControllerToolEngine$WonderEditor.createGameObject(engineState);
          var cameraController = match[3][0];
          var pos = /* tuple */[
            1,
            2,
            3
          ];
          var engineState$1 = TransformEngineService$WonderEditor.setLocalPosition(pos, match[2], match[0]);
          var engineState$2 = ArcballCameraEngineService$WonderEditor.setArcballCameraControllerMoveSpeedY(cameraController, 0.2, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerMoveSpeedX(cameraController, 0.1, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerTarget(cameraController, pos, engineState$1)));
          PrepareRenderViewJobTool$WonderEditor.setViewRect(100, 50, /* () */0);
          var engineState$3 = MainUtils$WonderEditor._handleEngineState(engineState$2);
          var engineState$4 = Curry._2(bindEventFunc, cameraController, engineState$3);
          StateEngineService$WonderEditor.setState(engineState$4);
          return /* tuple */[
                  cameraController,
                  /* tuple */[
                    0.1,
                    0.2
                  ],
                  pos
                ];
        };
        var _testPointDownEvent = function (sandbox, param, param$1) {
          _prepareMouseEvent(sandbox, /* () */0);
          var requestPointerLockStub = MouseEventTool$WonderEditor.prepareForPointerLock(sandbox);
          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
          var match = ArcballCameraControllerToolEngine$WonderEditor.createGameObject(engineState);
          var engineState$1 = Curry._2(param$1[1], match[3][0], match[0]);
          StateEngineService$WonderEditor.setState(engineState$1);
          PrepareRenderViewJobTool$WonderEditor.setViewRect(100, 50, /* () */0);
          StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
          EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(param[0], param[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
          EventTool$WonderEditor.restore(/* () */0);
          return Curry._1(param$1[0], requestPointerLockStub);
        };
        var _testKeydownEvent = function (sandbox, param, param$1) {
          var match = Curry._2(param$1[1], sandbox, /* () */0);
          var match$1 = match[2];
          var match$2 = match[1];
          EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseEvent(param[0], param[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
          EventTool$WonderEditor.triggerDomEvent("keydown", EventTool$WonderEditor.getKeyboardEventBindedDom(/* () */0), KeyboardEventTool$WonderEditor.buildKeyboardEvent(undefined, undefined, undefined, undefined, 65, /* () */0));
          EventTool$WonderEditor.restore(/* () */0);
          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTarget(match[0], engineState)), Curry._2(param$1[0], /* tuple */[
                          match$2[0],
                          match$2[1]
                        ], /* tuple */[
                          match$1[0],
                          match$1[1],
                          match$1[2]
                        ]));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test bind for scene view", (function () {
                describe("test bind point down event", (function () {
                        var _test = function (sandbox, param, judgeFunc) {
                          return _testPointDownEvent(sandbox, /* tuple */[
                                      param[0],
                                      param[1]
                                    ], /* tuple */[
                                      judgeFunc,
                                      ArcballCameraControllerLogicService$WonderEditor.bindArcballCameraControllerEventForSceneView
                                    ]);
                        };
                        Wonder_jest.test("if eventTarget is scene view, request canvas pointerLock", (function () {
                                return _test(sandbox, /* tuple */[
                                            10,
                                            20
                                          ], (function (requestPointerLockStub) {
                                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](requestPointerLockStub));
                                            }));
                              }));
                        return Wonder_jest.test("if eventTarget is game view, not request canvas pointerLock", (function () {
                                      return _test(sandbox, /* tuple */[
                                                  60,
                                                  20
                                                ], (function (requestPointerLockStub) {
                                                    return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](requestPointerLockStub)));
                                                  }));
                                    }));
                      }));
                describe("test bind keydown event", (function () {
                        describe("test set target", (function () {
                                var _prepareMouseEvent = function (sandbox, _) {
                                  return _prepareMouseEventForTestKeyboardEvent(sandbox, ArcballCameraControllerLogicService$WonderEditor.bindArcballCameraControllerEventForSceneView, /* () */0);
                                };
                                Wonder_jest.test("if eventTarget is scene view, move", (function () {
                                        return _testKeydownEvent(sandbox, /* tuple */[
                                                    10,
                                                    20
                                                  ], /* tuple */[
                                                    (function (param, param$1) {
                                                        return /* tuple */[
                                                                param$1[0] - param[0],
                                                                param$1[1],
                                                                param$1[2]
                                                              ];
                                                      }),
                                                    _prepareMouseEvent
                                                  ]);
                                      }));
                                return Wonder_jest.test("if eventTarget is game view, not move", (function () {
                                              return _testKeydownEvent(sandbox, /* tuple */[
                                                          60,
                                                          20
                                                        ], /* tuple */[
                                                          (function (_, param) {
                                                              return /* tuple */[
                                                                      param[0],
                                                                      param[1],
                                                                      param[2]
                                                                    ];
                                                            }),
                                                          _prepareMouseEvent
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test bind for game view", (function () {
                describe("test bind point down event", (function () {
                        var _test = function (sandbox, param, judgeFunc) {
                          return _testPointDownEvent(sandbox, /* tuple */[
                                      param[0],
                                      param[1]
                                    ], /* tuple */[
                                      judgeFunc,
                                      ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEventForGameView
                                    ]);
                        };
                        Wonder_jest.test("if eventTarget is scene view, not request canvas pointerLock", (function () {
                                return _test(sandbox, /* tuple */[
                                            10,
                                            20
                                          ], (function (requestPointerLockStub) {
                                              return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](requestPointerLockStub)));
                                            }));
                              }));
                        return Wonder_jest.test("if eventTarget is game view, request canvas pointerLock", (function () {
                                      return _test(sandbox, /* tuple */[
                                                  60,
                                                  20
                                                ], (function (requestPointerLockStub) {
                                                    return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](requestPointerLockStub));
                                                  }));
                                    }));
                      }));
                describe("test bind keydown event", (function () {
                        describe("test set target", (function () {
                                var _prepareMouseEvent = function (sandbox, _) {
                                  return _prepareMouseEventForTestKeyboardEvent(sandbox, ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEventForGameView, /* () */0);
                                };
                                Wonder_jest.test("if eventTarget is scene view, not move", (function () {
                                        return _testKeydownEvent(sandbox, /* tuple */[
                                                    10,
                                                    20
                                                  ], /* tuple */[
                                                    (function (_, param) {
                                                        return /* tuple */[
                                                                param[0],
                                                                param[1],
                                                                param[2]
                                                              ];
                                                      }),
                                                    _prepareMouseEvent
                                                  ]);
                                      }));
                                return Wonder_jest.test("if eventTarget is game view, move", (function () {
                                              return _testKeydownEvent(sandbox, /* tuple */[
                                                          60,
                                                          20
                                                        ], /* tuple */[
                                                          (function (param, param$1) {
                                                              return /* tuple */[
                                                                      param$1[0] - param[0],
                                                                      param$1[1],
                                                                      param$1[2]
                                                                    ];
                                                            }),
                                                          _prepareMouseEvent
                                                        ]);
                                            }));
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
