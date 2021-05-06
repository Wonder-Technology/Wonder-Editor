'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ArrayService$WonderEditor = require("../../../../../src/service/atom/ArrayService.js");
var RedoUndoTool$WonderEditor = require("../../tool/RedoUndoTool.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../asset/tool/MainEditorAssetIdTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../asset/tool/MainEditorAssetTreeTool.js");
var ScriptAttributeInspectorTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/atom_component/script_inspector/tool/ScriptAttributeInspectorTool.js");
var ScriptAttributeNodeNameAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/ScriptAttributeNodeNameAssetService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("redo_undo: asset script attribute->operate field", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test rename field", (function (param) {
                var _simulate = function (param) {
                  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                  var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                  ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                  var match = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState((function (param) {
                              return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId, param);
                            })));
                  var fieldName = match[0];
                  var newFieldName = "aaa";
                  ScriptAttributeInspectorTool$WonderEditor.renameField(sandbox, addedNodeId, fieldName, newFieldName, undefined, /* () */0);
                  return /* tuple */[
                          addedNodeId,
                          /* tuple */[
                            fieldName,
                            newFieldName
                          ]
                        ];
                };
                Wonder_jest.describe("test undo operate", (function (param) {
                        return Wonder_jest.describe("test undo one step", (function (param) {
                                      return Wonder_jest.test("step which from first to zero", (function (param) {
                                                    var match = _simulate(/* () */0);
                                                    RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildScriptAttributeInspectorComponent(match[0], undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test redo operate", (function (param) {
                              return Wonder_jest.describe("test redo one step", (function (param) {
                                            return Wonder_jest.test("undo step which from first to zero, redo step which from zero to first", (function (param) {
                                                          var match = _simulate(/* () */0);
                                                          RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildScriptAttributeInspectorComponent(match[0], undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test set field data", (function (param) {
                var _simulate = function (param) {
                  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                  var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                  ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                  var match = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState((function (param) {
                              return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId, param);
                            })));
                  var fieldName = match[0];
                  ScriptAttributeInspectorTool$WonderEditor.updateScriptAttributeNodeByReplaceFieldData(addedNodeId, /* tuple */[
                        fieldName,
                        ScriptAttributeInspectorTool$WonderEditor.buildFieldJsObj("float", 0.1)
                      ]);
                  return /* tuple */[
                          addedNodeId,
                          /* tuple */[
                            fieldName,
                            match[1]
                          ]
                        ];
                };
                Wonder_jest.describe("test undo operate", (function (param) {
                        return Wonder_jest.describe("test undo one step", (function (param) {
                                      return Wonder_jest.test("step which from first to zero", (function (param) {
                                                    var match = _simulate(/* () */0);
                                                    var match$1 = match[1];
                                                    var addedNodeId = match[0];
                                                    RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                              return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId, param);
                                                                            })))), /* tuple */[
                                                                match$1[0],
                                                                match$1[1]
                                                              ]);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test redo operate", (function (param) {
                              return Wonder_jest.describe("test redo one step", (function (param) {
                                            return Wonder_jest.test("undo step which from first to zero, redo step which from zero to first", (function (param) {
                                                          var match = _simulate(/* () */0);
                                                          var addedNodeId = match[0];
                                                          RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                    return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId, param);
                                                                                  })))), /* tuple */[
                                                                      ScriptAttributeNodeNameAssetService$WonderEditor.getNewFieldName(/* () */0),
                                                                      ScriptAttributeInspectorTool$WonderEditor.buildField(/* Float */1, 0.1)
                                                                    ]);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test remove field", (function (param) {
                      var _simulate = function (param) {
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                        var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                        ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                        var match = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState((function (param) {
                                    return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId, param);
                                  })));
                        ScriptAttributeInspectorTool$WonderEditor.updateScriptAttributeNodeByRemoveFieldData(sandbox, addedNodeId, match[0], undefined, /* () */0);
                        return addedNodeId;
                      };
                      Wonder_jest.describe("test undo operate", (function (param) {
                              return Wonder_jest.describe("test undo one step", (function (param) {
                                            return Wonder_jest.test("step which from first to zero", (function (param) {
                                                          var addedNodeId = _simulate(/* () */0);
                                                          RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* > */1], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId, param);
                                                                              })).length), 0);
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test redo operate", (function (param) {
                                    return Wonder_jest.describe("test redo one step", (function (param) {
                                                  return Wonder_jest.test("undo step which from first to zero, redo step which from zero to first", (function (param) {
                                                                var addedNodeId = _simulate(/* () */0);
                                                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                      return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId, param);
                                                                                    })).length), 0);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
