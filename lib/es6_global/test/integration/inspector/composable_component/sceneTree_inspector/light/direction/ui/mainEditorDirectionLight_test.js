

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as FloatService$WonderEditor from "../../../../../../../../src/service/atom/FloatService.js";
import * as BaseEventTool$WonderEditor from "../../../../../../../tool/ui/BaseEventTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../../tool/BuildComponentTool.js";
import * as DirectorToolEngine$WonderEditor from "../../../../../../../tool/engine/DirectorToolEngine.js";
import * as PickColorEventTool$WonderEditor from "../../../../../../../tool/PickColorEventTool.js";
import * as MainEditorLightTool$WonderEditor from "../../tool/MainEditorLightTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../tool/MainEditorSceneTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../../../../tool/BuildComponentForCurryTool.js";
import * as DirectionLightEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/DirectionLightEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";

describe("MainEditorDirectionLight", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareWithEmptyJob = function () {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
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
                  MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, /* () */0);
                  return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                };
                describe("test change color", (function () {
                        beforeEach((function () {
                                _prepareWithJob(/* () */0);
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                                        return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene));
                                      }));
                                return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                              }));
                        return PickColorEventTool$WonderEditor.testOperateColorPickToChangeColor(sandbox, BuildComponentForCurryTool$WonderEditor.buildDirectionLight, /* tuple */[
                                    GameObjectTool$WonderEditor.getCurrentGameObjectDirectionLightComponent,
                                    PickColorEventTool$WonderEditor.triggerChangeDirectionLightColor,
                                    DirectionLightEngineService$WonderEditor.getDirectionLightColor
                                  ]);
                      }));
                describe("test change direction light intensity", (function () {
                        beforeEach((function () {
                                _prepareWithEmptyJob(/* () */0);
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                                              return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene));
                                            }));
                              }));
                        describe("test logic", (function () {
                                return Wonder_jest.test("test change intensity should set into engine", (function () {
                                              var currentGameObjectDirectionLightComponent = GameObjectTool$WonderEditor.getCurrentGameObjectDirectionLightComponent(/* () */0);
                                              var component = BuildComponentTool$WonderEditor.buildDirectionLight(currentGameObjectDirectionLightComponent);
                                              var intensityDomIndex = MainEditorLightTool$WonderEditor.getIntensityDomIndex(/* () */0);
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      return MainEditorLightTool$WonderEditor.triggerLightComponentChangeEvent(intensityDomIndex, 10.1, param);
                                                    }));
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      return MainEditorLightTool$WonderEditor.triggerLightComponentBlurEvent(intensityDomIndex, 10.1, param);
                                                    }));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return DirectionLightEngineService$WonderEditor.getDirectionLightIntensity(currentGameObjectDirectionLightComponent, param);
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
