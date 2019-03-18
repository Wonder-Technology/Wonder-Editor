

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as FloatService$WonderEditor from "../../../../../../../../src/service/atom/FloatService.js";
import * as PickColorTool$WonderEditor from "../../../../../../../tool/PickColorTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as DirectorToolEngine$WonderEditor from "../../../../../../../tool/engine/DirectorToolEngine.js";
import * as MainEditorLightTool$WonderEditor from "../../tool/MainEditorLightTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../tool/MainEditorSceneTool.js";
import * as PointLightEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/PointLightEngineService.js";
import * as MainEditorPointLightTool$WonderEditor from "../tool/MainEditorPointLightTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../../../../tool/BuildComponentForCurryTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";

describe("MainEditorPointLight", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareWithEmptyJob = function () {
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
        describe("test set currentSceneTreeNode", (function () {
                var _prepareWithJob = function () {
                  MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                  return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                };
                describe("test change color", (function () {
                        beforeEach((function () {
                                _prepareWithJob(/* () */0);
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                                        return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene));
                                      }));
                                DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                                return MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
                              }));
                        return PickColorTool$WonderEditor.testOperateColorPickToChangeColor(sandbox, BuildComponentForCurryTool$WonderEditor.buildPointLight, /* tuple */[
                                    GameObjectTool$WonderEditor.getCurrentGameObjectPointLightComponent,
                                    MainEditorPointLightTool$WonderEditor.changeColor,
                                    PointLightEngineService$WonderEditor.getPointLightColor
                                  ]);
                      }));
                describe("test pointLight's attribute set in engine", (function () {
                        beforeEach((function () {
                                _prepareWithEmptyJob(/* () */0);
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                                        return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene));
                                      }));
                                return MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
                              }));
                        describe("test change point light intensity", (function () {
                                return Wonder_jest.test("test change intensity should set into engine", (function () {
                                              var currentGameObjectPointLightComponent = GameObjectTool$WonderEditor.getCurrentGameObjectPointLightComponent(/* () */0);
                                              MainEditorPointLightTool$WonderEditor.changeIntensity(currentGameObjectPointLightComponent, 10.1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return PointLightEngineService$WonderEditor.getPointLightIntensity(currentGameObjectPointLightComponent, param);
                                                                      })), 5)), 10.1);
                                            }));
                              }));
                        describe("test change point light constant", (function () {
                                return Wonder_jest.test("test change constant should set into engine", (function () {
                                              var currentGameObjectPointLightComponent = GameObjectTool$WonderEditor.getCurrentGameObjectPointLightComponent(/* () */0);
                                              MainEditorPointLightTool$WonderEditor.changeConstant(currentGameObjectPointLightComponent, 10.1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return PointLightEngineService$WonderEditor.getPointLightConstant(currentGameObjectPointLightComponent, param);
                                                                      })), 5)), 10.1);
                                            }));
                              }));
                        describe("test change point light linear", (function () {
                                return Wonder_jest.test("test change linear should set into engine", (function () {
                                              var currentGameObjectPointLightComponent = GameObjectTool$WonderEditor.getCurrentGameObjectPointLightComponent(/* () */0);
                                              MainEditorPointLightTool$WonderEditor.changeLinear(currentGameObjectPointLightComponent, 10.1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return PointLightEngineService$WonderEditor.getPointLightLinear(currentGameObjectPointLightComponent, param);
                                                                      })), 5)), 10.1);
                                            }));
                              }));
                        describe("test change point light quadratic", (function () {
                                return Wonder_jest.test("test change quadratic should set into engine", (function () {
                                              var currentGameObjectPointLightComponent = GameObjectTool$WonderEditor.getCurrentGameObjectPointLightComponent(/* () */0);
                                              MainEditorPointLightTool$WonderEditor.changeQuadratic(currentGameObjectPointLightComponent, 10.1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return PointLightEngineService$WonderEditor.getPointLightQuadratic(currentGameObjectPointLightComponent, param);
                                                                      })), 5)), 10.1);
                                            }));
                              }));
                        describe("test change point light range", (function () {
                                return Wonder_jest.test("test change range should set into engine", (function () {
                                              var currentGameObjectPointLightComponent = GameObjectTool$WonderEditor.getCurrentGameObjectPointLightComponent(/* () */0);
                                              MainEditorPointLightTool$WonderEditor.changeRange(currentGameObjectPointLightComponent, 10.1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return PointLightEngineService$WonderEditor.getPointLightRange(currentGameObjectPointLightComponent, param);
                                                                      })), 5)), 10.1);
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
