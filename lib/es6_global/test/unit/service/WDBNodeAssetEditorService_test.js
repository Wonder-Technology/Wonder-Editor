

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as AssetWidgetService$WonderEditor from "../../../src/service/record/editor/widget/AssetWidgetService.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../integration/asset/tool/MainEditorAssetTreeTool.js";
import * as WDBNodeAssetEditorService$WonderEditor from "../../../src/service/state/editor/asset/WDBNodeAssetEditorService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../src/service/state/editor/CurrentDragSourceEditorService.js";

describe("WDBNodeAssetEditorService", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("isWDBAssetFile", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                        return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                      }));
                describe("test current drag source contain asset widget", (function () {
                        Wonder_jest.test("if current drag source contain texture node, return false", (function (param) {
                                var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                var textureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                var editorState$1 = CurrentDragSourceEditorService$WonderEditor.setCurrentDragSource(/* tuple */[
                                      AssetWidgetService$WonderEditor.getWidget(/* () */0),
                                      textureNodeId
                                    ], editorState);
                                StateEditorService$WonderEditor.setState(editorState$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](WDBNodeAssetEditorService$WonderEditor.isWDBAssetFile(/* () */0)), false);
                              }));
                        return Wonder_jest.test("if current drag source contain wdb node, return true", (function (param) {
                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* WDB */4][/* buildOneWDBAssetTree */0], /* () */0);
                                      var wdbNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* WDB */4][/* getFirstWDBNodeId */2], assetTreeData);
                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                      var editorState$1 = CurrentDragSourceEditorService$WonderEditor.setCurrentDragSource(/* tuple */[
                                            AssetWidgetService$WonderEditor.getWidget(/* () */0),
                                            wdbNodeId
                                          ], editorState);
                                      StateEditorService$WonderEditor.setState(editorState$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](WDBNodeAssetEditorService$WonderEditor.isWDBAssetFile(/* () */0)), true);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
