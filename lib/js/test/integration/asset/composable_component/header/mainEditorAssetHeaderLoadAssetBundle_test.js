'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../tool/MainEditorAssetUploadTool.js");
var MainEditorAssetAssetBundleNodeTool$WonderEditor = require("../../tool/MainEditorAssetAssetBundleNodeTool.js");

Wonder_jest.describe("MainEditorAssetHeader->load assetBundle", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test load asset bundle", (function (param) {
                      Wonder_jest.testPromise("should add to asset children", undefined, (function (param) {
                              return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "A.rab", undefined, /* () */0).then((function (uploadedAssetBundleNodeId) {
                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                          }));
                            }));
                      Wonder_jest.testPromise("should store assetBundle arrayBuffer", undefined, (function (param) {
                              var assetBundle = new ArrayBuffer(20);
                              return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "A.rab", Caml_option.some(assetBundle), /* () */0).then((function (uploadedAssetBundleNodeId) {
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                      return MainEditorAssetAssetBundleNodeTool$WonderEditor.getAssetBundle(uploadedAssetBundleNodeId, param);
                                                                    }))), assetBundle));
                                          }));
                            }));
                      return Wonder_jest.describe("fix bug", (function (param) {
                                    return Wonder_jest.testPromise("if load the same asset bundle in the same dir, should handle their name to be unique", undefined, (function (param) {
                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "A.rab", undefined, /* () */0).then((function (uploadedAssetBundleNodeId) {
                                                                return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "A.rab", undefined, /* () */0).then((function (uploadedAssetBundleNodeId) {
                                                                              return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
