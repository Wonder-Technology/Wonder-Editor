

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as HeaderUtils$WonderEditor from "../../../../../../src/core/composable_component/header/utils/HeaderUtils.js";
import * as BaseEventTool$WonderEditor from "../../../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as SceneTreeTool$WonderEditor from "../../../../../tool/SceneTreeTool.js";
import * as ControllerTool$WonderEditor from "../../../../../integration/redo_undo/tool/ControllerTool.js";
import * as GLSLToolEngine$WonderEditor from "../../../../../tool/engine/GLSLToolEngine.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";
import * as GameObjectUtils$WonderEditor from "../../../../../../src/core/utils/engine/GameObjectUtils.js";
import * as FakeGlToolEngine$WonderEditor from "../../../../../tool/engine/FakeGlToolEngine.js";
import * as DiffComponentTool$WonderEditor from "../../../../../tool/DiffComponentTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as SceneEditorService$WonderEditor from "../../../../../../src/service/state/editor/scene/SceneEditorService.js";
import * as CameraEngineService$WonderEditor from "../../../../../../src/service/state/engine/CameraEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as OperateGameObjectEventTool$WonderEditor from "../../../../../tool/OperateGameObjectEventTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";

describe("controller header dispose gameObject", (function () {
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
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, /* () */0);
                        Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                        return ControllerTool$WonderEditor.run(/* () */0);
                      }));
                describe("gameObject should remove from editEngineState and runEngineState", (function () {
                        describe("test dispose current gameObject", (function () {
                                describe("current gameObject should be disposed from scene", (function () {
                                        beforeEach((function () {
                                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                                              }));
                                        Wonder_jest.test("test scene children shouldn't include it", (function () {
                                                var currentSceneTreeNode = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                                BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateLogicService$WonderEditor.getEditEngineState(/* () */0)).includes(DiffComponentTool$WonderEditor.getEditEngineComponent(/* GameObject */0, currentSceneTreeNode)),
                                                                GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0)).includes(currentSceneTreeNode)
                                                              ]), /* tuple */[
                                                            false,
                                                            false
                                                          ]);
                                              }));
                                        describe("if current gameObject or its children has light component", (function () {
                                                describe("test has direction light component", (function () {
                                                        describe("should re-init all light material components in the scene", (function () {
                                                                var _prepare = function () {
                                                                  var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                                                  var match = FakeGlToolEngine$WonderEditor.getEditEngineStateGlAndRunEngineStateGl(/* () */0);
                                                                  var editGlShaderSource = match[0].shaderSource;
                                                                  var runGlShaderSource = match[1].shaderSource;
                                                                  MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectTobeCurrentSceneTreeNode(/* () */0);
                                                                  return /* tuple */[
                                                                          component,
                                                                          editGlShaderSource,
                                                                          runGlShaderSource
                                                                        ];
                                                                };
                                                                Wonder_jest.test("test shaderSource should be called", (function () {
                                                                        var match = _prepare(/* () */0);
                                                                        BaseEventTool$WonderEditor.triggerComponentEvent(match[0], OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                        Sinon.getCallCount(match[1]),
                                                                                        Sinon.getCallCount(match[2])
                                                                                      ]), /* tuple */[
                                                                                    4,
                                                                                    4
                                                                                  ]);
                                                                      }));
                                                                return Wonder_jest.test("glsl->DIRECTION_LIGHTS_COUNT should == 0", (function () {
                                                                              var match = _prepare(/* () */0);
                                                                              BaseEventTool$WonderEditor.triggerComponentEvent(match[0], OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                              GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(match[1]), "#define DIRECTION_LIGHTS_COUNT 0"),
                                                                                              GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getFsSource(match[2]), "#define DIRECTION_LIGHTS_COUNT 0")
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
                                describe("test should remove current gameObject children", (function () {
                                        return Wonder_jest.test("test ee and re engineState should remove it's children", (function () {
                                                      var match = SceneTreeTool$WonderEditor.buildFourLayerSceneAndGetBox(sandbox);
                                                      var box4 = match[3];
                                                      var box3 = match[2];
                                                      var box1 = match[0];
                                                      var editEngineState = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
                                                      var runEngineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                                      var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      GameObjectTool$WonderEditor.isAlive(DiffComponentTool$WonderEditor.getEditEngineComponent(/* GameObject */0, box1), editEngineState),
                                                                      GameObjectTool$WonderEditor.isAlive(DiffComponentTool$WonderEditor.getEditEngineComponent(/* GameObject */0, box3), editEngineState),
                                                                      GameObjectTool$WonderEditor.isAlive(DiffComponentTool$WonderEditor.getEditEngineComponent(/* GameObject */0, box4), editEngineState),
                                                                      GameObjectTool$WonderEditor.isAlive(box1, runEngineState),
                                                                      GameObjectTool$WonderEditor.isAlive(box3, runEngineState),
                                                                      GameObjectTool$WonderEditor.isAlive(box4, runEngineState)
                                                                    ]), /* tuple */[
                                                                  false,
                                                                  false,
                                                                  false,
                                                                  false,
                                                                  false,
                                                                  false
                                                                ]);
                                                    }));
                                      }));
                                describe("test if current gameObject is Camera", (function () {
                                        Wonder_jest.test("test if camera count > 1, could remove specific camera", (function () {
                                                var match = SceneTreeTool$WonderEditor.buildTwoCameraSceneGraphToEngine(sandbox);
                                                var camera1 = match[0];
                                                SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateTwoCamera[/* getFirstCameraDomIndex */0](/* () */0));
                                                var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                                BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                GameObjectTool$WonderEditor.isAlive(DiffComponentTool$WonderEditor.getEditEngineComponent(/* GameObject */0, camera1), StateLogicService$WonderEditor.getEditEngineState(/* () */0)),
                                                                GameObjectTool$WonderEditor.isAlive(camera1, StateLogicService$WonderEditor.getRunEngineState(/* () */0))
                                                              ]), /* tuple */[
                                                            false,
                                                            false
                                                          ]);
                                              }));
                                        return Wonder_jest.test("else, can't dispose last camera", (function () {
                                                      MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      GameObjectTool$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0)).filter((function (gameObject) {
                                                                              return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                            return CameraEngineService$WonderEditor.hasCameraGroup(gameObject, param);
                                                                                          }));
                                                                            })).length,
                                                                      HeaderUtils$WonderEditor.doesSceneHasRemoveableCamera(/* () */0)
                                                                    ]), /* tuple */[
                                                                  1,
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
        describe("test scene tree", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                    {\n                        \"name\": \"default\",\n                        \"jobs\": [\n                            {\n                                \"name\": \"dispose\"\n                            }\n                        ]\n                    }\n                ]\n            ", undefined, undefined, /* () */0), undefined, /* () */0);
                        Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                        return ControllerTool$WonderEditor.run(/* () */0);
                      }));
                Wonder_jest.test("if not set currentSceneTreeNode, disposed button's disabled props should == true", (function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                                return /* () */0;
                              }));
                        StateLogicService$WonderEditor.getAndSetEditorState(SceneEditorService$WonderEditor.clearCurrentSceneTreeNode);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                      }));
                Wonder_jest.test("if set currentSceneTreeNode, disposed button's disabled props should == false", (function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                      }));
                return Wonder_jest.test("dispose current gameObject", (function () {
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                              var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                            }));
              }));
        describe("fix bug", (function () {
                return Wonder_jest.test("dispose gameObject should re-render edit canvas and run canvas", (function () {
                              MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                    {\n                        \"name\": \"default\",\n                        \"jobs\": [\n                            {\n                                \"name\": \"dispose\"\n                            },\n                            {\n                                \"name\": \"clear_color\"\n                            }\n                        ]\n                    }\n                ]\n            ", undefined, undefined, /* () */0), undefined, /* () */0);
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                              var eeGl = FakeGlToolEngine$WonderEditor.getGl(StateLogicService$WonderEditor.getEditEngineState(/* () */0));
                              var reGl = FakeGlToolEngine$WonderEditor.getGl(StateLogicService$WonderEditor.getEditEngineState(/* () */0));
                              var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              Sinon.getCallCount(eeGl.clearColor),
                                              Sinon.getCallCount(reGl.clearColor)
                                            ]), /* tuple */[
                                          1,
                                          1
                                        ]);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
