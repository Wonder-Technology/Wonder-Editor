

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ArrayService$WonderEditor from "../../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as AssetTreeEventTool$WonderEditor from "../../tool/AssetTreeEventTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as AssetTreeDragEventTool$WonderEditor from "../../tool/AssetTreeDragEventTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../tool/MainEditorAssetNodeTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "./tool/MainEditorAssetTreeTool.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

describe("MainEditorAssetTree", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                StateEditorService$WonderEditor.setState(AssetCurrentNodeParentIdEditorService$WonderEditor.clearCurrentNodeParentId(AssetCurrentNodeDataEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
                return /* () */0;
              }));
        describe("test set currentNode and currentNodeParent", (function () {
                describe("click assetTree node", (function () {
                        return Wonder_jest.test("currentNodeId and currentNodeParentId should be same", (function () {
                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                      MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0), MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */5](assetTreeDomRecord));
                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                      var match = AssetCurrentNodeDataEditorService$WonderEditor.unsafeGetCurrentNodeData(editorState);
                                      var currentNodeParentId = AssetCurrentNodeParentIdEditorService$WonderEditor.unsafeGetCurrentNodeParentId(editorState);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[/* currentNodeId */0]), currentNodeParentId);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test drag assetTreeNode to assetTreeNode", (function () {
                describe("test has children case", (function () {
                        describe("have first layer children", (function () {
                                Wonder_jest.test("no drag", (function () {
                                        MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                      }));
                                return Wonder_jest.test("drag treeNode into brother treeNode", (function () {
                                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                              var firstFolderInAssetTree = MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */5](assetTreeDomRecord);
                                              var secondFolderInAssetTree = MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getSecondFolderDomIndexForAssetTree */7](assetTreeDomRecord);
                                              var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      return AssetTreeDragEventTool$WonderEditor.triggerFirstLayerDragStartEvent(secondFolderInAssetTree, param);
                                                    }));
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      return AssetTreeDragEventTool$WonderEditor.triggerFirstLayerDragEnterEvent(firstFolderInAssetTree, param);
                                                    }));
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      return AssetTreeDragEventTool$WonderEditor.triggerFirstLayerDropEvent(firstFolderInAssetTree, param);
                                                    }));
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                            }));
                              }));
                        describe("have second layer children", (function () {
                                Wonder_jest.test("no drag", (function () {
                                        MainEditorAssetTool$WonderEditor.buildThreeLayerAssetTreeRoot(/* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                      }));
                                return Wonder_jest.test("drag second treeNode into root treeNode", (function () {
                                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildThreeLayerAssetTreeRoot(/* () */0);
                                              var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                              var firstLayerSecondFolderDomIndex = MainEditorAssetNodeTool$WonderEditor.OperateThreeLayer[/* getFirstLayserSecondFolderDomIndex */1](assetTreeDomRecord);
                                              var secondLayerFirstFolderDomIndexForAssetTree = MainEditorAssetNodeTool$WonderEditor.OperateThreeLayer[/* getSecondLayserFirstFolderDomIndexForAssetTree */2](assetTreeDomRecord);
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      return AssetTreeDragEventTool$WonderEditor.triggerSecondLayerDragStartEvent(firstLayerSecondFolderDomIndex, secondLayerFirstFolderDomIndexForAssetTree, param);
                                                    }));
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeDragEventTool$WonderEditor.triggerRootDragEnterEvent);
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeDragEventTool$WonderEditor.triggerRootDropEvent);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test drag assetChildrenNode to assetTreeNode", (function () {
                Wonder_jest.test("test no drag", (function () {
                        MainEditorAssetTool$WonderEditor.buildThreeLayerAssetTreeRoot(/* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                      }));
                Wonder_jest.test("test drag folder into it's parent's brother folder", (function () {
                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildThreeLayerAssetTreeRoot(/* () */0);
                        var firstLayerFirstFolderDomIndex = MainEditorAssetNodeTool$WonderEditor.OperateThreeLayer[/* getFirstLayserFirstFolderDomIndex */0](assetTreeDomRecord);
                        var firstLayerSecondFolderDomIndex = MainEditorAssetNodeTool$WonderEditor.OperateThreeLayer[/* getFirstLayserSecondFolderDomIndex */1](assetTreeDomRecord);
                        var secondLayerFirstFolderDomIndexForAssetChildren = MainEditorAssetNodeTool$WonderEditor.OperateThreeLayer[/* getSecondLayserFirstFolderDomIndexForAssetChildren */3](assetTreeDomRecord);
                        MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0), firstLayerSecondFolderDomIndex);
                        MainEditorAssetTreeTool$WonderEditor.triggerAssetChildrenDragIntoAssetTree(secondLayerFirstFolderDomIndexForAssetChildren, firstLayerFirstFolderDomIndex);
                        BaseEventTool$WonderEditor.triggerComponentEvent(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0), (function (param) {
                                return AssetTreeEventTool$WonderEditor.clickAssetTreeNode(firstLayerFirstFolderDomIndex, param);
                              }));
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                      }));
                Wonder_jest.test("test drag texture file into it's parent's brother folder", (function () {
                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildThreeLayerAssetTreeRoot(/* () */0);
                        var firstLayerFirstFolderDomIndex = MainEditorAssetNodeTool$WonderEditor.OperateThreeLayer[/* getFirstLayserFirstFolderDomIndex */0](assetTreeDomRecord);
                        var firstLayerSecondFolderDomIndex = MainEditorAssetNodeTool$WonderEditor.OperateThreeLayer[/* getFirstLayserSecondFolderDomIndex */1](assetTreeDomRecord);
                        var secondLayserSecondTextureDomIndex = MainEditorAssetNodeTool$WonderEditor.OperateThreeLayer[/* getSecondLayserSecondTextureDomIndex */5](assetTreeDomRecord);
                        MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0), firstLayerSecondFolderDomIndex);
                        MainEditorAssetTreeTool$WonderEditor.triggerAssetChildrenDragIntoAssetTree(secondLayserSecondTextureDomIndex, firstLayerFirstFolderDomIndex);
                        BaseEventTool$WonderEditor.triggerComponentEvent(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0), (function (param) {
                                return AssetTreeEventTool$WonderEditor.clickAssetTreeNode(firstLayerFirstFolderDomIndex, param);
                              }));
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                      }));
                return Wonder_jest.test("test drag texture file into it's brother folder", (function () {
                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildThreeLayerAssetTreeRoot(/* () */0);
                              var firstLayerSecondFolderDomIndex = MainEditorAssetNodeTool$WonderEditor.OperateThreeLayer[/* getFirstLayserSecondFolderDomIndex */1](assetTreeDomRecord);
                              var secondLayerFirstFolderDomIndexForAssetChildren = MainEditorAssetNodeTool$WonderEditor.OperateThreeLayer[/* getSecondLayserFirstFolderDomIndexForAssetChildren */3](assetTreeDomRecord);
                              var secondLayserSecondTextureDomIndex = MainEditorAssetNodeTool$WonderEditor.OperateThreeLayer[/* getSecondLayserSecondTextureDomIndex */5](assetTreeDomRecord);
                              MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0), firstLayerSecondFolderDomIndex);
                              MainEditorAssetTreeTool$WonderEditor.triggerAssetChildrenDragIntoChildrenFolder(secondLayserSecondTextureDomIndex, secondLayerFirstFolderDomIndexForAssetChildren);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                            }));
              }));
        describe("deal with the specific case", (function () {
                Wonder_jest.test("if drag treeNode into itself, keep not change", (function () {
                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                        var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                        var firstFolderDomIndex = MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */5](assetTreeDomRecord);
                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                return AssetTreeDragEventTool$WonderEditor.triggerFirstLayerDragStartEvent(firstFolderDomIndex, param);
                              }));
                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                return AssetTreeDragEventTool$WonderEditor.triggerFirstLayerDragEnterEvent(firstFolderDomIndex, param);
                              }));
                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                return AssetTreeDragEventTool$WonderEditor.triggerFirstLayerDropEvent(firstFolderDomIndex, param);
                              }));
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                      }));
                return Wonder_jest.test("if drag treeNode into it's chidlren, keep not change", (function () {
                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildThreeLayerAssetTreeRoot(/* () */0);
                              var firstLayerSecondFolderDomIndex = MainEditorAssetNodeTool$WonderEditor.OperateThreeLayer[/* getFirstLayserSecondFolderDomIndex */1](assetTreeDomRecord);
                              var secondLayerFirstFolderDomIndex = MainEditorAssetNodeTool$WonderEditor.OperateThreeLayer[/* getSecondLayserFirstFolderDomIndexForAssetTree */2](assetTreeDomRecord);
                              var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                      return AssetTreeDragEventTool$WonderEditor.triggerFirstLayerDragStartEvent(firstLayerSecondFolderDomIndex, param);
                                    }));
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                      return AssetTreeDragEventTool$WonderEditor.triggerSecondLayerDragEnterEvent(firstLayerSecondFolderDomIndex, secondLayerFirstFolderDomIndex, param);
                                    }));
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                      return AssetTreeDragEventTool$WonderEditor.triggerSecondLayerDropEvent(firstLayerSecondFolderDomIndex, secondLayerFirstFolderDomIndex, param);
                                    }));
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
