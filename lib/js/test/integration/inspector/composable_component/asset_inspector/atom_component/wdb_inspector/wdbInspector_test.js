'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../../../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../../../../../asset/tool/LoadTool.js");
var CanvasTool$WonderEditor = require("../../../../../../unit/atom_component/canvas/tool/CanvasTool.js");
var WDBInspectorTool$WonderEditor = require("./tool/WDBInspectorTool.js");
var AssetInspectorTool$WonderEditor = require("../../tool/AssetInspectorTool.js");
var MainEditorAssetTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetUploadTool.js");
var MainEditorAssetWDBNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetWDBNodeTool.js");

Wonder_jest.describe("wdb inspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
        var sceneWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                sceneWDBArrayBuffer[0] = WDBTool$WonderEditor.generateSceneWDBWithArcballCameraController(/* () */0);
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                WDBInspectorTool$WonderEditor.prepareInspectorEngineState(sandbox, undefined, /* () */0);
                CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                return LoadTool$WonderEditor.buildFakeLoadImage();
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test rename", (function (param) {
                      return Wonder_jest.testPromise("if rename to the existed name in the same dir, should fail", undefined, (function (param) {
                                    var fileName1 = "BoxTextured1";
                                    var fileName2 = "BoxTextured2";
                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, fileName1, /* () */0).then((function (uploadedWDBNodeId1) {
                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, fileName2, /* () */0).then((function (uploadedWDBNodeId2) {
                                                                AssetInspectorTool$WonderEditor.Rename[/* renameAssetWDBNode */6](undefined, undefined, uploadedWDBNodeId2, fileName1, /* () */0);
                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                    MainEditorAssetWDBNodeTool$WonderEditor.getWDBName(uploadedWDBNodeId1, undefined, /* () */0),
                                                                                    MainEditorAssetWDBNodeTool$WonderEditor.getWDBName(uploadedWDBNodeId2, undefined, /* () */0)
                                                                                  ]), /* tuple */[
                                                                                fileName1,
                                                                                fileName2
                                                                              ]));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
