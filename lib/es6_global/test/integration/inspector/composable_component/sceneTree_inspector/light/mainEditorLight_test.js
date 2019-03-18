

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ConsoleTool$WonderEditor from "../../../../../unit/tool/external/ConsoleTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as GLSLToolEngine$WonderEditor from "../../../../../tool/engine/GLSLToolEngine.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";
import * as FakeGlToolEngine$WonderEditor from "../../../../../tool/engine/FakeGlToolEngine.js";
import * as EventListenerTool$WonderEditor from "../../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorLightTool$WonderEditor from "./tool/MainEditorLightTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorLightUtils$WonderEditor from "../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/utils/MainEditorLightUtils.js";
import * as PointLightToolEngine$WonderEditor from "../../../../../tool/engine/PointLightToolEngine.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("MainEditorLight component", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set currentSceneTreeNode", (function () {
                beforeEach((function () {
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectToBeCurrentSceneTreeNode);
                      }));
                describe("test change light type", (function () {
                        Wonder_jest.test("test the original type is direction light, should show direction light component ", (function () {
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildLight(/* () */0));
                              }));
                        Wonder_jest.test("test change type to be point light, should show point light component", (function () {
                                MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildLight(/* () */0));
                              }));
                        Wonder_jest.test("test change type to be direction light, should show direction light component", (function () {
                                MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
                                MainEditorLightTool$WonderEditor.setLightTypeToBeDirectionLight(/* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildLight(/* () */0));
                              }));
                        describe("should re-init all light material components in the scene", (function () {
                                describe("test change direction light to be point light", (function () {
                                        return Wonder_jest.test("test\n               glsl->DIRECTION_LIGHTS_COUNT should - 1;\n               glsl->POINT_LIGHTS_COUNT should + 1;", (function () {
                                                      var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                      var glShaderSource = gl.shaderSource;
                                                      MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(glShaderSource), "#define DIRECTION_LIGHTS_COUNT 0"),
                                                                      GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(glShaderSource), "#define POINT_LIGHTS_COUNT 1")
                                                                    ]), /* tuple */[
                                                                  true,
                                                                  true
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("deal with specific cases", (function () {
                                beforeEach((function () {
                                        return ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                      }));
                                afterEach((function () {
                                        return ConsoleTool$WonderEditor.showMessage(/* () */0);
                                      }));
                                return Wonder_jest.test("if target light type is maxCount, not change to it and warn", (function () {
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var match = PointLightToolEngine$WonderEditor.createGameObject(engineState);
                                              var match$1 = PointLightToolEngine$WonderEditor.createGameObject(match[0]);
                                              var match$2 = PointLightToolEngine$WonderEditor.createGameObject(match$1[0]);
                                              PointLightToolEngine$WonderEditor.createGameObject(match$2[0]);
                                              var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                              MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
                                              var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var __x = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              ConsoleTool$WonderEditor.getMessage(warn).includes("the point light count is exceed max count"),
                                                              GameObjectComponentEngineService$WonderEditor.hasPointLightComponent(__x, engineState$1)
                                                            ]), /* tuple */[
                                                          true,
                                                          false
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("deal with specific cases", (function () {
                        return Wonder_jest.test("test getLightTypeByGameObject should throw error when gameObject haven't light ", (function () {
                                      return Wonder_jest.Expect[/* toThrowMessageRe */21]((/should\shas\slight\scomponent/img), Wonder_jest.Expect[/* expect */0]((function () {
                                                        MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                        var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                        return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                      return MainEditorLightUtils$WonderEditor.getLightTypeByGameObject(partial_arg, param);
                                                                    }));
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
