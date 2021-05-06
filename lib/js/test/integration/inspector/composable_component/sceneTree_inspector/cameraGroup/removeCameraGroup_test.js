'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../tool/TestTool.js");
var InspectorTool$WonderEditor = require("../../../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../../../tool/ReactTestTool.js");
var ControllerTool$WonderEditor = require("../../../../../unit/composable_component/controller/tool/ControllerTool.js");
var GameObjectTool$WonderEditor = require("../../../../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../src/service/state/engine/state/StateEngineService.js");
var CameraEngineService$WonderEditor = require("../../../../../../src/service/state/engine/camera/CameraEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../tool/MainEditorSceneTool.js");
var GameViewEditorService$WonderEditor = require("../../../../../../src/service/state/editor/view/gameView/GameViewEditorService.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../../../unit/tool/MainEditorSceneTreeTool.js");
var MainEditorLeftHeaderTool$WonderEditor = require("../../../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js");
var ArcballCameraEngineService$WonderEditor = require("../../../../../../src/service/state/engine/ArcballCameraEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var ArcballCameraControllerToolEngine$WonderEditor = require("../../../../../tool/engine/ArcballCameraControllerToolEngine.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../../atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");
var MainEditorInspectorRemoveComponentTool$WonderEditor = require("../../../atom_component/addableComponent/tool/MainEditorInspectorRemoveComponentTool.js");

Wonder_jest.describe("test remove camera group", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                            }));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test has no camera group after remove ", (function (param) {
                return Wonder_jest.describe("test remove current camera group", (function (param) {
                              Wonder_jest.test("should remove from inspector", (function (param) {
                                      MainEditorInspectorRemoveComponentTool$WonderEditor.removeCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                    }));
                              Wonder_jest.test("should remove activedBasicCameraView from editorState", (function (param) {
                                      MainEditorInspectorRemoveComponentTool$WonderEditor.removeCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameViewEditorService$WonderEditor.getActivedBasicCameraView(StateEditorService$WonderEditor.getState(/* () */0))), undefined);
                                    }));
                              return Wonder_jest.describe("if is run", (function (param) {
                                            return Wonder_jest.describe("if basicCameraView is active and gameObject has arcballCameraController", (function (param) {
                                                          return Wonder_jest.test("unbind arcballCameraController event for game view", (function (param) {
                                                                        ControllerTool$WonderEditor.setIsRun(true);
                                                                        var __x = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                                        var match = ArcballCameraControllerToolEngine$WonderEditor.addGameObjectArcballCameraControllerComponentAndBindArcballCameraControllerEventForGameView(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                                                        StateEngineService$WonderEditor.setState(match[0]);
                                                                        MainEditorInspectorRemoveComponentTool$WonderEditor.removeCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(match[2], engineState)), false);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test still has other camera groups after remove ", (function (param) {
                      beforeEach((function () {
                              var newGameObject = GameObjectTool$WonderEditor.getNewGameObject(undefined, /* () */0);
                              MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                              MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, newGameObject, /* () */0);
                              return MainEditorInspectorAddComponentTool$WonderEditor.addCameraGroupComponent(undefined, undefined, newGameObject, /* () */0);
                            }));
                      Wonder_jest.test("test remove cameraGroup component, should remove from inspector", (function (param) {
                              MainEditorInspectorRemoveComponentTool$WonderEditor.removeCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                            }));
                      Wonder_jest.test("test if not remove cameraGroup component, current gameObject should has it", (function (param) {
                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                    return CameraEngineService$WonderEditor.hasCameraGroup(partial_arg, param);
                                                  }))), true);
                            }));
                      Wonder_jest.test("test remove cameraGroup component, current gameObject shouldn't has it", (function (param) {
                              MainEditorInspectorRemoveComponentTool$WonderEditor.removeCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                    return CameraEngineService$WonderEditor.hasCameraGroup(partial_arg, param);
                                                  }))), false);
                            }));
                      return Wonder_jest.describe("if is run", (function (param) {
                                    return Wonder_jest.describe("if basicCameraView is active and gameObject has arcballCameraController", (function (param) {
                                                  return Wonder_jest.test("unbind arcballCameraController event for game view", (function (param) {
                                                                MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode(/* () */0);
                                                                ControllerTool$WonderEditor.setIsRun(true);
                                                                var __x = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                                var match = ArcballCameraControllerToolEngine$WonderEditor.addGameObjectArcballCameraControllerComponentAndBindArcballCameraControllerEventForGameView(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                                                StateEngineService$WonderEditor.setState(match[0]);
                                                                MainEditorInspectorRemoveComponentTool$WonderEditor.removeCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(match[2], engineState)), false);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
