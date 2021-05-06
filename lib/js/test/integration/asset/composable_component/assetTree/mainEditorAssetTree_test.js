'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var LoadTool$WonderEditor = require("../../tool/LoadTool.js");
var ArrayService$WonderEditor = require("../../../../../src/service/atom/ArrayService.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var NodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/NodeAssetService.js");
var EventListenerTool$WonderEditor = require("../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../tool/MainEditorAssetIdTool.js");
var MainEditorAssetNodeTool$WonderEditor = require("../../tool/MainEditorAssetNodeTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var MainEditorAssetFolderNodeTool$WonderEditor = require("../../tool/MainEditorAssetFolderNodeTool.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var CurrentNodeIdAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../tool/MainEditorAssetHeaderOperateNodeTool.js");
var SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js");

Wonder_jest.describe("MainEditorAssetTree", (function (param) {
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
        Wonder_jest.describe("test set currentNode and selectedFolderNodeInAssetTree", (function (param) {
                return Wonder_jest.describe("click assetTree node", (function (param) {
                              return Wonder_jest.test("currentNode and selectedFolderNodeInAssetTree should be same", (function (param) {
                                            var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), undefined, /* () */0);
                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](NodeAssetService$WonderEditor.isNodeEqualById(MainEditorAssetNodeTool$WonderEditor.unsafeGetCurrentNode(editorState), MainEditorAssetNodeTool$WonderEditor.unsafeGetSelectedFolderNodeInAssetTree(editorState))), true);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test drag assetTreeNode to assetTreeNode", (function (param) {
                return Wonder_jest.describe("test has children case", (function (param) {
                              Wonder_jest.describe("have first layer children", (function (param) {
                                      Wonder_jest.test("no drag", (function (param) {
                                              Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                            }));
                                      return Wonder_jest.test("drag treeNode into brother treeNode", (function (param) {
                                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildTwoFolderAssetTree */1], /* () */0);
                                                    var firstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                                    var secondFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getSecondFolderNodeId */4], assetTreeData);
                                                    MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetTreeNode */0](secondFolderNodeId, firstFolderNodeId, undefined, undefined, /* () */0);
                                                    MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), undefined, /* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                                                  }));
                                    }));
                              return Wonder_jest.describe("have second layer children", (function (param) {
                                            Wonder_jest.test("no drag", (function (param) {
                                                    Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* ThreeLayer */1][/* buildFourFolderAssetTree */0], /* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                  }));
                                            return Wonder_jest.test("drag third layer first folderNode into root treeNode", (function (param) {
                                                          var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* ThreeLayer */1][/* buildFourFolderAssetTree */0], /* () */0);
                                                          var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* ThreeLayer */1][/* getThirdLayerFirstFolderNodeId */4], assetTreeData);
                                                          StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                                  return MainEditorAssetFolderNodeTool$WonderEditor.setFolderName(nodeId, "a1", param);
                                                                }));
                                                          MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetTreeNode */0](nodeId, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* ThreeLayer */1][/* getRootNodeId */1], assetTreeData), undefined, undefined, /* () */0);
                                                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test drag assetChildrenNode to assetTreeNode", (function (param) {
                Wonder_jest.test("test no drag", (function (param) {
                        Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* ThreeLayer */1][/* buildFourFolderAssetTree */0], /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                      }));
                Wonder_jest.describe("test drag folder", (function (param) {
                        return Wonder_jest.test("test drag folder into it's parent's brother folder", (function (param) {
                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* ThreeLayer */1][/* buildFourFolderAssetTree */0], /* () */0);
                                      var secondLayerFirstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* ThreeLayer */1][/* getSecondLayerFirstFolderNodeId */2], assetTreeData);
                                      Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* ThreeLayer */1][/* getSecondLayerSecondFolderNodeId */3], assetTreeData);
                                      var thirdLayerFirstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* ThreeLayer */1][/* getThirdLayerFirstFolderNodeId */4], assetTreeData);
                                      MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetChildrenNodeIntoAssetTreeNode */1](thirdLayerFirstFolderNodeId, secondLayerFirstFolderNodeId, undefined, undefined, /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](secondLayerFirstFolderNodeId, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                    }));
                      }));
                Wonder_jest.describe("test drag texture", (function (param) {
                        Wonder_jest.test("test drag texture file into it's parent's brother folder", (function (param) {
                                var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* buildFolderAndTextureAndMaterialAssetTree */0], /* () */0);
                                var secondLayerFirstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* getSecondLayerFirstFolderNodeId */2], assetTreeData);
                                var thirdLayerFirstTextureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* getThirdLayerFirstTextureNodeId */5], assetTreeData);
                                MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetChildrenNodeIntoAssetTreeNode */1](thirdLayerFirstTextureNodeId, secondLayerFirstFolderNodeId, undefined, undefined, /* () */0);
                                MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](secondLayerFirstFolderNodeId, undefined, /* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0));
                              }));
                        return Wonder_jest.test("test drag texture file into it's brother folder", (function (param) {
                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* buildFolderAndTextureAndMaterialAssetTree */0], /* () */0);
                                      var thirdLayerFirstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* getThirdLayerFirstFolderNodeId */4], assetTreeData);
                                      MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetChildrenNodeIntoAssetTreeNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* getThirdLayerFirstTextureNodeId */5], assetTreeData), thirdLayerFirstFolderNodeId, undefined, undefined, /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](thirdLayerFirstFolderNodeId, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                    }));
                      }));
                return Wonder_jest.describe("test drag material", (function (param) {
                              return Wonder_jest.test("test drag material file into it's parent's brother folder", (function (param) {
                                            var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* buildFolderAndTextureAndMaterialAssetTree */0], /* () */0);
                                            var secondLayerFirstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* getSecondLayerFirstFolderNodeId */2], assetTreeData);
                                            var thirdLayerFirstTextureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */9][/* ThreeLayer */0][/* getThirdLayerFirstTextureNodeId */5], assetTreeData);
                                            MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetChildrenNodeIntoAssetTreeNode */1](thirdLayerFirstTextureNodeId, secondLayerFirstFolderNodeId, undefined, undefined, /* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](secondLayerFirstFolderNodeId, undefined, /* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0));
                                          }));
                            }));
              }));
        Wonder_jest.describe("deal with the specific case", (function (param) {
                Wonder_jest.test("if drag treeNode into itself, keep not change", (function (param) {
                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                        var firstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                        MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetTreeNode */0](firstFolderNodeId, firstFolderNodeId, undefined, undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                      }));
                return Wonder_jest.test("if drag treeNode into it's chidlren, keep not change", (function (param) {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* ThreeLayer */1][/* buildFourFolderAssetTree */0], /* () */0);
                              MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetTreeNode */0](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* ThreeLayer */1][/* getSecondLayerSecondFolderNodeId */3], assetTreeData), Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* ThreeLayer */1][/* getThirdLayerFirstFolderNodeId */4], assetTreeData), undefined, undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                            }));
              }));
        Wonder_jest.describe("test asse tree node->isShowChildren", (function (param) {
                Wonder_jest.test("default node->isShowChildren should be false except root node", (function (param) {
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                        var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                        MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                        MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](StateLogicService$WonderEditor.getEditorState(MainEditorAssetTreeTool$WonderEditor.getRootNodeId), undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                      }));
                Wonder_jest.describe("test drag treeNode to target treeNode", (function (param) {
                        return Wonder_jest.test("target treeNode->isShowChildren should set to true", (function (param) {
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                      var addedFolderNodeId2 = addedFolderNodeId1 + 1 | 0;
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                      StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                              return OperateTreeAssetEditorService$WonderEditor.setNodeIsShowChildren(addedFolderNodeId1, false, param);
                                            }));
                                      MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetTreeNode */0](addedFolderNodeId2, addedFolderNodeId1, undefined, undefined, /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](StateLogicService$WonderEditor.getEditorState(MainEditorAssetTreeTool$WonderEditor.getRootNodeId), undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                            return MainEditorAssetFolderNodeTool$WonderEditor.getIsShowChildren(addedFolderNodeId1, param);
                                                          }))), true);
                                    }));
                      }));
                return Wonder_jest.describe("test add treeNode to target treeNode", (function (param) {
                              return Wonder_jest.test("target treeNode->isShowChildren should not change", (function (param) {
                                            MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                            var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](StateLogicService$WonderEditor.getEditorState(MainEditorAssetTreeTool$WonderEditor.getRootNodeId), undefined, /* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test show order", (function (param) {
                beforeEach((function () {
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                        LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                        LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                        LoadTool$WonderEditor.buildFakeLoadImage();
                        return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                      }));
                return Wonder_jest.test("sort the same layer folder by firstname alphabetically", (function (param) {
                              var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                              var addedMaterialNodeId1 = addedFolderNodeId1 + 1 | 0;
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                              var addedFolderNodeId2 = addedMaterialNodeId1 + 1 | 0;
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                              MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId2, undefined, /* () */0);
                              StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return OperateTreeAssetEditorService$WonderEditor.setNodeIsShowChildren(addedFolderNodeId2, true, param);
                                    }));
                              var addedFolderNodeId3 = addedFolderNodeId2 + 1 | 0;
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                              var addedFolderNodeId4 = addedFolderNodeId3 + 1 | 0;
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                              AssetInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */8](undefined, undefined, addedFolderNodeId1, "FFolder", /* () */0);
                              AssetInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */8](undefined, undefined, addedFolderNodeId2, "BFolder", /* () */0);
                              AssetInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */8](undefined, undefined, addedFolderNodeId3, "ZFolder", /* () */0);
                              AssetInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */8](undefined, undefined, addedFolderNodeId4, "AFolder", /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                            }));
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      return Wonder_jest.describe("fix show children arrow", (function (param) {
                                    Wonder_jest.test("if node->children has no folder node, not show arrow", (function (param) {
                                            MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                            var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                                          }));
                                    return Wonder_jest.test("else, show arrow", (function (param) {
                                                  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                  var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                  MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
