

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Color$WonderEditor from "../../../../src/core/external/Color.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as Controller$WonderEditor from "../../../../src/core/composable_component/controller/ui/Controller.js";
import * as HeaderTool$WonderEditor from "./tool/HeaderTool.js";
import * as ConsoleTool$WonderEditor from "../../tool/external/ConsoleTool.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";
import * as SceneTreeTool$WonderEditor from "../../../tool/SceneTreeTool.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as BuildCanvasTool$WonderEditor from "../../../tool/BuildCanvasTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as SceneEngineService$WonderEditor from "../../../../src/service/state/engine/SceneEngineService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as OperateComponentEventTool$WonderEditor from "../../../tool/OperateComponentEventTool.js";
import * as OperateGameObjectEventTool$WonderEditor from "../../../tool/OperateGameObjectEventTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("Header", (function () {
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
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                              }));
                        describe("test add emptyGameObject", (function () {
                                return Wonder_jest.test("the added emptyGameObject should only has transform component", (function () {
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              HeaderTool$WonderEditor.triggerAddEmptyGameObject(/* () */0);
                                              SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getNewGameObjectDomIndex */4](/* () */0));
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
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                              }));
                        Wonder_jest.test("if not set current gameObject, log error message and continue", (function () {
                                var error = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                                GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                                return Wonder_jest.Expect[/* toContain */10]("current gameObject should exist, but actual is None")(Wonder_jest.Expect[/* expect */0](ConsoleTool$WonderEditor.getMessage(error)));
                              }));
                        describe("else", (function () {
                                return Wonder_jest.test("remove current gameObject from editorState", (function () {
                                              var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(GameObjectTool$WonderEditor.getCurrentSceneTreeNode(/* () */0))), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("fix bug", (function () {
                        return Wonder_jest.test("remove gameObject has children;\n            the children should be removed together;", (function () {
                                      var match = SceneTreeTool$WonderEditor.buildFourLayerSceneAndGetBox(sandbox);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      GameObjectTool$WonderEditor.isAlive(match[0], engineState),
                                                      GameObjectTool$WonderEditor.isAlive(match[2], engineState),
                                                      GameObjectTool$WonderEditor.isAlive(match[3], engineState)
                                                    ]), /* tuple */[
                                                  false,
                                                  false,
                                                  false
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test ambient light", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                      }));
                describe("test snapshot", (function () {
                        return Wonder_jest.test("show color picker component for change color", (function () {
                                      BuildCanvasTool$WonderEditor.buildFakeCanvas(sandbox);
                                      var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateComponentEventTool$WonderEditor.triggerShowColorPickEvent);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                                    }));
                      }));
                return Wonder_jest.test("test change color should set into engine", (function () {
                              var newColor = {
                                hex: "#7df1e8",
                                rgb: {
                                  r: 125,
                                  g: 241,
                                  b: 232
                                }
                              };
                              Controller$WonderEditor.Method[/* changeColor */0](newColor);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getAmbientLightColor))), newColor.hex);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
