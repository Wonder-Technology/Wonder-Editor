'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GLBTool$WonderEditor = require("../../../../tool/GLBTool.js");
var LoadTool$WonderEditor = require("../../tool/LoadTool.js");
var LoadWDBTool$WonderEditor = require("../../../tool/LoadWDBTool.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var GameObjectEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../tool/MainEditorAssetUploadTool.js");
var MainEditorAssetWDBNodeTool$WonderEditor = require("../../tool/MainEditorAssetWDBNodeTool.js");
var MainEditorAssetHeaderLoadTool$WonderEditor = require("./tool/MainEditorAssetHeaderLoadTool.js");

Wonder_jest.describe("MainEditorAssetHeader->load glb", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedGLBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                boxTexturedGLBArrayBuffer[0] = GLBTool$WonderEditor.getGLBArrayBuffer("BoxTextured");
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorAssetHeaderLoadTool$WonderEditor.prepareInspectorCanvas(sandbox);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test load glb", (function (param) {
                      beforeEach((function () {
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                              LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                              LoadTool$WonderEditor.buildFakeTextEncoder(/* () */0);
                              LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                              return LoadTool$WonderEditor.buildFakeLoadImage();
                            }));
                      return Wonder_jest.testPromise("convert glb to wdb and load", undefined, (function (param) {
                                    return MainEditorAssetUploadTool$WonderEditor.loadOneGLB(boxTexturedGLBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                  MainEditorAssetWDBNodeTool$WonderEditor.getWDBGameObject(uploadedWDBNodeId, editorState);
                                                  var __x = LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId, /* tuple */[
                                                        editorState,
                                                        engineState
                                                      ]);
                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectEngineService$WonderEditor.getGameObjectName(__x, engineState)), "Mesh"));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
