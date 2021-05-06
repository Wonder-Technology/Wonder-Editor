'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var InspectorTool$WonderEditor = require("../../../../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var SerializeService$WonderEditor = require("../../../../../../../src/service/atom/SerializeService.js");
var EventListenerTool$WonderEditor = require("../../../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetIdTool.js");
var ExecIMGUIEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/imgui/ExecIMGUIEngineService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTreeTool.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var IMGUIExecFuncDataInspectorTool$WonderEditor = require("./tool/IMGUIExecFuncDataInspectorTool.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetChildrenNodeTool.js");
var IMGUIExecFuncDataNodeAssetService$WonderEditor = require("../../../../../../../src/service/record/editor/asset/IMGUIExecFuncDataNodeAssetService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var IMGUIExecFuncDataNodeAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/IMGUIExecFuncDataNodeAssetEditorService.js");

Wonder_jest.describe("imgui exec func data inspector", (function (param) {
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
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addIMGUIExecFuncData(undefined, undefined, /* () */0);
                        MainEditorAssetChildrenNodeTool$WonderEditor.selectIMGUIExecFuncDataNode(addedNodeId, undefined, undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                      }));
                return Wonder_jest.test("test show specific value", (function (param) {
                              var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addIMGUIExecFuncData(undefined, undefined, /* () */0);
                              StateEditorService$WonderEditor.setState(IMGUIExecFuncDataInspectorTool$WonderEditor.setNodeData(addedNodeId, "aaa", IMGUIExecFuncDataInspectorTool$WonderEditor.buildExecFunc1(/* () */0), 1, undefined, /* () */0));
                              MainEditorAssetChildrenNodeTool$WonderEditor.selectIMGUIExecFuncDataNode(addedNodeId, undefined, undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                            }));
              }));
        Wonder_jest.describe("test rename", (function (param) {
                return Wonder_jest.describe("new name should be unique in imgui exec func data assets", (function (param) {
                              return Wonder_jest.test("if has imgui exec func data asset with the same new name in different folders, rename should fail", (function (param) {
                                            var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                            var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                            var addedNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addIMGUIExecFuncData(undefined, undefined, /* () */0);
                                            var addedNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addIMGUIExecFuncData(undefined, undefined, /* () */0);
                                            var node2OldName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                    return IMGUIExecFuncDataNodeAssetEditorService$WonderEditor.getNodeName(addedNodeId2, param);
                                                  }));
                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetIMGUIExecFuncDataNode */9](undefined, undefined, addedNodeId2, IMGUIExecFuncDataNodeAssetService$WonderEditor.getNodeName(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                            return OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedNodeId1, param);
                                                          }))), /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            Sinon.getCallCount(warn),
                                                            IMGUIExecFuncDataNodeAssetService$WonderEditor.getNodeName(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                        return OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedNodeId2, param);
                                                                      })))
                                                          ]), /* tuple */[
                                                        1,
                                                        node2OldName
                                                      ]);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test submit all", (function (param) {
                      var _prepare = function (param) {
                        var addedNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addIMGUIExecFuncData(undefined, undefined, /* () */0);
                        var addedNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](MainEditorAssetTreeTool$WonderEditor.getRootNodeId(StateEditorService$WonderEditor.getState(/* () */0)), undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addIMGUIExecFuncData(undefined, undefined, /* () */0);
                        return /* tuple */[
                                addedNodeId1,
                                addedNodeId2
                              ];
                      };
                      var _prepareAndRename = function (param) {
                        var match = _prepare(/* () */0);
                        var addedNodeId2 = match[1];
                        var node2OldName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                return IMGUIExecFuncDataNodeAssetEditorService$WonderEditor.getNodeName(addedNodeId2, param);
                              }));
                        var node2NewName = "new name for node2";
                        AssetInspectorTool$WonderEditor.Rename[/* renameAssetIMGUIExecFuncDataNode */9](undefined, undefined, addedNodeId2, node2NewName, /* () */0);
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
                        var execFunc = IMGUIExecFuncDataInspectorTool$WonderEditor.buildExecFunc1(/* () */0);
                        IMGUIExecFuncDataInspectorTool$WonderEditor.submitAll(addedNodeId2, execFunc, 1, node2OldName, undefined, /* () */0);
                        return /* tuple */[
                                1,
                                execFunc
                              ];
                      };
                      Wonder_jest.test("update asset tree", (function (param) {
                              var match = _prepareAndRename(/* () */0);
                              var match$1 = match[1];
                              var addedNodeId2 = match[0][1];
                              var match$2 = _submitAll(addedNodeId2, match$1[0]);
                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              IMGUIExecFuncDataNodeAssetEditorService$WonderEditor.getNodeName(addedNodeId2, editorState),
                                              IMGUIExecFuncDataNodeAssetEditorService$WonderEditor.getExecOrder(addedNodeId2, editorState),
                                              SerializeService$WonderEditor.serializeFunction(IMGUIExecFuncDataNodeAssetEditorService$WonderEditor.getExecFunc(addedNodeId2, editorState))
                                            ]), /* tuple */[
                                          match$1[1],
                                          match$2[0],
                                          SerializeService$WonderEditor.serializeFunction(match$2[1])
                                        ]);
                            }));
                      return Wonder_jest.describe("update exec func data in engineState", (function (param) {
                                    Wonder_jest.test("if the exec func data isn't added to engineState, not update it", (function (param) {
                                            var match = _prepareAndRename(/* () */0);
                                            var match$1 = match[1];
                                            var node2NewName = match$1[1];
                                            var node2OldName = match$1[0];
                                            _submitAll(match[0][1], node2OldName);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return ExecIMGUIEngineService$WonderEditor.hasExecFuncData(node2OldName, param);
                                                                  })),
                                                            StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return ExecIMGUIEngineService$WonderEditor.hasExecFuncData(node2NewName, param);
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
                                                                IMGUIExecFuncDataInspectorTool$WonderEditor.addExecFuncData(addedNodeId2);
                                                                var node2OldName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                        return IMGUIExecFuncDataNodeAssetEditorService$WonderEditor.getNodeName(addedNodeId2, param);
                                                                      }));
                                                                var node2NewName = "new name for node2";
                                                                AssetInspectorTool$WonderEditor.Rename[/* renameAssetIMGUIExecFuncDataNode */9](undefined, undefined, addedNodeId2, node2NewName, /* () */0);
                                                                var match$1 = _submitAll(addedNodeId2, node2OldName);
                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                ExecIMGUIEngineService$WonderEditor.hasExecFuncData(node2NewName, engineState),
                                                                                ExecIMGUIEngineService$WonderEditor.unsafeGetExecOrder(node2NewName, engineState),
                                                                                ExecIMGUIEngineService$WonderEditor.unsafeGetCustomData(node2NewName, engineState),
                                                                                SerializeService$WonderEditor.serializeFunction(ExecIMGUIEngineService$WonderEditor.unsafeGetExecFunc(node2NewName, engineState))
                                                                              ]), /* tuple */[
                                                                            true,
                                                                            match$1[0],
                                                                            IMGUIExecFuncDataNodeAssetService$WonderEditor.buildEmptyCustomData(/* () */0),
                                                                            SerializeService$WonderEditor.serializeFunction(match$1[1])
                                                                          ]);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
