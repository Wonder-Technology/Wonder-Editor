'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var AppStore$WonderEditor = require("../../../../../../../src/core/ui/store/AppStore.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var ReactTool$WonderEditor = require("../../../../../../tool/ui/ReactTool.js");
var FloatService$WonderEditor = require("../../../../../../../src/service/atom/FloatService.js");
var InspectorTool$WonderEditor = require("../../../../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var Vector3Service$WonderEditor = require("../../../../../../../src/service/primitive/Vector3Service.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var MainEditorTransformTool$WonderEditor = require("../../transform/tool/MainEditorTransformTool.js");
var ArcballCameraEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/ArcballCameraEngineService.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../../../atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");
var MainEditorArcballCameraControllerTool$WonderEditor = require("./tool/MainEditorArcballCameraControllerTool.js");

Wonder_jest.describe("MainEditor ArcballCameraController", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test set currentSceneTreeNode to be camera", (function (param) {
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
                      Wonder_jest.describe("test change arcballCameraController distance", (function (param) {
                              Wonder_jest.test("test change should set into engine", (function (param) {
                                      MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                      var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                      MainEditorArcballCameraControllerTool$WonderEditor.changeDistanceAndBlur(currentGameObjectArcballCamera, 21.1, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance(currentGameObjectArcballCamera, param);
                                                              })), 5)), 21.1);
                                    }));
                              Wonder_jest.describe("if blur", (function (param) {
                                      return Wonder_jest.describe("not refresh inspector", (function (param) {
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
                                    }));
                              return Wonder_jest.describe("if drag drop", (function (param) {
                                            return Wonder_jest.describe("refresh inspector", (function (param) {
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
                                          }));
                            }));
                      Wonder_jest.describe("test change arcballCameraController minDistance", (function (param) {
                              return Wonder_jest.test("test change should set into engine", (function (param) {
                                            MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                            var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                            MainEditorArcballCameraControllerTool$WonderEditor.changeMinDistanceAndBlur(currentGameObjectArcballCamera, 11.1, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                      return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerMinDistance(currentGameObjectArcballCamera, param);
                                                                    })), 5)), 11.1);
                                          }));
                            }));
                      Wonder_jest.describe("test change arcballCameraController phi", (function (param) {
                              return Wonder_jest.test("test change should set into engine", (function (param) {
                                            MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                            var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                            MainEditorArcballCameraControllerTool$WonderEditor.changePhiAndBlur(currentGameObjectArcballCamera, 11.1, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                      return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerPhi(currentGameObjectArcballCamera, param);
                                                                    })), 5)), 11.1);
                                          }));
                            }));
                      Wonder_jest.describe("test change arcballCameraController theta", (function (param) {
                              return Wonder_jest.test("test change should set into engine", (function (param) {
                                            MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                            var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                            MainEditorArcballCameraControllerTool$WonderEditor.changeThetaAndBlur(currentGameObjectArcballCamera, 2.0, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                      return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTheta(currentGameObjectArcballCamera, param);
                                                                    })), 5)), 2.0);
                                          }));
                            }));
                      Wonder_jest.describe("test change arcballCameraController target", (function (param) {
                              Wonder_jest.describe("test change should set into engine", (function (param) {
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
                              return Wonder_jest.describe("if blur", (function (param) {
                                            return Wonder_jest.describe("not refresh inspector", (function (param) {
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
                                          }));
                            }));
                      return Wonder_jest.describe("add shade dom for transformComponent if has arcballCameraController", (function (param) {
                                    return Wonder_jest.test("test snapshot for transform component", (function (param) {
                                                  MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                                  var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
