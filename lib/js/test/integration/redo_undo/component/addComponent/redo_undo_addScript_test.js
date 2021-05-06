'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../../tool/RedoUndoTool.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");

Wonder_jest.describe("redo_undo: add script component", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulate = function (param) {
          return MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
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
                return Wonder_jest.describe("test undo one step", (function (param) {
                              return Wonder_jest.test("step which from first to zero", (function (param) {
                                            _simulate(/* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return GameObjectComponentEngineService$WonderEditor.hasScriptComponent(partial_arg, param);
                                                                }))), false);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test redo operate", (function (param) {
                      return Wonder_jest.describe("test redo one step", (function (param) {
                                    return Wonder_jest.test("undo step which from first to zero, redo step which from zero to first", (function (param) {
                                                  _simulate(/* () */0);
                                                  RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return GameObjectComponentEngineService$WonderEditor.hasScriptComponent(partial_arg, param);
                                                                      }))), true);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
