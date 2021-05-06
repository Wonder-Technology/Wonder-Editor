'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var EventListenerTool$WonderEditor = require("../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/tool/AssetInspectorTool.js");
var AssetWidgetService$WonderEditor = require("../../../../src/service/record/editor/widget/AssetWidgetService.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var MainEditorAssetTool$WonderEditor = require("../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorAssetFolderNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetFolderNodeTool.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");

Wonder_jest.describe("redo_undo: asset rename node", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulateTwiceChangeName = function (param) {
          var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildTwoFolderAssetTree */1], /* () */0);
          var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
          var name1 = "mickeyFolder1";
          var name2 = "mickeyFolder2";
          AssetInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */8](undefined, undefined, nodeId, name1, /* () */0);
          AssetInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */8](undefined, undefined, nodeId, name2, /* () */0);
          return /* tuple */[
                  nodeId,
                  /* tuple */[
                    name1,
                    name2
                  ]
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                var partial_arg = AssetWidgetService$WonderEditor.getWidget(/* () */0);
                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                            }));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test undo operate", (function (param) {
                Wonder_jest.test("test not undo", (function (param) {
                        var match = _simulateTwiceChangeName(/* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(match[0], StateEditorService$WonderEditor.getState(/* () */0))), match[1][1]);
                      }));
                Wonder_jest.describe("test undo one step", (function (param) {
                        return Wonder_jest.test("step which from second to first", (function (param) {
                                      var match = _simulateTwiceChangeName(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(match[0], StateEditorService$WonderEditor.getState(/* () */0))), match[1][0]);
                                    }));
                      }));
                return Wonder_jest.describe("test undo two step", (function (param) {
                              return Wonder_jest.test("step which from second to zero", (function (param) {
                                            var sourceName = MainEditorAssetFolderNodeTool$WonderEditor.getNoNameFolderName(/* () */0);
                                            var match = _simulateTwiceChangeName(/* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(match[0], StateEditorService$WonderEditor.getState(/* () */0))), sourceName);
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
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(match[0], StateEditorService$WonderEditor.getState(/* () */0))), match[1][0]);
                                          }));
                            }));
                      return Wonder_jest.describe("test redo two step", (function (param) {
                                    return Wonder_jest.test("undo step which from second to zero,redo step which from zero to second", (function (param) {
                                                  var match = _simulateTwiceChangeName(/* () */0);
                                                  RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(match[0], StateEditorService$WonderEditor.getState(/* () */0))), match[1][1]);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
