

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Color$WonderEditor from "../../../../src/core/external/Color.js";
import * as Header$WonderEditor from "../../../../src/core/composable_component/header/ui/Header.js";
import * as LogTool$WonderEditor from "../../tool/LogTool.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as HeaderTool$WonderEditor from "./tool/HeaderTool.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";
import * as SceneTreeTool$WonderEditor from "../../../tool/SceneTreeTool.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as BuildCanvasTool$WonderEditor from "../../../tool/BuildCanvasTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as SceneEngineService$WonderEditor from "../../../../src/service/state/engine/SceneEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as AddableComponentTool$WonderEditor from "../../../integration/inspector/atom_component/addableComponent/tool/AddableComponentTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as OperateComponentEventTool$WonderEditor from "../../../tool/OperateComponentEventTool.js";
import * as OperateGameObjectEventTool$WonderEditor from "../../../tool/OperateGameObjectEventTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../src/service/state/engine/BasicCameraViewEngineService.js";
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
                        return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                    {\n                        \"name\": \"default\",\n                        \"jobs\": [\n                            {\n                                \"name\": \"dispose\"\n                            }\n                        ]\n                    }\n                ]\n            ", undefined, undefined, /* () */0), undefined, /* () */0);
                      }));
                describe("test add gameObject", (function () {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                              }));
                        describe("test add emptyGameObject", (function () {
                                return Wonder_jest.test("the added emptyGameObject should only has transform component", (function () {
                                              var engineStateToGetData = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                              HeaderTool$WonderEditor.triggerAddEmptyGameObject(/* () */0);
                                              SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getNewGameObjectDomIndex */4](/* () */0));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              GameObjectComponentEngineService$WonderEditor.hasTransformComponent(GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), engineStateToGetData),
                                                              GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent(GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), engineStateToGetData)
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
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                              }));
                        Wonder_jest.test("if not set current gameObject, log error message and continue", (function () {
                                var error = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                                GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                                return Wonder_jest.Expect[/* toContain */10]("current gameObject should exist, but actual is None")(Wonder_jest.Expect[/* expect */0](LogTool$WonderEditor.getMessage(error)));
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
                        Wonder_jest.test("remove gameObject has children;\n            the children should be removed together;", (function () {
                                var match = SceneTreeTool$WonderEditor.buildFourLayerSceneAndGetBox(sandbox);
                                var engineStateToGetData = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                GameObjectTool$WonderEditor.isAlive(match[0], engineStateToGetData),
                                                GameObjectTool$WonderEditor.isAlive(match[2], engineStateToGetData),
                                                GameObjectTool$WonderEditor.isAlive(match[3], engineStateToGetData)
                                              ]), /* tuple */[
                                            false,
                                            false,
                                            false
                                          ]);
                              }));
                        describe("test remove cameraGroup gameObject", (function () {
                                beforeEach((function () {
                                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                                      }));
                                describe("test if not add other cameraGroup, can't remove last cameraGroup", (function () {
                                        return Wonder_jest.test("test remove last cameraGroup, should throw warn message", (function () {
                                                      return Wonder_jest.Expect[/* toThrowMessageRe */21]((/First argument to Node.prototype.appendChild must be a Node/img), Wonder_jest.Expect[/* expect */0]((function () {
                                                                        MainEditorSceneTool$WonderEditor.setFirstCameraTobeCurrentSceneTreeNode(/* () */0);
                                                                        var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                                                        return BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                                                                      })));
                                                    }));
                                      }));
                                describe("test add other cameraGroup", (function () {
                                        beforeEach((function () {
                                                HeaderTool$WonderEditor.triggerAddBox(/* () */0);
                                                SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getNewGameObjectDomIndex */4](/* () */0));
                                                return AddableComponentTool$WonderEditor.addCameraGroupInBox(/* () */0);
                                              }));
                                        return Wonder_jest.test("test remove current cameraGroup, should set last unActive cameraGroup is currentCamera", (function () {
                                                      var oldCurrentCameraView = StateLogicService$WonderEditor.getEngineStateToGetData(BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView);
                                                      var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                                                      var newCurrentCameraView = StateLogicService$WonderEditor.getEngineStateToGetData(BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* <> */6], Wonder_jest.Expect[/* expect */0](newCurrentCameraView), oldCurrentCameraView);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test ambient light", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
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
                              Header$WonderEditor.Method[/* changeColor */8](newColor);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getAmbientLightColor))), newColor.hex);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
