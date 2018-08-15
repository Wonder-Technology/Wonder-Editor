

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as InspectorTool$WonderEditor from "../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
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
import * as InspectorRenderGroupUtils$WonderEditor from "../../../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js";
import * as InspectorAddComponentUtils$WonderEditor from "../../../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorAddComponentUtils.js";
import * as InspectorHasComponentUtils$WonderEditor from "../../../../../src/core/composable_component/mainEditor/composable_component/inspector/utils/InspectorHasComponentUtils.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("AddableComponent add component", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test gameObject add component workflow", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                                    }));
                      }));
                describe("test add light component", (function () {
                        describe("test snapshot", (function () {
                                return Wonder_jest.test("test click add light component, should add into inspector", (function () {
                                              AddableComponentTool$WonderEditor.addDirectionLightInBox(/* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        describe("test logic", (function () {
                                Wonder_jest.test("test if not add light component, current gameObject shouldn't has it", (function () {
                                        var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return LightEngineService$WonderEditor.hasLightComponent(partial_arg, param);
                                                            }))), false);
                                      }));
                                return Wonder_jest.test("test click add light component, should add into engine", (function () {
                                              AddableComponentTool$WonderEditor.addDirectionLightInBox(/* () */0);
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return LightEngineService$WonderEditor.hasLightComponent(partial_arg, param);
                                                                  }))), true);
                                            }));
                              }));
                        describe("should re-init all light material components in the scene", (function () {
                                describe("test add direction light component", (function () {
                                        return Wonder_jest.test("glsl->DIRECTION_LIGHTS_COUNT should + 1", (function () {
                                                      var match = FakeGlToolEngine$WonderEditor.getEditEngineStateGlAndRunEngineStateGl(/* () */0);
                                                      var editGlShaderSource = match[0].shaderSource;
                                                      var runGlShaderSource = match[1].shaderSource;
                                                      AddableComponentTool$WonderEditor.addDirectionLightInBox(/* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(editGlShaderSource), "#define DIRECTION_LIGHTS_COUNT 2"),
                                                                      GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getFsSource(runGlShaderSource), "#define DIRECTION_LIGHTS_COUNT 2")
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
                describe("test add cameraGroup component", (function () {
                        describe("test snapshot", (function () {
                                return Wonder_jest.test("test click add cameraGroup, should add into inspector", (function () {
                                              AddableComponentTool$WonderEditor.addCameraGroupInBox(/* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        describe("test logic", (function () {
                                Wonder_jest.test("test if not add cameraGroup component, current gameObject shouldn't has it", (function () {
                                        var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return CameraEngineService$WonderEditor.hasCameraGroup(partial_arg, param);
                                                            }))), false);
                                      }));
                                return Wonder_jest.test("test click add cameraGroup component, should add into engine", (function () {
                                              AddableComponentTool$WonderEditor.addCameraGroupInBox(/* () */0);
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return CameraEngineService$WonderEditor.hasCameraGroup(partial_arg, param);
                                                                  }))), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test camera add component", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCameraTobeCurrentSceneTreeNode);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                                    }));
                      }));
                describe("test add renderGroup component", (function () {
                        describe("test snapshot", (function () {
                                return Wonder_jest.test("test click add renderGroup, should add into inspector", (function () {
                                              AddableComponentTool$WonderEditor.addRenderGroupInCamera(/* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        describe("test logic", (function () {
                                Wonder_jest.test("test if not add renderGroup component, current gameObject shouldn't has it", (function () {
                                        var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return InspectorRenderGroupUtils$WonderEditor.hasRenderGroupComponents(partial_arg, param);
                                                            }))), false);
                                      }));
                                return Wonder_jest.test("test click add renderGroup component, should add into engine", (function () {
                                              AddableComponentTool$WonderEditor.addRenderGroupInCamera(/* () */0);
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return InspectorRenderGroupUtils$WonderEditor.hasRenderGroupComponents(partial_arg, param);
                                                                  }))), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test add arcballCamera component", (function () {
                        describe("test snapshot", (function () {
                                return Wonder_jest.test("test click add arcballCamera, should add into inspector", (function () {
                                              AddableComponentTool$WonderEditor.addArcballCameraInCamera(/* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        describe("test logic", (function () {
                                Wonder_jest.test("test if not add arcballCamera component, current gameObject shouldn't has it", (function () {
                                        var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(partial_arg, param);
                                                            }))), false);
                                      }));
                                return Wonder_jest.test("test click add arcballCamera component, should add into engine", (function () {
                                              AddableComponentTool$WonderEditor.addArcballCameraInCamera(/* () */0);
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(partial_arg, param);
                                                                  }))), true);
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
                describe("test InspectorAddComponentUtils addComponentByType function", (function () {
                        Wonder_jest.test("test editEngineState add unaddable component, should throw error", (function () {
                                return Wonder_jest.Expect[/* toThrowMessageRe */21]((/addComponentByTypeForEditEngineState/img), Wonder_jest.Expect[/* expect */0]((function () {
                                                  return InspectorAddComponentUtils$WonderEditor.addComponentByTypeForEditEngineState(/* SourceInstance */6, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), StateLogicService$WonderEditor.getEditEngineState(/* () */0));
                                                })));
                              }));
                        return Wonder_jest.test("test runEngineState add unaddable component, should throw error", (function () {
                                      return Wonder_jest.Expect[/* toThrowMessageRe */21]((/addComponentByTypeForRunEngineState/img), Wonder_jest.Expect[/* expect */0]((function () {
                                                        return InspectorAddComponentUtils$WonderEditor.addComponentByTypeForRunEngineState(/* SourceInstance */6, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* tuple */[
                                                                    StateEditorService$WonderEditor.getState(/* () */0),
                                                                    StateLogicService$WonderEditor.getRunEngineState(/* () */0)
                                                                  ]);
                                                      })));
                                    }));
                      }));
                describe("test InspectorHasComponentUtils isHasSpecificComponentByType", (function () {
                        return Wonder_jest.test("test has sourceInstance component, should throw error", (function () {
                                      return Wonder_jest.Expect[/* toThrowMessageRe */21]((/isHasSpecificComponentByType/img), Wonder_jest.Expect[/* expect */0]((function () {
                                                        return InspectorHasComponentUtils$WonderEditor.isHasSpecificComponentByType(/* SourceInstance */6, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0));
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
