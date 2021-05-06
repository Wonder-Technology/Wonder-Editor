'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var StringTool$WonderEditor = require("../../../../../../unit/tool/StringTool.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var ScriptToolEngine$WonderEditor = require("../../../../../../tool/engine/ScriptToolEngine.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/StateEditorService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetIdTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTreeTool.js");
var ScriptEventFunctionInspector$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/scriptEventFunction_inspector/ui/ScriptEventFunctionInspector.js");
var ScriptEventFunctionInspectorTool$WonderEditor = require("./tool/ScriptEventFunctionInspectorTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("script event function inspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test snapshot", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                              var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildScriptEventFunctionInspectorComponent(addedNodeId, undefined, undefined, undefined, undefined, undefined, /* () */0));
                            }));
              }));
        return Wonder_jest.describe("set event function data", (function (param) {
                      Wonder_jest.test("default data is empty closure function which returm {}", (function (param) {
                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                              var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                    return ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionDataJsObjStr(addedNodeId, param);
                                                  }))), ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces(undefined, undefined, undefined, /* () */0));
                            }));
                      Wonder_jest.test("test set init,dispose event function", (function (param) {
                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                              var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                              var jsObjStr = ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces(Caml_option.some(Caml_option.some((function (script, api, state) {
                                              return state;
                                            }))), undefined, Caml_option.some(Caml_option.some((function (script, api, state) {
                                              return state;
                                            }))), /* () */0);
                              var eventFunctionName = ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionName(addedNodeId, editorState);
                              ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(addedNodeId, eventFunctionName, jsObjStr);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                    return ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionDataJsObjStr(addedNodeId, param);
                                                  }))), jsObjStr);
                            }));
                      Wonder_jest.describe("handle error", (function (param) {
                              return Wonder_jest.test("if eventFunctionJsObjStr is wrong data, error", (function (param) {
                                            var error = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                                            MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                            var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                            ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(addedNodeId, ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionName(addedNodeId, editorState), "aaa");
                                            return Sinon.toCalledWith(/* array */["aaa is not defined"], Wonder_jest.Expect[/* expect */0](error));
                                          }));
                            }));
                      return Wonder_jest.describe("test update event function data in all script components", (function (param) {
                                    beforeEach((function () {
                                            return ScriptEventFunctionInspectorTool$WonderEditor.TestUpdateScriptEventFunctionInAllScriptComponents[/* createDefaultSceneAndAddScriptComponent */0](sandbox);
                                          }));
                                    return Wonder_jest.test("test update one script component", (function (param) {
                                                  var match = ScriptEventFunctionInspectorTool$WonderEditor.TestUpdateScriptEventFunctionInAllScriptComponents[/* prepareForOneScriptComponent */1](sandbox);
                                                  var addedNodeId = match[1];
                                                  var script = match[0];
                                                  var jsObjStr = ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces(Caml_option.some(Caml_option.some((function (script, api, state) {
                                                                  return state;
                                                                }))), undefined, Caml_option.some(Caml_option.some((function (script, api, state) {
                                                                  return state;
                                                                }))), /* () */0);
                                                  var eventFunctionName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                          return ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionName(addedNodeId, param);
                                                        }));
                                                  ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(addedNodeId, eventFunctionName, jsObjStr);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StringTool$WonderEditor.removeNewLinesAndSpaces(ScriptEventFunctionInspector$WonderEditor.Method[/* convertEventFunctionDataToJsObjStr */2](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return ScriptToolEngine$WonderEditor.unsafeGetScriptEventFunctionData(script, eventFunctionName, param);
                                                                              }))))), jsObjStr);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
