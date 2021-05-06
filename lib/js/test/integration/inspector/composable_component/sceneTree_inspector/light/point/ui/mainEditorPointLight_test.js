'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var FloatService$WonderEditor = require("../../../../../../../../src/service/atom/FloatService.js");
var PickColorTool$WonderEditor = require("../../../../../../../tool/PickColorTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var DirectorToolEngine$WonderEditor = require("../../../../../../../tool/engine/DirectorToolEngine.js");
var MainEditorLightTool$WonderEditor = require("../../tool/MainEditorLightTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../../tool/MainEditorSceneTool.js");
var PointLightEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/PointLightEngineService.js");
var MainEditorPointLightTool$WonderEditor = require("../tool/MainEditorPointLightTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");

Wonder_jest.describe("MainEditorPointLight", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareWithEmptyJob = function (param) {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test set currentSceneTreeNode", (function (param) {
                      var _prepareWithJob = function (param) {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                        return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                      };
                      Wonder_jest.describe("test change color", (function (param) {
                              beforeEach((function () {
                                      _prepareWithJob(/* () */0);
                                      MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                                              return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene));
                                            }));
                                      DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                                      return MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
                                    }));
                              return PickColorTool$WonderEditor.testOperateColorPickToChangeColor(sandbox, /* tuple */[
                                          GameObjectTool$WonderEditor.getCurrentSceneTreeNodePointLightComponent,
                                          MainEditorPointLightTool$WonderEditor.changeColor,
                                          PointLightEngineService$WonderEditor.getPointLightColor
                                        ]);
                            }));
                      return Wonder_jest.describe("test pointLight's attribute set in engine", (function (param) {
                                    beforeEach((function () {
                                            _prepareWithEmptyJob(/* () */0);
                                            MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                                                    return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene));
                                                  }));
                                            return MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
                                          }));
                                    Wonder_jest.describe("test change point light intensity", (function (param) {
                                            return Wonder_jest.test("test change intensity should set into engine", (function (param) {
                                                          var currentGameObjectPointLightComponent = GameObjectTool$WonderEditor.getCurrentSceneTreeNodePointLightComponent(/* () */0);
                                                          MainEditorPointLightTool$WonderEditor.changeIntensity(currentGameObjectPointLightComponent, 10.1);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                    return PointLightEngineService$WonderEditor.getPointLightIntensity(currentGameObjectPointLightComponent, param);
                                                                                  })), 5)), 10.1);
                                                        }));
                                          }));
                                    Wonder_jest.describe("test change point light constant", (function (param) {
                                            return Wonder_jest.test("test change constant should set into engine", (function (param) {
                                                          var currentGameObjectPointLightComponent = GameObjectTool$WonderEditor.getCurrentSceneTreeNodePointLightComponent(/* () */0);
                                                          MainEditorPointLightTool$WonderEditor.changeConstant(currentGameObjectPointLightComponent, 10.1);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                    return PointLightEngineService$WonderEditor.getPointLightConstant(currentGameObjectPointLightComponent, param);
                                                                                  })), 5)), 10.1);
                                                        }));
                                          }));
                                    Wonder_jest.describe("test change point light linear", (function (param) {
                                            return Wonder_jest.test("test change linear should set into engine", (function (param) {
                                                          var currentGameObjectPointLightComponent = GameObjectTool$WonderEditor.getCurrentSceneTreeNodePointLightComponent(/* () */0);
                                                          MainEditorPointLightTool$WonderEditor.changeLinear(currentGameObjectPointLightComponent, 10.1);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                    return PointLightEngineService$WonderEditor.getPointLightLinear(currentGameObjectPointLightComponent, param);
                                                                                  })), 5)), 10.1);
                                                        }));
                                          }));
                                    Wonder_jest.describe("test change point light quadratic", (function (param) {
                                            return Wonder_jest.test("test change quadratic should set into engine", (function (param) {
                                                          var currentGameObjectPointLightComponent = GameObjectTool$WonderEditor.getCurrentSceneTreeNodePointLightComponent(/* () */0);
                                                          MainEditorPointLightTool$WonderEditor.changeQuadratic(currentGameObjectPointLightComponent, 10.1);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                    return PointLightEngineService$WonderEditor.getPointLightQuadratic(currentGameObjectPointLightComponent, param);
                                                                                  })), 5)), 10.1);
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test change point light range", (function (param) {
                                                  return Wonder_jest.test("test change range should set into engine", (function (param) {
                                                                var currentGameObjectPointLightComponent = GameObjectTool$WonderEditor.getCurrentSceneTreeNodePointLightComponent(/* () */0);
                                                                MainEditorPointLightTool$WonderEditor.changeRange(currentGameObjectPointLightComponent, 10.1);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                          return PointLightEngineService$WonderEditor.getPointLightRange(currentGameObjectPointLightComponent, param);
                                                                                        })), 5)), 10.1);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
