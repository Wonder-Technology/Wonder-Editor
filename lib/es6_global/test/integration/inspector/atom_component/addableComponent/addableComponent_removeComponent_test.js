

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as HeaderTool$WonderEditor from "../../../../unit/composable_component/header/tool/HeaderTool.js";
import * as InspectorTool$WonderEditor from "../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as SceneTreeTool$WonderEditor from "../../../../tool/SceneTreeTool.js";
import * as GLSLToolEngine$WonderEditor from "../../../../tool/engine/GLSLToolEngine.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as FakeGlToolEngine$WonderEditor from "../../../../tool/engine/FakeGlToolEngine.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as LightEngineService$WonderEditor from "../../../../../src/service/state/engine/LightEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as CameraEngineService$WonderEditor from "../../../../../src/service/state/engine/CameraEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as AddableComponentTool$WonderEditor from "./tool/AddableComponentTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js";
import * as OperateComponentEventTool$WonderEditor from "../../../../tool/OperateComponentEventTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as InspectorRemoveComponentUtils$WonderEditor from "../../../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRemoveComponentUtils.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("AddableComponent remove component", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test remove directionLight gameObject component", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectTobeCurrentSceneTreeNode);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                                    }));
                      }));
                describe("test remove light component", (function () {
                        describe("test snapshot", (function () {
                                return Wonder_jest.test("test remove light component, should remove from inspector", (function () {
                                              OperateComponentEventTool$WonderEditor.removeComponentFromCurrentGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getLightComponentFromDirectionLight */5](/* () */0));
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
                                              OperateComponentEventTool$WonderEditor.removeComponentFromCurrentGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getLightComponentFromDirectionLight */5](/* () */0));
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return LightEngineService$WonderEditor.hasLightComponent(partial_arg, param);
                                                                  }))), false);
                                            }));
                              }));
                        describe("should re-init all light material components in the scene", (function () {
                                describe("test remove direction light component", (function () {
                                        return Wonder_jest.test("glsl->DIRECTION_LIGHTS_COUNT should - 1", (function () {
                                                      var match = FakeGlToolEngine$WonderEditor.getEditEngineStateGlAndRunEngineStateGl(/* () */0);
                                                      var editGlShaderSource = match[0].shaderSource;
                                                      var runGlShaderSource = match[1].shaderSource;
                                                      OperateComponentEventTool$WonderEditor.removeComponentFromCurrentGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getLightComponentFromDirectionLight */5](/* () */0));
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(editGlShaderSource), "#define DIRECTION_LIGHTS_COUNT 0"),
                                                                      GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getFsSource(runGlShaderSource), "#define DIRECTION_LIGHTS_COUNT 0")
                                                                    ]), /* tuple */[
                                                                  true,
                                                                  true
                                                                ]);
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
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                                    }));
                      }));
                describe("test remove renderGroup component", (function () {
                        describe("test snapshot", (function () {
                                return Wonder_jest.test("test remove renderGroup component, should remove from inspector", (function () {
                                              OperateComponentEventTool$WonderEditor.removeComponentFromCurrentGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getRenderGroupComponentFromBox */6](/* () */0));
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
                                return Wonder_jest.test("test click remove renderGroup component, current gameObject shouldn't has it", (function () {
                                              OperateComponentEventTool$WonderEditor.removeComponentFromCurrentGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getRenderGroupComponentFromBox */6](/* () */0));
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return InspectorRenderGroupUtils$WonderEditor.hasRenderGroupComponents(partial_arg, param);
                                                                  }))), false);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test remove camera gameObject component", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCameraTobeCurrentSceneTreeNode);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                                    }));
                      }));
                describe("test remove cameraGroup component", (function () {
                        describe("test snapshot", (function () {
                                beforeEach((function () {
                                        HeaderTool$WonderEditor.triggerAddBox(/* () */0);
                                        SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getNewGameObjectDomIndex */4](/* () */0));
                                        AddableComponentTool$WonderEditor.addCameraGroupInBox(/* () */0);
                                        return MainEditorSceneTool$WonderEditor.setFirstCameraTobeCurrentSceneTreeNode(/* () */0);
                                      }));
                                return Wonder_jest.test("test remove cameraGroup component, should remove from inspector", (function () {
                                              OperateComponentEventTool$WonderEditor.removeComponentFromCurrentGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getCameraGroupFromCamera */8](/* () */0));
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        describe("test logic", (function () {
                                describe("test if not add other cameraGroup, can't remove last cameraGroup", (function () {
                                        return Wonder_jest.test("test remove last cameraGroup, should throw warn message", (function () {
                                                      return Wonder_jest.Expect[/* toThrowMessageRe */21]((/First argument to Node.prototype.appendChild must be a Node/img), Wonder_jest.Expect[/* expect */0]((function () {
                                                                        return OperateComponentEventTool$WonderEditor.removeComponentFromCurrentGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getCameraGroupFromCamera */8](/* () */0));
                                                                      })));
                                                    }));
                                      }));
                                describe("test add other cameraGroup", (function () {
                                        beforeEach((function () {
                                                HeaderTool$WonderEditor.triggerAddBox(/* () */0);
                                                SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getNewGameObjectDomIndex */4](/* () */0));
                                                AddableComponentTool$WonderEditor.addCameraGroupInBox(/* () */0);
                                                return MainEditorSceneTool$WonderEditor.setFirstCameraTobeCurrentSceneTreeNode(/* () */0);
                                              }));
                                        Wonder_jest.test("test if not remove cameraGroup component, current gameObject should has it", (function () {
                                                var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                      return CameraEngineService$WonderEditor.hasCameraGroup(partial_arg, param);
                                                                    }))), true);
                                              }));
                                        Wonder_jest.test("test click remove cameraGroup component, current gameObject shouldn't has it", (function () {
                                                OperateComponentEventTool$WonderEditor.removeComponentFromCurrentGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getCameraGroupFromCamera */8](/* () */0));
                                                var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                      return CameraEngineService$WonderEditor.hasCameraGroup(partial_arg, param);
                                                                    }))), false);
                                              }));
                                        return Wonder_jest.test("test remove current cameraGroup, should set last unActive cameraGroup is currentCamera", (function () {
                                                      SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getNewGameObjectDomIndex */4](/* () */0));
                                                      OperateComponentEventTool$WonderEditor.removeComponentFromCurrentGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getNewComponentFromBox */7](/* () */0));
                                                      var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                            return CameraEngineService$WonderEditor.hasCameraGroup(partial_arg, param);
                                                                          }))), false);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test remove arcballCamera component", (function () {
                        beforeEach((function () {
                                return AddableComponentTool$WonderEditor.addArcballCameraInCamera(/* () */0);
                              }));
                        describe("test snapshot", (function () {
                                return Wonder_jest.test("test remove arcballCamera component, should remove from inspector", (function () {
                                              OperateComponentEventTool$WonderEditor.removeComponentFromCurrentGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getArcballCameraComponentFromCamera */9](/* () */0));
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
                                              OperateComponentEventTool$WonderEditor.removeComponentFromCurrentGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getArcballCameraComponentFromCamera */9](/* () */0));
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
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCameraTobeCurrentSceneTreeNode);
                      }));
                describe("test InspectorRemoveComponentUtils removeComponentByType function", (function () {
                        Wonder_jest.test("test editEngineState remove unRemovable component, should throw error", (function () {
                                return Wonder_jest.Expect[/* toThrowMessageRe */21]((/removeComponentByTypeForEditEngineState/img), Wonder_jest.Expect[/* expect */0]((function () {
                                                  return InspectorRemoveComponentUtils$WonderEditor.removeComponentByTypeForEditEngineState(/* SourceInstance */6, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), StateLogicService$WonderEditor.getEditEngineState(/* () */0));
                                                })));
                              }));
                        return Wonder_jest.test("test runEngineState remove unRemovable component, should throw error", (function () {
                                      return Wonder_jest.Expect[/* toThrowMessageRe */21]((/removeComponentByTypeForRunEngineState/img), Wonder_jest.Expect[/* expect */0]((function () {
                                                        return InspectorRemoveComponentUtils$WonderEditor.removeComponentByTypeForRunEngineState(/* SourceInstance */6, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* tuple */[
                                                                    StateEditorService$WonderEditor.getState(/* () */0),
                                                                    StateLogicService$WonderEditor.getRunEngineState(/* () */0)
                                                                  ]);
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
