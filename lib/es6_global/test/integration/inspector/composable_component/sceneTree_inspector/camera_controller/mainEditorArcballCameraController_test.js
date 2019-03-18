

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as AppStore$WonderEditor from "../../../../../../src/core/ui/store/AppStore.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as ReactTool$WonderEditor from "../../../../../tool/ui/ReactTool.js";
import * as FloatService$WonderEditor from "../../../../../../src/service/atom/FloatService.js";
import * as InspectorTool$WonderEditor from "../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";
import * as Vector3Service$WonderEditor from "../../../../../../src/service/primitive/Vector3Service.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as MainEditorTransformTool$WonderEditor from "../transform/tool/MainEditorTransformTool.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as MainEditorInspectorAddComponentTool$WonderEditor from "../../../atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js";
import * as MainEditorArcballCameraControllerTool$WonderEditor from "./tool/MainEditorArcballCameraControllerTool.js";

describe("MainEditor ArcballCameraController", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set currentSceneTreeNode to be camera", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                        var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                    }));
                      }));
                Wonder_jest.test("test ui", (function (param) {
                        MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                      }));
                describe("test change arcballCameraController distance", (function () {
                        Wonder_jest.test("test change should set into engine", (function (param) {
                                MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                MainEditorArcballCameraControllerTool$WonderEditor.changeDistanceAndBlur(currentGameObjectArcballCamera, 21.1, undefined, undefined, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                          return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance(currentGameObjectArcballCamera, param);
                                                        })), 5)), 21.1);
                              }));
                        describe("if blur", (function () {
                                describe("not refresh inspector", (function () {
                                        var _prepareAndExec = function (dispatchFuncStub) {
                                          MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                          MainEditorTransformTool$WonderEditor.setLocalEulerAngleData(/* () */0);
                                          var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                          var dispatchFuncCallCountBeforeChangeTarget = Sinon.getCallCount(dispatchFuncStub);
                                          MainEditorArcballCameraControllerTool$WonderEditor.changeDistanceAndBlur(currentGameObjectArcballCamera, 21.1, undefined, undefined, /* () */0);
                                          return dispatchFuncCallCountBeforeChangeTarget;
                                        };
                                        Wonder_jest.test("shouldn't remove current scene tree node->local euler angle data", (function (param) {
                                                _prepareAndExec(ReactTool$WonderEditor.createDispatchFuncStub(sandbox));
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorTransformTool$WonderEditor.judgeShouldRemoveLocalEulerAngleData(/* () */0)), false);
                                              }));
                                        return Wonder_jest.test("not refresh inspector", (function (param) {
                                                      var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                      var dispatchFuncCallCountBeforeChangeTarget = _prepareAndExec(dispatchFuncStub);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg([
                                                                              AppStore$WonderEditor.UpdateAction,
                                                                              /* Update */[/* array */[/* Inspector */2]]
                                                                            ], dispatchFuncStub))), dispatchFuncCallCountBeforeChangeTarget);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("if drag drop", (function () {
                                describe("refresh inspector", (function () {
                                        var _prepareAndExec = function (dispatchFuncStub) {
                                          MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                          MainEditorTransformTool$WonderEditor.setLocalEulerAngleData(/* () */0);
                                          var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                          var dispatchFuncCallCountBeforeChangeTarget = Sinon.getCallCount(dispatchFuncStub);
                                          MainEditorArcballCameraControllerTool$WonderEditor.changeDistanceAndDragDrop(currentGameObjectArcballCamera, 21.1, 21.1, undefined, undefined, /* () */0);
                                          return dispatchFuncCallCountBeforeChangeTarget;
                                        };
                                        Wonder_jest.test("should remove current scene tree node->local euler angle data", (function (param) {
                                                _prepareAndExec(ReactTool$WonderEditor.createDispatchFuncStub(sandbox));
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorTransformTool$WonderEditor.judgeShouldRemoveLocalEulerAngleData(/* () */0)), true);
                                              }));
                                        return Wonder_jest.test("refresh inspector", (function (param) {
                                                      var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                      var dispatchFuncCallCountBeforeChangeTarget = _prepareAndExec(dispatchFuncStub);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg([
                                                                              AppStore$WonderEditor.UpdateAction,
                                                                              /* Update */[/* array */[/* Inspector */2]]
                                                                            ], dispatchFuncStub))), dispatchFuncCallCountBeforeChangeTarget + 1 | 0);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test change arcballCameraController minDistance", (function () {
                        return Wonder_jest.test("test change should set into engine", (function (param) {
                                      MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                      var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                      MainEditorArcballCameraControllerTool$WonderEditor.changeMinDistanceAndBlur(currentGameObjectArcballCamera, 11.1, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerMinDistance(currentGameObjectArcballCamera, param);
                                                              })), 5)), 11.1);
                                    }));
                      }));
                describe("test change arcballCameraController phi", (function () {
                        return Wonder_jest.test("test change should set into engine", (function (param) {
                                      MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                      var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                      MainEditorArcballCameraControllerTool$WonderEditor.changePhiAndBlur(currentGameObjectArcballCamera, 11.1, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerPhi(currentGameObjectArcballCamera, param);
                                                              })), 5)), 11.1);
                                    }));
                      }));
                describe("test change arcballCameraController theta", (function () {
                        return Wonder_jest.test("test change should set into engine", (function (param) {
                                      MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                      var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                      MainEditorArcballCameraControllerTool$WonderEditor.changeThetaAndBlur(currentGameObjectArcballCamera, 2.0, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTheta(currentGameObjectArcballCamera, param);
                                                              })), 5)), 2.0);
                                    }));
                      }));
                describe("test change arcballCameraController target", (function () {
                        describe("test change should set into engine", (function () {
                                var _test = function (changeAndBlurFunc, getTargetTargetFunc) {
                                  MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                  var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                  Curry._3(changeAndBlurFunc, currentGameObjectArcballCamera, 11.1, /* () */0);
                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(5, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                            return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTarget(currentGameObjectArcballCamera, param);
                                                          })))), Curry._1(getTargetTargetFunc, 11.1));
                                };
                                Wonder_jest.test("test change target x", (function (param) {
                                        var arg = TestTool$WonderEditor.buildEmptyAppState(/* () */0);
                                        var arg$1 = TestTool$WonderEditor.getDispatch(/* () */0);
                                        return _test((function (param) {
                                                      var func = function (param$1, param$2, param$3, param$4) {
                                                        return MainEditorArcballCameraControllerTool$WonderEditor.changeTargetXAndBlur(param, param$1, param$2, param$3, param$4);
                                                      };
                                                      return (function (param) {
                                                          return Curry._3(func, param, arg, arg$1);
                                                        });
                                                    }), (function (value) {
                                                      return /* tuple */[
                                                              value,
                                                              0,
                                                              0
                                                            ];
                                                    }));
                                      }));
                                Wonder_jest.test("test change target y", (function (param) {
                                        var arg = TestTool$WonderEditor.buildEmptyAppState(/* () */0);
                                        var arg$1 = TestTool$WonderEditor.getDispatch(/* () */0);
                                        return _test((function (param) {
                                                      var func = function (param$1, param$2, param$3, param$4) {
                                                        return MainEditorArcballCameraControllerTool$WonderEditor.changeTargetYAndBlur(param, param$1, param$2, param$3, param$4);
                                                      };
                                                      return (function (param) {
                                                          return Curry._3(func, param, arg, arg$1);
                                                        });
                                                    }), (function (value) {
                                                      return /* tuple */[
                                                              0,
                                                              value,
                                                              0
                                                            ];
                                                    }));
                                      }));
                                return Wonder_jest.test("test change target z", (function (param) {
                                              var arg = TestTool$WonderEditor.buildEmptyAppState(/* () */0);
                                              var arg$1 = TestTool$WonderEditor.getDispatch(/* () */0);
                                              return _test((function (param) {
                                                            var func = function (param$1, param$2, param$3, param$4) {
                                                              return MainEditorArcballCameraControllerTool$WonderEditor.changeTargetZAndBlur(param, param$1, param$2, param$3, param$4);
                                                            };
                                                            return (function (param) {
                                                                return Curry._3(func, param, arg, arg$1);
                                                              });
                                                          }), (function (value) {
                                                            return /* tuple */[
                                                                    0,
                                                                    0,
                                                                    value
                                                                  ];
                                                          }));
                                            }));
                              }));
                        describe("if blur", (function () {
                                describe("not refresh inspector", (function () {
                                        var _prepareAndExec = function (dispatchFuncStub) {
                                          MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                          MainEditorTransformTool$WonderEditor.setLocalEulerAngleData(/* () */0);
                                          var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                          var dispatchFuncCallCountBeforeChangeTarget = Sinon.getCallCount(dispatchFuncStub);
                                          MainEditorArcballCameraControllerTool$WonderEditor.changeTargetXAndBlur(currentGameObjectArcballCamera, 21.1, undefined, undefined, /* () */0);
                                          return dispatchFuncCallCountBeforeChangeTarget;
                                        };
                                        Wonder_jest.test("shouldn't remove current scene tree node->local euler angle data", (function (param) {
                                                _prepareAndExec(ReactTool$WonderEditor.createDispatchFuncStub(sandbox));
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorTransformTool$WonderEditor.judgeShouldRemoveLocalEulerAngleData(/* () */0)), false);
                                              }));
                                        return Wonder_jest.test("not refresh inspector", (function (param) {
                                                      var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                      var dispatchFuncCallCountBeforeChangeTarget = _prepareAndExec(dispatchFuncStub);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg([
                                                                              AppStore$WonderEditor.UpdateAction,
                                                                              /* Update */[/* array */[/* Inspector */2]]
                                                                            ], dispatchFuncStub))), dispatchFuncCallCountBeforeChangeTarget);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("add shade dom for transformComponent if has arcballCameraController", (function () {
                        return Wonder_jest.test("test snapshot for transform component", (function (param) {
                                      MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                      var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
