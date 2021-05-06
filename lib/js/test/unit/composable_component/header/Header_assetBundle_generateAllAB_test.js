'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_list = require("bs-platform/lib/js/js_list.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var LoadTool$WonderEditor = require("../../../integration/asset/tool/LoadTool.js");
var SinonTool$WonderEditor = require("../../../tool/SinonTool.js");
var HeaderTool$WonderEditor = require("./tool/HeaderTool.js");
var OptionService$WonderEditor = require("../../../../src/service/primitive/OptionService.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var SelectTreeTool$WonderEditor = require("../../../integration/tool/SelectTreeTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../tool/BuildComponentTool.js");
var MainEditorAssetTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var HeaderAssetBundleTool$WonderEditor = require("./tool/HeaderAssetBundleTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetIdTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetUploadTool.js");
var HeaderAssetBundleGenerateAllAB$WonderEditor = require("../../../../src/core/composable_component/header/atom_component/asset_bundle/HeaderAssetBundleGenerateAllAB.js");
var MainEditorAssetMaterialNodeTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetMaterialNodeTool.js");
var MainEditorAssetAssetBundleNodeTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetAssetBundleNodeTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("Header AssetBundle->generate all ab", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("generate all ab", (function (param) {
                      Wonder_jest.describe("test buildSelectTreeForGenerateAllAB", (function (param) {
                              return Wonder_jest.testPromise("should only has asset bundle assets", undefined, (function (param) {
                                            MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                            var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "image1.png", "newImgBase64", /* () */0).then((function (uploadedTextureNodeId) {
                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "A.rab", undefined, /* () */0).then((function (uploadedAssetBundleNodeId) {
                                                                        return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildUI(HeaderAssetBundleTool$WonderEditor.GenerateAllAB[/* buildGenerateAllABModal */1](StateLogicService$WonderEditor.getStateToGetData(HeaderAssetBundleTool$WonderEditor.GenerateAllAB[/* buildSelectTreeForGenerateAllAB */0]), Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0))));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test generate all ab from selected single abs", (function (param) {
                                    var _getZipFilePath = function (file, callCount) {
                                      return OptionService$WonderEditor.unsafeGet(Js_list.hd(Sinon.getArgs(Sinon.getCall(callCount, file))));
                                    };
                                    beforeEach((function () {
                                            LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                                            LoadTool$WonderEditor.buildFakeTextEncoder(/* () */0);
                                            LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                                            LoadTool$WonderEditor.buildFakeLoadImage();
                                            return HeaderAssetBundleTool$WonderEditor.GenerateAllAB[/* prepareDigest */3](sandbox[0]);
                                          }));
                                    Wonder_jest.describe("test generated abs->relative path", (function (param) {
                                            return Wonder_jest.testPromise("generated abs->relative path === the path in zip", undefined, (function (param) {
                                                          MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                                          var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                          var selectTree = SelectTreeTool$WonderEditor.setSelectForSelectTree(true, MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialName(addedMaterialNodeId1, undefined, undefined, /* () */0), StateLogicService$WonderEditor.getStateToGetData(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* buildSelectTreeForGenerateSingleRAB */0]));
                                                          var rab = HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* generateSingleRAB */3](selectTree, undefined, undefined, /* () */0);
                                                          var sab = HeaderAssetBundleTool$WonderEditor.GenerateSingleSAB[/* generateSingleSAB */0](undefined, undefined, /* () */0);
                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "A.rab", Caml_option.some(rab), /* () */0).then((function (uploadedRABAssetBundleNodeId) {
                                                                        var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                                        MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "B.sab", Caml_option.some(sab), /* () */0).then((function (uploadedSABAssetBundleNodeId) {
                                                                                      var obj = HeaderTool$WonderEditor.buildPublishFakeJsZipCreateFunc(sandbox[0]);
                                                                                      var selectTree = SelectTreeTool$WonderEditor.setSelectForSelectTree(true, StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                  return MainEditorAssetAssetBundleNodeTool$WonderEditor.getName(uploadedSABAssetBundleNodeId, param);
                                                                                                })), SelectTreeTool$WonderEditor.setSelectForSelectTree(true, StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                      return MainEditorAssetAssetBundleNodeTool$WonderEditor.getName(uploadedRABAssetBundleNodeId, param);
                                                                                                    })), StateLogicService$WonderEditor.getStateToGetData(HeaderAssetBundleTool$WonderEditor.GenerateAllAB[/* buildSelectTreeForGenerateAllAB */0])));
                                                                                      return Most.drain(HeaderAssetBundleTool$WonderEditor.GenerateAllAB[/* generateAllABZip */2](selectTree, (function (param) {
                                                                                                          return obj;
                                                                                                        }), undefined, undefined, undefined, HeaderAssetBundleGenerateAllAB$WonderEditor.Method[/* buildDefaultDependencyRelationInputValue */5](/* () */0), /* () */0)).then((function (param) {
                                                                                                    var file = obj.file;
                                                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                        Sinon.getCallCount(file),
                                                                                                                        _getZipFilePath(file, 0),
                                                                                                                        _getZipFilePath(file, 1),
                                                                                                                        _getZipFilePath(file, 2)
                                                                                                                      ]), /* tuple */[
                                                                                                                    3,
                                                                                                                    "A.rab",
                                                                                                                    "New Folder/B.sab",
                                                                                                                    "WonderWAB.wab"
                                                                                                                  ]));
                                                                                                  }));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.testPromise("error should be catched by stream", undefined, (function (param) {
                                                  var errorMsg = /* record */[/* contents */""];
                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedSABAssetBundleNodeId) {
                                                                var obj = HeaderTool$WonderEditor.buildPublishFakeJsZipCreateFunc(sandbox[0]);
                                                                var selectTree = SelectTreeTool$WonderEditor.setSelectForSelectTree(true, StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                            return MainEditorAssetAssetBundleNodeTool$WonderEditor.getName(uploadedSABAssetBundleNodeId, param);
                                                                          })), StateLogicService$WonderEditor.getStateToGetData(HeaderAssetBundleTool$WonderEditor.GenerateAllAB[/* buildSelectTreeForGenerateAllAB */0]));
                                                                return Most.drain(HeaderAssetBundleTool$WonderEditor.GenerateAllAB[/* generateAllABZip */2](selectTree, (function (param) {
                                                                                      return obj;
                                                                                    }), undefined, undefined, undefined, "\n    ttt\n    ", /* () */0)).catch((function (e) {
                                                                                var message = e.message;
                                                                                errorMsg[0] = message;
                                                                                return /* () */0;
                                                                              })).then((function (param) {
                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](errorMsg[0]), "ttt is not defined"));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
