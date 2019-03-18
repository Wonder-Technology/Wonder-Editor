

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Color$WonderEditor from "../../../../../../../../src/core/external/Color.js";
import * as FloatService$WonderEditor from "../../../../../../../../src/service/atom/FloatService.js";
import * as ControllerTool$WonderEditor from "../../../../../controller/tool/ControllerTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../../tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as DirectorToolEngine$WonderEditor from "../../../../../../../tool/engine/DirectorToolEngine.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../tool/MainEditorSceneTool.js";
import * as DirectionLightEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/DirectionLightEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as MainEditorDirectionLightTool$WonderEditor from "../../../../../../../integration/inspector/composable_component/sceneTree_inspector/light/direction/tool/MainEditorDirectionLightTool.js";

describe("controller inspector direction light", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareWithJob = function () {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
          return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                return Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set value into engineState", (function () {
                var _getDirectionLightIntensity = function (component, engineState) {
                  return FloatService$WonderEditor.truncateFloatValue(DirectionLightEngineService$WonderEditor.getDirectionLightIntensity(component, engineState), 5);
                };
                beforeEach((function () {
                        _prepareWithJob(/* () */0);
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                                return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene));
                              }));
                        DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                        return ControllerTool$WonderEditor.run(/* () */0);
                      }));
                Wonder_jest.test("test change color", (function () {
                        var currentGameObjectDirectionLightComponent = GameObjectTool$WonderEditor.getCurrentGameObjectDirectionLightComponent(/* () */0);
                        var newColor = {
                          hex: "#7df1e8",
                          rgb: {
                            r: 125,
                            g: 241,
                            b: 232
                          }
                        };
                        MainEditorDirectionLightTool$WonderEditor.changeColor(currentGameObjectDirectionLightComponent, newColor);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Color$WonderEditor.getHexString(DirectionLightEngineService$WonderEditor.getDirectionLightColor(currentGameObjectDirectionLightComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0)))), newColor.hex);
                      }));
                return Wonder_jest.test("test change intensity", (function () {
                              var currentGameObjectDirectionLightComponent = GameObjectTool$WonderEditor.getCurrentGameObjectDirectionLightComponent(/* () */0);
                              MainEditorDirectionLightTool$WonderEditor.changeIntensityAndBlur(currentGameObjectDirectionLightComponent, DirectionLightEngineService$WonderEditor.getDirectionLightIntensity(currentGameObjectDirectionLightComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0)), 10.1, undefined, undefined, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getDirectionLightIntensity(currentGameObjectDirectionLightComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), 10.1);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
