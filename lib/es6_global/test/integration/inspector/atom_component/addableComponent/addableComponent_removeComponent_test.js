

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as ConsoleTool$WonderEditor from "../../../../unit/tool/external/ConsoleTool.js";
import * as InspectorTool$WonderEditor from "../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as GLSLToolEngine$WonderEditor from "../../../../tool/engine/GLSLToolEngine.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as FakeGlToolEngine$WonderEditor from "../../../../tool/engine/FakeGlToolEngine.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as LightEngineService$WonderEditor from "../../../../../src/service/state/engine/LightEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as LightMaterialToolEngine$WonderEditor from "../../../../tool/engine/LightMaterialToolEngine.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as InspectorRemoveComponentUtils$WonderEditor from "../../../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRemoveComponentUtils.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as MainEditorInspectorAddComponentTool$WonderEditor from "./tool/MainEditorInspectorAddComponentTool.js";
import * as MainEditorInspectorRemoveComponentTool$WonderEditor from "./tool/MainEditorInspectorRemoveComponentTool.js";

describe("AddableComponent remove component", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test remove directionLight gameObject component", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectToBeCurrentSceneTreeNode);
                        var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                    }));
                      }));
                describe("test remove light component", (function () {
                        describe("test snapshot", (function () {
                                return Wonder_jest.test("test remove light component, should remove from inspector", (function () {
                                              MainEditorInspectorRemoveComponentTool$WonderEditor.removeDirectionLightComponent(undefined, undefined, undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        describe("test logic", (function () {
                                Wonder_jest.test("test if not remove light component, current gameObject should has it", (function () {
                                        var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return LightEngineService$WonderEditor.hasLightComponent(partial_arg, param);
                                                            }))), true);
                                      }));
                                return Wonder_jest.test("test click remove light component, current gameObject shouldn't has it", (function () {
                                              MainEditorInspectorRemoveComponentTool$WonderEditor.removeDirectionLightComponent(undefined, undefined, undefined, /* () */0);
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return LightEngineService$WonderEditor.hasLightComponent(partial_arg, param);
                                                                  }))), false);
                                            }));
                              }));
                        describe("should re-init all light material components in the scene", (function () {
                                describe("test remove direction light component", (function () {
                                        return Wonder_jest.test("glsl->DIRECTION_LIGHTS_COUNT should - 1", (function () {
                                                      var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                      var glShaderSource = gl.shaderSource;
                                                      MainEditorInspectorRemoveComponentTool$WonderEditor.removeDirectionLightComponent(undefined, undefined, undefined, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(glShaderSource), "#define DIRECTION_LIGHTS_COUNT 0")), true);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test remove box gameObject component", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                        var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                    }));
                      }));
                describe("test remove geometry component", (function () {
                        describe("test snapshot", (function () {
                                return Wonder_jest.test("test remove geometry component, should remove from inspector", (function () {
                                              MainEditorInspectorRemoveComponentTool$WonderEditor.removeGeometryComponent(undefined, undefined, undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        describe("test logic", (function () {
                                Wonder_jest.test("test if not remove geometry component, current gameObject should has it", (function () {
                                        var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(partial_arg, param);
                                                            }))), true);
                                      }));
                                return Wonder_jest.test("test click remove geometry component, current gameObject shouldn't has it", (function () {
                                              MainEditorInspectorRemoveComponentTool$WonderEditor.removeGeometryComponent(undefined, undefined, undefined, /* () */0);
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(partial_arg, param);
                                                                  }))), false);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test remove renderGroup component", (function () {
                        describe("test snapshot", (function () {
                                return Wonder_jest.test("test remove renderGroup component, should remove from inspector", (function () {
                                              MainEditorInspectorRemoveComponentTool$WonderEditor.removeRenderGroupComponent(undefined, undefined, undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        describe("test logic", (function () {
                                Wonder_jest.test("test if not remove renderGroup component, current gameObject should has it", (function () {
                                        var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return InspectorRenderGroupUtils$WonderEditor.hasRenderGroupComponents(partial_arg, param);
                                                            }))), true);
                                      }));
                                describe("test click remove renderGroup component", (function () {
                                        Wonder_jest.test("current gameObject shouldn't has it", (function () {
                                                MainEditorInspectorRemoveComponentTool$WonderEditor.removeRenderGroupComponent(undefined, undefined, undefined, /* () */0);
                                                var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                      return InspectorRenderGroupUtils$WonderEditor.hasRenderGroupComponents(partial_arg, param);
                                                                    }))), false);
                                              }));
                                        return Wonder_jest.test("should remove material instead of dispose it", (function () {
                                                      var currentGameObject = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var oldLightMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(currentGameObject, engineState);
                                                      MainEditorInspectorRemoveComponentTool$WonderEditor.removeRenderGroupComponent(undefined, undefined, undefined, /* () */0);
                                                      var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      LightMaterialToolEngine$WonderEditor.isAlive(oldLightMaterial, engineState$1),
                                                                      GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(currentGameObject, engineState$1)
                                                                    ]), /* tuple */[
                                                                  true,
                                                                  false
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test remove camera gameObject component", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                        var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                    }));
                      }));
                describe("test remove arcballCamera component", (function () {
                        beforeEach((function () {
                                return MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                              }));
                        describe("test snapshot", (function () {
                                return Wonder_jest.test("test remove arcballCamera component, should remove from inspector", (function () {
                                              MainEditorInspectorRemoveComponentTool$WonderEditor.removeArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        describe("test logic", (function () {
                                Wonder_jest.test("test if not remove arcballCamera component, current gameObject should has it", (function () {
                                        var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(partial_arg, param);
                                                            }))), true);
                                      }));
                                return Wonder_jest.test("test click remove arcballCamera component, current gameObject shouldn't has it", (function () {
                                              MainEditorInspectorRemoveComponentTool$WonderEditor.removeArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(partial_arg, param);
                                                                  }))), false);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("deal with specific case", (function () {
                beforeEach((function () {
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                      }));
                describe("test InspectorRemoveComponentUtils removeComponentByType function", (function () {
                        return Wonder_jest.test("remove unRemovable component should throw error", (function () {
                                      ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                      var errorStub = Curry._3(Sinon.createMethodStub, sandbox[0], console, "error");
                                      InspectorRemoveComponentUtils$WonderEditor.removeComponentByType(/* SourceInstance */6, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* tuple */[
                                            StateEditorService$WonderEditor.getState(/* () */0),
                                            StateEngineService$WonderEditor.unsafeGetState(/* () */0)
                                          ]);
                                      return ConsoleTool$WonderEditor.judgeError("can't remove", errorStub);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
