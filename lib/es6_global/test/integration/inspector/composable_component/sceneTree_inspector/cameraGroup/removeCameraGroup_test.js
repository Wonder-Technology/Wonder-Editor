

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as InspectorTool$WonderEditor from "../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as ControllerTool$WonderEditor from "../../../../../unit/composable_component/controller/tool/ControllerTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../src/service/state/engine/StateEngineService.js";
import * as CameraEngineService$WonderEditor from "../../../../../../src/service/state/engine/camera/CameraEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as GameViewEditorService$WonderEditor from "../../../../../../src/service/state/editor/view/gameView/GameViewEditorService.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../../../unit/tool/MainEditorSceneTreeTool.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as ArcballCameraControllerToolEngine$WonderEditor from "../../../../../tool/engine/ArcballCameraControllerToolEngine.js";
import * as MainEditorInspectorAddComponentTool$WonderEditor from "../../../atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js";
import * as MainEditorInspectorRemoveComponentTool$WonderEditor from "../../../atom_component/addableComponent/tool/MainEditorInspectorRemoveComponentTool.js";

describe("test remove camera group", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                            }));
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test has no camera group after remove ", (function (param) {
                describe("test remove current camera group", (function (param) {
                        Wonder_jest.test("should remove from inspector", (function (param) {
                                MainEditorInspectorRemoveComponentTool$WonderEditor.removeCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                              }));
                        Wonder_jest.test("should remove activedBasicCameraView from editorState", (function (param) {
                                MainEditorInspectorRemoveComponentTool$WonderEditor.removeCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameViewEditorService$WonderEditor.getActivedBasicCameraView(StateEditorService$WonderEditor.getState(/* () */0))), undefined);
                              }));
                        describe("if is run", (function (param) {
                                describe("if basicCameraView is active and gameObject has arcballCameraController", (function (param) {
                                        return Wonder_jest.test("unbind arcballCameraController event for game view", (function (param) {
                                                      ControllerTool$WonderEditor.setIsRun(true);
                                                      var __x = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                      var match = ArcballCameraControllerToolEngine$WonderEditor.addGameObjectArcballCameraControllerComponentAndBindArcballCameraControllerEventForGameView(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                                      StateEngineService$WonderEditor.setState(match[0]);
                                                      MainEditorInspectorRemoveComponentTool$WonderEditor.removeCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(match[2], engineState)), false);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test still has other camera groups after remove ", (function (param) {
                beforeEach((function (param) {
                        var newGameObject = GameObjectTool$WonderEditor.getNewGameObjectUid(undefined, /* () */0);
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
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                              return CameraEngineService$WonderEditor.hasCameraGroup(partial_arg, param);
                                            }))), true);
                      }));
                Wonder_jest.test("test remove cameraGroup component, current gameObject shouldn't has it", (function (param) {
                        MainEditorInspectorRemoveComponentTool$WonderEditor.removeCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                        var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                              return CameraEngineService$WonderEditor.hasCameraGroup(partial_arg, param);
                                            }))), false);
                      }));
                describe("if is run", (function (param) {
                        describe("if basicCameraView is active and gameObject has arcballCameraController", (function (param) {
                                return Wonder_jest.test("unbind arcballCameraController event for game view", (function (param) {
                                              MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode(/* () */0);
                                              ControllerTool$WonderEditor.setIsRun(true);
                                              var __x = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              var match = ArcballCameraControllerToolEngine$WonderEditor.addGameObjectArcballCameraControllerComponentAndBindArcballCameraControllerEventForGameView(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                              StateEngineService$WonderEditor.setState(match[0]);
                                              MainEditorInspectorRemoveComponentTool$WonderEditor.removeCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(match[2], engineState)), false);
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
