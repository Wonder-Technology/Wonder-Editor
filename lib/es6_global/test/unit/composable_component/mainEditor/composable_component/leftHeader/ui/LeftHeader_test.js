

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
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as GameObjectToolEngine$WonderEditor from "../../../../../../tool/engine/GameObjectToolEngine.js";
import * as GameViewEditorService$WonderEditor from "../../../../../../../src/service/state/editor/view/gameView/GameViewEditorService.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../../../tool/MainEditorSceneTreeTool.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../tool/MainEditorLeftHeaderTool.js";
import * as PrepareRenderViewJobTool$WonderEditor from "../../../../../../integration/job/tool/PrepareRenderViewJobTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("LeftHeader", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test operate gameObject", (function (param) {
                beforeEach((function (param) {
                        return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                    {\n                        \"name\": \"default\",\n                        \"jobs\": [\n                            {\n                                \"name\": \"dispose\"\n                            }\n                        ]\n                    }\n                ]\n            ", undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                      }));
                describe("test add gameObject", (function (param) {
                        beforeEach((function (param) {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                              }));
                        describe("test add emptyGameObject", (function (param) {
                                return Wonder_jest.test("the added emptyGameObject should only has transform component", (function (param) {
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
                describe("test dispose gameObject", (function (param) {
                        beforeEach((function (param) {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                              }));
                        Wonder_jest.test("if not set current gameObject, log error message and continue", (function (param) {
                                ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                var error = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                                GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                return Wonder_jest.Expect[/* toContain */10]("current gameObject should exist, but actual is None")(Wonder_jest.Expect[/* expect */0](ConsoleTool$WonderEditor.getMessage(error)));
                              }));
                        describe("else", (function (param) {
                                return Wonder_jest.test("remove current gameObject from editorState", (function (param) {
                                              MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(GameObjectTool$WonderEditor.getCurrentSceneTreeNode(/* () */0))), true);
                                            }));
                              }));
                        describe("fix bug", (function (param) {
                                var _prepareState = function (param) {
                                  MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n{\"name\": \"dispose\" },\n{\"name\": \"prepare_render_game_view\" }\n           ]\n         }\n       ]\n             ", undefined, "\n             [\n{\"name\": \"dispose\" },\n{\"name\": \"prepare_render_game_view\" }\n             ]\n             ", /* () */0), undefined, false, false, /* () */0);
                                  return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                };
                                return Wonder_jest.test("remove actived camera's parent gameObject should dispose camera", (function (param) {
                                              PrepareRenderViewJobTool$WonderEditor.prepare(_prepareState);
                                              StateEditorService$WonderEditor.getState(/* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var activedCamera = MainEditorSceneTool$WonderEditor.getCameraInDefaultScene(engineState);
                                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectIntoGameObject */2](activedCamera, MainEditorSceneTool$WonderEditor.getFirstBox(engineState), undefined, undefined, /* () */0);
                                              var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, MainEditorSceneTool$WonderEditor.getFirstBox(engineState$1), /* () */0);
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
                describe("fix bug", (function (param) {
                        return Wonder_jest.test("remove gameObject has children;\n            the children should be removed together;", (function (param) {
                                      var match = SceneTreeTool$WonderEditor.buildFourLayerSceneGraphToEngine(sandbox);
                                      var match$1 = match[1];
                                      var box1 = match$1[0];
                                      GameObjectTool$WonderEditor.setCurrentSceneTreeNode(box1);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      GameObjectTool$WonderEditor.isAlive(box1, engineState),
                                                      GameObjectTool$WonderEditor.isAlive(match$1[1], engineState),
                                                      GameObjectTool$WonderEditor.isAlive(match$1[2], engineState)
                                                    ]), /* tuple */[
                                                  false,
                                                  false,
                                                  false
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test ambient light", (function (param) {
                beforeEach((function (param) {
                        MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                      }));
                return Wonder_jest.test("test change color should set into engine", (function (param) {
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
