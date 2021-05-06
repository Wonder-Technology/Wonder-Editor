'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var InspectorTool$WonderEditor = require("../../../../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var EventListenerTool$WonderEditor = require("../../../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var TextureInspectorTool$WonderEditor = require("../texture_inspector/tool/textureInspectorTool.js");
var ExtendIMGUIToolEngine$WonderEditor = require("../../../../../../tool/engine/ExtendIMGUIToolEngine.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetIdTool.js");
var IMGUISkinInspectorTool$WonderEditor = require("./tool/IMGUISkinInspectorTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTreeTool.js");
var ExtendIMGUIEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/imgui/ExtendIMGUIEngineService.js");
var IMGUISkinNodeAssetService$WonderEditor = require("../../../../../../../src/service/record/editor/asset/IMGUISkinNodeAssetService.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetUploadTool.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var IMGUISkinNodeAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/IMGUISkinNodeAssetEditorService.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetChildrenNodeTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/textureNode/IMGUICustomImageTypeTextureNodeAssetEditorService.js");

Wonder_jest.describe("imgui skin inspector", (function (param) {
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
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addIMGUISkin(undefined, undefined, /* () */0);
                        MainEditorAssetChildrenNodeTool$WonderEditor.selectIMGUISkinNode(addedNodeId, undefined, undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                      }));
                return Wonder_jest.testPromise("test show specific value", undefined, (function (param) {
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                              var addedSkinNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addIMGUISkin(undefined, undefined, /* () */0);
                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                            TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                            var customImageId = "i1";
                                            TextureInspectorTool$WonderEditor.IMGUICustomImageType[/* setCustomImageId */0](uploadedTextureNodeId, StateLogicService$WonderEditor.getEditorState((function (param) {
                                                        return IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor.unsafeGetTextureContentIndex(uploadedTextureNodeId, param);
                                                      })), customImageId, undefined, undefined, undefined, undefined, /* () */0);
                                            StateEditorService$WonderEditor.setState(IMGUISkinInspectorTool$WonderEditor.setNodeData(addedSkinNodeId, "aaa", IMGUISkinInspectorTool$WonderEditor.createButtonSkinData(/* array */[
                                                          1,
                                                          0,
                                                          0
                                                        ], /* array */[
                                                          0,
                                                          1,
                                                          0
                                                        ], /* array */[
                                                          0,
                                                          0,
                                                          1
                                                        ], Caml_option.some(customImageId), undefined, undefined, /* Right */2, /* array */[
                                                          1,
                                                          0,
                                                          0
                                                        ], /* () */0), Caml_option.some(IMGUISkinInspectorTool$WonderEditor.createAllCustomStyleData1(/* () */0)), undefined, /* () */0));
                                            MainEditorAssetChildrenNodeTool$WonderEditor.selectIMGUISkinNode(addedSkinNodeId, undefined, undefined, /* () */0);
                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test rename", (function (param) {
                return Wonder_jest.describe("new name should be unique in imgui skin assets", (function (param) {
                              return Wonder_jest.test("if has imgui skin asset with the same new name in different folders, rename should fail", (function (param) {
                                            var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                            var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                            var addedNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addIMGUISkin(undefined, undefined, /* () */0);
                                            var addedNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addIMGUISkin(undefined, undefined, /* () */0);
                                            var node2OldName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                    return IMGUISkinNodeAssetEditorService$WonderEditor.getNodeName(addedNodeId2, param);
                                                  }));
                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetIMGUISkinNode */11](undefined, undefined, addedNodeId2, IMGUISkinNodeAssetService$WonderEditor.getNodeName(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                            return OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedNodeId1, param);
                                                          }))), /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            Sinon.getCallCount(warn),
                                                            IMGUISkinNodeAssetService$WonderEditor.getNodeName(StateLogicService$WonderEditor.getEditorState((function (param) {
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
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addIMGUISkin(undefined, undefined, /* () */0);
                        var addedNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](MainEditorAssetTreeTool$WonderEditor.getRootNodeId(StateEditorService$WonderEditor.getState(/* () */0)), undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addIMGUISkin(undefined, undefined, /* () */0);
                        return /* tuple */[
                                addedNodeId1,
                                addedNodeId2
                              ];
                      };
                      var _prepareAndRename = function (param) {
                        var match = _prepare(/* () */0);
                        var addedNodeId2 = match[1];
                        var node2OldName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                return IMGUISkinNodeAssetEditorService$WonderEditor.getNodeName(addedNodeId2, param);
                              }));
                        var node2NewName = "new name for node2";
                        AssetInspectorTool$WonderEditor.Rename[/* renameAssetIMGUISkinNode */11](undefined, undefined, addedNodeId2, node2NewName, /* () */0);
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
                        var buttonSkinData = IMGUISkinInspectorTool$WonderEditor.createButtonSkinData(/* array */[
                              1,
                              0,
                              0
                            ], /* array */[
                              0,
                              1,
                              0
                            ], /* array */[
                              0,
                              0,
                              1
                            ], undefined, undefined, undefined, /* Right */2, /* array */[
                              1,
                              0,
                              0
                            ], /* () */0);
                        var allCustomStyleDataStr = IMGUISkinInspectorTool$WonderEditor.serializeAllCustomStyleData(IMGUISkinInspectorTool$WonderEditor.createAllCustomStyleData1(/* () */0));
                        IMGUISkinInspectorTool$WonderEditor.submitAll(addedNodeId2, buttonSkinData, allCustomStyleDataStr, node2OldName, undefined, /* () */0);
                        return /* tuple */[
                                buttonSkinData,
                                allCustomStyleDataStr
                              ];
                      };
                      Wonder_jest.test("update asset tree", (function (param) {
                              var match = _prepareAndRename(/* () */0);
                              var match$1 = match[1];
                              var addedNodeId2 = match[0][1];
                              var match$2 = _submitAll(addedNodeId2, match$1[0]);
                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              IMGUISkinNodeAssetEditorService$WonderEditor.getNodeName(addedNodeId2, editorState),
                                              IMGUISkinNodeAssetEditorService$WonderEditor.getButtonSkinData(addedNodeId2, editorState),
                                              IMGUISkinInspectorTool$WonderEditor.serializeAllCustomStyleData(IMGUISkinNodeAssetEditorService$WonderEditor.getAllCustomStyleData(addedNodeId2, editorState))
                                            ]), /* tuple */[
                                          match$1[1],
                                          match$2[0],
                                          match$2[1]
                                        ]);
                            }));
                      return Wonder_jest.describe("update skin in engineState", (function (param) {
                                    Wonder_jest.test("if the skin isn't added to engineState, not update it", (function (param) {
                                            var match = _prepareAndRename(/* () */0);
                                            var match$1 = match[1];
                                            var node2OldName = match$1[0];
                                            _submitAll(match[0][1], node2OldName);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            StateLogicService$WonderEditor.getEngineStateToGetData(Curry._1(ExtendIMGUIEngineService$WonderEditor.hasSkinData, node2OldName)),
                                                            StateLogicService$WonderEditor.getEngineStateToGetData(Curry._1(ExtendIMGUIEngineService$WonderEditor.hasSkinData, match$1[1]))
                                                          ]), /* tuple */[
                                                        false,
                                                        false
                                                      ]);
                                          }));
                                    return Wonder_jest.describe("else, update it", (function (param) {
                                                  return Wonder_jest.test("test", (function (param) {
                                                                var match = _prepare(/* () */0);
                                                                var addedNodeId2 = match[1];
                                                                IMGUISkinInspectorTool$WonderEditor.addSkin(addedNodeId2);
                                                                var node2OldName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                        return IMGUISkinNodeAssetEditorService$WonderEditor.getNodeName(addedNodeId2, param);
                                                                      }));
                                                                var node2NewName = "new name for node2";
                                                                AssetInspectorTool$WonderEditor.Rename[/* renameAssetIMGUISkinNode */11](undefined, undefined, addedNodeId2, node2NewName, /* () */0);
                                                                var match$1 = _submitAll(addedNodeId2, node2OldName);
                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                Curry._2(ExtendIMGUIEngineService$WonderEditor.hasSkinData, node2NewName, engineState),
                                                                                ExtendIMGUIToolEngine$WonderEditor.unsafeGetButtonSkinData(node2NewName, engineState),
                                                                                IMGUISkinInspectorTool$WonderEditor.serializeAllCustomStyleData(ExtendIMGUIToolEngine$WonderEditor.unsafeGetAllCustomStyleData(node2NewName, engineState))
                                                                              ]), /* tuple */[
                                                                            true,
                                                                            match$1[0],
                                                                            match$1[1]
                                                                          ]);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
