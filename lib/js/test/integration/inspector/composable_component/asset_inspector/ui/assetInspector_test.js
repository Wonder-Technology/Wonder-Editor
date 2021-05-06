'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../tool/TestTool.js");
var ReactTool$WonderEditor = require("../../../../../tool/ui/ReactTool.js");
var InspectorTool$WonderEditor = require("../../../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../../../tool/ReactTestTool.js");
var EventListenerTool$WonderEditor = require("../../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../tool/AssetInspectorTool.js");
var AssetWidgetService$WonderEditor = require("../../../../../../src/service/record/editor/widget/AssetWidgetService.js");
var BuildComponentTool$WonderEditor = require("../../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../../src/service/state/editor/StateEditorService.js");
var MainEditorAssetTool$WonderEditor = require("../../../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorAssetFolderNodeTool$WonderEditor = require("../../../../asset/tool/MainEditorAssetFolderNodeTool.js");
var MainEditorAssetTextureNodeTool$WonderEditor = require("../../../../asset/tool/MainEditorAssetTextureNodeTool.js");
var CurrentNodeIdAssetEditorService$WonderEditor = require("../../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../../../asset/tool/MainEditorAssetChildrenNodeTool.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor = require("../../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js");

Wonder_jest.describe("assetTree inspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("prepare currentSelectSource", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                              var partial_arg = AssetWidgetService$WonderEditor.getWidget(/* () */0);
                              return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                            return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                          }));
                            }));
                      afterEach((function () {
                              StateEditorService$WonderEditor.setState(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0))));
                              return /* () */0;
                            }));
                      Wonder_jest.describe("test component snapshot", (function (param) {
                              Wonder_jest.test("if hasn't current node, show nothing", (function (param) {
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                    }));
                              return Wonder_jest.describe("else", (function (param) {
                                            Wonder_jest.test("test set folder to be current node", (function (param) {
                                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                                    MainEditorAssetChildrenNodeTool$WonderEditor.selectFolderNode(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), undefined, undefined, /* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                  }));
                                            return Wonder_jest.test("test set texture to be current node", (function (param) {
                                                          var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                          MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), undefined, undefined, /* () */0);
                                                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test rename folder node", (function (param) {
                              Wonder_jest.test("test rename to specific name", (function (param) {
                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                      var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                      AssetInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */8](undefined, undefined, nodeId, "mickeyFolder", /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](nodeId, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                    }));
                              Wonder_jest.describe("test the root folder can't be rename", (function (param) {
                                      return Wonder_jest.test("the root treeNode->rename-input->disabled should be true", (function (param) {
                                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                                    var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getRootNodeId */2], assetTreeData);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssetInspectorTool$WonderEditor.Rename[/* isFolderNameDisabled */13](nodeId)), true);
                                                  }));
                                    }));
                              Wonder_jest.describe("test rename asset tree children node", (function (param) {
                                      return Wonder_jest.describe("if node has ext name", (function (param) {
                                                    Wonder_jest.test("rename input should show it", (function (param) {
                                                            var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                                            var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                                            StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                                    return MainEditorAssetFolderNodeTool$WonderEditor.setFolderName(nodeId, "folder1.aaa", param);
                                                                  }));
                                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](nodeId, undefined, /* () */0);
                                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                          }));
                                                    return Wonder_jest.test("if rename success, the newName should include ext name", (function (param) {
                                                                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                                                  var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                                                  AssetInspectorTool$WonderEditor.Rename[/* renameAssetFolderNode */8](undefined, undefined, nodeId, "folder.aaa", /* () */0);
                                                                  MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](nodeId, undefined, /* () */0);
                                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("deal with specific case", (function (param) {
                                            return Wonder_jest.test("key in '', trigger onBlur, the input value should be original name", (function (param) {
                                                          var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                                          var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                                          var reasonStateUpdate = ReactTool$WonderEditor.getUpdateState(AssetInspectorTool$WonderEditor.reducer(undefined, undefined, nodeId, /* Blur */0, /* record */[
                                                                    /* inputValue */"",
                                                                    /* originalName */"bbb"
                                                                  ], /* () */0));
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](reasonStateUpdate[/* inputValue */0]), "bbb");
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test rename texture node", (function (param) {
                                    return Wonder_jest.describe("test rename asset tree children node", (function (param) {
                                                  return Wonder_jest.describe("if node has ext name", (function (param) {
                                                                return Wonder_jest.test("rename input shouldn't show it", (function (param) {
                                                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                                              var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                                                                              StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                                                      return MainEditorAssetTextureNodeTool$WonderEditor.setTextureImageName(nodeId, "texture1.png", param);
                                                                                    }));
                                                                              MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(nodeId, undefined, undefined, /* () */0);
                                                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
