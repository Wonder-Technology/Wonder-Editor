'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var AppStore$WonderEditor = require("../../../src/core/ui/store/AppStore.js");
var EventTool$WonderEditor = require("./tool/EventTool.js");
var JudgeTool$WonderEditor = require("../../tool/JudgeTool.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var ReactTool$WonderEditor = require("../../tool/ui/ReactTool.js");
var SinonTool$WonderEditor = require("../../tool/SinonTool.js");
var GameObjectTool$WonderEditor = require("../../tool/GameObjectTool.js");
var MouseEventTool$WonderEditor = require("./tool/MouseEventTool.js");
var TransformUtils$WonderEditor = require("../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/utils/TransformUtils.js");
var Vector3Service$WonderEditor = require("../../../src/service/primitive/Vector3Service.js");
var ViewToolEngine$WonderEditor = require("../../tool/engine/ViewToolEngine.js");
var FakeGlToolEngine$WonderEditor = require("../../tool/engine/FakeGlToolEngine.js");
var KeyboardEventTool$WonderEditor = require("./tool/KeyboardEventTool.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var BrowserDetectToolEngine$WonderEditor = require("../../tool/engine/BrowserDetectToolEngine.js");
var MainEditorTransformTool$WonderEditor = require("../inspector/composable_component/sceneTree_inspector/transform/tool/MainEditorTransformTool.js");
var PrepareRenderViewJobTool$WonderEditor = require("./tool/PrepareRenderViewJobTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var ArcballCameraControllerToolEngine$WonderEditor = require("../../tool/engine/ArcballCameraControllerToolEngine.js");

Wonder_jest.describe("test init camera controller job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test bind for game view", (function (param) {
                      var _setArballCameraControllerGameObjectToCurrentSceneTreeNode = function (param) {
                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                        var match = ArcballCameraControllerToolEngine$WonderEditor.createGameObject(engineState);
                        StateEngineService$WonderEditor.setState(match[0]);
                        return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(match[1]);
                      };
                      var _prepare = function (param) {
                        _setArballCameraControllerGameObjectToCurrentSceneTreeNode(/* () */0);
                        PrepareRenderViewJobTool$WonderEditor.setViewRect(100, 50, /* () */0);
                        return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                      };
                      var _judgeShouldRemoveLocalEulerAngleData = function (param) {
                        var partial_arg = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                        var localEulerAngle = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                return TransformUtils$WonderEditor.getTransformRotationData(partial_arg, param);
                              }));
                        return JudgeTool$WonderEditor.isEqual(Vector3Service$WonderEditor.truncate(3, localEulerAngle), /* tuple */[
                                    0,
                                    0,
                                    0
                                  ]);
                      };
                      var _judgeRefreshInspector = function (dispatchFuncStub) {
                        return SinonTool$WonderEditor.calledWith(dispatchFuncStub, [
                                    AppStore$WonderEditor.UpdateAction,
                                    /* Update */[/* array */[/* Inspector */2]]
                                  ]);
                      };
                      Wonder_jest.describe("if current scene tree node has arcballCameraController component", (function (param) {
                              var _prepareMouseEvent = function (sandbox, param) {
                                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n      {\n        \"name\": \"init_camera_controller\"\n      }\n          ]\n        }\n      ]\n            ", undefined, "\n    [\n\n        {\n              \"name\": \"init_event_for_editor\"\n        },\n      {\n        \"name\": \"init_camera_controller\"\n      }\n    ]\n            ", undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
                                MouseEventTool$WonderEditor.prepareWithState(sandbox, StateEngineService$WonderEditor.unsafeGetState(/* () */0), undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                return MouseEventTool$WonderEditor.setPointerLocked();
                              };
                              var _prepareAndExec = function (param, triggerFunc) {
                                _prepare(/* () */0);
                                return Curry._2(triggerFunc, param[0], param[1]);
                              };
                              return Wonder_jest.describe("trigger refresh_inspector event", (function (param) {
                                            Wonder_jest.test("test bind point drag event", (function (param) {
                                                    var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                    _prepareMouseEvent(sandbox, /* () */0);
                                                    _prepareAndExec(/* tuple */[
                                                          60,
                                                          20
                                                        ], (function (pageX, pageY) {
                                                            MainEditorTransformTool$WonderEditor.setLocalEulerAngleData(/* () */0);
                                                            EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                            EventTool$WonderEditor.triggerFirstMouseDragOverEvent(MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                            EventTool$WonderEditor.triggerDomEvent("mouseup", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                            return EventTool$WonderEditor.restore(/* () */0);
                                                          }));
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    _judgeShouldRemoveLocalEulerAngleData(/* () */0),
                                                                    _judgeRefreshInspector(dispatchFuncStub)
                                                                  ]), /* tuple */[
                                                                true,
                                                                true
                                                              ]);
                                                  }));
                                            return Wonder_jest.test("test bind point scale event", (function (param) {
                                                          var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                          _prepareMouseEvent(sandbox, /* () */0);
                                                          _prepareAndExec(/* tuple */[
                                                                60,
                                                                20
                                                              ], (function (pageX, pageY) {
                                                                  MainEditorTransformTool$WonderEditor.setLocalEulerAngleData(/* () */0);
                                                                  EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                  EventTool$WonderEditor.triggerDomEvent("mousewheel", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                  return EventTool$WonderEditor.restore(/* () */0);
                                                                }));
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          _judgeShouldRemoveLocalEulerAngleData(/* () */0),
                                                                          _judgeRefreshInspector(dispatchFuncStub)
                                                                        ]), /* tuple */[
                                                                      true,
                                                                      true
                                                                    ]);
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test bind keydown event", (function (param) {
                                    var _prepareKeyboardEvent = function (sandbox, param) {
                                      MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera_controller\"\n            }\n          ]\n        }\n      ]\n            ", undefined, "\n    [\n\n        {\n              \"name\": \"init_event_for_editor\"\n        },\n            {\n              \"name\": \"init_camera_controller\"\n            }\n    ]\n            ", undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
                                      var canvasDom = EventTool$WonderEditor.buildFakeCanvasWithSize(0, 0, /* tuple */[
                                            0,
                                            0,
                                            null
                                          ]);
                                      var engineState = FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), ViewToolEngine$WonderEditor.setCanvas(canvasDom, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                      StateEngineService$WonderEditor.setState(engineState);
                                      return BrowserDetectToolEngine$WonderEditor.setChrome(/* () */0);
                                    };
                                    return Wonder_jest.describe("if current scene tree node has arcballCameraController component", (function (param) {
                                                  var _prepareAndExec = function (param) {
                                                    _prepare(/* () */0);
                                                    MainEditorTransformTool$WonderEditor.setLocalEulerAngleData(/* () */0);
                                                    EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(param[0], param[1], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                    EventTool$WonderEditor.triggerDomEvent("keydown", EventTool$WonderEditor.getKeyboardEventBindedDom(/* () */0), KeyboardEventTool$WonderEditor.buildKeyboardDomEvent(undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                    return EventTool$WonderEditor.restore(/* () */0);
                                                  };
                                                  return Wonder_jest.test("trigger refresh_inspector event", (function (param) {
                                                                var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                                _prepareKeyboardEvent(sandbox, /* () */0);
                                                                _prepareAndExec(/* tuple */[
                                                                      60,
                                                                      20
                                                                    ]);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                _judgeShouldRemoveLocalEulerAngleData(/* () */0),
                                                                                _judgeRefreshInspector(dispatchFuncStub)
                                                                              ]), /* tuple */[
                                                                            true,
                                                                            true
                                                                          ]);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
