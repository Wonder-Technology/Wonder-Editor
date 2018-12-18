

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as FloatService$WonderEditor from "../../../../../../src/service/atom/FloatService.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as MainEditorInspectorAddComponentTool$WonderEditor from "../../../atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js";
import * as MainEditorArcballCameraControllerTool$WonderEditor from "./tool/MainEditorArcballCameraControllerTool.js";

describe("MainEditor ArcballCameraController", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set currentSceneTreeNode to be camera", (function (param) {
                beforeEach((function (param) {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                                    }));
                      }));
                describe("test change arcballCameraController distance", (function (param) {
                        describe("test logic", (function (param) {
                                return Wonder_jest.test("test change distance should set into engine", (function (param) {
                                              MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                              var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentGameObjectArcballCamera(/* () */0);
                                              MainEditorArcballCameraControllerTool$WonderEditor.changeDistanceAndBlur(currentGameObjectArcballCamera, 21.1, undefined, undefined, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance(currentGameObjectArcballCamera, param);
                                                                      })), 5)), 21.1);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test change arcballCameraController minDistance", (function (param) {
                        describe("test logic", (function (param) {
                                return Wonder_jest.test("test change minDistance should set into engine", (function (param) {
                                              MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                              var currentGameObjectArcballCamera = GameObjectTool$WonderEditor.getCurrentGameObjectArcballCamera(/* () */0);
                                              MainEditorArcballCameraControllerTool$WonderEditor.changeMinDistanceAndBlur(currentGameObjectArcballCamera, 11.1, undefined, undefined, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerMinDistance(currentGameObjectArcballCamera, param);
                                                                      })), 5)), 11.1);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("add shade dom for transformComponent if has arcballCameraController", (function (param) {
                        return Wonder_jest.test("test snapshot for transform component", (function (param) {
                                      MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                      var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
