

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ControllerTool$WonderEditor from "../../../../../unit/composable_component/controller/tool/ControllerTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../../../src/service/state/engine/camera/BasicCameraViewEngineService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as MainEditorInspectorAddComponentTool$WonderEditor from "../../../atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js";

describe("test add arcballCameraController", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                            }));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("if is run", (function () {
                describe("if gameObject has basicCameraView and basicCameraView is active ", (function () {
                        return Wonder_jest.test("bind arcballCameraController event for game view", (function () {
                                      ControllerTool$WonderEditor.setIsRun(true);
                                      var __x = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                      var currentBasicCameraView = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                      var engineState = BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(currentBasicCameraView, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                      StateEngineService$WonderEditor.setState(engineState);
                                      MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                      var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var __x$1 = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                      var currentArcballCameraController = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(__x$1, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(currentArcballCameraController, engineState$1)), true);
                                    }));
                      }));
                describe("else", (function () {
                        return Wonder_jest.test("not bind event for game view", (function () {
                                      ControllerTool$WonderEditor.setIsRun(true);
                                      MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                      MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var currentSceneTreeNode = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(currentSceneTreeNode, engineState), engineState)), false);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
