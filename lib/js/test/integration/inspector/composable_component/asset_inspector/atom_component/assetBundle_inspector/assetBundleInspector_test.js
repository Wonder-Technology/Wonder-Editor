'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var InspectorTool$WonderEditor = require("../../../../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var MainEditorAssetTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetUploadTool.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetChildrenNodeTool.js");
var MainEditorAssetAssetBundleNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetAssetBundleNodeTool.js");

Wonder_jest.describe("assetBundle inspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test rename", (function (param) {
                return Wonder_jest.testPromise("test", undefined, (function (param) {
                              return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "A.rab", undefined, /* () */0).then((function (uploadedAssetBundleNodeId) {
                                            MainEditorAssetChildrenNodeTool$WonderEditor.selectAssetBundleNode(uploadedAssetBundleNodeId, undefined, undefined, /* () */0);
                                            var newName = "B";
                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetAssetBundleNode */7](undefined, undefined, uploadedAssetBundleNodeId, newName, /* () */0);
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                      return MainEditorAssetAssetBundleNodeTool$WonderEditor.getName(uploadedAssetBundleNodeId, param);
                                                                    }))), newName));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("show type", (function (param) {
                      Wonder_jest.testPromise("test type===RAB", undefined, (function (param) {
                              return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "A.rab", undefined, /* () */0).then((function (uploadedAssetBundleNodeId) {
                                            MainEditorAssetChildrenNodeTool$WonderEditor.selectAssetBundleNode(uploadedAssetBundleNodeId, undefined, undefined, /* () */0);
                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                          }));
                            }));
                      return Wonder_jest.testPromise("test type===WAB", undefined, (function (param) {
                                    return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "A.wab", undefined, /* () */0).then((function (uploadedAssetBundleNodeId) {
                                                  MainEditorAssetChildrenNodeTool$WonderEditor.selectAssetBundleNode(uploadedAssetBundleNodeId, undefined, undefined, /* () */0);
                                                  return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
