'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var AssetIMGUITool$WonderEditor = require("../../integration/tool/AssetIMGUITool.js");
var FileNameService$WonderEditor = require("../../../src/service/atom/FileNameService.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../integration/asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var TextureInspectorTool$WonderEditor = require("../../integration/inspector/composable_component/asset_inspector/atom_component/texture_inspector/tool/textureInspectorTool.js");
var AssetIMGUIEngineService$WonderEditor = require("../../../src/service/state/engine/imgui/AssetIMGUIEngineService.js");
var MaterialNodeAssetService$WonderEditor = require("../../../src/service/record/editor/asset/MaterialNodeAssetService.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../integration/asset/tool/MainEditorAssetUploadTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var DisposeTreeAssetLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/asset/DisposeTreeAssetLogicService.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var TextureNodeAssetEditorService$WonderEditor = require("../../../src/service/state/editor/asset/textureNode/TextureNodeAssetEditorService.js");
var MainEditorLightMaterialForAssetTool$WonderEditor = require("../../integration/inspector/composable_component/asset_inspector/atom_component/material_inspector/atom_component/tool/MainEditorLightMaterialForAssetTool.js");
var IMGUICustomImageTextureContentMapTool$WonderEditor = require("../../integration/asset/tool/IMGUICustomImageTextureContentMapTool.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");
var IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor = require("../../../src/service/state/editor/asset/textureNode/IMGUICustomImageTypeTextureNodeAssetEditorService.js");

Wonder_jest.describe("disposeTree", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test remove texture", (function (param) {
                Wonder_jest.describe("test dispose texture content data", (function (param) {
                        return Wonder_jest.describe("if type is IMGUICustomImage", (function (param) {
                                      return Wonder_jest.testPromise("remove texture content", undefined, (function (param) {
                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                  TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                                                  var textureContentIndex = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                          return IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor.unsafeGetTextureContentIndex(uploadedTextureNodeId, param);
                                                                        }));
                                                                  StateLogicService$WonderEditor.getAndSetState(DisposeTreeAssetLogicService$WonderEditor.disposeTree);
                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](IMGUICustomImageTextureContentMapTool$WonderEditor.hasContent(textureContentIndex, undefined, /* () */0)), false));
                                                                }));
                                                  }));
                                    }));
                      }));
                Wonder_jest.testPromise("\n        upload two textures with the same image i1;\n        disposeTree;\n\n        the i1->base64 should remove from basicSourceTextureImageDataMap;\n      ", undefined, (function (param) {
                        return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId1) {
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId2) {
                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                    var textureData1 = TextureNodeAssetEditorService$WonderEditor.unsafeGetNodeData(uploadedTextureNodeId1, editorState);
                                                    var textureData2 = TextureNodeAssetEditorService$WonderEditor.unsafeGetNodeData(uploadedTextureNodeId1, editorState);
                                                    var match = StateLogicService$WonderEditor.getStateToGetData(DisposeTreeAssetLogicService$WonderEditor.disposeTree);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        textureData1[/* imageDataIndex */3],
                                                                        Js_option.isNone(BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.getData(textureData2[/* imageDataIndex */3], match[0]))
                                                                      ]), /* tuple */[
                                                                    textureData2[/* imageDataIndex */3],
                                                                    true
                                                                  ]));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test dispose imgui assets", (function (param) {
                              Wonder_jest.describe("if type is IMGUICustomImage", (function (param) {
                                      return Wonder_jest.describe("if the custom image data has set to engine", (function (param) {
                                                    return Wonder_jest.testPromise("remove it", undefined, (function (param) {
                                                                  var judgeFunc = function (customImageId) {
                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                              return AssetIMGUIEngineService$WonderEditor.hasSettedAssetCustomImageData(customImageId, param);
                                                                                            }))), false));
                                                                  };
                                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                                TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                                                                var customImageId = "i1";
                                                                                TextureInspectorTool$WonderEditor.IMGUICustomImageType[/* setCustomImageId */0](uploadedTextureNodeId, undefined, customImageId, undefined, undefined, undefined, undefined, /* () */0);
                                                                                var partial_arg = AssetIMGUITool$WonderEditor.buildFakeCustomImageData(customImageId, /* () */0);
                                                                                StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                                                        return AssetIMGUITool$WonderEditor.addSettedAssetCustomImageData(partial_arg, param);
                                                                                      }));
                                                                                StateLogicService$WonderEditor.getAndSetState(DisposeTreeAssetLogicService$WonderEditor.disposeTree);
                                                                                return Curry._1(judgeFunc, customImageId);
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("if type is BasicSource", (function (param) {
                                            return Wonder_jest.describe("if the texture has set to engine as imgui font-> bitmap", (function (param) {
                                                          return Wonder_jest.testPromise("remove it", undefined, (function (param) {
                                                                        var judgeFunc = function (bitmapName) {
                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                    return AssetIMGUIEngineService$WonderEditor.hasSettedAssetBitmapData(bitmapName, param);
                                                                                                  }))), false));
                                                                        };
                                                                        var bitmapName = "bitmap.png";
                                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, bitmapName, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                                      TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                                                                      StateEngineService$WonderEditor.setState(AssetIMGUITool$WonderEditor.setSettedAssetBitmapData(FileNameService$WonderEditor.getBaseName(bitmapName), undefined, undefined, /* () */0));
                                                                                      StateLogicService$WonderEditor.getAndSetState(DisposeTreeAssetLogicService$WonderEditor.disposeTree);
                                                                                      return Curry._1(judgeFunc, bitmapName);
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test remove material", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n           [\n            {\n              \"name\": \"default\",\n              \"jobs\": [\n                  {\"name\": \"init_inspector_engine\" }\n              ]\n            }\n          ]\n           ", undefined, "\n           [\n              {\"name\": \"init_inspector_engine\" }\n           ]\n           ", undefined, /* () */0), undefined, false, /* () */0);
                              StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                              return /* () */0;
                            }));
                      return Wonder_jest.testPromise("\n        add material m1;\n        load texture to set m1 material\'s map;\n        disposeTree;\n\n        the m1->base64 should remove from basicSourceTextureImageDataMap;\n      ", undefined, (function (param) {
                                    var match = MainEditorLightMaterialForAssetTool$WonderEditor.prepareInspectorMaterialSphereAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                    var newMaterialComponent = match[1];
                                    var addedMaterialNodeId = match[0];
                                    return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                  MainEditorLightMaterialForAssetTool$WonderEditor.dragAssetTextureToMap(addedMaterialNodeId, uploadedTextureNodeId, undefined, undefined, newMaterialComponent, /* () */0);
                                                  var match = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedMaterialNodeId, StateEditorService$WonderEditor.getState(/* () */0)));
                                                  var match$1 = StateLogicService$WonderEditor.getStateToGetData(DisposeTreeAssetLogicService$WonderEditor.disposeTree);
                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.getData(match[/* snapshotImageDataIndex */2], match$1[0]))), true));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
