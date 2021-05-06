'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var StateLogicService$WonderEditor = require("../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../tool/AssetInspectorTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../../asset/tool/MainEditorAssetIdTool.js");
var MainEditorAssetFolderNodeTool$WonderEditor = require("../../../../asset/tool/MainEditorAssetFolderNodeTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("folder inspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test rename", (function (param) {
                      return Wonder_jest.test("if rename to the existed name in the same dir, should fail", (function (param) {
                                    var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                    var addedFolderNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                    var folder1Name = StateLogicService$WonderEditor.getEditorState((function (param) {
                                            return MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(addedFolderNodeId1, param);
                                          }));
                                    var folder2OldName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                            return MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(addedFolderNodeId2, param);
                                          }));
                                    AssetInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */8](undefined, undefined, addedFolderNodeId2, folder1Name, /* () */0);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                    StateLogicService$WonderEditor.getEditorState((function (param) {
                                                            return MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(addedFolderNodeId1, param);
                                                          })),
                                                    StateLogicService$WonderEditor.getEditorState((function (param) {
                                                            return MainEditorAssetFolderNodeTool$WonderEditor.getFolderName(addedFolderNodeId2, param);
                                                          }))
                                                  ]), /* tuple */[
                                                folder1Name,
                                                folder2OldName
                                              ]);
                                  }));
                    }));
      }));

/*  Not a pure module */
