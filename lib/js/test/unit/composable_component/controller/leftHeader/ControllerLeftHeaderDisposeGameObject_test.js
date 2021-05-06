'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../tool/TestTool.js");
var MainUtils$WonderEditor = require("../../../../../src/core/utils/engine/MainUtils.js");
var SceneUtils$WonderEditor = require("../../../../../src/core/utils/engine/SceneUtils.js");
var ConsoleTool$WonderEditor = require("../../../tool/external/ConsoleTool.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var SceneTreeTool$WonderEditor = require("../../../../tool/SceneTreeTool.js");
var ControllerTool$WonderEditor = require("../tool/ControllerTool.js");
var GLSLToolEngine$WonderEditor = require("../../../../tool/engine/GLSLToolEngine.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var SceneToolEngine$WonderEditor = require("../../../../tool/engine/SceneToolEngine.js");
var FakeGlToolEngine$WonderEditor = require("../../../../tool/engine/FakeGlToolEngine.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../../../integration/asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../../integration/asset/tool/MainEditorAssetIdTool.js");
var RefreshEngineStateTool$WonderEditor = require("../../../../tool/RefreshEngineStateTool.js");
var SceneTreeEditorService$WonderEditor = require("../../../../../src/service/state/editor/sceneTree/SceneTreeEditorService.js");
var LightMaterialToolEngine$WonderEditor = require("../../../../tool/engine/LightMaterialToolEngine.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../integration/asset/tool/MainEditorAssetTreeTool.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../tool/MainEditorSceneTreeTool.js");
var MainEditorLeftHeaderTool$WonderEditor = require("../../mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../../../integration/asset/tool/MainEditorAssetUploadTool.js");
var ArcballCameraEngineService$WonderEditor = require("../../../../../src/service/state/engine/ArcballCameraEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var MaterialDataAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/MaterialDataAssetEditorService.js");
var MainEditorAssetMaterialNodeTool$WonderEditor = require("../../../../integration/asset/tool/MainEditorAssetMaterialNodeTool.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var ArcballCameraControllerToolEngine$WonderEditor = require("../../../../tool/engine/ArcballCameraControllerToolEngine.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../integration/asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var MainEditorLightMaterialForGameObjectTool$WonderEditor = require("../../../../integration/inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialForGameObjectTool.js");

Wonder_jest.describe("controller leftHeader dispose gameObject", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test dispose gameObject", (function (param) {
                beforeEach((function () {
                        return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("gameObject should remove from engineState", (function (param) {
                              return Wonder_jest.describe("test dispose current gameObject", (function (param) {
                                            Wonder_jest.describe("current gameObject should be disposed from scene", (function (param) {
                                                    beforeEach((function () {
                                                            return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                                          }));
                                                    Wonder_jest.test("test scene children shouldn't include it", (function (param) {
                                                            var currentSceneTreeNode = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                            MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).includes(currentSceneTreeNode)), false);
                                                          }));
                                                    return Wonder_jest.describe("if current gameObject or its children has light component", (function (param) {
                                                                  return Wonder_jest.describe("test has direction light component", (function (param) {
                                                                                return Wonder_jest.describe("should re-init all light material components", (function (param) {
                                                                                              var _prepare = function (param) {
                                                                                                var gl = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0);
                                                                                                var glShaderSource = gl.shaderSource;
                                                                                                MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectToBeCurrentSceneTreeNode(/* () */0);
                                                                                                return glShaderSource;
                                                                                              };
                                                                                              Wonder_jest.test("test shaderSource should be called", (function (param) {
                                                                                                      var glShaderSource = _prepare(/* () */0);
                                                                                                      MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(glShaderSource)), 2);
                                                                                                    }));
                                                                                              Wonder_jest.test("glsl->DIRECTION_LIGHTS_COUNT should == 0", (function (param) {
                                                                                                      var glShaderSource = _prepare(/* () */0);
                                                                                                      MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(glShaderSource), "#define DIRECTION_LIGHTS_COUNT 0")), true);
                                                                                                    }));
                                                                                              return Wonder_jest.describe("fix bug", (function (param) {
                                                                                                            beforeEach((function () {
                                                                                                                    Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                                                                                                    return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                                                                                                  }));
                                                                                                            return Wonder_jest.testPromise("should re-init material assets which type is lightMaterial", undefined, (function (param) {
                                                                                                                          var glShaderSource = _prepare(/* () */0);
                                                                                                                          MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                                                                                          var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                                                                                          var material = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                                                                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                                                                                        MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, material, uploadedTextureNodeId, /* () */0);
                                                                                                                                        var glShaderSourceCallCountBeforeDispose = Sinon.getCallCount(glShaderSource);
                                                                                                                                        MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                                                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(glShaderSource) - glShaderSourceCallCountBeforeDispose | 0), 4));
                                                                                                                                      }));
                                                                                                                        }));
                                                                                                          }));
                                                                                            }));
                                                                              }));
                                                                }));
                                                  }));
                                            Wonder_jest.describe("test should remove current gameObject children", (function (param) {
                                                    return Wonder_jest.test("test engineState should remove it's children", (function (param) {
                                                                  var match = SceneTreeTool$WonderEditor.buildFourLayerSceneGraphToEngine(sandbox);
                                                                  var match$1 = match[1];
                                                                  var cube1 = match$1[0];
                                                                  GameObjectTool$WonderEditor.setCurrentSceneTreeNode(cube1);
                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                  MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                                            return Wonder_jest.describe("test if current gameObject is Camera", (function (param) {
                                                          Wonder_jest.describe("test has other cameras after remove", (function (param) {
                                                                  var _test = function (param) {
                                                                    var match = SceneTreeTool$WonderEditor.buildTwoCameraSceneGraphToEngine(sandbox);
                                                                    MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode(/* () */0);
                                                                    MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                                    return /* tuple */[
                                                                            match[0],
                                                                            match[1]
                                                                          ];
                                                                  };
                                                                  return Wonder_jest.test("test camera gameObject is disposed", (function (param) {
                                                                                var match = _test(/* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.isAlive(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), false);
                                                                              }));
                                                                }));
                                                          return Wonder_jest.describe("test has no camera after remove", (function (param) {
                                                                        Wonder_jest.test("test camera gameObject is disposed", (function (param) {
                                                                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                                                                                MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                SceneToolEngine$WonderEditor.getSceneAllBasicCameraViews(StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length,
                                                                                                SceneUtils$WonderEditor.doesSceneHasRemoveableCamera(/* () */0)
                                                                                              ]), /* tuple */[
                                                                                            0,
                                                                                            false
                                                                                          ]);
                                                                              }));
                                                                        return Wonder_jest.describe("if is run", (function (param) {
                                                                                      return Wonder_jest.describe("if basicCameraView is active and gameObject has arcballCameraController", (function (param) {
                                                                                                    return Wonder_jest.test("unbind arcballCameraController event for game view", (function (param) {
                                                                                                                  MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                                                                                                                  ControllerTool$WonderEditor.setIsRun(true);
                                                                                                                  var __x = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                                                                                  var match = ArcballCameraControllerToolEngine$WonderEditor.addGameObjectArcballCameraControllerComponentAndBindArcballCameraControllerEventForGameView(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                                                                                                  StateEngineService$WonderEditor.setState(match[0]);
                                                                                                                  MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(match[2], engineState)), false);
                                                                                                                }));
                                                                                                  }));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test scene tree", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                    {\n                        \"name\": \"default\",\n                        \"jobs\": [\n                            {\n                                \"name\": \"dispose\"\n                            }\n                        ]\n                    }\n                ]\n            ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                        Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                        return ControllerTool$WonderEditor.run(/* () */0);
                      }));
                Wonder_jest.test("if not set currentSceneTreeNode, disposed button's disabled props should == true", (function (param) {
                        MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                        StateLogicService$WonderEditor.getAndSetEditorState(SceneTreeEditorService$WonderEditor.clearCurrentSceneTreeNode);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildLeftHeader(/* () */0));
                      }));
                Wonder_jest.test("if set currentSceneTreeNode, disposed button's disabled props should == false", (function (param) {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildLeftHeader(/* () */0));
                      }));
                return Wonder_jest.test("dispose current gameObject", (function (param) {
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                            }));
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      Wonder_jest.test("dispose gameObject should refresh engine state", (function (param) {
                              return RefreshEngineStateTool$WonderEditor.testRefreshEngineState(sandbox, (function (param) {
                                            MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                            return MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                          }));
                            }));
                      Wonder_jest.describe("dispose gameObject shouldn't cause update_transform_gizmos job error", (function (param) {
                              var _prepareState = function (param) {
                                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_transform_gizmos\"\n            }\n          ]\n        }\n      ]\n            ", "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n\n                               {\n                                   \"name\": \"dispose\"\n                               },\n{\"name\": \"update_transform_gizmos\" }\n           ]\n         }\n       ]\n             ", undefined, undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              };
                              beforeEach((function () {
                                      _prepareState(/* () */0);
                                      return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                    }));
                              return Wonder_jest.test("test", (function (param) {
                                            ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                            var error = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                                            MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                            return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](error)));
                                          }));
                            }));
                      return Wonder_jest.describe("dispose gameObject shouldn't dispose gameObject->material component", (function (param) {
                                    beforeEach((function () {
                                            MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                                            return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                          }));
                                    var _disposeAllSceneGameObjects = function (param) {
                                      MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                      MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getFirstCube), /* () */0);
                                      return MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                    };
                                    return Wonder_jest.test("test", (function (param) {
                                                  _disposeAllSceneGameObjects(/* () */0);
                                                  var partial_arg = StateLogicService$WonderEditor.getEditorState(MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultLightMaterial);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return LightMaterialToolEngine$WonderEditor.isAlive(partial_arg, param);
                                                                      }))), true);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
