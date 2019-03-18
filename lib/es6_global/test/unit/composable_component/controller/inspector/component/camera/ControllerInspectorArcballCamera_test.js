

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as FloatService$WonderEditor from "../../../../../../../src/service/atom/FloatService.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as MainEditorInspectorAddComponentTool$WonderEditor from "../../../../../../integration/inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js";
import * as MainEditorArcballCameraControllerTool$WonderEditor from "../../../../../../integration/inspector/composable_component/sceneTree_inspector/camera_controller/tool/MainEditorArcballCameraControllerTool.js";

describe("controller inspector arcballCameraController", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set currentSceneTreeNode to be camera", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                        var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                    }));
                      }));
                describe("test set value into engineState", (function () {
                        describe("test change arcballCameraController distance", (function () {
                                var _getArcballCameraDistance = function (component, engineState) {
                                  return FloatService$WonderEditor.truncateFloatValue(ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance(component, engineState), 5);
                                };
                                return Wonder_jest.test("test change distance should set into engine", (function () {
                                              MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                              var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                              MainEditorArcballCameraControllerTool$WonderEditor.changeDistanceAndBlur(currentGameObjectArcballCamera, 21.1, undefined, undefined, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getArcballCameraDistance(currentGameObjectArcballCamera, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), 21.1);
                                            }));
                              }));
                        describe("test change arcballCameraController minDistance", (function () {
                                var _getArcballCameraMinDistance = function (component, engineState) {
                                  return FloatService$WonderEditor.truncateFloatValue(ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerMinDistance(component, engineState), 5);
                                };
                                return Wonder_jest.test("test change minDistance should set into engine", (function () {
                                              MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                              var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                              MainEditorArcballCameraControllerTool$WonderEditor.changeMinDistanceAndBlur(currentGameObjectArcballCamera, 11.1, undefined, undefined, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getArcballCameraMinDistance(currentGameObjectArcballCamera, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), 11.1);
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
