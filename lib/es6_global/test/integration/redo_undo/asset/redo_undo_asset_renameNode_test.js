

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as EventListenerTool$WonderEditor from "../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as AssetWidgetService$WonderEditor from "../../../../src/service/record/editor/widget/AssetWidgetService.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../../inspector/composable_component/assetTree_inspector/tool/AssetTreeInspectorTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorAssetFolderNodeTool$WonderEditor from "../../asset/tool/MainEditorAssetFolderNodeTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";

describe("redo_undo: asset rename node", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulateTwiceChangeName = function () {
          var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildTwoFolderAssetTree */1], /* () */0);
          var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
          var name1 = "mickeyFolder1";
          var name2 = "mickeyFolder2";
          AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */3](undefined, undefined, nodeId, name1, /* () */0);
          AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */3](undefined, undefined, nodeId, name2, /* () */0);
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
        describe("test undo operate", (function () {
                Wonder_jest.test("test not undo", (function () {
                        var match = _simulateTwiceChangeName(/* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(match[0], StateEditorService$WonderEditor.getState(/* () */0))), match[1][1]);
                      }));
                describe("test undo one step", (function () {
                        return Wonder_jest.test("step which from second to first", (function () {
                                      var match = _simulateTwiceChangeName(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(match[0], StateEditorService$WonderEditor.getState(/* () */0))), match[1][0]);
                                    }));
                      }));
                describe("test undo two step", (function () {
                        return Wonder_jest.test("step which from second to zero", (function () {
                                      var sourceName = MainEditorAssetFolderNodeTool$WonderEditor.getNoNameFolderName(/* () */0);
                                      var match = _simulateTwiceChangeName(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(match[0], StateEditorService$WonderEditor.getState(/* () */0))), sourceName);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test redo operate", (function () {
                describe("test redo one step", (function () {
                        return Wonder_jest.test("undo step which from second to zero, redo step which from zero to first", (function () {
                                      var match = _simulateTwiceChangeName(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(match[0], StateEditorService$WonderEditor.getState(/* () */0))), match[1][0]);
                                    }));
                      }));
                describe("test redo two step", (function () {
                        return Wonder_jest.test("undo step which from second to zero,redo step which from zero to second", (function () {
                                      var match = _simulateTwiceChangeName(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(match[0], StateEditorService$WonderEditor.getState(/* () */0))), match[1][1]);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
