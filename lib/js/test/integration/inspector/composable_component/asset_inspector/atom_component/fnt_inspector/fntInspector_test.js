'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var InspectorTool$WonderEditor = require("../../../../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var FntInspectorTool$WonderEditor = require("./tool/FntInspectorTool.js");
var SerializeService$WonderEditor = require("../../../../../../../src/service/atom/SerializeService.js");
var EventListenerTool$WonderEditor = require("../../../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var FntNodeAssetService$WonderEditor = require("../../../../../../../src/service/record/editor/asset/FntNodeAssetService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetIdTool.js");
var AssetIMGUIEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/imgui/AssetIMGUIEngineService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTreeTool.js");
var FntNodeAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/FntNodeAssetEditorService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetChildrenNodeTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("fnt inspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test show value", (function (param) {
                Wonder_jest.test("test show default value", (function (param) {
                        var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFnt(undefined, undefined, /* () */0);
                        MainEditorAssetChildrenNodeTool$WonderEditor.selectFntNode(addedNodeId, undefined, undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                      }));
                return Wonder_jest.test("test show specific value", (function (param) {
                              var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFnt(undefined, undefined, /* () */0);
                              StateEditorService$WonderEditor.setState(FntInspectorTool$WonderEditor.setNodeData(addedNodeId, "aaa", FntInspectorTool$WonderEditor.buildFntContent1(/* () */0), undefined, /* () */0));
                              MainEditorAssetChildrenNodeTool$WonderEditor.selectFntNode(addedNodeId, undefined, undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                            }));
              }));
        Wonder_jest.describe("test rename", (function (param) {
                return Wonder_jest.describe("name should be unique in current folder", (function (param) {
                              return Wonder_jest.test("if has fnt asset with the same new name in different folders, rename should success", (function (param) {
                                            var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                            var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                            var addedNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFnt(undefined, undefined, /* () */0);
                                            var addedNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFnt(undefined, undefined, /* () */0);
                                            var node2NewName = "aaa";
                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetFntNode */12](undefined, undefined, addedNodeId1, node2NewName, /* () */0);
                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetFntNode */12](undefined, undefined, addedNodeId2, node2NewName, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            Sinon.getCallCount(warn),
                                                            FntNodeAssetService$WonderEditor.getNodeName(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                        return OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedNodeId2, param);
                                                                      })))
                                                          ]), /* tuple */[
                                                        0,
                                                        node2NewName
                                                      ]);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test submit all", (function (param) {
                      var _prepare = function (param) {
                        var addedNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFnt(undefined, undefined, /* () */0);
                        var addedNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](MainEditorAssetTreeTool$WonderEditor.getRootNodeId(StateEditorService$WonderEditor.getState(/* () */0)), undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFnt(undefined, undefined, /* () */0);
                        return /* tuple */[
                                addedNodeId1,
                                addedNodeId2
                              ];
                      };
                      var _prepareAndRename = function (param) {
                        var match = _prepare(/* () */0);
                        var addedNodeId2 = match[1];
                        var node2OldName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                return FntNodeAssetEditorService$WonderEditor.getNodeName(addedNodeId2, param);
                              }));
                        var node2NewName = "new name for node2";
                        AssetInspectorTool$WonderEditor.Rename[/* renameAssetFntNode */12](undefined, undefined, addedNodeId2, node2NewName, /* () */0);
                        return /* tuple */[
                                /* tuple */[
                                  match[0],
                                  addedNodeId2
                                ],
                                /* tuple */[
                                  node2OldName,
                                  node2NewName
                                ]
                              ];
                      };
                      var _submitAll = function (addedNodeId2, node2OldName) {
                        var fntContent = FntInspectorTool$WonderEditor.buildFntContent1(/* () */0);
                        FntInspectorTool$WonderEditor.submitAll(addedNodeId2, fntContent, node2OldName, undefined, /* () */0);
                        return fntContent;
                      };
                      Wonder_jest.test("update asset tree", (function (param) {
                              var match = _prepareAndRename(/* () */0);
                              var match$1 = match[1];
                              var addedNodeId2 = match[0][1];
                              var fntContent = _submitAll(addedNodeId2, match$1[0]);
                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              FntNodeAssetEditorService$WonderEditor.getNodeName(addedNodeId2, editorState),
                                              SerializeService$WonderEditor.serializeFunction(FntNodeAssetEditorService$WonderEditor.getFntContent(addedNodeId2, editorState))
                                            ]), /* tuple */[
                                          match$1[1],
                                          fntContent
                                        ]);
                            }));
                      return Wonder_jest.describe("update fnt data in engineState", (function (param) {
                                    Wonder_jest.test("if the fnt data isn't added to engineState, not update it", (function (param) {
                                            var match = _prepareAndRename(/* () */0);
                                            var match$1 = match[1];
                                            var node2NewName = match$1[1];
                                            var node2OldName = match$1[0];
                                            _submitAll(match[0][1], node2OldName);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return AssetIMGUIEngineService$WonderEditor.hasSettedAssetFntData(node2OldName, param);
                                                                  })),
                                                            StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return AssetIMGUIEngineService$WonderEditor.hasSettedAssetFntData(node2NewName, param);
                                                                  }))
                                                          ]), /* tuple */[
                                                        false,
                                                        false
                                                      ]);
                                          }));
                                    return Wonder_jest.describe("else, update it", (function (param) {
                                                  return Wonder_jest.test("test", (function (param) {
                                                                var match = _prepare(/* () */0);
                                                                var addedNodeId2 = match[1];
                                                                FntInspectorTool$WonderEditor.setSettedAssetFntData(addedNodeId2);
                                                                var node2OldName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                        return FntNodeAssetEditorService$WonderEditor.getNodeName(addedNodeId2, param);
                                                                      }));
                                                                var node2NewName = "new name for node2";
                                                                AssetInspectorTool$WonderEditor.Rename[/* renameAssetFntNode */12](undefined, undefined, addedNodeId2, node2NewName, /* () */0);
                                                                var fntContent = _submitAll(addedNodeId2, node2OldName);
                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                AssetIMGUIEngineService$WonderEditor.hasSettedAssetFntData(node2NewName, engineState),
                                                                                AssetIMGUIEngineService$WonderEditor.unsafeGetSettedAssetFntContent(engineState)
                                                                              ]), /* tuple */[
                                                                            true,
                                                                            fntContent
                                                                          ]);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
