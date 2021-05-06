'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../../tool/RedoUndoTool.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../asset/tool/MainEditorAssetIdTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../asset/tool/MainEditorAssetTreeTool.js");
var ScriptAttributeInspectorTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/atom_component/script_inspector/tool/ScriptAttributeInspectorTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("redo_undo: asset script attribute->add default field", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulateOnceUpdateScriptAttributeData = function (param) {
          MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
          var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
          ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
          StateLogicService$WonderEditor.getEditorState((function (param) {
                  return ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, param);
                }));
          StateLogicService$WonderEditor.getEditorState((function (param) {
                  return ScriptAttributeInspectorTool$WonderEditor.getAttribute(addedNodeId, param);
                }));
          return addedNodeId;
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
                                            var addedNodeId = _simulateOnceUpdateScriptAttributeData(/* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildScriptAttributeInspectorComponent(addedNodeId, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test redo operate", (function (param) {
                      return Wonder_jest.describe("test redo one step", (function (param) {
                                    return Wonder_jest.test("undo step which from first to zero, redo step which from zero to first", (function (param) {
                                                  var addedNodeId = _simulateOnceUpdateScriptAttributeData(/* () */0);
                                                  RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildScriptAttributeInspectorComponent(addedNodeId, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
