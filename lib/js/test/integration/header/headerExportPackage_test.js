'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../asset/tool/LoadTool.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var BufferUtils$WonderEditor = require("../../../src/core/composable_component/header/utils/BufferUtils.js");
var ConsoleTool$WonderEditor = require("../../unit/tool/external/ConsoleTool.js");
var OptionService$WonderEditor = require("../../../src/service/primitive/OptionService.js");
var ControllerTool$WonderEditor = require("../../unit/composable_component/controller/tool/ControllerTool.js");
var ExportPackageTool$WonderEditor = require("./tool/ExportPackageTool.js");
var ImportPackageTool$WonderEditor = require("./import_package/tool/ImportPackageTool.js");
var SceneEngineService$WonderEditor = require("../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var WDBNodeAssetService$WonderEditor = require("../../../src/service/record/editor/asset/WDBNodeAssetService.js");
var MainEditorAssetIdTool$WonderEditor = require("../asset/tool/MainEditorAssetIdTool.js");
var GameObjectEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var HeaderExportPackageUtils$WonderEditor = require("../../../src/core/composable_component/header/utils/export/HeaderExportPackageUtils.js");
var MaterialNodeAssetService$WonderEditor = require("../../../src/service/record/editor/asset/MaterialNodeAssetService.js");
var MainEditorAssetUploadTool$WonderEditor = require("../asset/tool/MainEditorAssetUploadTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var BasicSourceTextureImageDataMapTool$WonderEditor = require("../asset/tool/BasicSourceTextureImageDataMapTool.js");
var MainEditorLightMaterialForAssetTool$WonderEditor = require("../inspector/composable_component/asset_inspector/atom_component/material_inspector/atom_component/tool/MainEditorLightMaterialForAssetTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var BasicSourceTypeTextureNodeAssetEditorService$WonderEditor = require("../../../src/service/state/editor/asset/textureNode/BasicSourceTypeTextureNodeAssetEditorService.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");

Wonder_jest.describe("header export package", (function (param) {
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
                MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n           [\n            {\n              \"name\": \"default\",\n              \"jobs\": [\n                  {\"name\": \"init_inspector_engine\" }\n              ]\n            }\n          ]\n           ", undefined, "\n           [\n              {\"name\": \"init_inspector_engine\" }\n           ]\n           ", undefined, /* () */0), undefined, false, /* () */0);
                StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("if is run", (function (param) {
                return Wonder_jest.test("warn", (function (param) {
                              ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                              var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                              ControllerTool$WonderEditor.run(/* () */0);
                              HeaderExportPackageUtils$WonderEditor.exportPackage("aaa");
                              return Sinon.toCalledWith(/* array */["should operate when stop, but now is run!"], Wonder_jest.Expect[/* expect */0](warn));
                            }));
              }));
        return Wonder_jest.describe("else", (function (param) {
                      beforeEach((function () {
                              LoadTool$WonderEditor.buildFakeAtob(/* () */0);
                              LoadTool$WonderEditor.buildFakeBtoa(/* () */0);
                              LoadTool$WonderEditor.buildFakeTextEncoder(/* () */0);
                              LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                              LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                              LoadTool$WonderEditor.buildFakeLoadImage(/* () */0);
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                              return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                            }));
                      Wonder_jest.describe("optimize", (function (param) {
                              return Wonder_jest.testPromise("set builded image uint8Array to editorState", undefined, (function (param) {
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                          ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTypeTextureNodeAssetEditorService$WonderEditor.findAllBasicSourceTypeTextureNodes(editorState).filter((function (node) {
                                                                                    var match = BasicSourceTextureImageDataMapTool$WonderEditor.getDataByTextureNode(node, editorState);
                                                                                    return Js_option.isSome(match[/* uint8Array */1]);
                                                                                  })).length), 1));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test isRoot", (function (param) {
                              return Wonder_jest.testPromise("set scene gameObject->isRoot to false", undefined, (function (param) {
                                            var wpkArrayBuffer = ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                            return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectEngineService$WonderEditor.getGameObjectIsRoot(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState)), false));
                                                        }), wpkArrayBuffer, undefined, undefined, undefined, /* () */0);
                                          }));
                            }));
                      Wonder_jest.describe("test export all materials->snapshot", (function (param) {
                              Wonder_jest.test("add new material m1;\n           export;\n\n           should convert m1->snapshot->default base64 to uint8Array;", (function (param) {
                                      var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                      ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                      var match = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedMaterialNodeId, editorState));
                                      var param$1 = BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(match[/* snapshotImageDataIndex */2], editorState);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(param$1[/* uint8Array */1])), BufferUtils$WonderEditor.convertBase64ToUint8Array(ExportPackageTool$WonderEditor.getDefaultSnapshotBase64(/* () */0)));
                                    }));
                              return Wonder_jest.test("add new material m1;\n             change m1 color;\n             close color picker;\n             export;\n\n           should convert m1->snapshot->default base64 to uint8Array;", (function (param) {
                                            var match = MainEditorLightMaterialForAssetTool$WonderEditor.prepareInspectorMaterialSphereAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                            var addedMaterialNodeId = match[0];
                                            MainEditorLightMaterialForAssetTool$WonderEditor.closeColorPicker(match[1], addedMaterialNodeId, "#7df1e8", undefined, undefined, /* () */0);
                                            ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                            var match$1 = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedMaterialNodeId, editorState));
                                            var param$1 = BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(match$1[/* snapshotImageDataIndex */2], editorState);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(param$1[/* uint8Array */1])), BufferUtils$WonderEditor.convertBase64ToUint8Array(ExportPackageTool$WonderEditor.getDefaultSnapshotBase64(/* () */0)));
                                          }));
                            }));
                      return Wonder_jest.describe("test export all wdbs->snapshot", (function (param) {
                                    return Wonder_jest.testPromise("upload one wdb w1;\n           export;\n\n           should convert w1->snapshot base64 to uint8Array;", undefined, (function (param) {
                                                  var match = MainEditorLightMaterialForAssetTool$WonderEditor.prepareInspectorMaterialSphereAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                                  var imgCanvasFakeBase64Str = match[2];
                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                var match = WDBNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(uploadedWDBNodeId, editorState));
                                                                var param = BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(match[/* imageDataIndex */2], editorState);
                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(param[/* uint8Array */1])), BufferUtils$WonderEditor.convertBase64ToUint8Array(imgCanvasFakeBase64Str)));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
