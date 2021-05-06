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
var MainEditorSceneTool$WonderEditor = require("../../../../../../../tool/MainEditorSceneTool.js");
var DirectionLightEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/DirectionLightEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var MainEditorDirectionLightTool$WonderEditor = require("../tool/MainEditorDirectionLightTool.js");

Wonder_jest.describe("MainEditorDirectionLight", (function (param) {
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
                                      return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                                    }));
                              return PickColorTool$WonderEditor.testOperateColorPickToChangeColor(sandbox, /* tuple */[
                                          GameObjectTool$WonderEditor.getCurrentSceneTreeNodeDirectionLightComponent,
                                          MainEditorDirectionLightTool$WonderEditor.changeColor,
                                          DirectionLightEngineService$WonderEditor.getDirectionLightColor
                                        ]);
                            }));
                      return Wonder_jest.describe("test change direction light intensity", (function (param) {
                                    beforeEach((function () {
                                            _prepareWithEmptyJob(/* () */0);
                                            return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                                                          return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test logic", (function (param) {
                                                  return Wonder_jest.test("test change intensity should set into engine", (function (param) {
                                                                var currentGameObjectDirectionLightComponent = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeDirectionLightComponent(/* () */0);
                                                                MainEditorDirectionLightTool$WonderEditor.changeIntensity(currentGameObjectDirectionLightComponent, 10.1);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                          return DirectionLightEngineService$WonderEditor.getDirectionLightIntensity(currentGameObjectDirectionLightComponent, param);
                                                                                        })), 5)), 10.1);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
