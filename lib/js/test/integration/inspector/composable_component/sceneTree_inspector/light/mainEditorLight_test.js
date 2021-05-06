'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ConsoleTool$WonderEditor = require("../../../../../unit/tool/external/ConsoleTool.js");
var ReactTestTool$WonderEditor = require("../../../../../tool/ReactTestTool.js");
var GLSLToolEngine$WonderEditor = require("../../../../../tool/engine/GLSLToolEngine.js");
var GameObjectTool$WonderEditor = require("../../../../../tool/GameObjectTool.js");
var FakeGlToolEngine$WonderEditor = require("../../../../../tool/engine/FakeGlToolEngine.js");
var EventListenerTool$WonderEditor = require("../../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../../tool/BuildComponentTool.js");
var StateEngineService$WonderEditor = require("../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorLightTool$WonderEditor = require("./tool/MainEditorLightTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../tool/MainEditorSceneTool.js");
var MainEditorLightUtils$WonderEditor = require("../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/utils/MainEditorLightUtils.js");
var PointLightToolEngine$WonderEditor = require("../../../../../tool/engine/PointLightToolEngine.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");

Wonder_jest.describe("MainEditorLight component", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test set currentSceneTreeNode", (function (param) {
                      beforeEach((function () {
                              return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectToBeCurrentSceneTreeNode);
                            }));
                      Wonder_jest.describe("test change light type", (function (param) {
                              Wonder_jest.test("test the original type is direction light, should show direction light component ", (function (param) {
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildLight(/* () */0));
                                    }));
                              Wonder_jest.test("test change type to be point light, should show point light component", (function (param) {
                                      MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildLight(/* () */0));
                                    }));
                              Wonder_jest.test("test change type to be direction light, should show direction light component", (function (param) {
                                      MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
                                      MainEditorLightTool$WonderEditor.setLightTypeToBeDirectionLight(/* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildLight(/* () */0));
                                    }));
                              Wonder_jest.describe("should re-init all light material components", (function (param) {
                                      return Wonder_jest.describe("test change direction light to be point light", (function (param) {
                                                    return Wonder_jest.test("test\n               glsl->DIRECTION_LIGHTS_COUNT should - 1;\n               glsl->POINT_LIGHTS_COUNT should + 1;", (function (param) {
                                                                  var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                                  var glShaderSource = gl.shaderSource;
                                                                  MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(glShaderSource), "#define DIRECTION_LIGHTS_COUNT 0"),
                                                                                  GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(glShaderSource), "#define POINT_LIGHTS_COUNT 1")
                                                                                ]), /* tuple */[
                                                                              true,
                                                                              true
                                                                            ]);
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("deal with specific cases", (function (param) {
                                            beforeEach((function () {
                                                    return ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                                  }));
                                            afterEach((function () {
                                                    return ConsoleTool$WonderEditor.showMessage(/* () */0);
                                                  }));
                                            return Wonder_jest.test("if target light type is maxCount, not change to it and warn", (function (param) {
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var match = PointLightToolEngine$WonderEditor.createGameObject(engineState);
                                                          var match$1 = PointLightToolEngine$WonderEditor.createGameObject(match[0]);
                                                          var match$2 = PointLightToolEngine$WonderEditor.createGameObject(match$1[0]);
                                                          PointLightToolEngine$WonderEditor.createGameObject(match$2[0]);
                                                          var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                                          MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
                                                          var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var __x = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          ConsoleTool$WonderEditor.getMessage(warn).includes("the point light count is exceed max count"),
                                                                          GameObjectComponentEngineService$WonderEditor.hasPointLightComponent(__x, engineState$1)
                                                                        ]), /* tuple */[
                                                                      true,
                                                                      false
                                                                    ]);
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("deal with specific cases", (function (param) {
                                    return Wonder_jest.test("test getLightTypeByGameObject should throw error when gameObject haven't light ", (function (param) {
                                                  return Wonder_jest.Expect[/* toThrowMessageRe */22]((/should\shas\slight\scomponent/img), Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                    MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                                    var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                                    return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                  return MainEditorLightUtils$WonderEditor.getLightTypeByGameObject(partial_arg, param);
                                                                                }));
                                                                  })));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
