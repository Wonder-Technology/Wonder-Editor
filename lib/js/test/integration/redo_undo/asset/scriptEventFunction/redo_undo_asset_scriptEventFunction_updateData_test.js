'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../../tool/RedoUndoTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../asset/tool/MainEditorAssetIdTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../asset/tool/MainEditorAssetTreeTool.js");
var ScriptEventFunctionInspectorTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/atom_component/script_inspector/tool/ScriptEventFunctionInspectorTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("redo_undo: asset script event function->update data", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulateOnceUpdateScriptEventFunctionData = function (param) {
          MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
          var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
          var jsObjStr = ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces(Caml_option.some(Caml_option.some((function (script, api, state) {
                          return state;
                        }))), undefined, Caml_option.some(Caml_option.some((function (script, api, state) {
                          return state;
                        }))), /* () */0);
          var eventFunctionName = StateLogicService$WonderEditor.getEditorState((function (param) {
                  return ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionName(addedNodeId, param);
                }));
          ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(addedNodeId, eventFunctionName, jsObjStr);
          return /* tuple */[
                  addedNodeId,
                  eventFunctionName,
                  jsObjStr
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
                return Wonder_jest.describe("test undo one step", (function (param) {
                              return Wonder_jest.test("step which from first to zero", (function (param) {
                                            var match = _simulateOnceUpdateScriptEventFunctionData(/* () */0);
                                            var addedNodeId = match[0];
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                  return ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionDataJsObjStr(addedNodeId, param);
                                                                }))), ScriptEventFunctionInspectorTool$WonderEditor.buildDefaultEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces(/* () */0));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test redo operate", (function (param) {
                      return Wonder_jest.describe("test redo one step", (function (param) {
                                    return Wonder_jest.test("undo step which from first to zero, redo step which from zero to first", (function (param) {
                                                  var match = _simulateOnceUpdateScriptEventFunctionData(/* () */0);
                                                  var addedNodeId = match[0];
                                                  RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                        return ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionDataJsObjStr(addedNodeId, param);
                                                                      }))), match[2]);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
