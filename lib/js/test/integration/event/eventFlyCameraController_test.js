'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var EventTool$WonderEditor = require("../job/tool/EventTool.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var ControllerTool$WonderEditor = require("../../unit/composable_component/controller/tool/ControllerTool.js");
var MouseEventTool$WonderEditor = require("../job/tool/MouseEventTool.js");
var KeyboardEventTool$WonderEditor = require("../job/tool/KeyboardEventTool.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var FlyCameraEngineService$WonderEditor = require("../../../src/service/state/engine/FlyCameraEngineService.js");
var TransformEngineService$WonderEditor = require("../../../src/service/state/engine/TransformEngineService.js");
var PrepareRenderViewJobTool$WonderEditor = require("../job/tool/PrepareRenderViewJobTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var FlyCameraControllerToolEngine$WonderEditor = require("../../tool/engine/FlyCameraControllerToolEngine.js");
var FlyCameraControllerLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/FlyCameraControllerLogicService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");

Wonder_jest.describe("test fly cameraController event", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareMouseEvent = function (sandbox, param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera\"\n            }\n          ]\n        }\n      ]\n            ", undefined, "\n    [\n\n        {\n              \"name\": \"init_event_for_editor\"\n        },\n            {\n              \"name\": \"init_camera\"\n            }\n    ]\n            ", undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
          MouseEventTool$WonderEditor.prepareWithState(sandbox, StateEngineService$WonderEditor.unsafeGetState(/* () */0), undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
          return MouseEventTool$WonderEditor.setPointerLocked();
        };
        var _prepareMouseEventForTestKeyboardEvent = function (sandbox, bindEventFunc, param) {
          _prepareMouseEvent(sandbox, /* () */0);
          MouseEventTool$WonderEditor.prepareForPointerLock(sandbox, undefined, /* () */0);
          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
          var match = FlyCameraControllerToolEngine$WonderEditor.createGameObject(engineState);
          var cameraController = match[3][0];
          var pos = /* tuple */[
            1,
            2,
            3
          ];
          var engineState$1 = TransformEngineService$WonderEditor.setLocalPosition(pos, match[2], match[0]);
          var engineState$2 = FlyCameraEngineService$WonderEditor.setFlyCameraControllerMoveSpeed(cameraController, 0.8, engineState$1);
          PrepareRenderViewJobTool$WonderEditor.setViewRect(100, 50, /* () */0);
          var engineState$3 = MainUtils$WonderEditor._handleEngineState(engineState$2);
          var engineState$4 = Curry._2(bindEventFunc, cameraController, engineState$3);
          StateEngineService$WonderEditor.setState(engineState$4);
          return /* tuple */[
                  cameraController,
                  0.8,
                  pos
                ];
        };
        var _testPointDragStartEvent = function (sandbox, param, param$1) {
          _prepareMouseEvent(sandbox, /* () */0);
          var requestPointerLockStub = MouseEventTool$WonderEditor.prepareForPointerLock(sandbox, undefined, /* () */0);
          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
          var match = FlyCameraControllerToolEngine$WonderEditor.createGameObject(engineState);
          var engineState$1 = Curry._2(param$1[1], match[3][0], match[0]);
          StateEngineService$WonderEditor.setState(engineState$1);
          PrepareRenderViewJobTool$WonderEditor.setViewRect(100, 50, /* () */0);
          StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
          EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(param[0], param[1], param[2], undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
          EventTool$WonderEditor.restore(/* () */0);
          return Curry._1(param$1[0], requestPointerLockStub);
        };
        var _execKeydownEvent = function (pageX, pageY, keyCode, $staropt$star, $staropt$star$1, param) {
          var ctrlKey = $staropt$star !== undefined ? $staropt$star : false;
          var preventDefaultFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : Sinon.createEmptyStubWithJsObjSandbox(sandbox);
          EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
          EventTool$WonderEditor.triggerDomEvent("keydown", EventTool$WonderEditor.getKeyboardEventBindedDom(/* () */0), KeyboardEventTool$WonderEditor.buildKeyboardDomEvent(ctrlKey, undefined, undefined, undefined, keyCode, preventDefaultFunc, /* () */0));
          return EventTool$WonderEditor.restore(/* () */0);
        };
        var _testKeydownEvent = function (sandbox, param, prepareMouseEventFunc, directionArray) {
          var match = Curry._2(prepareMouseEventFunc, sandbox, /* () */0);
          _execKeydownEvent(param[0], param[1], 65, false, undefined, /* () */0);
          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraEngineService$WonderEditor.unsafeGetFlyCameraControllerDirectionArray(match[0], engineState)), directionArray);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test bind for scene view", (function (param) {
                Wonder_jest.describe("test bind point drag start event", (function (param) {
                        var _test = function (sandbox, param, judgeFunc) {
                          return _testPointDragStartEvent(sandbox, /* tuple */[
                                      param[0],
                                      param[1],
                                      param[2]
                                    ], /* tuple */[
                                      judgeFunc,
                                      FlyCameraControllerLogicService$WonderEditor.bindFlyCameraControllerEventForSceneView
                                    ]);
                        };
                        Wonder_jest.test("if mouse button isn't right button, not trigger", (function (param) {
                                return _test(sandbox, /* tuple */[
                                            10,
                                            20,
                                            1
                                          ], (function (requestPointerLockStub) {
                                              return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](requestPointerLockStub)));
                                            }));
                              }));
                        return Wonder_jest.describe("else", (function (param) {
                                      Wonder_jest.test("if eventTarget is scene view, request canvas pointerLock", (function (param) {
                                              return _test(sandbox, /* tuple */[
                                                          10,
                                                          20,
                                                          3
                                                        ], (function (requestPointerLockStub) {
                                                            return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](requestPointerLockStub));
                                                          }));
                                            }));
                                      return Wonder_jest.test("if eventTarget is game view, not request canvas pointerLock", (function (param) {
                                                    return _test(sandbox, /* tuple */[
                                                                60,
                                                                20,
                                                                3
                                                              ], (function (requestPointerLockStub) {
                                                                  return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](requestPointerLockStub)));
                                                                }));
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test bind point scale start event", (function (param) {
                        return Wonder_jest.test("if mouse button isn't right button, still trigger", (function (param) {
                                      var sandbox$1 = sandbox;
                                      var param$1 = /* tuple */[
                                        200,
                                        1
                                      ];
                                      var judgeFunc = function (cameraController) {
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var __x = FlyCameraEngineService$WonderEditor.unsafeGetFlyCameraControllerGameObject(cameraController, engineState);
                                        var transform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(__x, engineState);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformEngineService$WonderEditor.getLocalPosition(transform, engineState)), /* tuple */[
                                                    0,
                                                    0,
                                                    -2.5
                                                  ]);
                                      };
                                      var sandbox$2 = sandbox$1;
                                      var param$2 = /* tuple */[
                                        param$1[0],
                                        param$1[1]
                                      ];
                                      var param$3 = /* tuple */[
                                        judgeFunc,
                                        FlyCameraControllerLogicService$WonderEditor.bindFlyCameraControllerEventForSceneView
                                      ];
                                      _prepareMouseEvent(sandbox$2, /* () */0);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var match = FlyCameraControllerToolEngine$WonderEditor.createGameObject(engineState);
                                      var cameraController = match[3][0];
                                      var engineState$1 = Curry._2(param$3[1], cameraController, match[0]);
                                      StateEngineService$WonderEditor.setState(engineState$1);
                                      PrepareRenderViewJobTool$WonderEditor.setViewRect(100, 50, /* () */0);
                                      StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                      EventTool$WonderEditor.triggerDomEvent("mousewheel", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(undefined, undefined, param$2[1], undefined, undefined, undefined, Caml_option.some(param$2[0]), undefined, undefined, undefined, /* () */0));
                                      EventTool$WonderEditor.restore(/* () */0);
                                      return Curry._1(param$3[0], cameraController);
                                    }));
                      }));
                return Wonder_jest.describe("test bind keydown event", (function (param) {
                              var _prepareMouseEvent = function (sandbox, param) {
                                return _prepareMouseEventForTestKeyboardEvent(sandbox, FlyCameraControllerLogicService$WonderEditor.bindFlyCameraControllerEventForSceneView, /* () */0);
                              };
                              beforeEach((function () {
                                      return ControllerTool$WonderEditor.setIsRun(false);
                                    }));
                              Wonder_jest.test("if is combined key, not prevent default", (function (param) {
                                      _prepareMouseEventForTestKeyboardEvent(sandbox, FlyCameraControllerLogicService$WonderEditor.bindFlyCameraControllerEventForSceneView, /* () */0);
                                      var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      _execKeydownEvent(10, 20, 65, true, preventDefaultFunc, /* () */0);
                                      return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](preventDefaultFunc)));
                                    }));
                              Wonder_jest.describe("else", (function (param) {
                                      return Wonder_jest.describe("if key affect flyCameraController", (function (param) {
                                                    return Wonder_jest.test("prevent default", (function (param) {
                                                                  _prepareMouseEventForTestKeyboardEvent(sandbox, FlyCameraControllerLogicService$WonderEditor.bindFlyCameraControllerEventForSceneView, /* () */0);
                                                                  var preventDefaultFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                  _execKeydownEvent(10, 20, 65, false, preventDefaultFunc, /* () */0);
                                                                  return Sinon.toCalled(Wonder_jest.Expect[/* expect */0](preventDefaultFunc));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test set target", (function (param) {
                                            Wonder_jest.test("if eventTarget is scene view, move", (function (param) {
                                                    return _testKeydownEvent(sandbox, /* tuple */[
                                                                10,
                                                                20
                                                              ], _prepareMouseEvent, /* array */[/* Left */0]);
                                                  }));
                                            return Wonder_jest.test("if eventTarget is game view, not move", (function (param) {
                                                          return _testKeydownEvent(sandbox, /* tuple */[
                                                                      60,
                                                                      20
                                                                    ], _prepareMouseEvent, /* array */[]);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test bind for game view", (function (param) {
                      Wonder_jest.describe("test bind point drag start event", (function (param) {
                              var _test = function (sandbox, param, judgeFunc) {
                                return _testPointDragStartEvent(sandbox, /* tuple */[
                                            param[0],
                                            param[1],
                                            param[2]
                                          ], /* tuple */[
                                            judgeFunc,
                                            FlyCameraEngineService$WonderEditor.bindFlyCameraControllerEventForGameView
                                          ]);
                              };
                              Wonder_jest.test("if eventTarget is scene view, not request canvas pointerLock", (function (param) {
                                      return _test(sandbox, /* tuple */[
                                                  10,
                                                  20,
                                                  3
                                                ], (function (requestPointerLockStub) {
                                                    return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](requestPointerLockStub)));
                                                  }));
                                    }));
                              return Wonder_jest.describe("if eventTarget is game view", (function (param) {
                                            Wonder_jest.test("if mouse button isn't right button, still trigger", (function (param) {
                                                    return _test(sandbox, /* tuple */[
                                                                60,
                                                                20,
                                                                1
                                                              ], (function (requestPointerLockStub) {
                                                                  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](requestPointerLockStub));
                                                                }));
                                                  }));
                                            return Wonder_jest.test("if eventTarget is game view, request canvas pointerLock", (function (param) {
                                                          return _test(sandbox, /* tuple */[
                                                                      60,
                                                                      20,
                                                                      3
                                                                    ], (function (requestPointerLockStub) {
                                                                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](requestPointerLockStub));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test bind keydown event", (function (param) {
                                    var _prepareMouseEvent = function (sandbox, param) {
                                      return _prepareMouseEventForTestKeyboardEvent(sandbox, FlyCameraEngineService$WonderEditor.bindFlyCameraControllerEventForGameView, /* () */0);
                                    };
                                    return Wonder_jest.describe("test set target", (function (param) {
                                                  Wonder_jest.test("if eventTarget is scene view, not move", (function (param) {
                                                          return _testKeydownEvent(sandbox, /* tuple */[
                                                                      10,
                                                                      20
                                                                    ], _prepareMouseEvent, /* array */[]);
                                                        }));
                                                  return Wonder_jest.test("if eventTarget is game view, move", (function (param) {
                                                                return _testKeydownEvent(sandbox, /* tuple */[
                                                                            60,
                                                                            20
                                                                          ], _prepareMouseEvent, /* array */[/* Left */0]);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
