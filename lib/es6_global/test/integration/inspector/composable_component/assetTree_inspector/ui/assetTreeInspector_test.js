

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as ReactTool$WonderEditor from "../../../../../tool/ui/ReactTool.js";
import * as InspectorTool$WonderEditor from "../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../tool/AssetTreeInspectorTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../../../asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorAssetFolderNodeTool$WonderEditor from "../../../../asset/tool/MainEditorAssetFolderNodeTool.js";
import * as MainEditorAssetTextureNodeTool$WonderEditor from "../../../../asset/tool/MainEditorAssetTextureNodeTool.js";
import * as MainEditorAssetChildrenNodeTool$WonderEditor from "../../../../asset/tool/MainEditorAssetChildrenNodeTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "../../../../../../src/service/state/editor/asset/CurrentNodeDataAssetEditorService.js";
import * as CurrentNodeParentIdAssetEditorService$WonderEditor from "../../../../../../src/service/state/editor/asset/CurrentNodeParentIdAssetEditorService.js";

describe("assetTree inspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("prepare currentSelectSource", (function (param) {
                beforeEach((function (param) {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* Asset */1, param);
                                    }));
                      }));
                afterEach((function (param) {
                        StateEditorService$WonderEditor.setState(CurrentNodeParentIdAssetEditorService$WonderEditor.clearCurrentNodeParentId(CurrentNodeDataAssetEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
                        return /* () */0;
                      }));
                describe("test component snapshot", (function (param) {
                        Wonder_jest.test("if hasn't current node, show nothing", (function (param) {
                                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                              }));
                        describe("else", (function (param) {
                                Wonder_jest.test("test set folder to be current node", (function (param) {
                                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                        MainEditorAssetChildrenNodeTool$WonderEditor.selectFolderNode(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), undefined, undefined, /* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                      }));
                                return Wonder_jest.test("test set texture to be current node", (function (param) {
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                              MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData), undefined, undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test rename folder node", (function (param) {
                        Wonder_jest.test("test rename to specific name", (function (param) {
                                var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */3](undefined, undefined, nodeId, "mickeyFolder", /* () */0);
                                MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](nodeId, undefined, /* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                              }));
                        describe("test the root folder can't be rename", (function (param) {
                                return Wonder_jest.test("the root treeNode->rename-input->disabled should be true", (function (param) {
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                              var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* getRootNodeId */2], assetTreeData);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTreeInspectorTool$WonderEditor.Rename[/* isFolderNameDisabled */4](nodeId)), true);
                                            }));
                              }));
                        describe("test rename asset tree children node", (function (param) {
                                describe("if node has ext name", (function (param) {
                                        Wonder_jest.test("rename input should show it", (function (param) {
                                                var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                                var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                                StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                        return MainEditorAssetFolderNodeTool$WonderEditor.setFolderName(nodeId, "folder1.aaa", param);
                                                      }));
                                                MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](nodeId, undefined, /* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                              }));
                                        return Wonder_jest.test("if rename success, the newName should include ext name", (function (param) {
                                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                                      var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                                      AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */3](undefined, undefined, nodeId, "folder.aaa", /* () */0);
                                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](nodeId, undefined, /* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("deal with specific case", (function (param) {
                                return Wonder_jest.test("key in '', trigger onBlur, the input value should be original name", (function (param) {
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                              var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                              var reasonStateUpdate = ReactTool$WonderEditor.getUpdateState(AssetTreeInspectorTool$WonderEditor.reducer(undefined, undefined, nodeId, /* Folder */0, /* Blur */0, /* record */[
                                                        /* inputValue */"",
                                                        /* originalName */"bbb"
                                                      ], /* () */0));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](reasonStateUpdate[/* inputValue */0]), "bbb");
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test rename texture node", (function (param) {
                        describe("test rename asset tree children node", (function (param) {
                                describe("if node has ext name", (function (param) {
                                        return Wonder_jest.test("rename input shouldn't show it", (function (param) {
                                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                                      var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData);
                                                      StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                              return MainEditorAssetTextureNodeTool$WonderEditor.setTextureName(nodeId, "texture1.png", param);
                                                            }));
                                                      MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(nodeId, undefined, undefined, /* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
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
