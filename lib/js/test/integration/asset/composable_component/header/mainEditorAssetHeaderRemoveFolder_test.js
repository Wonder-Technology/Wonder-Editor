'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var EventListenerTool$WonderEditor = require("../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var InspectorCanvasTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/tool/InspectorCanvasTool.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../tool/MainEditorAssetIdTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var MaterialNodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/MaterialNodeAssetService.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../tool/MainEditorAssetUploadTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var BasicSourceTextureToolEngine$WonderEditor = require("../../../../tool/engine/BasicSourceTextureToolEngine.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var MainEditorAssetTextureNodeTool$WonderEditor = require("../../tool/MainEditorAssetTextureNodeTool.js");
var CurrentNodeIdAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../tool/MainEditorAssetHeaderOperateNodeTool.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");
var SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js");

Wonder_jest.describe("MainEditorAssetHeader->remove folder", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                InspectorCanvasTool$WonderEditor.prepareInspectorEngineState(sandbox);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                StateEditorService$WonderEditor.setState(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0))));
                return /* () */0;
              }));
        Wonder_jest.test("click remove-button should remove folder from assetTreeRoot", (function (param) {
                var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeFolderNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), /* () */0);
                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
              }));
        return Wonder_jest.describe("should remove folder's all children", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, false, undefined, undefined, /* () */0);
                              return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                            }));
                      Wonder_jest.test("test remove material asset child", (function (param) {
                              var addedFolderNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                              MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId, undefined, /* () */0);
                              var materialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                              var match = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(materialNodeId, StateEditorService$WonderEditor.getState(/* () */0)));
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeFolderNode(undefined, undefined, addedFolderNodeId, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.getData(match[/* snapshotImageDataIndex */2], StateEditorService$WonderEditor.getState(/* () */0)))), true);
                            }));
                      return Wonder_jest.describe("test remove texture asset child", (function (param) {
                                    beforeEach((function () {
                                            Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                            return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                          }));
                                    return Wonder_jest.testPromise("test remove it in child folder", undefined, (function (param) {
                                                  var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                  MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                                                  var addedFolderNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                  MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId2, undefined, /* () */0);
                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId1) {
                                                                var textureComponent = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                        return MainEditorAssetTextureNodeTool$WonderEditor.getTextureComponent(uploadedTextureNodeId1, param);
                                                                      }));
                                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeFolderNode(undefined, undefined, addedFolderNodeId1, /* () */0);
                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                          return BasicSourceTextureToolEngine$WonderEditor.isAlive(textureComponent, param);
                                                                                        }))), false));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
