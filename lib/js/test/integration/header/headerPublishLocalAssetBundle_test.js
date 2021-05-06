'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_list = require("bs-platform/lib/js/js_list.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var LoadTool$WonderEditor = require("../asset/tool/LoadTool.js");
var HeaderTool$WonderEditor = require("../../unit/composable_component/header/tool/HeaderTool.js");
var OptionService$WonderEditor = require("../../../src/service/primitive/OptionService.js");
var ReactTestTool$WonderEditor = require("../../tool/ReactTestTool.js");
var SelectTreeTool$WonderEditor = require("../tool/SelectTreeTool.js");
var PublishLocalTool$WonderEditor = require("./tool/PublishLocalTool.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../tool/BuildComponentTool.js");
var MainEditorAssetTool$WonderEditor = require("../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../asset/tool/MainEditorAssetIdTool.js");
var HeaderPublishLocalUtils$WonderEditor = require("../../../src/core/composable_component/header/utils/publish/local/HeaderPublishLocalUtils.js");
var MainEditorAssetTreeTool$WonderEditor = require("../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../asset/tool/MainEditorAssetUploadTool.js");
var HeaderPublishLocalAssetBundleTool$WonderEditor = require("./tool/HeaderPublishLocalAssetBundleTool.js");
var MainEditorAssetAssetBundleNodeTool$WonderEditor = require("../asset/tool/MainEditorAssetAssetBundleNodeTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("header publish local->asset bundle", (function (param) {
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
        Wonder_jest.describe("test ui", (function (param) {
                return Wonder_jest.testPromise("test show select tree with only asset bundles", undefined, (function (param) {
                              MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                              var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                              MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                              return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "A.wab", undefined, /* () */0).then((function (uploadedAssetBundleNodeId1) {
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "B.sab", undefined, /* () */0).then((function (uploadedAssetBundleNodeId2) {
                                                          return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildUI(HeaderPublishLocalAssetBundleTool$WonderEditor.buildPublishLocalModal(undefined, undefined, undefined, true, undefined, undefined, /* () */0))));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("download zip", (function (param) {
                      return Wonder_jest.describe("test use assetbundle", (function (param) {
                                    return Wonder_jest.describe("export selected asset bundles", (function (param) {
                                                  beforeEach((function () {
                                                          LoadTool$WonderEditor.buildFakeTextEncoder(/* () */0);
                                                          LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                                                          return LoadTool$WonderEditor.buildFakeLoadImage();
                                                        }));
                                                  return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                                MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                                var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                                MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                                                                return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "A.wab", undefined, /* () */0).then((function (uploadedAssetBundleNodeId1) {
                                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "B.sab", undefined, /* () */0).then((function (uploadedAssetBundleNodeId2) {
                                                                                            var selectTree = SelectTreeTool$WonderEditor.setSelectForSelectTree(true, StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                        return MainEditorAssetAssetBundleNodeTool$WonderEditor.getName(uploadedAssetBundleNodeId2, param);
                                                                                                      })), StateLogicService$WonderEditor.getStateToGetData(HeaderPublishLocalAssetBundleTool$WonderEditor.buildSelectTreeForAssetBundle));
                                                                                            var judgeFunc = function (fetchCount, file) {
                                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(Js_list.hd(Sinon.getArgs(Sinon.getCall(0, file))))), "AssetBundles/New Folder/B.sab");
                                                                                            };
                                                                                            var selectTreeForAssetBundle = selectTree;
                                                                                            var $staropt$star = undefined;
                                                                                            var useAssetBundle = $staropt$star !== undefined ? $staropt$star : true;
                                                                                            var fakeFetchFunc = PublishLocalTool$WonderEditor.buildFakeFetch(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                                            var obj = HeaderTool$WonderEditor.buildPublishFakeJsZipCreateFunc(sandbox[0]);
                                                                                            return HeaderPublishLocalUtils$WonderEditor.Publish[/* publishZip */4](/* tuple */[
                                                                                                          "WonderLocal",
                                                                                                          false
                                                                                                        ], /* tuple */[
                                                                                                          useAssetBundle,
                                                                                                          selectTreeForAssetBundle
                                                                                                        ], (function (param) {
                                                                                                            return obj;
                                                                                                          }), fakeFetchFunc).then((function (param) {
                                                                                                          var file = obj.file;
                                                                                                          var fetchCount = PublishLocalTool$WonderEditor.getFetchPackageContentWithoutAssetCountWithDefault(/* () */0);
                                                                                                          return Promise.resolve(Curry._2(judgeFunc, fetchCount, file));
                                                                                                        }));
                                                                                          }));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
