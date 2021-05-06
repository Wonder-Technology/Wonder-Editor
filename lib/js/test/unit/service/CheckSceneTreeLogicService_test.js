'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Result$WonderEditor = require("../../../src/module/Result.js");
var FakeGlToolEngine$WonderEditor = require("../../tool/engine/FakeGlToolEngine.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var GameObjectToolEngine$WonderEditor = require("../../tool/engine/GameObjectToolEngine.js");
var CheckSceneTreeLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/sceneTree/CheckSceneTreeLogicService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");

Wonder_jest.describe("CheckSceneTreeLogicService", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("checkGameObjectRelation", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                              StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), engineState));
                              return /* () */0;
                            }));
                      Wonder_jest.test("if dragged and target gameObject is the same one, return fail", (function (param) {
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Result$WonderEditor.RelationResult[/* isSuccess */3](StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                                        return CheckSceneTreeLogicService$WonderEditor.checkGameObjectRelation(1, 1, param);
                                                      })))), false);
                            }));
                      return Wonder_jest.describe("else", (function (param) {
                                    Wonder_jest.test("if dragged gameObject is target gameObject's parent, return fail", (function (param) {
                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            var match = GameObjectToolEngine$WonderEditor.createGameObject(engineState);
                                            var gameObject1 = match[1];
                                            var match$1 = GameObjectToolEngine$WonderEditor.createGameObject(match[0]);
                                            var gameObject2 = match$1[1];
                                            var engineState$1 = HierarchyGameObjectEngineService$WonderEditor.addChild(gameObject1, gameObject2, match$1[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Result$WonderEditor.RelationResult[/* isSuccess */3](CheckSceneTreeLogicService$WonderEditor.checkGameObjectRelation(gameObject2, gameObject1, /* tuple */[
                                                                    editorState,
                                                                    engineState$1
                                                                  ]))), false);
                                          }));
                                    return Wonder_jest.describe("else", (function (param) {
                                                  return Wonder_jest.test("if target gameObject is dragged gameObject's parent, return fail", (function (param) {
                                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                var match = GameObjectToolEngine$WonderEditor.createGameObject(engineState);
                                                                var gameObject1 = match[1];
                                                                var match$1 = GameObjectToolEngine$WonderEditor.createGameObject(match[0]);
                                                                var gameObject2 = match$1[1];
                                                                var engineState$1 = HierarchyGameObjectEngineService$WonderEditor.addChild(gameObject1, gameObject2, match$1[0]);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Result$WonderEditor.RelationResult[/* isSuccess */3](CheckSceneTreeLogicService$WonderEditor.checkGameObjectRelation(gameObject1, gameObject2, /* tuple */[
                                                                                        editorState,
                                                                                        engineState$1
                                                                                      ]))), false);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
