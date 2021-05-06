'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../tool/WDBTool.js");
var JudgeTool$WonderEditor = require("../../../tool/JudgeTool.js");
var CanvasTool$WonderEditor = require("../../../unit/atom_component/canvas/tool/CanvasTool.js");
var ImportPackageTool$WonderEditor = require("./tool/ImportPackageTool.js");
var SettingToolEngine$WonderEditor = require("../../../tool/engine/SettingToolEngine.js");
var GeometryToolEngine$WonderEditor = require("../../../tool/engine/GeometryToolEngine.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var InspectorCanvasTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/tool/InspectorCanvasTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../asset/tool/MainEditorAssetUploadTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");

Wonder_jest.describe("header import package->reallocate", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return ImportPackageTool$WonderEditor.prepareLoad(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("reallocate geometry", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), SettingToolEngine$WonderEditor.buildBufferConfigStr(5000, 5, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                              MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                              InspectorCanvasTool$WonderEditor.prepareInspectorEngineState(sandbox);
                              CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                              return /* () */0;
                            }));
                      return Wonder_jest.testPromise("if geometry-buffer-use percent >= 10%, reallocate geometry to new buffer", undefined, (function (param) {
                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                  var verticesBeforeImport = GeometryToolEngine$WonderEditor.getVertices(engineState);
                                                  return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](JudgeTool$WonderEditor.isSame(GeometryToolEngine$WonderEditor.getVertices(engineState), verticesBeforeImport)), false));
                                                              }), undefined, undefined, undefined, undefined, /* () */0);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
