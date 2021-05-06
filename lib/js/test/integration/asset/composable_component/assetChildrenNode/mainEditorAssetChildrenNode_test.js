'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../../tool/LoadTool.js");
var MainUtils$WonderEditor = require("../../../../../src/core/utils/engine/MainUtils.js");
var FolderBoxTool$WonderEditor = require("../../../../unit/atom_component/folderBox/tool/FolderBoxTool.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var EventListenerTool$WonderEditor = require("../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../tool/MainEditorAssetIdTool.js");
var FolderNodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/FolderNodeAssetService.js");
var MainEditorAssetNodeTool$WonderEditor = require("../../tool/MainEditorAssetNodeTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../tool/MainEditorAssetUploadTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var CurrentNodeIdAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../tool/MainEditorAssetChildrenNodeTool.js");
var MainEditorLightMaterialForAssetTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/atom_component/material_inspector/atom_component/tool/MainEditorLightMaterialForAssetTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../tool/MainEditorAssetHeaderOperateNodeTool.js");
var SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js");

Wonder_jest.describe("MainEditorAssetChildrenNode", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                StateEditorService$WonderEditor.setState(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0))));
                return /* () */0;
              }));
        Wonder_jest.describe("test set current node", (function (param) {
                Wonder_jest.test("click texture asset to be current node", (function (param) {
                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                        MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), undefined, undefined, /* () */0);
                        var currentNodeId = MainEditorAssetNodeTool$WonderEditor.unsafeGetCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0));
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](currentNodeId), Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData));
                      }));
                return Wonder_jest.describe("test snapshot", (function (param) {
                              return Wonder_jest.test("click fnt asset to be current node", (function (param) {
                                            MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                            var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFnt(undefined, undefined, /* () */0);
                                            MainEditorAssetChildrenNodeTool$WonderEditor.selectFntNode(addedNodeId, undefined, undefined, /* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test asset tree node->isShowChildren", (function (param) {
                Wonder_jest.describe("test double click folder", (function (param) {
                        return Wonder_jest.test("folder->parent folder->isShowChildren should set to true", (function (param) {
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                                      var addedFolderNodeId2 = addedFolderNodeId1 + 1 | 0;
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId2, undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                      StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                              return OperateTreeAssetEditorService$WonderEditor.setNodeIsShowChildren(addedFolderNodeId1, false, param);
                                            }));
                                      FolderBoxTool$WonderEditor.onDoubleClick(addedFolderNodeId2, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FolderNodeAssetService$WonderEditor.getIsShowChildren(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedFolderNodeId1, StateEditorService$WonderEditor.getState(/* () */0)))), true);
                                    }));
                      }));
                return Wonder_jest.describe("render material sphere's snapshot", (function (param) {
                              Wonder_jest.describe("render default snapshot", (function (param) {
                                      return Wonder_jest.describe("test render after add material", (function (param) {
                                                    return Wonder_jest.test("test snapshot", (function (param) {
                                                                  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("render updated snapshot", (function (param) {
                                            beforeEach((function () {
                                                    MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                                                    StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                                    MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                                    Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                                    return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                                  }));
                                            return Wonder_jest.describe("test render after drag texture", (function (param) {
                                                          return Wonder_jest.testPromise("test snapshot", undefined, (function (param) {
                                                                        var match = MainEditorLightMaterialForAssetTool$WonderEditor.prepareInspectorMaterialSphereAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                                                        var newMaterialComponent = match[1];
                                                                        var addedMaterialNodeId = match[0];
                                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                                      MainEditorLightMaterialForAssetTool$WonderEditor.dragAssetTextureToMap(addedMaterialNodeId, uploadedTextureNodeId, undefined, undefined, newMaterialComponent, /* () */0);
                                                                                      return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test show order", (function (param) {
                      var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
                      beforeAll((function () {
                              boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                              return /* () */0;
                            }));
                      beforeEach((function () {
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                              LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                              LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                              LoadTool$WonderEditor.buildFakeLoadImage();
                              return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                            }));
                      return Wonder_jest.testPromise("\n        order should be:\n        1)for different type_:folder,wdb,material,texture;\n        2)for the same type_:sort by firstname alphabetically\n        ", undefined, (function (param) {
                                    var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                    var addedMaterialNodeId1 = addedFolderNodeId1 + 1 | 0;
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                    var addedFolderNodeId2 = addedMaterialNodeId1 + 1 | 0;
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                    var addedMaterialNodeId2 = addedFolderNodeId2 + 1 | 0;
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, "C_WDB", /* () */0).then((function (uploadedWDBNodeId1) {
                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "BImage.png", undefined, /* () */0).then((function (uploadedTextureNodeId1) {
                                                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, "A_WDB", /* () */0).then((function (uploadedWDBNodeId2) {
                                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "AImage.jpg", undefined, /* () */0).then((function (uploadedTextureNodeId2) {
                                                                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */8](undefined, undefined, addedFolderNodeId1, "FFolder", /* () */0);
                                                                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */8](undefined, undefined, addedFolderNodeId2, "AFolder", /* () */0);
                                                                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */5](undefined, undefined, addedMaterialNodeId1, "CMaterial", /* () */0);
                                                                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */5](undefined, undefined, addedMaterialNodeId2, "AMaterial", /* () */0);
                                                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                                          }));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
