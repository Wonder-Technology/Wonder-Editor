'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../../tool/LoadTool.js");
var TestTool$WonderEditor = require("../../../../tool/TestTool.js");
var OptionService$WonderEditor = require("../../../../../src/service/primitive/OptionService.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var LoadAssetUtils$WonderEditor = require("../../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/utils/LoadAssetUtils.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var WDBNodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/WDBNodeAssetService.js");
var FolderNodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/FolderNodeAssetService.js");
var MainEditorAssetNodeTool$WonderEditor = require("../../tool/MainEditorAssetNodeTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../tool/MainEditorAssetUploadTool.js");
var RootTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/RootTreeAssetEditorService.js");
var MainEditorAssetHeaderLoadTool$WonderEditor = require("./tool/MainEditorAssetHeaderLoadTool.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var CurrentNodeIdAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../tool/MainEditorAssetChildrenNodeTool.js");
var BasicSourceTextureImageDataMapTool$WonderEditor = require("../../tool/BasicSourceTextureImageDataMapTool.js");
var SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js");

Wonder_jest.describe("MainEditorAssetHeader->load file", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                return MainEditorAssetHeaderLoadTool$WonderEditor.prepareInspectorCanvas(sandbox);
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                StateEditorService$WonderEditor.setState(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0))));
                return /* () */0;
              }));
        return Wonder_jest.describe("test load file", (function (param) {
                      beforeEach((function () {
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                              return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                            }));
                      Wonder_jest.describe("test snapshot", (function (param) {
                              return Wonder_jest.describe("if not select specific treeNode", (function (param) {
                                            return Wonder_jest.testPromise("load file should add into root node children", undefined, (function (param) {
                                                          MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (param) {
                                                                        return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0)));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test logic", (function (param) {
                              Wonder_jest.describe("test should add into root node children", (function (param) {
                                      return Wonder_jest.testPromise("test children node length", undefined, (function (param) {
                                                    MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                    var originChildrenLen = FolderNodeAssetService$WonderEditor.getChildrenNodes(RootTreeAssetEditorService$WonderEditor.getRootNode(StateEditorService$WonderEditor.getState(/* () */0))).length;
                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (param) {
                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FolderNodeAssetService$WonderEditor.getChildrenNodes(RootTreeAssetEditorService$WonderEditor.getRootNode(StateEditorService$WonderEditor.getState(/* () */0))).length - originChildrenLen | 0), 1));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test should add into nodeMap", (function (param) {
                                            Wonder_jest.describe("test basicSourceTextureImageDataMap", (function (param) {
                                                    Wonder_jest.testPromise("add image base64 to basicSourceTextureImageDataMap", undefined, (function (param) {
                                                            MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                            var imgBase64 = "newImgBase64";
                                                            return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, imgBase64, /* () */0).then((function (uploadedTextureNodeId) {
                                                                          MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(uploadedTextureNodeId, undefined, undefined, /* () */0);
                                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                          var match = BasicSourceTextureImageDataMapTool$WonderEditor.getDataByTextureNode(MainEditorAssetNodeTool$WonderEditor.unsafeGetCurrentNode(editorState), editorState);
                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(match[/* base64 */0])), imgBase64));
                                                                        }));
                                                          }));
                                                    return Wonder_jest.testPromise("test show texture image, get it base64 from basicSourceTextureImageDataMap", undefined, (function (param) {
                                                                  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, "newImgBase64", /* () */0).then((function (uploadedTextureNodeId) {
                                                                                return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0)));
                                                                              }));
                                                                }));
                                                  }));
                                            Wonder_jest.describe("test textureNodeMap", (function (param) {
                                                    return Wonder_jest.testPromise("add created texture index to textureNodeMap", undefined, (function (param) {
                                                                  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                                MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(uploadedTextureNodeId, undefined, undefined, /* () */0);
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromCurrentNodeId(/* () */0)), 0));
                                                                              }));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("test wdbNodeMap", (function (param) {
                                                          beforeEach((function () {
                                                                  LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                                                                  LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                                                                  return LoadTool$WonderEditor.buildFakeLoadImage();
                                                                }));
                                                          return Wonder_jest.testPromise("add name, wdbGameObject to wdbNodeMap", undefined, (function (param) {
                                                                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                                        var fileName = "BoxTextured";
                                                                        var newGameObject = GameObjectTool$WonderEditor.getNewGameObject(undefined, /* () */0);
                                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, fileName, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                      var match = WDBNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(uploadedWDBNodeId, editorState));
                                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                          match[/* name */0],
                                                                                                          match[/* wdbGameObject */1]
                                                                                                        ]), /* tuple */[
                                                                                                      fileName,
                                                                                                      newGameObject
                                                                                                    ]));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("deal with specific case", (function (param) {
                                    return Wonder_jest.test("if upload error file type, should contract error", (function (param) {
                                                  TestTool$WonderEditor.openContractCheck(/* () */0);
                                                  return Wonder_jest.Expect[/* toThrowMessage */21]("expect type_ not be LoadError", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                    return LoadAssetUtils$WonderEditor._handleAssetSpecificFuncByTypeSync(LoadAssetUtils$WonderEditor.getUploadAssetType("aaa.bb"), /* tuple */[
                                                                                (function (param) {
                                                                                    return /* () */0;
                                                                                  }),
                                                                                (function (param) {
                                                                                    return /* () */0;
                                                                                  }),
                                                                                (function (param) {
                                                                                    return /* () */0;
                                                                                  }),
                                                                                (function (param) {
                                                                                    return /* () */0;
                                                                                  }),
                                                                                (function (param) {
                                                                                    return /* () */0;
                                                                                  })
                                                                              ]);
                                                                  })));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
