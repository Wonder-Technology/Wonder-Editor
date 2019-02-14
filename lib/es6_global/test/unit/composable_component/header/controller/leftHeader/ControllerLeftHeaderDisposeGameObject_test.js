

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as SceneUtils$WonderEditor from "../../../../../../src/core/utils/engine/SceneUtils.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as SceneTreeTool$WonderEditor from "../../../../../tool/SceneTreeTool.js";
import * as ControllerTool$WonderEditor from "../../../controller/tool/ControllerTool.js";
import * as GLSLToolEngine$WonderEditor from "../../../../../tool/engine/GLSLToolEngine.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";
import * as GameObjectUtils$WonderEditor from "../../../../../../src/core/utils/engine/GameObjectUtils.js";
import * as SceneToolEngine$WonderEditor from "../../../../../tool/engine/SceneToolEngine.js";
import * as FakeGlToolEngine$WonderEditor from "../../../../../tool/engine/FakeGlToolEngine.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../src/service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../../mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as ArcballCameraControllerToolEngine$WonderEditor from "../../../../../tool/engine/ArcballCameraControllerToolEngine.js";

describe("controller leftHeader dispose gameObject", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test dispose gameObject", (function () {
                beforeEach((function () {
                        return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                      }));
                describe("gameObject should remove from engineState", (function () {
                        describe("test dispose current gameObject", (function () {
                                describe("current gameObject should be disposed from scene", (function () {
                                        beforeEach((function () {
                                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                              }));
                                        Wonder_jest.test("test scene children shouldn't include it", (function () {
                                                var currentSceneTreeNode = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).includes(currentSceneTreeNode)), false);
                                              }));
                                        describe("if current gameObject or its children has light component", (function () {
                                                describe("test has direction light component", (function () {
                                                        describe("should re-init all light material components in the scene", (function () {
                                                                var _prepare = function () {
                                                                  var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                                  var glShaderSource = gl.shaderSource;
                                                                  MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectToBeCurrentSceneTreeNode(/* () */0);
                                                                  return glShaderSource;
                                                                };
                                                                Wonder_jest.test("test shaderSource should be called", (function () {
                                                                        var glShaderSource = _prepare(/* () */0);
                                                                        MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(glShaderSource)), 2);
                                                                      }));
                                                                return Wonder_jest.test("glsl->DIRECTION_LIGHTS_COUNT should == 0", (function () {
                                                                              var glShaderSource = _prepare(/* () */0);
                                                                              MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(glShaderSource), "#define DIRECTION_LIGHTS_COUNT 0")), true);
                                                                            }));
                                                              }));
                                                        return /* () */0;
                                                      }));
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test should remove current gameObject children", (function () {
                                        return Wonder_jest.test("test engineState should remove it's children", (function () {
                                                      var match = SceneTreeTool$WonderEditor.buildFourLayerSceneGraphToEngine(sandbox);
                                                      var match$1 = match[1];
                                                      var cube1 = match$1[0];
                                                      GameObjectTool$WonderEditor.setCurrentSceneTreeNode(cube1);
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      GameObjectTool$WonderEditor.isAlive(cube1, engineState),
                                                                      GameObjectTool$WonderEditor.isAlive(match$1[1], engineState),
                                                                      GameObjectTool$WonderEditor.isAlive(match$1[2], engineState)
                                                                    ]), /* tuple */[
                                                                  false,
                                                                  false,
                                                                  false
                                                                ]);
                                                    }));
                                      }));
                                describe("test if current gameObject is Camera", (function () {
                                        describe("test has other cameras after remove", (function () {
                                                var _test = function () {
                                                  var match = SceneTreeTool$WonderEditor.buildTwoCameraSceneGraphToEngine(sandbox);
                                                  MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode(/* () */0);
                                                  MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                  return /* tuple */[
                                                          match[0],
                                                          match[1]
                                                        ];
                                                };
                                                return Wonder_jest.test("test camera gameObject is disposed", (function () {
                                                              var match = _test(/* () */0);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.isAlive(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), false);
                                                            }));
                                              }));
                                        describe("test has no camera after remove", (function () {
                                                Wonder_jest.test("test camera gameObject is disposed", (function () {
                                                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                                                        MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        SceneToolEngine$WonderEditor.getSceneAllBasicCameraViews(StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length,
                                                                        SceneUtils$WonderEditor.doesSceneHasRemoveableCamera(/* () */0)
                                                                      ]), /* tuple */[
                                                                    0,
                                                                    false
                                                                  ]);
                                                      }));
                                                describe("if is run", (function () {
                                                        describe("if basicCameraView is active and gameObject has arcballCameraController", (function () {
                                                                return Wonder_jest.test("unbind arcballCameraController event for game view", (function () {
                                                                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                                                                              ControllerTool$WonderEditor.setIsRun(true);
                                                                              var __x = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                                              var match = ArcballCameraControllerToolEngine$WonderEditor.addGameObjectArcballCameraControllerComponentAndBindArcballCameraControllerEventForGameView(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                                                              StateEngineService$WonderEditor.setState(match[0]);
                                                                              MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
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
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test scene tree", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                    {\n                        \"name\": \"default\",\n                        \"jobs\": [\n                            {\n                                \"name\": \"dispose\"\n                            }\n                        ]\n                    }\n                ]\n            ", undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                        Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                        return ControllerTool$WonderEditor.run(/* () */0);
                      }));
                Wonder_jest.test("if not set currentSceneTreeNode, disposed button's disabled props should == true", (function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                                return /* () */0;
                              }));
                        StateLogicService$WonderEditor.getAndSetEditorState(SceneTreeEditorService$WonderEditor.clearCurrentSceneTreeNode);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                      }));
                Wonder_jest.test("if set currentSceneTreeNode, disposed button's disabled props should == false", (function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                      }));
                return Wonder_jest.test("dispose current gameObject", (function () {
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                            }));
              }));
        describe("fix bug", (function () {
                return Wonder_jest.test("dispose gameObject should re-render edit canvas and run canvas", (function () {
                              MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                    {\n                        \"name\": \"default\",\n                        \"jobs\": [\n                            {\n                                \"name\": \"dispose\"\n                            },\n                            {\n                                \"name\": \"clear_color\"\n                            }\n                        ]\n                    }\n                ]\n            ", undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              var gl = FakeGlToolEngine$WonderEditor.getGl(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                              MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(gl.clearColor)), 1);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
