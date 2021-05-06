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
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var DirectionLightEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/DirectionLightEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var MainEditorDirectionLightTool$WonderEditor = require("../../../../../../integration/inspector/composable_component/sceneTree_inspector/light/direction/tool/MainEditorDirectionLightTool.js");

Wonder_jest.describe("controller inspector direction light", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareWithJob = function (param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
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
        return Wonder_jest.describe("test set value into engineState", (function (param) {
                      var _getDirectionLightIntensity = function (component, engineState) {
                        return FloatService$WonderEditor.truncateFloatValue(DirectionLightEngineService$WonderEditor.getDirectionLightIntensity(component, engineState), 5);
                      };
                      beforeEach((function () {
                              _prepareWithJob(/* () */0);
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                                      return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene));
                                    }));
                              DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                              return ControllerTool$WonderEditor.run(/* () */0);
                            }));
                      Wonder_jest.test("test change color", (function (param) {
                              var currentGameObjectDirectionLightComponent = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeDirectionLightComponent(/* () */0);
                              var newColor = {
                                hex: "#7df1e8",
                                rgb: {
                                  r: 125,
                                  g: 241,
                                  b: 232
                                }
                              };
                              MainEditorDirectionLightTool$WonderEditor.changeColor(currentGameObjectDirectionLightComponent, newColor);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Color$WonderEditor.getHexString(DirectionLightEngineService$WonderEditor.getDirectionLightColor(currentGameObjectDirectionLightComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0)))), newColor.hex);
                            }));
                      return Wonder_jest.test("test change intensity", (function (param) {
                                    var currentGameObjectDirectionLightComponent = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeDirectionLightComponent(/* () */0);
                                    MainEditorDirectionLightTool$WonderEditor.changeIntensityAndBlur(currentGameObjectDirectionLightComponent, DirectionLightEngineService$WonderEditor.getDirectionLightIntensity(currentGameObjectDirectionLightComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0)), 10.1, undefined, undefined, /* () */0);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getDirectionLightIntensity(currentGameObjectDirectionLightComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), 10.1);
                                  }));
                    }));
      }));

/*  Not a pure module */
