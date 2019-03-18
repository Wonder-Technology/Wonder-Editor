

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as MainUtils$WonderEditor from "../../../../../src/core/utils/engine/MainUtils.js";
import * as SceneUtils$WonderEditor from "../../../../../src/core/utils/engine/SceneUtils.js";
import * as ConsoleTool$WonderEditor from "../../../tool/external/ConsoleTool.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as SceneTreeTool$WonderEditor from "../../../../tool/SceneTreeTool.js";
import * as ControllerTool$WonderEditor from "../tool/ControllerTool.js";
import * as GLSLToolEngine$WonderEditor from "../../../../tool/engine/GLSLToolEngine.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as SceneToolEngine$WonderEditor from "../../../../tool/engine/SceneToolEngine.js";
import * as FakeGlToolEngine$WonderEditor from "../../../../tool/engine/FakeGlToolEngine.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../integration/asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetIdTool$WonderEditor from "../../../../integration/asset/tool/MainEditorAssetIdTool.js";
import * as RefreshEngineStateTool$WonderEditor from "../../../../tool/RefreshEngineStateTool.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../src/service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as LightMaterialToolEngine$WonderEditor from "../../../../tool/engine/LightMaterialToolEngine.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../../../integration/asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../tool/MainEditorSceneTreeTool.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../../../integration/asset/tool/MainEditorAssetUploadTool.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as MainEditorLightMaterialTool$WonderEditor from "../../../../integration/inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/MaterialDataAssetEditorService.js";
import * as MainEditorAssetMaterialNodeTool$WonderEditor from "../../../../integration/asset/tool/MainEditorAssetMaterialNodeTool.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as ArcballCameraControllerToolEngine$WonderEditor from "../../../../tool/engine/ArcballCameraControllerToolEngine.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../../../integration/asset/tool/MainEditorAssetHeaderOperateNodeTool.js";

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
                        return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
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
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).includes(currentSceneTreeNode)), false);
                                              }));
                                        describe("if current gameObject or its children has light component", (function () {
                                                describe("test has direction light component", (function () {
                                                        describe("should re-init all light material components", (function () {
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
                                                                Wonder_jest.test("glsl->DIRECTION_LIGHTS_COUNT should == 0", (function () {
                                                                        var glShaderSource = _prepare(/* () */0);
                                                                        MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(glShaderSource), "#define DIRECTION_LIGHTS_COUNT 0")), true);
                                                                      }));
                                                                describe("fix bug", (function () {
                                                                        beforeEach((function () {
                                                                                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                                                                return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                                                              }));
                                                                        return Wonder_jest.testPromise("should re-init material assets which type is lightMaterial", (function () {
                                                                                      var glShaderSource = _prepare(/* () */0);
                                                                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                                                      var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                                                      var material = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                                                    MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, material, uploadedTextureNodeId, /* () */0);
                                                                                                    var glShaderSourceCallCountBeforeDispose = Sinon.getCallCount(glShaderSource);
                                                                                                    MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(glShaderSource) - glShaderSourceCallCountBeforeDispose | 0), 4));
                                                                                                  }));
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
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                    {\n                        \"name\": \"default\",\n                        \"jobs\": [\n                            {\n                                \"name\": \"dispose\"\n                            }\n                        ]\n                    }\n                ]\n            ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                        Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                        return ControllerTool$WonderEditor.run(/* () */0);
                      }));
                Wonder_jest.test("if not set currentSceneTreeNode, disposed button's disabled props should == true", (function () {
                        MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
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
                Wonder_jest.test("dispose gameObject should refresh engine state", (function () {
                        return RefreshEngineStateTool$WonderEditor.testRefreshEngineState(sandbox, (function () {
                                      MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                      return MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                    }));
                      }));
                describe("dispose gameObject shouldn't cause update_transform_gizmos job error", (function () {
                        var _prepareState = function () {
                          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_transform_gizmos\"\n            }\n          ]\n        }\n      ]\n            ", "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n\n                               {\n                                   \"name\": \"dispose\"\n                               },\n{\"name\": \"update_transform_gizmos\" }\n           ]\n         }\n       ]\n             ", undefined, undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
                          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                        };
                        beforeEach((function () {
                                _prepareState(/* () */0);
                                return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                              }));
                        return Wonder_jest.test("test", (function () {
                                      ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                      var error = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                                      MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                      return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](error)));
                                    }));
                      }));
                describe("dispose gameObject shouldn't dispose gameObject->material component", (function () {
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              }));
                        var _disposeAllSceneGameObjects = function () {
                          MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                          MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getFirstCube), /* () */0);
                          return MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                        };
                        return Wonder_jest.test("test", (function () {
                                      _disposeAllSceneGameObjects(/* () */0);
                                      var partial_arg = StateLogicService$WonderEditor.getEditorState(MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultLightMaterial);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                            return LightMaterialToolEngine$WonderEditor.isAlive(partial_arg, param);
                                                          }))), true);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
