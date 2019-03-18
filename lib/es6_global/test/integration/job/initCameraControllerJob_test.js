

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as AppStore$WonderEditor from "../../../src/core/ui/store/AppStore.js";
import * as EventTool$WonderEditor from "./tool/EventTool.js";
import * as JudgeTool$WonderEditor from "../../tool/JudgeTool.js";
import * as MainUtils$WonderEditor from "../../../src/core/utils/engine/MainUtils.js";
import * as ReactTool$WonderEditor from "../../tool/ui/ReactTool.js";
import * as SinonTool$WonderEditor from "../../tool/SinonTool.js";
import * as GameObjectTool$WonderEditor from "../../tool/GameObjectTool.js";
import * as MouseEventTool$WonderEditor from "./tool/MouseEventTool.js";
import * as TransformUtils$WonderEditor from "../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/utils/TransformUtils.js";
import * as Vector3Service$WonderEditor from "../../../src/service/primitive/Vector3Service.js";
import * as ViewToolEngine$WonderEditor from "../../tool/engine/ViewToolEngine.js";
import * as FakeGlToolEngine$WonderEditor from "../../tool/engine/FakeGlToolEngine.js";
import * as KeyboardEventTool$WonderEditor from "./tool/KeyboardEventTool.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as BrowserDetectToolEngine$WonderEditor from "../../tool/engine/BrowserDetectToolEngine.js";
import * as MainEditorTransformTool$WonderEditor from "../inspector/composable_component/sceneTree_inspector/transform/tool/MainEditorTransformTool.js";
import * as PrepareRenderViewJobTool$WonderEditor from "./tool/PrepareRenderViewJobTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as ArcballCameraControllerToolEngine$WonderEditor from "../../tool/engine/ArcballCameraControllerToolEngine.js";

describe("test init camera controller job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test bind for game view", (function () {
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
                describe("if current scene tree node has arcballCameraController component", (function () {
                        var _prepareMouseEvent = function (sandbox, param) {
                          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n      {\n        \"name\": \"init_camera_controller\"\n      }\n          ]\n        }\n      ]\n            ", undefined, "\n    [\n\n        {\n              \"name\": \"init_event_for_editor\"\n        },\n      {\n        \"name\": \"init_camera_controller\"\n      }\n    ]\n            ", undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
                          MouseEventTool$WonderEditor.prepareWithState(sandbox, StateEngineService$WonderEditor.unsafeGetState(/* () */0), undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                          return MouseEventTool$WonderEditor.setPointerLocked();
                        };
                        var _prepareAndExec = function (param, triggerFunc) {
                          _prepare(/* () */0);
                          return Curry._2(triggerFunc, param[0], param[1]);
                        };
                        describe("trigger refresh_inspector event", (function () {
                                Wonder_jest.test("test bind point drag event", (function (param) {
                                        var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                        _prepareMouseEvent(sandbox, /* () */0);
                                        _prepareAndExec(/* tuple */[
                                              60,
                                              20
                                            ], (function (pageX, pageY) {
                                                MainEditorTransformTool$WonderEditor.setLocalEulerAngleData(/* () */0);
                                                EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                EventTool$WonderEditor.triggerDomEvent("mousemove", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
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
                        return /* () */0;
                      }));
                describe("test bind keydown event", (function () {
                        var _prepareKeyboardEvent = function (sandbox, param) {
                          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera_controller\"\n            }\n          ]\n        }\n      ]\n            ", undefined, "\n    [\n\n        {\n              \"name\": \"init_event_for_editor\"\n        },\n            {\n              \"name\": \"init_camera_controller\"\n            }\n    ]\n            ", undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
                          var canvasDom = EventTool$WonderEditor.buildFakeCanvasWithSize(0, 0, /* tuple */[
                                0,
                                0,
                                null
                              ]);
                          var engineState = FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), ViewToolEngine$WonderEditor.setCanvas(canvasDom, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                          StateEngineService$WonderEditor.setState(engineState);
                          return BrowserDetectToolEngine$WonderEditor.setChrome(/* () */0);
                        };
                        describe("if current scene tree node has arcballCameraController component", (function () {
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
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
