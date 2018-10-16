

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as ConsoleTool$WonderEditor from "../../../../../unit/tool/external/ConsoleTool.js";
import * as BaseEventTool$WonderEditor from "../../../../../tool/ui/BaseEventTool.js";
import * as InspectorTool$WonderEditor from "../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeEventTool$WonderEditor from "../../../../asset/tool/AssetTreeEventTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../tool/AssetTreeInspectorTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../../../asset/tool/MainEditorAssetNodeTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../../src/service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../../src/service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

describe("AssetTreeInspector", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("prepare currentSelectSource", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* Asset */1, param);
                                    }));
                      }));
                afterEach((function () {
                        StateEditorService$WonderEditor.setState(AssetCurrentNodeParentIdEditorService$WonderEditor.clearCurrentNodeParentId(AssetCurrentNodeDataEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
                        return /* () */0;
                      }));
                describe("test component snapshot", (function () {
                        Wonder_jest.test("if hasn't current node, show nothing", (function () {
                                MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                              }));
                        describe("else", (function () {
                                Wonder_jest.test("test set folder to be current node", (function () {
                                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                        var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                        MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */5](assetTreeDomRecord));
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                      }));
                                Wonder_jest.test("test set texture to be current node", (function () {
                                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                        MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */8](assetTreeDomRecord));
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                      }));
                                return Wonder_jest.test("test set json to be current node", (function () {
                                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                              MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstJsonDomIndex */10](assetTreeDomRecord));
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test node rename", (function () {
                        var _triggerInspectorRenameEvent = function (inspectorComponent, newName) {
                          BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                                  return AssetTreeInspectorTool$WonderEditor.triggerRenameChangeEvent(newName, param);
                                }));
                          return BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                                        return AssetTreeInspectorTool$WonderEditor.triggerRenameBlurEvent(newName, param);
                                      }));
                        };
                        beforeEach((function () {
                                return Curry._1(ConsoleTool$WonderEditor.markTestConsole, /* () */0);
                              }));
                        afterEach((function () {
                                return Curry._1(ConsoleTool$WonderEditor.markNotTestConsole, /* () */0);
                              }));
                        Wonder_jest.test("test rename to specific name", (function () {
                                var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */5](assetTreeDomRecord));
                                var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
                                _triggerInspectorRenameEvent(inspectorComponent, "mickeyFolder");
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(inspectorComponent);
                              }));
                        Wonder_jest.test("test rename to the same with sibling node, should not be renamed", (function () {
                                var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */5](assetTreeDomRecord));
                                var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
                                _triggerInspectorRenameEvent(inspectorComponent, "New Folder 1");
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ConsoleTool$WonderEditor.getMessage(warn).includes("the folder is can't has same name !")), true);
                              }));
                        describe("test the root folder can't be rename", (function () {
                                return Wonder_jest.test("the root treeNode->rename-input->disabled should be true", (function () {
                                              MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                              BaseEventTool$WonderEditor.triggerComponentEvent(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0), AssetTreeEventTool$WonderEditor.clickRootAssetTreeNode);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        describe("test rename asset tree children node", (function () {
                                describe("if node has ext name", (function () {
                                        Wonder_jest.test("rename input shouldn't show it", (function () {
                                                var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstJsonDomIndex */10](assetTreeDomRecord));
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                              }));
                                        return Wonder_jest.test("if rename success, the newName should include ext name", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstJsonDomIndex */10](assetTreeDomRecord));
                                                      _triggerInspectorRenameEvent(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)), "mickey_json");
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("deal with specific case", (function () {
                                return Wonder_jest.test("key in '', trigger onBlur, the input value should be original name", (function () {
                                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                              var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                              MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */5](assetTreeDomRecord));
                                              var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
                                              _triggerInspectorRenameEvent(inspectorComponent, "");
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(inspectorComponent);
                                            }));
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
