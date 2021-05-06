'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var OptionService$WonderEditor = require("../../../../../src/service/primitive/OptionService.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var FakeGlToolEngine$WonderEditor = require("../../../../tool/engine/FakeGlToolEngine.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../tool/MainEditorAssetIdTool.js");
var CubemapNodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/CubemapNodeAssetService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var CubemapTextureToolEngine$WonderEditor = require("../../../../tool/engine/CubemapTextureToolEngine.js");
var OperateCubemapLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/OperateCubemapLogicService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var MainEditorAssetCubemapNodeTool$WonderEditor = require("../../tool/MainEditorAssetCubemapNodeTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../tool/MainEditorAssetHeaderOperateNodeTool.js");
var CubemapTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/imageDataMap/CubemapTextureImageDataMapAssetEditorService.js");

Wonder_jest.describe("MainEditorAssetHeader->add cubemap", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareAndExecAndGetCubemapNode = function (param) {
          var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
          var addedCubemapNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
          return /* tuple */[
                  assetTreeData,
                  OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedCubemapNodeId, StateEditorService$WonderEditor.getState(/* () */0))
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("if not select specific treeNode", (function (param) {
                return Wonder_jest.describe("should add cubemap into root treeNode", (function (param) {
                              Wonder_jest.test("test snapshot", (function (param) {
                                      Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                    }));
                              return Wonder_jest.test("the added cubemap's parent node should be root", (function (param) {
                                            var match = _prepareAndExecAndGetCubemapNode(/* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeParentId(match[1], StateEditorService$WonderEditor.getState(/* () */0)))), Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getRootNodeId */1], match[0]));
                                          }));
                            }));
              }));
        Wonder_jest.describe("else", (function (param) {
                return Wonder_jest.describe("add cubemap into specific treeNode", (function (param) {
                              return Wonder_jest.test("test snapshot", (function (param) {
                                            var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0));
                                          }));
                            }));
              }));
        Wonder_jest.test("create new cubemap", (function (param) {
                Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                var addedCubemapNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                var newCubemap = CubemapTextureToolEngine$WonderEditor.getNewCubemap(undefined, /* () */0);
                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                var cubemapComponent = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(addedCubemapNodeId, undefined, /* () */0);
                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](cubemapComponent), newCubemap);
              }));
        Wonder_jest.test("init new cubemap", (function (param) {
                Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                var addedCubemapNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                CubemapTextureToolEngine$WonderEditor.getNewCubemap(undefined, /* () */0);
                var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                Sinon.returns(1, Sinon.onCall(0, createTexture));
                var partial_arg = FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                        return FakeGlToolEngine$WonderEditor.setFakeGl(partial_arg, param);
                      }));
                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                var partial_arg$1 = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(addedCubemapNodeId, undefined, /* () */0);
                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                      return CubemapTextureToolEngine$WonderEditor.unsafeGetGlTexture(partial_arg$1, param);
                                    }))), 1);
              }));
        Wonder_jest.test("add empty data to cubemapTextureImageDataMap", (function (param) {
                Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                var addedCubemapNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                var match = CubemapNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedCubemapNodeId, editorState));
                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(match[/* imageDataIndex */1], editorState)), /* record */[
                            /* pxImageData */undefined,
                            /* nxImageData */undefined,
                            /* pyImageData */undefined,
                            /* nyImageData */undefined,
                            /* pzImageData */undefined,
                            /* nzImageData */undefined
                          ]);
              }));
        return Wonder_jest.describe("test name", (function (param) {
                      Wonder_jest.test("test default name", (function (param) {
                              Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                            }));
                      return Wonder_jest.test("remove first cubemap which use default name;\n             add three cubemap;\n\n             the first new one's name should be removed-cubemap's name;\n                     ", (function (param) {
                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                    var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData);
                                    AssetInspectorTool$WonderEditor.Rename[/* renameAssetCubemapNode */1](undefined, undefined, nodeId, OperateCubemapLogicService$WonderEditor.getDefaultName(/* () */0), /* () */0);
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeCubemapNode(undefined, undefined, nodeId, /* () */0);
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                                    MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getRootNodeId */1], assetTreeData), undefined, /* () */0);
                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0));
                                  }));
                    }));
      }));

/*  Not a pure module */
