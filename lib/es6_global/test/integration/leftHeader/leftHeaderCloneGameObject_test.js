

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ConsoleTool$WonderEditor from "../../unit/tool/external/ConsoleTool.js";
import * as GameObjectTool$WonderEditor from "../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as GameObjectToolEngine$WonderEditor from "../../tool/engine/GameObjectToolEngine.js";
import * as MainEditorLightUtils$WonderEditor from "../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/utils/MainEditorLightUtils.js";
import * as PrimitiveLogicService$WonderEditor from "../../../src/service/stateTuple/logic/PrimitiveLogicService.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../unit/tool/MainEditorSceneTreeTool.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";
import * as MainEditorPointLightTool$WonderEditor from "../inspector/composable_component/sceneTree_inspector/light/point/tool/MainEditorPointLightTool.js";

describe("leftHeader clone gameObject", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test clone current gameObject", (function () {
                Wonder_jest.test("should select cloned one", (function (param) {
                        var targetGameObject = GameObjectTool$WonderEditor.getCurrentSceneTreeNode(/* () */0);
                        MainEditorLeftHeaderTool$WonderEditor.cloneCurrentSceneTreeNode(undefined, undefined, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* <> */6], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.getCurrentSceneTreeNode(/* () */0)), targetGameObject);
                      }));
                return Wonder_jest.test("cloned one should share the material", (function (param) {
                              var targetGameObjectLightMaterial = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeLightMaterial(/* () */0);
                              MainEditorLeftHeaderTool$WonderEditor.cloneCurrentSceneTreeNode(undefined, undefined, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.getCurrentSceneTreeNodeLightMaterial(/* () */0)), targetGameObjectLightMaterial);
                            }));
              }));
        describe("check light count before clone", (function () {
                describe("if light count will exceed max count after drag, warn", (function () {
                        var _test = function (createLightFunc, judgeFunc) {
                          ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                          var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                          var match = Curry._2(createLightFunc, editorState, engineState);
                          StateEditorService$WonderEditor.setState(match[0]);
                          StateEngineService$WonderEditor.setState(match[1]);
                          MainEditorLeftHeaderTool$WonderEditor.cloneCurrentSceneTreeNode(undefined, undefined, /* () */0);
                          return Curry._1(judgeFunc, warn);
                        };
                        describe("test direction light", (function () {
                                describe("test exceed", (function () {
                                        var _createLights = function (editorState, engineState) {
                                          var match = PrimitiveLogicService$WonderEditor.createDirectionLight(editorState, engineState);
                                          var match$1 = PrimitiveLogicService$WonderEditor.createDirectionLight(match[0], match[1]);
                                          var match$2 = PrimitiveLogicService$WonderEditor.createDirectionLight(match$1[0], match$1[1]);
                                          return /* tuple */[
                                                  match$2[0],
                                                  match$2[1]
                                                ];
                                        };
                                        Wonder_jest.test("test clone gameObject has direction light component", (function (param) {
                                                return _test((function (editorState, engineState) {
                                                              var match = _createLights(editorState, engineState);
                                                              StateEditorService$WonderEditor.setState(match[0]);
                                                              MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectToBeCurrentSceneTreeNode(/* () */0);
                                                              return /* tuple */[
                                                                      StateEditorService$WonderEditor.getState(/* () */0),
                                                                      match[1]
                                                                    ];
                                                            }), (function (warn) {
                                                              return Wonder_jest.Expect[/* toContain */10](MainEditorLightUtils$WonderEditor.getDirectionLightExceedMaxCountMessage(/* () */0), Wonder_jest.Expect[/* expect */0](ConsoleTool$WonderEditor.getMessage(warn)));
                                                            }));
                                              }));
                                        Wonder_jest.test("test clone gameObject whose children has direction light component", (function (param) {
                                                return _test((function (editorState, engineState) {
                                                              var match = _createLights(editorState, engineState);
                                                              StateLogicService$WonderEditor.setState(/* tuple */[
                                                                    match[0],
                                                                    match[1]
                                                                  ]);
                                                              var newGameObject = GameObjectTool$WonderEditor.getNewGameObject(undefined, /* () */0);
                                                              MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                                              var directionLightGameObject = StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene);
                                                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](directionLightGameObject, newGameObject, undefined, undefined, undefined, /* () */0);
                                                              GameObjectTool$WonderEditor.setCurrentSceneTreeNode(newGameObject);
                                                              return /* tuple */[
                                                                      StateEditorService$WonderEditor.getState(/* () */0),
                                                                      StateEngineService$WonderEditor.unsafeGetState(/* () */0)
                                                                    ];
                                                            }), (function (warn) {
                                                              return Wonder_jest.Expect[/* toContain */10](MainEditorLightUtils$WonderEditor.getDirectionLightExceedMaxCountMessage(/* () */0), Wonder_jest.Expect[/* expect */0](ConsoleTool$WonderEditor.getMessage(warn)));
                                                            }));
                                              }));
                                        return Wonder_jest.test("clone gameObject not has direction light component shouldn't warn", (function (param) {
                                                      return _test((function (editorState, engineState) {
                                                                    var match = _createLights(editorState, engineState);
                                                                    StateLogicService$WonderEditor.setState(/* tuple */[
                                                                          match[0],
                                                                          match[1]
                                                                        ]);
                                                                    MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                                    return /* tuple */[
                                                                            StateEditorService$WonderEditor.getState(/* () */0),
                                                                            StateEngineService$WonderEditor.unsafeGetState(/* () */0)
                                                                          ];
                                                                  }), (function (warn) {
                                                                    return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](warn)));
                                                                  }));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test point light", (function () {
                                describe("test exceed", (function () {
                                        var _createLights = function (editorState, engineState) {
                                          var match = MainEditorPointLightTool$WonderEditor.createPointLight(editorState, engineState);
                                          var match$1 = MainEditorPointLightTool$WonderEditor.createPointLight(match[0], match[1]);
                                          var match$2 = MainEditorPointLightTool$WonderEditor.createPointLight(match$1[0], match$1[1]);
                                          var match$3 = MainEditorPointLightTool$WonderEditor.createPointLight(match$2[0], match$2[1]);
                                          return /* tuple */[
                                                  match$3[0],
                                                  match$3[1],
                                                  match[2]
                                                ];
                                        };
                                        Wonder_jest.test("test clone gameObject has point light component", (function (param) {
                                                return _test((function (editorState, engineState) {
                                                              var match = _createLights(editorState, engineState);
                                                              var pointLight1 = match[2];
                                                              var engineState$1 = SceneEngineService$WonderEditor.addSceneChild(pointLight1, match[1]);
                                                              StateEditorService$WonderEditor.setState(match[0]);
                                                              GameObjectTool$WonderEditor.setCurrentSceneTreeNode(pointLight1);
                                                              return /* tuple */[
                                                                      StateEditorService$WonderEditor.getState(/* () */0),
                                                                      engineState$1
                                                                    ];
                                                            }), (function (warn) {
                                                              return Wonder_jest.Expect[/* toContain */10](MainEditorLightUtils$WonderEditor.getPointLightExceedMaxCountMessage(/* () */0), Wonder_jest.Expect[/* expect */0](ConsoleTool$WonderEditor.getMessage(warn)));
                                                            }));
                                              }));
                                        Wonder_jest.test("test clone gameObject whose children has point light component", (function (param) {
                                                return _test((function (editorState, engineState) {
                                                              var match = _createLights(editorState, engineState);
                                                              var match$1 = GameObjectToolEngine$WonderEditor.createGameObject(match[1]);
                                                              var parent = match$1[1];
                                                              var engineState$1 = GameObjectTool$WonderEditor.addChild(parent, match[2], match$1[0]);
                                                              var engineState$2 = SceneEngineService$WonderEditor.addSceneChild(parent, engineState$1);
                                                              StateLogicService$WonderEditor.setState(/* tuple */[
                                                                    match[0],
                                                                    engineState$2
                                                                  ]);
                                                              GameObjectTool$WonderEditor.setCurrentSceneTreeNode(parent);
                                                              return /* tuple */[
                                                                      StateEditorService$WonderEditor.getState(/* () */0),
                                                                      StateEngineService$WonderEditor.unsafeGetState(/* () */0)
                                                                    ];
                                                            }), (function (warn) {
                                                              return Wonder_jest.Expect[/* toContain */10](MainEditorLightUtils$WonderEditor.getPointLightExceedMaxCountMessage(/* () */0), Wonder_jest.Expect[/* expect */0](ConsoleTool$WonderEditor.getMessage(warn)));
                                                            }));
                                              }));
                                        return Wonder_jest.test("clone gameObject not has point light component shouldn't warn", (function (param) {
                                                      return _test((function (editorState, engineState) {
                                                                    var match = _createLights(editorState, engineState);
                                                                    var engineState$1 = SceneEngineService$WonderEditor.addSceneChild(match[2], match[1]);
                                                                    StateLogicService$WonderEditor.setState(/* tuple */[
                                                                          match[0],
                                                                          engineState$1
                                                                        ]);
                                                                    MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                                    return /* tuple */[
                                                                            StateEditorService$WonderEditor.getState(/* () */0),
                                                                            StateEngineService$WonderEditor.unsafeGetState(/* () */0)
                                                                          ];
                                                                  }), (function (warn) {
                                                                    return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](warn)));
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

export {
  
}
/*  Not a pure module */
