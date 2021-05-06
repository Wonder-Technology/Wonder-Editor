'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var LoadTool$WonderEditor = require("../../tool/LoadTool.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../tool/MainEditorAssetUploadTool.js");
var MainEditorAssetTextureNodeTool$WonderEditor = require("../../tool/MainEditorAssetTextureNodeTool.js");
var BasicSourceTextureEngineService$WonderEditor = require("../../../../../src/service/state/engine/texture/BasicSourceTextureEngineService.js");

Wonder_jest.describe("MainEditorAssetHeader->load texture", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test load texture", (function (param) {
                      beforeEach((function () {
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                              LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                              LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                              return LoadTool$WonderEditor.buildFakeLoadImage();
                            }));
                      Wonder_jest.testPromise("set source name", undefined, (function (param) {
                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                              var imgName = "1.png";
                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, imgName, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                            var textureComponent = MainEditorAssetTextureNodeTool$WonderEditor.getTextureComponent(uploadedTextureNodeId, editorState);
                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            var source = BasicSourceTextureEngineService$WonderEditor.unsafeGetSource(textureComponent, engineState);
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](source.name), imgName));
                                          }));
                            }));
                      return Wonder_jest.describe("set source format", (function (param) {
                                    var _test = function (imgName, targetFormat) {
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, imgName, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                    var textureComponent = MainEditorAssetTextureNodeTool$WonderEditor.getTextureComponent(uploadedTextureNodeId, editorState);
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getFormat(textureComponent, engineState)), targetFormat));
                                                  }));
                                    };
                                    Wonder_jest.testPromise("set jpg texture to rgb format", undefined, (function (param) {
                                            return _test("1.jpg", /* Rgb */0);
                                          }));
                                    Wonder_jest.testPromise("set jpeg texture to rgb format", undefined, (function (param) {
                                            return _test("1.jpeg", /* Rgb */0);
                                          }));
                                    return Wonder_jest.testPromise("set png texture to rgba format", undefined, (function (param) {
                                                  return _test("1.png", /* Rgba */1);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
