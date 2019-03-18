

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Js_option from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Color$WonderEditor from "../../../../../../../src/core/external/Color.js";
import * as ConsoleTool$WonderEditor from "../../../../../tool/external/ConsoleTool.js";
import * as PickColorTool$WonderEditor from "../../../../../../tool/PickColorTool.js";
import * as SceneTreeTool$WonderEditor from "../../../../../../tool/SceneTreeTool.js";
import * as ControllerTool$WonderEditor from "../../../../controller/tool/ControllerTool.js";
import * as GLSLToolEngine$WonderEditor from "../../../../../../tool/engine/GLSLToolEngine.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as FakeGlToolEngine$WonderEditor from "../../../../../../tool/engine/FakeGlToolEngine.js";
import * as StateLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as GameObjectToolEngine$WonderEditor from "../../../../../../tool/engine/GameObjectToolEngine.js";
import * as GameViewEditorService$WonderEditor from "../../../../../../../src/service/state/editor/view/gameView/GameViewEditorService.js";
import * as InspectorEditorService$WonderEditor from "../../../../../../../src/service/state/editor/inspector/InspectorEditorService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../src/service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../../../tool/MainEditorSceneTreeTool.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../tool/MainEditorLeftHeaderTool.js";
import * as PrepareRenderViewJobTool$WonderEditor from "../../../../../../integration/job/tool/PrepareRenderViewJobTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("LeftHeader", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test operate gameObject", (function () {
                beforeEach((function () {
                        return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                    {\n                        \"name\": \"default\",\n                        \"jobs\": [\n                            {\n                                \"name\": \"dispose\"\n                            }\n                        ]\n                    }\n                ]\n            ", undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                      }));
                describe("test add gameObject", (function () {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              }));
                        describe("test add emptyGameObject", (function () {
                                return Wonder_jest.test("the added emptyGameObject should only has transform component", (function () {
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var newGameObject = GameObjectTool$WonderEditor.getNewGameObjectUid(undefined, /* () */0);
                                              MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                              MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, newGameObject, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              GameObjectComponentEngineService$WonderEditor.hasTransformComponent(GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), engineState),
                                                              GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent(GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), engineState)
                                                            ]), /* tuple */[
                                                          true,
                                                          false
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test dispose gameObject", (function () {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              }));
                        Wonder_jest.test("if not set current gameObject, log error message and continue", (function () {
                                ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                var error = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                                GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                return Wonder_jest.Expect[/* toContain */10]("current gameObject should exist, but actual is None")(Wonder_jest.Expect[/* expect */0](ConsoleTool$WonderEditor.getMessage(error)));
                              }));
                        describe("else", (function () {
                                return Wonder_jest.test("remove current gameObject from editorState", (function () {
                                              MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(GameObjectTool$WonderEditor.getCurrentSceneTreeNode(/* () */0))), true);
                                            }));
                              }));
                        describe("fix bug", (function () {
                                var _prepareState = function () {
                                  MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n{\"name\": \"dispose\" },\n{\"name\": \"prepare_render_game_view\" }\n           ]\n         }\n       ]\n             ", undefined, "\n             [\n{\"name\": \"dispose\" },\n{\"name\": \"prepare_render_game_view\" }\n             ]\n             ", /* () */0), undefined, false, false, /* () */0);
                                  return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                };
                                return Wonder_jest.test("remove actived camera's parent gameObject should dispose camera", (function () {
                                              PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                                              StateEditorService$WonderEditor.getState(/* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var activedCamera = MainEditorSceneTool$WonderEditor.getCameraInDefaultScene(engineState);
                                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectIntoGameObject */2](activedCamera, MainEditorSceneTool$WonderEditor.getFirstCube(engineState), undefined, undefined, /* () */0);
                                              var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, MainEditorSceneTool$WonderEditor.getFirstCube(engineState$1), /* () */0);
                                              MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              GameObjectToolEngine$WonderEditor.isAlive(activedCamera, StateEngineService$WonderEditor.unsafeGetState(/* () */0)),
                                                              GameViewEditorService$WonderEditor.getActivedBasicCameraView(StateEditorService$WonderEditor.getState(/* () */0))
                                                            ]), /* tuple */[
                                                          false,
                                                          undefined
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("fix bug", (function () {
                        return Wonder_jest.test("remove gameObject has children;\n            the children should be removed together;", (function () {
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
                describe("test clone gameObject", (function () {
                        Wonder_jest.test("test clone one gameObject, the cloned gameObject should add into its parent children", (function () {
                                var match = SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                                var match$1 = match[1];
                                var cube4 = match$1[1];
                                var cube1 = match$1[0];
                                GameObjectTool$WonderEditor.setCurrentSceneTreeNode(cube4);
                                MainEditorLeftHeaderTool$WonderEditor.cloneCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                var clonedGameObject = cube4 + 1 | 0;
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                        return GameObjectTool$WonderEditor.getChildren(cube1, param);
                                                      })).includes(clonedGameObject)), true);
                              }));
                        Wonder_jest.test("test the cloned gameObject should be currentSceneTreeNode", (function () {
                                var match = SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                                var cube4 = match[1][1];
                                GameObjectTool$WonderEditor.setCurrentSceneTreeNode(cube4);
                                MainEditorLeftHeaderTool$WonderEditor.cloneCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                var clonedGameObject = cube4 + 1 | 0;
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(StateEditorService$WonderEditor.getState(/* () */0))), clonedGameObject);
                              }));
                        describe("test clone gameObject componentMap", (function () {
                                Wonder_jest.test("test cloned gameObject rebuild components should add into componentMap", (function () {
                                        var match = SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                                        var cube4 = match[1][1];
                                        GameObjectTool$WonderEditor.setCurrentSceneTreeNode(cube4);
                                        MainEditorLeftHeaderTool$WonderEditor.cloneCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                        var clonedGameObject = cube4 + 1 | 0;
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isSome(SparseMapService$WonderCommonlib.get(clonedGameObject, InspectorEditorService$WonderEditor.getComponentTypeMap(StateEditorService$WonderEditor.getState(/* () */0))))), true);
                                      }));
                                return Wonder_jest.test("test cloned gameObject components should === target gameObject components ", (function () {
                                              var match = SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                                              var cube4 = match[1][1];
                                              GameObjectTool$WonderEditor.setCurrentSceneTreeNode(cube4);
                                              MainEditorLeftHeaderTool$WonderEditor.cloneCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                              var targetGameObjectComponentArray = SparseMapService$WonderCommonlib.unsafeGet(cube4, InspectorEditorService$WonderEditor.getComponentTypeMap(editorState));
                                              var clonedGameObject = cube4 + 1 | 0;
                                              var clonedGameObjectComponentArray = SparseMapService$WonderCommonlib.unsafeGet(clonedGameObject, InspectorEditorService$WonderEditor.getComponentTypeMap(editorState));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](targetGameObjectComponentArray), clonedGameObjectComponentArray);
                                            }));
                              }));
                        describe("test if clone gameObject or its children has light component", (function () {
                                beforeEach((function () {
                                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectToBeCurrentSceneTreeNode);
                                      }));
                                describe("test has direction light component", (function () {
                                        describe("should re-init all light material components in the scene", (function () {
                                                Wonder_jest.test("test shaderSource should be called", (function () {
                                                        var glShaderSource = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0).shaderSource;
                                                        MainEditorLeftHeaderTool$WonderEditor.cloneCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(glShaderSource)), 2);
                                                      }));
                                                return Wonder_jest.test("glsl->DIRECTION_LIGHTS_COUNT should == 2", (function () {
                                                              var glShaderSource = FakeGlToolEngine$WonderEditor.getEngineStateGl(/* () */0).shaderSource;
                                                              MainEditorLeftHeaderTool$WonderEditor.cloneCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLToolEngine$WonderEditor.contain(GLSLToolEngine$WonderEditor.getVsSource(glShaderSource), "#define DIRECTION_LIGHTS_COUNT 2")), true);
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
        describe("test ambient light", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                      }));
                return Wonder_jest.test("test change color should set into engine", (function () {
                              var newColor = PickColorTool$WonderEditor.buildColor1(/* () */0);
                              ControllerTool$WonderEditor.changeColor(newColor);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getAmbientLightColor))), newColor.hex);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
