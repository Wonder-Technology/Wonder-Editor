'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var LoadTool$WonderEditor = require("../../tool/LoadTool.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var EventListenerTool$WonderEditor = require("../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../tool/MainEditorAssetIdTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../tool/MainEditorAssetUploadTool.js");
var AssetBundleNodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/AssetBundleNodeAssetService.js");
var MainEditorAssetHeaderLoadTool$WonderEditor = require("./tool/MainEditorAssetHeaderLoadTool.js");
var MainEditorAssetHeaderLoadZipTool$WonderEditor = require("./tool/MainEditorAssetHeaderLoadZipTool.js");
var MainEditorAssetAssetBundleNodeTool$WonderEditor = require("../../tool/MainEditorAssetAssetBundleNodeTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("MainEditorAssetHeader->load asset bundle zip", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorAssetHeaderLoadTool$WonderEditor.prepareInspectorCanvas(sandbox);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test load asset bundle zip", (function (param) {
                      var _buildFakeZipData = function (wab,sab){
  return [
    ["A.wab",{
      async: function(){
          return new Promise((resolve, _) => resolve(
new Uint8Array(wab)
          ))
      },
    }],
    ["SAB",{
      async: function(){
          return new Promise((resolve, _) => resolve(
          ))
      },
    }],
    ["SAB/B.sab",{
      async: function(){
          return new Promise((resolve, _) => resolve(
new Uint8Array(sab)
          ))
      },
    }]
  ]
};
                      var _prepare = function (param) {
                        var addedFolderNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                        var wab = new ArrayBuffer(3);
                        var sab = new ArrayBuffer(2);
                        var obj = MainEditorAssetHeaderLoadZipTool$WonderEditor.buildImportFakeJsZipCreateFunc(sandbox[0], _buildFakeZipData(wab, sab));
                        MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId, undefined, /* () */0);
                        return /* tuple */[
                                obj,
                                wab,
                                sab
                              ];
                      };
                      beforeEach((function () {
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                              LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                              LoadTool$WonderEditor.buildFakeTextEncoder(/* () */0);
                              LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                              LoadTool$WonderEditor.buildFakeLoadImage();
                              return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                            }));
                      Wonder_jest.testPromise("should add to asset children", undefined, (function (param) {
                              var match = _prepare(/* () */0);
                              var obj = match[0];
                              return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundleZip(sandbox, (function (param) {
                                              return obj;
                                            }), undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                          }));
                            }));
                      return Wonder_jest.testPromise("should store assetBundle arrayBuffer", undefined, (function (param) {
                                    var match = _prepare(/* () */0);
                                    var sab = match[2];
                                    var wab = match[1];
                                    var obj = match[0];
                                    return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundleZip(sandbox, (function (param) {
                                                    return obj;
                                                  }), undefined, undefined, undefined, /* () */0).then((function (param) {
                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      AssetBundleNodeAssetService$WonderEditor.getAssetBundle(StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                                                                  return MainEditorAssetAssetBundleNodeTool$WonderEditor.getAssetBundleNodeByName("A", param);
                                                                                }))),
                                                                      AssetBundleNodeAssetService$WonderEditor.getAssetBundle(StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                                                                  return MainEditorAssetAssetBundleNodeTool$WonderEditor.getAssetBundleNodeByName("B", param);
                                                                                })))
                                                                    ]), /* tuple */[
                                                                  wab,
                                                                  sab
                                                                ]));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
