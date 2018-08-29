

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ArrayService$WonderEditor from "../../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as AssetTreeEventTool$WonderEditor from "../../tool/AssetTreeEventTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../tool/MainEditorAssetNodeTool.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";
import * as AssetRemovedAssetIdArrayEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetRemovedAssetIdArrayEditorService.js";

describe("MainEditorAssetHeader", (function () {
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
        describe("test operate treeNode", (function () {
                describe("test add folder", (function () {
                        var _triggerAddFolderClick = function ($staropt$star, _) {
                          if ($staropt$star !== undefined) {
                            Js_primitive.valFromOption($staropt$star);
                          } else {
                            BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                          }
                          return BaseEventTool$WonderEditor.triggerComponentEvent(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0), AssetTreeEventTool$WonderEditor.triggerAddFolderClick);
                        };
                        describe("if not select specific treeNode, add folder into root treeNode", (function () {
                                Wonder_jest.test("test snapshot", (function () {
                                        MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                        _triggerAddFolderClick(undefined, /* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                      }));
                                describe("test logic", (function () {
                                        Wonder_jest.test("test asset children length before add folder", (function () {
                                                MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(StateEditorService$WonderEditor.getState(/* () */0))[/* children */1].length), 5);
                                              }));
                                        return Wonder_jest.test("test asset children length after add folder", (function () {
                                                      MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      _triggerAddFolderClick(undefined, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(StateEditorService$WonderEditor.getState(/* () */0))[/* children */1].length), 6);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        Wonder_jest.test("else, add folder into specific treeNode", (function () {
                                var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */4](assetTreeDomRecord));
                                _triggerAddFolderClick(Js_primitive.some(component), /* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                              }));
                        return Wonder_jest.test("add material into specific treeNode", (function () {
                                      var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.triggerAddMaterialClick);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                    }));
                      }));
                describe("test remove tree node", (function () {
                        Wonder_jest.test("if not select specific treeNode, remove-button's disabled props should == true ", (function () {
                                MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                              }));
                        describe("else", (function () {
                                Wonder_jest.test("remove-button's disabled props should == false", (function () {
                                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                        var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                        MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */4](assetTreeDomRecord));
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                                      }));
                                describe("test select folder", (function () {
                                        return Wonder_jest.test("click remove-button should remove folder from assetTreeRoot", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                                      MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */4](assetTreeDomRecord));
                                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.triggerRemoveNodeClick);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                    }));
                                      }));
                                describe("test select file", (function () {
                                        Wonder_jest.test("select texture;\n                click remove-button;\n                should remove it from assetTreeRoot", (function () {
                                                var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */7](assetTreeDomRecord));
                                                var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                                BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.triggerRemoveNodeClick);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                              }));
                                        return Wonder_jest.test("select json is currentNode;\n                click remove-button;\n                should remove it from assetTreeRoot", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstJsonDomIndex */9](assetTreeDomRecord));
                                                      var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.triggerRemoveNodeClick);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test removed asset node, the id should recovery into removedAssetIdArray", (function () {
                                describe("test remove first folder", (function () {
                                        Wonder_jest.test("test the folderId should add into removedAssetIdArray", (function () {
                                                var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                                var removedfirstFolderNodeId = MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderNodeId */11](assetTreeDomRecord);
                                                MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */4](assetTreeDomRecord));
                                                BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.triggerRemoveNodeClick);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetRemovedAssetIdArrayEditorService$WonderEditor.getRemovedAssetIdArray(StateEditorService$WonderEditor.getState(/* () */0))), /* array */[removedfirstFolderNodeId]);
                                              }));
                                        return Wonder_jest.test("test add a new folder, use the id which was added into removedAssetIdArray before", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                                      var removedfirstFolderNodeId = MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderNodeId */11](assetTreeDomRecord);
                                                      MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */4](assetTreeDomRecord));
                                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.triggerRemoveNodeClick);
                                                      BaseEventTool$WonderEditor.triggerComponentEvent(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0), AssetTreeEventTool$WonderEditor.triggerAddFolderClick);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$WonderEditor.getLast(AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(StateEditorService$WonderEditor.getState(/* () */0))[/* children */1])[/* id */0]), removedfirstFolderNodeId);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
