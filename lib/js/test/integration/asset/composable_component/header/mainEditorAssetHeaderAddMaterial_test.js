'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var OptionService$WonderEditor = require("../../../../../src/service/primitive/OptionService.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var AssetInspectorTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../tool/MainEditorAssetIdTool.js");
var LightMaterialToolEngine$WonderEditor = require("../../../../tool/engine/LightMaterialToolEngine.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var MaterialNodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/MaterialNodeAssetService.js");
var OperateMaterialLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/material/OperateMaterialLogicService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var MainEditorAssetMaterialNodeTool$WonderEditor = require("../../tool/MainEditorAssetMaterialNodeTool.js");
var BasicSourceTextureImageDataMapTool$WonderEditor = require("../../tool/BasicSourceTextureImageDataMapTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../tool/MainEditorAssetHeaderOperateNodeTool.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");

Wonder_jest.describe("MainEditorAssetHeader->add material", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareAndExecAndGetMaterialNode = function (param) {
          var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
          var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
          return /* tuple */[
                  assetTreeData,
                  OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedMaterialNodeId, StateEditorService$WonderEditor.getState(/* () */0))
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
                return Wonder_jest.describe("should add material into root treeNode", (function (param) {
                              Wonder_jest.test("test snapshot", (function (param) {
                                      Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                    }));
                              return Wonder_jest.test("the added material parent node should be root", (function (param) {
                                            var match = _prepareAndExecAndGetMaterialNode(/* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeParentId(match[1], StateEditorService$WonderEditor.getState(/* () */0)))), Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* getRootNodeId */1], match[0]));
                                          }));
                            }));
              }));
        Wonder_jest.describe("else", (function (param) {
                return Wonder_jest.describe("add material into specific treeNode", (function (param) {
                              return Wonder_jest.test("test snapshot", (function (param) {
                                            var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* buildFolderAndTextureAndMaterialAssetTree */0], /* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* getSecondLayerFirstFolderNodeId */2], assetTreeData), undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                                          }));
                            }));
              }));
        Wonder_jest.test("create new material", (function (param) {
                Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
                var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                var newLightMaterial = LightMaterialToolEngine$WonderEditor.getNewLightMaterial(undefined, /* () */0);
                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](materialComponent), newLightMaterial);
              }));
        Wonder_jest.test("create new imageDataIndex and new imageData", (function (param) {
                Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
                var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                var newImageDataMapIndex = BasicSourceTextureImageDataMapTool$WonderEditor.getNewImageDataMapIndex(undefined, /* () */0);
                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                var match = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedMaterialNodeId, editorState));
                var snapshotImageDataIndex = match[/* snapshotImageDataIndex */2];
                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                snapshotImageDataIndex,
                                Js_option.isSome(BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.getData(snapshotImageDataIndex, editorState))
                              ]), /* tuple */[
                            newImageDataMapIndex,
                            true
                          ]);
              }));
        Wonder_jest.test("material type should be LightMaterial", (function (param) {
                var match = _prepareAndExecAndGetMaterialNode(/* () */0);
                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MaterialNodeAssetService$WonderEditor.getNodeData(match[1])[/* type_ */0]), /* LightMaterial */1);
              }));
        return Wonder_jest.describe("test name", (function (param) {
                      Wonder_jest.test("test default name", (function (param) {
                              Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                            }));
                      return Wonder_jest.test("remove first material which use default name;\n          add three material;\n\n          the first new one's name should be removed-material's name;\n                  ", (function (param) {
                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
                                    var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* getFirstMaterialNodeId */2], assetTreeData);
                                    AssetInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */5](undefined, undefined, nodeId, OperateMaterialLogicService$WonderEditor.getDefaultName(/* () */0), /* () */0);
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, nodeId, /* () */0);
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                    MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* getRootNodeId */1], assetTreeData), undefined, /* () */0);
                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0));
                                  }));
                    }));
      }));

/*  Not a pure module */
