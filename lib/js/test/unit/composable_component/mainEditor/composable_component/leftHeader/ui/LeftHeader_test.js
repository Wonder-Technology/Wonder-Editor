'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ConsoleTool$WonderEditor = require("../../../../../tool/external/ConsoleTool.js");
var OptionService$WonderEditor = require("../../../../../../../src/service/primitive/OptionService.js");
var SceneTreeTool$WonderEditor = require("../../../../../../tool/SceneTreeTool.js");
var GLSLToolEngine$WonderEditor = require("../../../../../../tool/engine/GLSLToolEngine.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var FakeGlToolEngine$WonderEditor = require("../../../../../../tool/engine/FakeGlToolEngine.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var SceneEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var GameObjectToolEngine$WonderEditor = require("../../../../../../tool/engine/GameObjectToolEngine.js");
var GameViewEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/view/gameView/GameViewEditorService.js");
var InspectorEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/inspector/InspectorEditorService.js");
var SceneTreeEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/sceneTree/SceneTreeEditorService.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../../../tool/MainEditorSceneTreeTool.js");
var MainEditorLeftHeaderTool$WonderEditor = require("../tool/MainEditorLeftHeaderTool.js");
var PrepareRenderViewJobTool$WonderEditor = require("../../../../../../integration/job/tool/PrepareRenderViewJobTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var ImmutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ImmutableSparseMapService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");

Wonder_jest.describe("LeftHeader", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test operate gameObject", (function (param) {
                      beforeEach((function () {
                              return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                    {\n                        \"name\": \"default\",\n                        \"jobs\": [\n                            {\n                                \"name\": \"dispose\"\n                            }\n                        ]\n                    }\n                ]\n            ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                            }));
                      Wonder_jest.describe("test add gameObject", (function (param) {
                              beforeEach((function () {
                                      return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                    }));
                              Wonder_jest.describe("test add emptyGameObject", (function (param) {
                                      return Wonder_jest.test("the added emptyGameObject should only has transform component", (function (param) {
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var newGameObject = GameObjectTool$WonderEditor.getNewGameObject(undefined, /* () */0);
                                                    MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                                    MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, newGameObject, /* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    GameObjectComponentEngineService$WonderEditor.hasTransformComponent(GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), engineState),
                                                                    GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent(GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), engineState)
                                                                  ]), /* tuple */[
                                                                true,
                                                                false
                                                              ]);
                                                  }));
                                    }));
                              return Wonder_jest.describe("test added gameObject's parent", (function (param) {
                                            Wonder_jest.test("if has currentSceneTreeNode, added gameObject should add into currentSceneTreeNode", (function (param) {
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var newGameObject = GameObjectTool$WonderEditor.getNewGameObject(undefined, /* () */0);
                                                    MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                    MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(HierarchyGameObjectEngineService$WonderEditor.getParentGameObject(newGameObject, engineState))), StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode));
                                                  }));
                                            return Wonder_jest.test("else, added gameObject should add into scene gameObject", (function (param) {
                                                          StateLogicService$WonderEditor.getAndSetEditorState(SceneTreeEditorService$WonderEditor.clearCurrentSceneTreeNode);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var newGameObject = GameObjectTool$WonderEditor.getNewGameObject(undefined, /* () */0);
                                                          MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(HierarchyGameObjectEngineService$WonderEditor.getParentGameObject(newGameObject, engineState))), SceneEngineService$WonderEditor.getSceneGameObject(engineState));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test dispose gameObject", (function (param) {
                              beforeEach((function () {
                                      return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                    }));
                              Wonder_jest.test("if not set current gameObject, log error message and continue", (function (param) {
                                      ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                      var error = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                                      GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                      MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                      return Wonder_jest.Expect[/* toContain */10]("current gameObject should exist, but actual is None", Wonder_jest.Expect[/* expect */0](ConsoleTool$WonderEditor.getMessage(error)));
                                    }));
                              Wonder_jest.describe("else", (function (param) {
                                      return Wonder_jest.test("remove current gameObject from editorState", (function (param) {
                                                    MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(GameObjectTool$WonderEditor.getCurrentSceneTreeNode(/* () */0))), true);
                                                  }));
                                    }));
                              return Wonder_jest.describe("fix bug", (function (param) {
                                            var _prepareState = function (param) {
                                              MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                      [\n                        {\n                        \"name\": \"default\",\n                          \"jobs\": [\n                        {\"name\": \"dispose\" },\n                        {\"name\": \"prepare_render_game_view\" }\n                            ]\n                          }\n                      ]\n                  ", undefined, "\n                        [\n                          {\"name\": \"dispose\" },\n                          {\"name\": \"prepare_render_game_view\" }\n                        ]\n                  ", /* () */0), undefined, false, false, undefined, /* () */0);
                                              return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                            };
                                            return Wonder_jest.test("remove actived camera's parent gameObject should dispose camera", (function (param) {
                                                          PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                                                          StateEditorService$WonderEditor.getState(/* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var activedCamera = MainEditorSceneTool$WonderEditor.getCameraInDefaultScene(engineState);
                                                          MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](activedCamera, MainEditorSceneTool$WonderEditor.getFirstCube(engineState), undefined, undefined, undefined, /* () */0);
                                                          var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, MainEditorSceneTool$WonderEditor.getFirstCube(engineState$1), /* () */0);
                                                          MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          GameObjectToolEngine$WonderEditor.isAlive(activedCamera, StateEngineService$WonderEditor.unsafeGetState(/* () */0)),
                                                                          GameViewEditorService$WonderEditor.getActivedBasicCameraView(StateEditorService$WonderEditor.getState(/* () */0))
                                                                        ]), /* tuple */[
                                                                      false,
                                                                      undefined
                                                                    ]);
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("fix bug", (function (param) {
                              return Wonder_jest.test("remove gameObject has children;\n            the children should be removed together;", (function (param) {
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
                      return Wonder_jest.describe("test clone gameObject", (function (param) {
                                    Wonder_jest.test("test clone one gameObject, the cloned gameObject should add into its parent children", (function (param) {
                                            var match = SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                                            var match$1 = match[1];
                                            var cube4 = match$1[1];
                                            var cube1 = match$1[0];
                                            GameObjectTool$WonderEditor.setCurrentSceneTreeNode(cube4);
                                            MainEditorLeftHeaderTool$WonderEditor.cloneCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                            var clonedGameObject = cube4 + 1 | 0;
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return GameObjectTool$WonderEditor.getChildren(cube1, param);
                                                                  })).includes(clonedGameObject)), true);
                                          }));
                                    Wonder_jest.test("test the cloned gameObject should be currentSceneTreeNode", (function (param) {
                                            var match = SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                                            var cube4 = match[1][1];
                                            GameObjectTool$WonderEditor.setCurrentSceneTreeNode(cube4);
                                            MainEditorLeftHeaderTool$WonderEditor.cloneCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                            var clonedGameObject = cube4 + 1 | 0;
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(StateEditorService$WonderEditor.getState(/* () */0))), clonedGameObject);
                                          }));
                                    Wonder_jest.describe("test clone gameObject componentMap", (function (param) {
                                            Wonder_jest.test("test cloned gameObject rebuild components should add into componentMap", (function (param) {
                                                    var match = SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                                                    var cube4 = match[1][1];
                                                    GameObjectTool$WonderEditor.setCurrentSceneTreeNode(cube4);
                                                    MainEditorLeftHeaderTool$WonderEditor.cloneCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                    var clonedGameObject = cube4 + 1 | 0;
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isSome(ImmutableSparseMapService$WonderCommonlib.get(clonedGameObject, InspectorEditorService$WonderEditor.getComponentTypeMap(StateEditorService$WonderEditor.getState(/* () */0))))), true);
                                                  }));
                                            return Wonder_jest.test("test cloned gameObject components should === target gameObject components ", (function (param) {
                                                          var match = SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                                                          var cube4 = match[1][1];
                                                          GameObjectTool$WonderEditor.setCurrentSceneTreeNode(cube4);
                                                          MainEditorLeftHeaderTool$WonderEditor.cloneCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                          var targetGameObjectComponentArray = ImmutableSparseMapService$WonderCommonlib.unsafeGet(cube4, InspectorEditorService$WonderEditor.getComponentTypeMap(editorState));
                                                          var clonedGameObject = cube4 + 1 | 0;
                                                          var clonedGameObjectComponentArray = ImmutableSparseMapService$WonderCommonlib.unsafeGet(clonedGameObject, InspectorEditorService$WonderEditor.getComponentTypeMap(editorState));
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](targetGameObjectComponentArray), clonedGameObjectComponentArray);
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test if clone gameObject or its children has light component", (function (param) {
                                                  beforeEach((function () {
                                                          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectToBeCurrentSceneTreeNode);
                                                        }));
                                                  return Wonder_jest.describe("test has direction light component", (function (param) {
                                                                return Wonder_jest.describe("should re-init all light material components", (function (param) {
                                                                              Wonder_jest.test("test shaderSource should be called", (function (param) {
                                                                                      var glShaderSource = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0).shaderSource;
                                                                                      MainEditorLeftHeaderTool$WonderEditor.cloneCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(glShaderSource)), 2);
                                                                                    }));
                                                                              return Wonder_jest.test("glsl->DIRECTION_LIGHTS_COUNT should == 2", (function (param) {
                                                                                            var glShaderSource = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0).shaderSource;
                                                                                            MainEditorLeftHeaderTool$WonderEditor.cloneCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(glShaderSource), "#define DIRECTION_LIGHTS_COUNT 2")), true);
                                                                                          }));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
