'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../../../integration/asset/tool/LoadTool.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var SinonTool$WonderEditor = require("../../../tool/SinonTool.js");
var Base64Tool$WonderEditor = require("../../../tool/Base64Tool.js");
var CanvasTool$WonderEditor = require("../../atom_component/canvas/tool/CanvasTool.js");
var ImageUtils$WonderEditor = require("../../../../src/core/composable_component/utils/ImageUtils.js");
var BufferUtils$WonderEditor = require("../../../../src/core/composable_component/header/utils/BufferUtils.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var SelectTreeTool$WonderEditor = require("../../../integration/tool/SelectTreeTool.js");
var FileNameService$WonderEditor = require("../../../../src/service/atom/FileNameService.js");
var ImportPackageTool$WonderEditor = require("../../../integration/header/import_package/tool/ImportPackageTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var MainEditorAssetTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var HeaderAssetBundleTool$WonderEditor = require("./tool/HeaderAssetBundleTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetIdTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetUploadTool.js");
var MainEditorAssetWDBNodeTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetWDBNodeTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var ImmutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ImmutableSparseMapService.js");
var MainEditorAssetCubemapNodeTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetCubemapNodeTool.js");
var MainEditorAssetTextureNodeTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetTextureNodeTool.js");
var MainEditorAssetMaterialNodeTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetMaterialNodeTool.js");
var MainEditorLightMaterialForAssetTool$WonderEditor = require("../../../integration/inspector/composable_component/asset_inspector/atom_component/material_inspector/atom_component/tool/MainEditorLightMaterialForAssetTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../integration/asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var CubemapTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/imageDataMap/CubemapTextureImageDataMapAssetEditorService.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");

Wonder_jest.describe("Header AssetBundle", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test generate single rab", (function (param) {
                      var truckWDBArrayBuffer = /* record */[/* contents */1];
                      beforeAll((function () {
                              truckWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("CesiumMilkTruck");
                              return /* () */0;
                            }));
                      beforeEach((function () {
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                              LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                              LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                              return LoadTool$WonderEditor.buildFakeLoadImage();
                            }));
                      Wonder_jest.describe("test buildSelectTreeForGenerateSingleRAB", (function (param) {
                              Wonder_jest.testPromise("test1", undefined, (function (param) {
                                      MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                      var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "image1.png", "newImgBase64", /* () */0).then((function (uploadedTextureNodeId) {
                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(truckWDBArrayBuffer[0], undefined, undefined, "Truck", /* () */0).then((function (uploadedWDBNodeId) {
                                                                  return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildUI(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* buildGenerateSingleRABModal */1](StateLogicService$WonderEditor.getStateToGetData(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* buildSelectTreeForGenerateSingleRAB */0]), Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, /* () */0))));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.test("test2", (function (param) {
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildUI(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* buildGenerateSingleRABModal */1](StateLogicService$WonderEditor.getStateToGetData(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* buildSelectTreeForGenerateSingleRAB */0]), Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, /* () */0)));
                                          }));
                            }));
                      return Wonder_jest.describe("build resource data", (function (param) {
                                    return Wonder_jest.describe("build selected assets from selectTree to be resource data", (function (param) {
                                                  Wonder_jest.describe("test resource data->basicSourceTextureImageDataMap", (function (param) {
                                                          return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                                        var imageBase64 = Base64Tool$WonderEditor.buildFakeBase64_1(/* () */0);
                                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "image1.png", imageBase64, /* () */0).then((function (uploadedTextureNodeId1) {
                                                                                      var selectTree = SelectTreeTool$WonderEditor.setSelectForSelectTree(true, MainEditorAssetTextureNodeTool$WonderEditor.getTextureName(uploadedTextureNodeId1, undefined, undefined, /* () */0), StateLogicService$WonderEditor.getStateToGetData(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* buildSelectTreeForGenerateSingleRAB */0]));
                                                                                      var match = StateLogicService$WonderEditor.getStateToGetData(Curry._1(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* generateSingleRABResourceData */2], selectTree));
                                                                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                      var imageDataIndex1 = MainEditorAssetTextureNodeTool$WonderEditor.getTextureImageDataIndex(uploadedTextureNodeId1, editorState);
                                                                                      var match$1 = BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(imageDataIndex1, editorState);
                                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[7]), ImmutableSparseMapService$WonderCommonlib.set(imageDataIndex1, /* record */[
                                                                                                          /* uint8Array */BufferUtils$WonderEditor.convertBase64ToUint8Array(imageBase64),
                                                                                                          /* name */match$1[/* name */3],
                                                                                                          /* mimeType */match$1[/* mimeType */4]
                                                                                                        ], ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0))));
                                                                                    }));
                                                                      }));
                                                        }));
                                                  Wonder_jest.describe("test resource data->cubemapTextureImageDataMap", (function (param) {
                                                          return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                                        var match = ImportPackageTool$WonderEditor.Cubemap[/* prepareForAddOneCubemapAsset */1](sandbox);
                                                                        var nodeId = match[2];
                                                                        var match$1 = match[1];
                                                                        var match$2 = match[0];
                                                                        var source6 = match$2[5];
                                                                        var source5 = match$2[4];
                                                                        var source4 = match$2[3];
                                                                        var source3 = match$2[2];
                                                                        var source2 = match$2[1];
                                                                        var source1 = match$2[0];
                                                                        var selectTree = SelectTreeTool$WonderEditor.setSelectForSelectTree(true, MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapName(nodeId, undefined, undefined, /* () */0), StateLogicService$WonderEditor.getStateToGetData(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* buildSelectTreeForGenerateSingleRAB */0]));
                                                                        var match$3 = StateLogicService$WonderEditor.getStateToGetData(Curry._1(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* generateSingleRABResourceData */2], selectTree));
                                                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                        var imageDataIndex1 = MainEditorAssetCubemapNodeTool$WonderEditor.getImageDataIndex(nodeId, editorState, /* () */0);
                                                                        CubemapTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(imageDataIndex1, editorState);
                                                                        var partial_arg = FileNameService$WonderEditor.getExtName(ImageUtils$WonderEditor.getImageName(source1));
                                                                        var partial_arg$1 = FileNameService$WonderEditor.getExtName(ImageUtils$WonderEditor.getImageName(source2));
                                                                        var partial_arg$2 = FileNameService$WonderEditor.getExtName(ImageUtils$WonderEditor.getImageName(source3));
                                                                        var partial_arg$3 = FileNameService$WonderEditor.getExtName(ImageUtils$WonderEditor.getImageName(source4));
                                                                        var partial_arg$4 = FileNameService$WonderEditor.getExtName(ImageUtils$WonderEditor.getImageName(source5));
                                                                        var partial_arg$5 = FileNameService$WonderEditor.getExtName(ImageUtils$WonderEditor.getImageName(source6));
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$3[8]), ImmutableSparseMapService$WonderCommonlib.set(imageDataIndex1, /* record */[
                                                                                            /* pxImageData *//* record */[
                                                                                              /* uint8Array */BufferUtils$WonderEditor.convertBase64ToUint8Array(match$1[0]),
                                                                                              /* name */ImageUtils$WonderEditor.getImageName(source1),
                                                                                              /* mimeType */StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                      return ImageUtils$WonderEditor.getImageMimeType(partial_arg, param);
                                                                                                    }))
                                                                                            ],
                                                                                            /* nxImageData *//* record */[
                                                                                              /* uint8Array */BufferUtils$WonderEditor.convertBase64ToUint8Array(match$1[1]),
                                                                                              /* name */ImageUtils$WonderEditor.getImageName(source2),
                                                                                              /* mimeType */StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                      return ImageUtils$WonderEditor.getImageMimeType(partial_arg$1, param);
                                                                                                    }))
                                                                                            ],
                                                                                            /* pyImageData *//* record */[
                                                                                              /* uint8Array */BufferUtils$WonderEditor.convertBase64ToUint8Array(match$1[2]),
                                                                                              /* name */ImageUtils$WonderEditor.getImageName(source3),
                                                                                              /* mimeType */StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                      return ImageUtils$WonderEditor.getImageMimeType(partial_arg$2, param);
                                                                                                    }))
                                                                                            ],
                                                                                            /* nyImageData *//* record */[
                                                                                              /* uint8Array */BufferUtils$WonderEditor.convertBase64ToUint8Array(match$1[3]),
                                                                                              /* name */ImageUtils$WonderEditor.getImageName(source4),
                                                                                              /* mimeType */StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                      return ImageUtils$WonderEditor.getImageMimeType(partial_arg$3, param);
                                                                                                    }))
                                                                                            ],
                                                                                            /* pzImageData *//* record */[
                                                                                              /* uint8Array */BufferUtils$WonderEditor.convertBase64ToUint8Array(match$1[4]),
                                                                                              /* name */ImageUtils$WonderEditor.getImageName(source5),
                                                                                              /* mimeType */StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                      return ImageUtils$WonderEditor.getImageMimeType(partial_arg$4, param);
                                                                                                    }))
                                                                                            ],
                                                                                            /* nzImageData *//* record */[
                                                                                              /* uint8Array */BufferUtils$WonderEditor.convertBase64ToUint8Array(match$1[5]),
                                                                                              /* name */ImageUtils$WonderEditor.getImageName(source6),
                                                                                              /* mimeType */StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                      return ImageUtils$WonderEditor.getImageMimeType(partial_arg$5, param);
                                                                                                    }))
                                                                                            ]
                                                                                          ], ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0))));
                                                                      }));
                                                        }));
                                                  Wonder_jest.describe("test resource data->material data", (function (param) {
                                                          Wonder_jest.describe("add light material contained textureData to textures", (function (param) {
                                                                  return Wonder_jest.testPromise("if selectTree->textures not has selectTree->lightMaterials contained textureData, resourceData->textures should has them", undefined, (function (param) {
                                                                                MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                                                var addedMaterialNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                                                var addedFolderNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                                                MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId1, undefined, /* () */0);
                                                                                return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "image1.png", Base64Tool$WonderEditor.buildFakeBase64_1(/* () */0), /* () */0).then((function (uploadedTextureNodeId1) {
                                                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "image2.png", Base64Tool$WonderEditor.buildFakeBase64_2(/* () */0), /* () */0).then((function (uploadedTextureNodeId2) {
                                                                                                            MainEditorLightMaterialForAssetTool$WonderEditor.dragAssetTextureToMap(addedMaterialNodeId2, uploadedTextureNodeId2, undefined, undefined, MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId2, undefined, /* () */0), /* () */0);
                                                                                                            var selectTree = SelectTreeTool$WonderEditor.setSelectForSelectTree(true, MainEditorAssetTextureNodeTool$WonderEditor.getTextureName(uploadedTextureNodeId1, undefined, undefined, /* () */0), SelectTreeTool$WonderEditor.setSelectForSelectTree(true, MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialName(addedMaterialNodeId2, undefined, undefined, /* () */0), StateLogicService$WonderEditor.getStateToGetData(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* buildSelectTreeForGenerateSingleRAB */0])));
                                                                                                            var match = StateLogicService$WonderEditor.getStateToGetData(Curry._1(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* generateSingleRABResourceData */2], selectTree));
                                                                                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                                match[1],
                                                                                                                                match[2]
                                                                                                                              ]), /* tuple */[
                                                                                                                            /* array */[MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId2, undefined, /* () */0)],
                                                                                                                            /* array */[
                                                                                                                              HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* buildTextureData */4](MainEditorAssetTextureNodeTool$WonderEditor.getTextureComponent(uploadedTextureNodeId1, editorState), MainEditorAssetTextureNodeTool$WonderEditor.getTextureImageDataIndex(uploadedTextureNodeId1, editorState)),
                                                                                                                              HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* buildTextureData */4](MainEditorAssetTextureNodeTool$WonderEditor.getTextureComponent(uploadedTextureNodeId2, editorState), MainEditorAssetTextureNodeTool$WonderEditor.getTextureImageDataIndex(uploadedTextureNodeId2, editorState))
                                                                                                                            ]
                                                                                                                          ]));
                                                                                                          }));
                                                                                            }));
                                                                              }));
                                                                }));
                                                          return Wonder_jest.describe("fix bug", (function (param) {
                                                                        return Wonder_jest.test("added light material shouldn't add to basic material resource data", (function (param) {
                                                                                      var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                                                      var selectTree = SelectTreeTool$WonderEditor.setSelectForSelectTree(true, MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialName(addedMaterialNodeId1, undefined, undefined, /* () */0), StateLogicService$WonderEditor.getStateToGetData(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* buildSelectTreeForGenerateSingleRAB */0]));
                                                                                      var match = StateLogicService$WonderEditor.getStateToGetData(Curry._1(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* generateSingleRABResourceData */2], selectTree));
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[0]), /* array */[]);
                                                                                    }));
                                                                      }));
                                                        }));
                                                  return Wonder_jest.describe("test resource data->geometrys", (function (param) {
                                                                return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(truckWDBArrayBuffer[0], undefined, undefined, "Truck", /* () */0).then((function (uploadedWDBNodeId) {
                                                                                            var selectTree = SelectTreeTool$WonderEditor.setSelectForSelectTree(true, Curry._1(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* buildWDBGeometryFolderName */5], MainEditorAssetWDBNodeTool$WonderEditor.getWDBName(uploadedWDBNodeId, undefined, /* () */0)), StateLogicService$WonderEditor.getStateToGetData(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* buildSelectTreeForGenerateSingleRAB */0]));
                                                                                            var match = StateLogicService$WonderEditor.getStateToGetData(Curry._1(HeaderAssetBundleTool$WonderEditor.GenerateSingleRAB[/* generateSingleRABResourceData */2], selectTree));
                                                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4]), /* array */[
                                                                                                            3,
                                                                                                            4,
                                                                                                            5,
                                                                                                            2
                                                                                                          ]));
                                                                                          }));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
