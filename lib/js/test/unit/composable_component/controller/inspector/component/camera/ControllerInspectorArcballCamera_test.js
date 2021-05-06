'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var FloatService$WonderEditor = require("../../../../../../../src/service/atom/FloatService.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var ArcballCameraEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/ArcballCameraEngineService.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../../../../../integration/inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");
var MainEditorArcballCameraControllerTool$WonderEditor = require("../../../../../../integration/inspector/composable_component/sceneTree_inspector/camera_controller/arcball/tool/MainEditorArcballCameraControllerTool.js");

Wonder_jest.describe("controller inspector arcballCameraController", (function (param) {
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
                      return Wonder_jest.describe("test set value into engineState", (function (param) {
                                    Wonder_jest.describe("test change arcballCameraController distance", (function (param) {
                                            var _getArcballCameraDistance = function (component, engineState) {
                                              return FloatService$WonderEditor.truncateFloatValue(ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance(component, engineState), 5);
                                            };
                                            return Wonder_jest.test("test change distance should set into engine", (function (param) {
                                                          MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                                          var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                                          MainEditorArcballCameraControllerTool$WonderEditor.changeDistanceAndBlur(currentGameObjectArcballCamera, 21.1, undefined, undefined, /* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getArcballCameraDistance(currentGameObjectArcballCamera, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), 21.1);
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test change arcballCameraController minDistance", (function (param) {
                                                  var _getArcballCameraMinDistance = function (component, engineState) {
                                                    return FloatService$WonderEditor.truncateFloatValue(ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerMinDistance(component, engineState), 5);
                                                  };
                                                  return Wonder_jest.test("test change minDistance should set into engine", (function (param) {
                                                                MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                                                var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                                                MainEditorArcballCameraControllerTool$WonderEditor.changeMinDistanceAndBlur(currentGameObjectArcballCamera, 11.1, undefined, undefined, /* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getArcballCameraMinDistance(currentGameObjectArcballCamera, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), 11.1);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
