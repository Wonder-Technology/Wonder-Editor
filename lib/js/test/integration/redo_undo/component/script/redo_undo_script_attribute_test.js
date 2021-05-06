'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SinonTool$WonderEditor = require("../../../../tool/SinonTool.js");
var ArrayService$WonderEditor = require("../../../../../src/service/atom/ArrayService.js");
var RedoUndoTool$WonderEditor = require("../../tool/RedoUndoTool.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorScriptTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/script/tool/MainEditorScriptTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../asset/tool/MainEditorAssetIdTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../../unit/tool/MainEditorSceneTreeTool.js");
var ScriptAttributeFieldTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/script/tool/ScriptAttributeFieldTool.js");
var ScriptAttributeInspectorTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/atom_component/script_inspector/tool/ScriptAttributeInspectorTool.js");
var MainEditorScriptAttributeTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/script/tool/MainEditorScriptAttributeTool.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("redo_undo: script component->attribute", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _createCurrentSceneTreeNodeInspectorSnapshotAndMatch = function (param) {
          MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* () */0);
          return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildScriptComponent(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0), undefined, undefined, /* () */0));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                return MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test add script attribute", (function (param) {
                var _simulate = function (param) {
                  var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                  MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                  return MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                };
                Wonder_jest.describe("test undo operate", (function (param) {
                        return Wonder_jest.describe("test undo one step", (function (param) {
                                      return Wonder_jest.test("step which from first to zero", (function (param) {
                                                    _simulate(/* () */0);
                                                    RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    return _createCurrentSceneTreeNodeInspectorSnapshotAndMatch(/* () */0);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test redo operate", (function (param) {
                              return Wonder_jest.describe("test redo one step", (function (param) {
                                            return Wonder_jest.test("undo step which from first to zero, redo step which from zero to first", (function (param) {
                                                          _simulate(/* () */0);
                                                          RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          return _createCurrentSceneTreeNodeInspectorSnapshotAndMatch(/* () */0);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test set field's defaultValue and blur", (function (param) {
                var _simulate = function (param) {
                  var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                  var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                  ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                  MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0), Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                  var attributeName = ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, engineState);
                  var attribute = ScriptAttributeInspectorTool$WonderEditor.getAttribute(addedNodeId, engineState);
                  var match = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState((function (param) {
                              return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId, param);
                            })));
                  var fieldName = match[0];
                  var oldDefaultValue = StateLogicService$WonderEditor.getEditorState((function (param) {
                          return ScriptAttributeInspectorTool$WonderEditor.unsafeGetScriptAttributeFieldDefaultValue(addedNodeId, fieldName, param);
                        }));
                  StateEngineService$WonderEditor.setState(engineState);
                  MainEditorScriptAttributeTool$WonderEditor.changeScriptAttributeFieldDefaultValueFloat(script, attributeName, fieldName, attribute, 1.1);
                  MainEditorScriptAttributeTool$WonderEditor.blurScriptAttributeFieldDefaultValueFloat(script, attributeName, fieldName, attribute, oldDefaultValue);
                  return /* tuple */[
                          script,
                          attributeName,
                          fieldName,
                          /* tuple */[
                            oldDefaultValue,
                            1.1
                          ]
                        ];
                };
                Wonder_jest.describe("test undo operate", (function (param) {
                        return Wonder_jest.describe("test undo one step", (function (param) {
                                      return Wonder_jest.test("step which from first to zero", (function (param) {
                                                    var match = _simulate(/* () */0);
                                                    var fieldName = match[2];
                                                    var attributeName = match[1];
                                                    var script = match[0];
                                                    RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return ScriptAttributeFieldTool$WonderEditor.unsafeGetScriptAttributeFieldDefaultValue(script, attributeName, fieldName, param);
                                                                        }))), match[3][0]);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test redo operate", (function (param) {
                              return Wonder_jest.describe("test redo one step", (function (param) {
                                            return Wonder_jest.test("undo step which from first to zero, redo step which from zero to first", (function (param) {
                                                          var match = _simulate(/* () */0);
                                                          var fieldName = match[2];
                                                          var attributeName = match[1];
                                                          var script = match[0];
                                                          RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return ScriptAttributeFieldTool$WonderEditor.unsafeGetScriptAttributeFieldDefaultValue(script, attributeName, fieldName, param);
                                                                              }))), match[3][1]);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test change script attribute", (function (param) {
                var _simulate = function (param) {
                  var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                  MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0), Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                  var targetScriptAttributeNodeId = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getStateToGetData((function (param) {
                              return MainEditorScriptTool$WonderEditor.getUnUsedScriptAttributeNodeIds(script, param);
                            })));
                  return MainEditorScriptAttributeTool$WonderEditor.handleChangeScriptAttributeForChange(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                        return MainEditorScriptTool$WonderEditor.getScriptAllAttributeNodeIds(script, param);
                                      }))), targetScriptAttributeNodeId, undefined, undefined, /* () */0);
                };
                Wonder_jest.describe("test undo operate", (function (param) {
                        return Wonder_jest.describe("test undo one step", (function (param) {
                                      return Wonder_jest.test("step which from first to zero", (function (param) {
                                                    _simulate(/* () */0);
                                                    RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    return _createCurrentSceneTreeNodeInspectorSnapshotAndMatch(/* () */0);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test redo operate", (function (param) {
                              return Wonder_jest.describe("test redo one step", (function (param) {
                                            return Wonder_jest.test("undo step which from first to zero, redo step which from zero to first", (function (param) {
                                                          _simulate(/* () */0);
                                                          RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          return _createCurrentSceneTreeNodeInspectorSnapshotAndMatch(/* () */0);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test remove script attribute", (function (param) {
                      var _simulate = function (param) {
                        var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                        var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                        MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                        var attributeName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                return ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, param);
                              }));
                        return MainEditorScriptAttributeTool$WonderEditor.removeScriptAttribute(script, attributeName, undefined, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), /* () */0);
                      };
                      Wonder_jest.describe("test undo operate", (function (param) {
                              return Wonder_jest.describe("test undo one step", (function (param) {
                                            return Wonder_jest.test("step which from first to zero", (function (param) {
                                                          _simulate(/* () */0);
                                                          RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          return _createCurrentSceneTreeNodeInspectorSnapshotAndMatch(/* () */0);
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test redo operate", (function (param) {
                                    return Wonder_jest.describe("test redo one step", (function (param) {
                                                  return Wonder_jest.test("undo step which from first to zero, redo step which from zero to first", (function (param) {
                                                                _simulate(/* () */0);
                                                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                return _createCurrentSceneTreeNodeInspectorSnapshotAndMatch(/* () */0);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
