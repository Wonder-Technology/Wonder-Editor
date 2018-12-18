

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ControllerTool$WonderEditor from "../../../../../unit/composable_component/controller/tool/ControllerTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as MainEditorInspectorAddComponentTool$WonderEditor from "../../../atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js";
import * as MainEditorInspectorRemoveComponentTool$WonderEditor from "../../../atom_component/addableComponent/tool/MainEditorInspectorRemoveComponentTool.js";

describe("test remove arcball camera controller", (function (param) {
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
        describe("if is run", (function (param) {
                return Wonder_jest.test("unbind arcballCameraController event for game view", (function (param) {
                              ControllerTool$WonderEditor.setIsRun(true);
                              MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                              var __x = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                              var cameraController = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                              StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                      return ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEventForGameView(cameraController, param);
                                    }));
                              MainEditorInspectorRemoveComponentTool$WonderEditor.removeArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(cameraController, engineState)), false);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
