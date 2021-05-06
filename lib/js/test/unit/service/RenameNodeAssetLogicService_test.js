'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Result$WonderEditor = require("../../../src/module/Result.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../integration/asset/tool/MainEditorAssetTreeTool.js");
var NodeNameAssetLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/asset/NodeNameAssetLogicService.js");
var RenameNodeAssetLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/asset/RenameNodeAssetLogicService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");

Wonder_jest.describe("RenameNodeAssetLogicService", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("renameNode", (function (param) {
                      Wonder_jest.test("test1", (function (param) {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                              var textureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                              var result = RenameNodeAssetLogicService$WonderEditor.renameNode(textureNodeId, "zzz", /* tuple */[
                                    editorState,
                                    engineState
                                  ]);
                              var match = Result$WonderEditor.SameDataResult[/* getData */3](result);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](NodeNameAssetLogicService$WonderEditor.getNodeName(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(textureNodeId, match[0]), match[1])), "zzz");
                            }));
                      return Wonder_jest.test("test2", (function (param) {
                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* buildFolderAndTextureAndMaterialAssetTree */0], /* () */0);
                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                    var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* getThirdLayerFirstTextureNodeId */5], assetTreeData);
                                    var result = RenameNodeAssetLogicService$WonderEditor.renameNode(nodeId, "zzz", /* tuple */[
                                          editorState,
                                          engineState
                                        ]);
                                    var match = Result$WonderEditor.SameDataResult[/* getData */3](result);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](NodeNameAssetLogicService$WonderEditor.getNodeName(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(nodeId, match[0]), match[1])), "zzz");
                                  }));
                    }));
      }));

/*  Not a pure module */
