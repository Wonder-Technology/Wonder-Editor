'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ConsoleTool$WonderEditor = require("../../unit/tool/external/ConsoleTool.js");
var GameObjectTool$WonderEditor = require("../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var SceneEngineService$WonderEditor = require("../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var GameObjectToolEngine$WonderEditor = require("../../tool/engine/GameObjectToolEngine.js");
var MainEditorLightUtils$WonderEditor = require("../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/utils/MainEditorLightUtils.js");
var PrimitiveLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/PrimitiveLogicService.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../unit/tool/MainEditorSceneTreeTool.js");
var MainEditorLeftHeaderTool$WonderEditor = require("../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js");
var MainEditorPointLightTool$WonderEditor = require("../inspector/composable_component/sceneTree_inspector/light/point/tool/MainEditorPointLightTool.js");

Wonder_jest.describe("leftHeader clone gameObject", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test clone current gameObject", (function (param) {
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
        return Wonder_jest.describe("check light count before clone", (function (param) {
                      return Wonder_jest.describe("if light count will exceed max count after drag, warn", (function (param) {
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
                                    Wonder_jest.describe("test direction light", (function (param) {
                                            return Wonder_jest.describe("test exceed", (function (param) {
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
                                          }));
                                    return Wonder_jest.describe("test point light", (function (param) {
                                                  return Wonder_jest.describe("test exceed", (function (param) {
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
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
