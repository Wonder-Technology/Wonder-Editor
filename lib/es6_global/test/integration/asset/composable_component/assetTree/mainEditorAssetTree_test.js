

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as LoadTool$WonderEditor from "../../tool/LoadTool.js";
import * as ArrayService$WonderEditor from "../../../../../src/service/atom/ArrayService.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as NodeAssetService$WonderEditor from "../../../../../src/service/record/editor/asset/NodeAssetService.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetIdTool$WonderEditor from "../../tool/MainEditorAssetIdTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../../../inspector/composable_component/assetTree_inspector/tool/AssetTreeInspectorTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../tool/MainEditorAssetNodeTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../tool/MainEditorAssetTreeTool.js";
import * as MainEditorAssetFolderNodeTool$WonderEditor from "../../tool/MainEditorAssetFolderNodeTool.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../tool/MainEditorAssetHeaderOperateNodeTool.js";
import * as SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js";

describe("MainEditorAssetTree", (function () {
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
        describe("test set currentNode and selectedFolderNodeInAssetTree", (function () {
                describe("click assetTree node", (function () {
                        return Wonder_jest.test("currentNode and selectedFolderNodeInAssetTree should be same", (function () {
                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), undefined, /* () */0);
                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](NodeAssetService$WonderEditor.isNodeEqualById(MainEditorAssetNodeTool$WonderEditor.unsafeGetCurrentNode(editorState), MainEditorAssetNodeTool$WonderEditor.unsafeGetSelectedFolderNodeInAssetTree(editorState))), true);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test drag assetTreeNode to assetTreeNode", (function () {
                describe("test has children case", (function () {
                        describe("have first layer children", (function () {
                                Wonder_jest.test("no drag", (function () {
                                        Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                      }));
                                return Wonder_jest.test("drag treeNode into brother treeNode", (function () {
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildTwoFolderAssetTree */1], /* () */0);
                                              var firstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                              var secondFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getSecondFolderNodeId */4], assetTreeData);
                                              MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetTreeNode */0](secondFolderNodeId, firstFolderNodeId, undefined, undefined, /* () */0);
                                              MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                                            }));
                              }));
                        describe("have second layer children", (function () {
                                Wonder_jest.test("no drag", (function () {
                                        Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* ThreeLayer */1][/* buildFourFolderAssetTree */0], /* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                      }));
                                return Wonder_jest.test("drag third layer first folderNode into root treeNode", (function () {
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* ThreeLayer */1][/* buildFourFolderAssetTree */0], /* () */0);
                                              var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* ThreeLayer */1][/* getThirdLayerFirstFolderNodeId */4], assetTreeData);
                                              StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                      return MainEditorAssetFolderNodeTool$WonderEditor.setFolderName(nodeId, "a1", param);
                                                    }));
                                              MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetTreeNode */0](nodeId, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* ThreeLayer */1][/* getRootNodeId */1], assetTreeData), undefined, undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test drag assetChildrenNode to assetTreeNode", (function () {
                Wonder_jest.test("test no drag", (function () {
                        Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* ThreeLayer */1][/* buildFourFolderAssetTree */0], /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                      }));
                describe("test drag folder", (function () {
                        return Wonder_jest.test("test drag folder into it's parent's brother folder", (function () {
                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* ThreeLayer */1][/* buildFourFolderAssetTree */0], /* () */0);
                                      var secondLayerFirstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* ThreeLayer */1][/* getSecondLayerFirstFolderNodeId */2], assetTreeData);
                                      Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* ThreeLayer */1][/* getSecondLayerSecondFolderNodeId */3], assetTreeData);
                                      var thirdLayerFirstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* ThreeLayer */1][/* getThirdLayerFirstFolderNodeId */4], assetTreeData);
                                      MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetChildrenNodeIntoAssetTreeNode */1](thirdLayerFirstFolderNodeId, secondLayerFirstFolderNodeId, undefined, undefined, /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](secondLayerFirstFolderNodeId, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                    }));
                      }));
                describe("test drag texture", (function () {
                        Wonder_jest.test("test drag texture file into it's parent's brother folder", (function () {
                                var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* buildFolderAndTextureAndMaterialAssetTree */0], /* () */0);
                                var secondLayerFirstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* getSecondLayerFirstFolderNodeId */2], assetTreeData);
                                var thirdLayerFirstTextureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* getThirdLayerFirstTextureNodeId */5], assetTreeData);
                                MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetChildrenNodeIntoAssetTreeNode */1](thirdLayerFirstTextureNodeId, secondLayerFirstFolderNodeId, undefined, undefined, /* () */0);
                                MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](secondLayerFirstFolderNodeId, undefined, /* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0));
                              }));
                        return Wonder_jest.test("test drag texture file into it's brother folder", (function () {
                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* buildFolderAndTextureAndMaterialAssetTree */0], /* () */0);
                                      var thirdLayerFirstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* getThirdLayerFirstFolderNodeId */4], assetTreeData);
                                      MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetChildrenNodeIntoAssetTreeNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* getThirdLayerFirstTextureNodeId */5], assetTreeData), thirdLayerFirstFolderNodeId, undefined, undefined, /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](thirdLayerFirstFolderNodeId, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                    }));
                      }));
                describe("test drag material", (function () {
                        return Wonder_jest.test("test drag material file into it's parent's brother folder", (function () {
                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* buildFolderAndTextureAndMaterialAssetTree */0], /* () */0);
                                      var secondLayerFirstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* getSecondLayerFirstFolderNodeId */2], assetTreeData);
                                      var thirdLayerFirstTextureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* getThirdLayerFirstTextureNodeId */5], assetTreeData);
                                      MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetChildrenNodeIntoAssetTreeNode */1](thirdLayerFirstTextureNodeId, secondLayerFirstFolderNodeId, undefined, undefined, /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](secondLayerFirstFolderNodeId, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("deal with the specific case", (function () {
                Wonder_jest.test("if drag treeNode into itself, keep not change", (function () {
                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                        var firstFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                        MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetTreeNode */0](firstFolderNodeId, firstFolderNodeId, undefined, undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                      }));
                return Wonder_jest.test("if drag treeNode into it's chidlren, keep not change", (function () {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* ThreeLayer */1][/* buildFourFolderAssetTree */0], /* () */0);
                              MainEditorAssetTreeTool$WonderEditor.Drag[/* dragAssetTreeNode */0](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* ThreeLayer */1][/* getSecondLayerSecondFolderNodeId */3], assetTreeData), Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* ThreeLayer */1][/* getThirdLayerFirstFolderNodeId */4], assetTreeData), undefined, undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                            }));
              }));
        describe("test asse tree node->isShowChildren", (function () {
                Wonder_jest.test("default node->isShowChildren should be false except root node", (function () {
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                        var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                        MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                        MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](StateLogicService$WonderEditor.getEditorState(MainEditorAssetTreeTool$WonderEditor.getRootNodeId), undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                      }));
                describe("test drag treeNode to target treeNode", (function () {
                        return Wonder_jest.test("target treeNode->isShowChildren should set to true", (function () {
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
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                            return MainEditorAssetFolderNodeTool$WonderEditor.getIsShowChildren(addedFolderNodeId1, param);
                                                          }))), true);
                                    }));
                      }));
                describe("test add treeNode to target treeNode", (function () {
                        return Wonder_jest.test("target treeNode->isShowChildren should not change", (function () {
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](StateLogicService$WonderEditor.getEditorState(MainEditorAssetTreeTool$WonderEditor.getRootNodeId), undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test show order", (function () {
                beforeEach((function () {
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                        LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                        LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                        LoadTool$WonderEditor.buildFakeLoadImage();
                        return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                      }));
                return Wonder_jest.test("sort the same layer folder by firstname alphabetically", (function () {
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
                              AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */3](undefined, undefined, addedFolderNodeId1, "FFolder", /* () */0);
                              AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */3](undefined, undefined, addedFolderNodeId2, "BFolder", /* () */0);
                              AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */3](undefined, undefined, addedFolderNodeId3, "ZFolder", /* () */0);
                              AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */3](undefined, undefined, addedFolderNodeId4, "AFolder", /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
