'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Color$WonderEditor = require("../../../../../../../src/core/external/Color.js");
var FloatService$WonderEditor = require("../../../../../../../src/service/atom/FloatService.js");
var ControllerTool$WonderEditor = require("../../../tool/ControllerTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../../../tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var DirectorToolEngine$WonderEditor = require("../../../../../../tool/engine/DirectorToolEngine.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorLightTool$WonderEditor = require("../../../../../../integration/inspector/composable_component/sceneTree_inspector/light/tool/MainEditorLightTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var PointLightEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/PointLightEngineService.js");
var MainEditorPointLightTool$WonderEditor = require("../../../../../../integration/inspector/composable_component/sceneTree_inspector/light/point/tool/MainEditorPointLightTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");

Wonder_jest.describe("controller inspector point light", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareDefaultSceneAndInit = function (param) {
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene));
                }));
          DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
          return ControllerTool$WonderEditor.run(/* () */0);
        };
        var _prepareWithJob = function (param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
          return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                        return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                      }));
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                return Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test set value into engineState", (function (param) {
                      var _testPointLightChangeAndBlurValue = function (value, changePointLightValueAndBlurFunc, getValueFunc) {
                        var currentGameObjectPointLightComponent = GameObjectTool$WonderEditor.getCurrentSceneTreeNodePointLightComponent(/* () */0);
                        Curry._4(changePointLightValueAndBlurFunc, currentGameObjectPointLightComponent, PointLightEngineService$WonderEditor.getPointLightIntensity(currentGameObjectPointLightComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0)), value, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(Curry._2(getValueFunc, currentGameObjectPointLightComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0)), 5)), value);
                      };
                      beforeEach((function () {
                              _prepareWithJob(/* () */0);
                              _prepareDefaultSceneAndInit(/* () */0);
                              return MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
                            }));
                      Wonder_jest.test("test change color", (function (param) {
                              var currentGameObjectPointLightComponent = GameObjectTool$WonderEditor.getCurrentSceneTreeNodePointLightComponent(/* () */0);
                              var newColor = {
                                hex: "#7df1e8",
                                rgb: {
                                  r: 125,
                                  g: 241,
                                  b: 232
                                }
                              };
                              MainEditorPointLightTool$WonderEditor.changeColor(currentGameObjectPointLightComponent, newColor);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Color$WonderEditor.getHexString(PointLightEngineService$WonderEditor.getPointLightColor(currentGameObjectPointLightComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0)))), newColor.hex);
                            }));
                      Wonder_jest.test("test change intensity", (function (param) {
                              return _testPointLightChangeAndBlurValue(10.1, MainEditorPointLightTool$WonderEditor.changeIntensityAndBlur, PointLightEngineService$WonderEditor.getPointLightIntensity);
                            }));
                      Wonder_jest.test("test change constant", (function (param) {
                              return _testPointLightChangeAndBlurValue(13.1, MainEditorPointLightTool$WonderEditor.changeConstantAndBlur, PointLightEngineService$WonderEditor.getPointLightConstant);
                            }));
                      Wonder_jest.test("test change linear", (function (param) {
                              return _testPointLightChangeAndBlurValue(23.1, MainEditorPointLightTool$WonderEditor.changeLinearAndBlur, PointLightEngineService$WonderEditor.getPointLightLinear);
                            }));
                      Wonder_jest.test("test change quadratic", (function (param) {
                              return _testPointLightChangeAndBlurValue(13.1, MainEditorPointLightTool$WonderEditor.changeQuadraticAndBlur, PointLightEngineService$WonderEditor.getPointLightQuadratic);
                            }));
                      return Wonder_jest.test("test change range", (function (param) {
                                    return _testPointLightChangeAndBlurValue(18.9, MainEditorPointLightTool$WonderEditor.changeRangeAndBlur, PointLightEngineService$WonderEditor.getPointLightRange);
                                  }));
                    }));
      }));

/*  Not a pure module */
