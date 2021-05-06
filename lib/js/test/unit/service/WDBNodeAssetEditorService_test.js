'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var AssetWidgetService$WonderEditor = require("../../../src/service/record/editor/widget/AssetWidgetService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../integration/asset/tool/MainEditorAssetTreeTool.js");
var WDBNodeAssetEditorService$WonderEditor = require("../../../src/service/state/editor/asset/WDBNodeAssetEditorService.js");
var CurrentDragSourceEditorService$WonderEditor = require("../../../src/service/state/editor/CurrentDragSourceEditorService.js");

Wonder_jest.describe("WDBNodeAssetEditorService", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("isWDBAssetFile", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                              return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                            }));
                      return Wonder_jest.describe("test current drag source contain asset widget", (function (param) {
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
                                                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* WDB */7][/* buildOneWDBAssetTree */0], /* () */0);
                                                  var wdbNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* WDB */7][/* getFirstWDBNodeId */2], assetTreeData);
                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                  var editorState$1 = CurrentDragSourceEditorService$WonderEditor.setCurrentDragSource(/* tuple */[
                                                        AssetWidgetService$WonderEditor.getWidget(/* () */0),
                                                        wdbNodeId
                                                      ], editorState);
                                                  StateEditorService$WonderEditor.setState(editorState$1);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](WDBNodeAssetEditorService$WonderEditor.isWDBAssetFile(/* () */0)), true);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
