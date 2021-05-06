'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var FloatService$WonderEditor = require("../../../../../../../src/service/atom/FloatService.js");
var InspectorTool$WonderEditor = require("../../../../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var FlyCameraEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/FlyCameraEngineService.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var MainEditorFlyCameraControllerTool$WonderEditor = require("./tool/MainEditorFlyCameraControllerTool.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../../../atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");

Wonder_jest.describe("MainEditor FlyCameraController", (function (param) {
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
                      Wonder_jest.test("test ui", (function (param) {
                              MainEditorInspectorAddComponentTool$WonderEditor.addFlyCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                            }));
                      Wonder_jest.describe("test change flyCameraController moveSpeed", (function (param) {
                              return Wonder_jest.test("test change should set into engine", (function (param) {
                                            MainEditorInspectorAddComponentTool$WonderEditor.addFlyCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                            var currentGameObjectFlyCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeFlyCamera(/* () */0);
                                            MainEditorFlyCameraControllerTool$WonderEditor.changeMoveSpeedAndBlur(currentGameObjectFlyCamera, 21.1, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                      return FlyCameraEngineService$WonderEditor.unsafeGetFlyCameraControllerMoveSpeed(currentGameObjectFlyCamera, param);
                                                                    })), 5)), 21.1);
                                          }));
                            }));
                      Wonder_jest.describe("test change flyCameraController rotateSpeed", (function (param) {
                              return Wonder_jest.test("test change should set into engine", (function (param) {
                                            MainEditorInspectorAddComponentTool$WonderEditor.addFlyCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                            var currentGameObjectFlyCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeFlyCamera(/* () */0);
                                            MainEditorFlyCameraControllerTool$WonderEditor.changeRotateSpeedAndBlur(currentGameObjectFlyCamera, 11.1, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                      return FlyCameraEngineService$WonderEditor.unsafeGetFlyCameraControllerRotateSpeed(currentGameObjectFlyCamera, param);
                                                                    })), 5)), 11.1);
                                          }));
                            }));
                      return Wonder_jest.describe("test change flyCameraController wheelSpeed", (function (param) {
                                    return Wonder_jest.test("test change should set into engine", (function (param) {
                                                  MainEditorInspectorAddComponentTool$WonderEditor.addFlyCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                                  var currentGameObjectFlyCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeFlyCamera(/* () */0);
                                                  MainEditorFlyCameraControllerTool$WonderEditor.changeWheelSpeedAndBlur(currentGameObjectFlyCamera, 2.0, undefined, undefined, /* () */0);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                            return FlyCameraEngineService$WonderEditor.unsafeGetFlyCameraControllerWheelSpeed(currentGameObjectFlyCamera, param);
                                                                          })), 5)), 2.0);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
