'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var SceneTreeInspectorTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/tool/SceneTreeInspectorTool.js");
var GameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");

Wonder_jest.describe("redo_undo: rename", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _getCurrentSceneTreeNodeName = function (param) {
          var __x = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
          return GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
        };
        var _simulateTwiceChangeName = function (param) {
          var name1 = "gameObject1";
          SceneTreeInspectorTool$WonderEditor.renameGameObject(name1, undefined, undefined, undefined, /* () */0);
          var name2 = "gameObject2";
          SceneTreeInspectorTool$WonderEditor.renameGameObject(name2, undefined, undefined, undefined, /* () */0);
          return /* tuple */[
                  name1,
                  name2
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test undo operate", (function (param) {
                Wonder_jest.test("test not undo", (function (param) {
                        var match = _simulateTwiceChangeName(/* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getCurrentSceneTreeNodeName(/* () */0)), match[1]);
                      }));
                Wonder_jest.describe("test undo one step", (function (param) {
                        return Wonder_jest.test("step which from second to first", (function (param) {
                                      var match = _simulateTwiceChangeName(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getCurrentSceneTreeNodeName(/* () */0)), match[0]);
                                    }));
                      }));
                return Wonder_jest.describe("test undo two step", (function (param) {
                              return Wonder_jest.test("step which from second to zero", (function (param) {
                                            var __x = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                            var sourceName = GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                            _simulateTwiceChangeName(/* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getCurrentSceneTreeNodeName(/* () */0)), sourceName);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test redo operate", (function (param) {
                      Wonder_jest.describe("test redo one step", (function (param) {
                              return Wonder_jest.test("undo step which from second to zero, redo step which from zero to first", (function (param) {
                                            var match = _simulateTwiceChangeName(/* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getCurrentSceneTreeNodeName(/* () */0)), match[0]);
                                          }));
                            }));
                      return Wonder_jest.describe("test redo two step", (function (param) {
                                    return Wonder_jest.test("undo step which from second to zero,redo step which from zero to second", (function (param) {
                                                  var match = _simulateTwiceChangeName(/* () */0);
                                                  RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getCurrentSceneTreeNodeName(/* () */0)), match[1]);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
