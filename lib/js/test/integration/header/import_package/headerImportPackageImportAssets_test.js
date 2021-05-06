'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Blob$WonderEditor = require("../../../../src/core/external/Blob.js");
var WDBTool$WonderEditor = require("../../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../../asset/tool/LoadTool.js");
var TestTool$WonderEditor = require("../../../tool/TestTool.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var SinonTool$WonderEditor = require("../../../tool/SinonTool.js");
var CanvasTool$WonderEditor = require("../../../unit/atom_component/canvas/tool/CanvasTool.js");
var BufferUtils$WonderEditor = require("../../../../src/core/composable_component/header/utils/BufferUtils.js");
var ConsoleTool$WonderEditor = require("../../../unit/tool/external/ConsoleTool.js");
var LoadWDBTool$WonderEditor = require("../../tool/LoadWDBTool.js");
var ArrayService$WonderEditor = require("../../../../src/service/atom/ArrayService.js");
var InspectorTool$WonderEditor = require("../../../tool/ui/InspectorTool.js");
var OptionService$WonderEditor = require("../../../../src/service/primitive/OptionService.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var FakeGlToolEngine$WonderEditor = require("../../../tool/engine/FakeGlToolEngine.js");
var ScriptToolEngine$WonderEditor = require("../../../tool/engine/ScriptToolEngine.js");
var EventListenerTool$WonderEditor = require("../../../unit/tool/EventListenerTool.js");
var HeaderSettingTool$WonderEditor = require("../../../unit/composable_component/header/tool/HeaderSettingTool.js");
var ImportPackageTool$WonderEditor = require("./tool/ImportPackageTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../tool/BuildComponentTool.js");
var DirectorToolEngine$WonderEditor = require("../../../tool/engine/DirectorToolEngine.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var ScriptEngineService$WonderEditor = require("../../../../src/service/state/engine/script/ScriptEngineService.js");
var MainEditorAssetIdTool$WonderEditor = require("../../asset/tool/MainEditorAssetIdTool.js");
var MaterialInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/atom_component/material_inspector/tool/MaterialInspectorTool.js");
var MainEditorMaterialTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../unit/tool/MainEditorSceneTreeTool.js");
var CubemapTextureToolEngine$WonderEditor = require("../../../tool/engine/CubemapTextureToolEngine.js");
var MaterialNodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/MaterialNodeAssetService.js");
var ScriptAttributeFieldTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/script/tool/ScriptAttributeFieldTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../asset/tool/MainEditorAssetUploadTool.js");
var AssetBundleNodeAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/AssetBundleNodeAssetService.js");
var CubemapTextureEngineService$WonderEditor = require("../../../../src/service/state/engine/texture/CubemapTextureEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var OperateTreeAssetLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/asset/OperateTreeAssetLogicService.js");
var ScriptAttributeInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/atom_component/script_inspector/tool/ScriptAttributeInspectorTool.js");
var MainEditorAssetHeaderLoadTool$WonderEditor = require("../../asset/composable_component/header/tool/MainEditorAssetHeaderLoadTool.js");
var MainEditorScriptAttributeTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/script/tool/MainEditorScriptAttributeTool.js");
var CubemapTextureImageDataMapTool$WonderEditor = require("../../asset/tool/CubemapTextureImageDataMapTool.js");
var MainEditorAssetCubemapNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetCubemapNodeTool.js");
var MainEditorAssetTextureNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetTextureNodeTool.js");
var MaterialNodeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/MaterialNodeAssetEditorService.js");
var BasicSourceTextureEngineService$WonderEditor = require("../../../../src/service/state/engine/texture/BasicSourceTextureEngineService.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetChildrenNodeTool.js");
var MainEditorAssetMaterialNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetMaterialNodeTool.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var ScriptEventFunctionInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/atom_component/script_inspector/tool/ScriptEventFunctionInspectorTool.js");
var AssetBundleNodeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/AssetBundleNodeAssetEditorService.js");
var MainEditorScriptEventFunctionTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/script/tool/MainEditorScriptEventFunctionTool.js");
var BasicSourceTextureImageDataMapTool$WonderEditor = require("../../asset/tool/BasicSourceTextureImageDataMapTool.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");
var MainEditorLightMaterialForAssetTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/atom_component/material_inspector/atom_component/tool/MainEditorLightMaterialForAssetTool.js");
var ScriptAttributeNodeNameAssetService$WonderEditor = require("../../../../src/service/record/editor/asset/ScriptAttributeNodeNameAssetService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var ScriptAttributeNodeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/ScriptAttributeNodeAssetEditorService.js");
var ScriptEventFunctionNodeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/ScriptEventFunctionNodeAssetEditorService.js");
var CubemapTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/imageDataMap/CubemapTextureImageDataMapAssetEditorService.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");

Wonder_jest.describe("header import package", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                ImportPackageTool$WonderEditor.prepareLoad(sandbox);
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorAssetHeaderLoadTool$WonderEditor.prepareInspectorCanvas(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test import material assets", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                        return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                      }));
                Wonder_jest.testPromise("should add material assets to asset tree", undefined, (function (param) {
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                        return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                      return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                    }), undefined, undefined, undefined, undefined, /* () */0);
                      }));
                Wonder_jest.describe("should draw all materials->snapshot", (function (param) {
                        return Wonder_jest.testPromise("\n              add new material m1;\n              change m1 color;\n              close color picker;\n              export;\n              import;\n\n              m1->snapshot should equal between before import and after import;\n              ", undefined, (function (param) {
                                      var match = MainEditorLightMaterialForAssetTool$WonderEditor.prepareInspectorMaterialSphereAndImgCanvas(sandbox, undefined, undefined, /* () */0);
                                      var addedMaterialNodeId = match[0];
                                      var newMaterialName = OptionService$WonderEditor.unsafeGet(OperateTreeAssetLogicService$WonderEditor.getNodeNameById(addedMaterialNodeId, /* tuple */[
                                                StateEditorService$WonderEditor.getState(/* () */0),
                                                StateEngineService$WonderEditor.unsafeGetState(/* () */0)
                                              ]));
                                      var materialSnapshotObjectURL = "redraw_material_snapshot_objectURL";
                                      MainEditorLightMaterialForAssetTool$WonderEditor.closeColorPicker(match[1], addedMaterialNodeId, "#7df1e8", undefined, undefined, /* () */0);
                                      var uint8Array = BufferUtils$WonderEditor.convertBase64ToUint8Array(match[2]);
                                      var blob = Blob$WonderEditor.newBlobFromArrayBuffer(uint8Array.buffer, "image/png");
                                      var createObjectURL = LoadTool$WonderEditor.getFakeCreateObjectURL(/* () */0);
                                      Sinon.returns(materialSnapshotObjectURL, Sinon.withOneArg(blob, createObjectURL));
                                      return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var match = MaterialNodeAssetService$WonderEditor.getNodeData(OptionService$WonderEditor.unsafeGet(OperateTreeAssetLogicService$WonderEditor.findNodeByName(newMaterialName, /* tuple */[
                                                                  editorState,
                                                                  engineState
                                                                ])));
                                                    var param$1 = BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.unsafeGetData(match[/* snapshotImageDataIndex */2], editorState);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(param$1[/* blobObjectURL */2])), materialSnapshotObjectURL));
                                                  }), undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                      }));
                return Wonder_jest.describe("fix bug", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, false, undefined, undefined, /* () */0);
                                      MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                                      StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                      MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                      DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      CanvasTool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                      return /* () */0;
                                    }));
                              return Wonder_jest.testPromise("\n          1.add material asset m1;\n          2.export;\n          3.import;\n          4.change scecne tree gameObject->material component to m1;\n          5.change m1->type to BasicMaterial\n          6.change m1->type to LightMaterial\n\n          MaterialInspector should be LightMaterial\n          ", undefined, (function (param) {
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                            return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                          var match = ImportPackageTool$WonderEditor.getFirstImportedMaterialAssetData(/* () */0);
                                                          var materialComponent = match[1];
                                                          var materialNodeId = match[0];
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var gameObject = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                                                          var sourceMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState);
                                                          MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial, /* LightMaterial */1, materialComponent, /* LightMaterial */1, materialNodeId, gameObject, undefined, undefined, /* () */0);
                                                          MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(materialNodeId, undefined, undefined, /* () */0);
                                                          MaterialInspectorTool$WonderEditor.changeMaterialType(materialComponent, /* LightMaterial */1, /* BasicMaterial */0, materialNodeId, undefined, undefined, /* () */0);
                                                          MaterialInspectorTool$WonderEditor.changeMaterialType(materialComponent, /* BasicMaterial */0, /* LightMaterial */1, materialNodeId, undefined, undefined, /* () */0);
                                                          MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(materialNodeId, undefined, undefined, /* () */0);
                                                          return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                                        }), undefined, undefined, undefined, undefined, /* () */0);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test import texture assets", (function (param) {
                beforeEach((function () {
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                      }));
                Wonder_jest.testPromise("should add texture assets to asset tree", undefined, (function (param) {
                        return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "loadImg.png", "newImgBase64", /* () */0).then((function (uploadedTextureNodeId) {
                                      return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                  }), undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                      }));
                Wonder_jest.describe("should keep texture data not change", (function (param) {
                        var _test = function (value, param) {
                          var setValueFunc = param[1];
                          var getValueFunc = param[0];
                          return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var texture = MainEditorAssetTextureNodeTool$WonderEditor.getTextureComponent(uploadedTextureNodeId, editorState);
                                        var engineState$1 = Curry._3(setValueFunc, value, texture, engineState);
                                        StateEditorService$WonderEditor.setState(editorState);
                                        StateEngineService$WonderEditor.setState(engineState$1);
                                        return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var textureComponent = ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.getImportedTextureAssetTextureComponents(/* () */0));
                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._2(getValueFunc, textureComponent, engineState)), value));
                                                    }), undefined, undefined, undefined, undefined, /* () */0);
                                      }));
                        };
                        Wonder_jest.testPromise("test format", undefined, (function (param) {
                                return _test(/* Luminance */3, /* tuple */[
                                            BasicSourceTextureEngineService$WonderEditor.getFormat,
                                            BasicSourceTextureEngineService$WonderEditor.setFormat
                                          ]);
                              }));
                        Wonder_jest.testPromise("test type_", undefined, (function (param) {
                                return _test(3, /* tuple */[
                                            BasicSourceTextureEngineService$WonderEditor.getType,
                                            BasicSourceTextureEngineService$WonderEditor.setType
                                          ]);
                              }));
                        return Wonder_jest.testPromise("test flipY", undefined, (function (param) {
                                      return _test(false, /* tuple */[
                                                  BasicSourceTextureEngineService$WonderEditor.getFlipY,
                                                  BasicSourceTextureEngineService$WonderEditor.setFlipY
                                                ]);
                                    }));
                      }));
                return Wonder_jest.describe("should set data to basicSourceTextureImageDataMap", (function (param) {
                              return Wonder_jest.testPromise("should set uint8Array", undefined, (function (param) {
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                          return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                        var partial_arg = ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.getImportedTextureAssetNodes(/* () */0));
                                                                        var param$1 = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                return BasicSourceTextureImageDataMapTool$WonderEditor.getDataByTextureNode(partial_arg, param);
                                                                              }));
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(param$1[/* uint8Array */1]).length), 3));
                                                                      }), undefined, undefined, undefined, undefined, /* () */0);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test import cubemap assets", (function (param) {
                beforeEach((function () {
                        return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                      }));
                Wonder_jest.testPromise("should add cubemap assets to asset tree", undefined, (function (param) {
                        ImportPackageTool$WonderEditor.Cubemap[/* prepareForAddOneCubemapAsset */1](sandbox);
                        return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                      return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                    }), undefined, undefined, undefined, undefined, /* () */0);
                      }));
                Wonder_jest.describe("should keep cubemap data not change", (function (param) {
                        var _prepare = function (value, setValueFunc) {
                          var match = ImportPackageTool$WonderEditor.Cubemap[/* prepareForAddOneCubemapAsset */1](sandbox);
                          var match$1 = match[1];
                          var match$2 = match[0];
                          var texture = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(match[2], undefined, /* () */0);
                          StateLogicService$WonderEditor.getAndSetEngineState(Curry._2(setValueFunc, value, texture));
                          return /* tuple */[
                                  /* tuple */[
                                    match$2[0],
                                    match$2[1],
                                    match$2[2],
                                    match$2[3],
                                    match$2[4],
                                    match$2[5]
                                  ],
                                  /* tuple */[
                                    match$1[0],
                                    match$1[1],
                                    match$1[2],
                                    match$1[3],
                                    match$1[4],
                                    match$1[5]
                                  ]
                                ];
                        };
                        var _test = function (value, param) {
                          var getValueFunc = param[0];
                          _prepare(value, param[1]);
                          return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var textureComponent = ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.Cubemap[/* getImportedCubemapAssetCubemapComponents */0](/* () */0));
                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._2(getValueFunc, textureComponent, engineState)), value));
                                      }), undefined, undefined, undefined, undefined, /* () */0);
                        };
                        Wonder_jest.testPromise("test source", undefined, (function (param) {
                                var newSourceName = "b3.png";
                                var newSource = CubemapTextureToolEngine$WonderEditor.buildSource(undefined, undefined, undefined, newSourceName, /* () */0);
                                var match = ImportPackageTool$WonderEditor.Cubemap[/* prepareForAddOneCubemapAsset */1](sandbox);
                                var texture = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(match[2], undefined, /* () */0);
                                MainEditorAssetCubemapNodeTool$WonderEditor.changeFaceSource(texture, newSource, undefined, CubemapTextureEngineService$WonderEditor.setPYSource, undefined, CubemapTextureImageDataMapAssetEditorService$WonderEditor.setPYImageData, undefined, undefined, /* () */0);
                                return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var textureComponent = ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.Cubemap[/* getImportedCubemapAssetCubemapComponents */0](/* () */0));
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureEngineService$WonderEditor.unsafeGetPYSource(textureComponent, engineState).name), newSourceName));
                                            }), undefined, undefined, undefined, undefined, /* () */0);
                              }));
                        Wonder_jest.testPromise("test format", undefined, (function (param) {
                                return _test(/* Luminance */3, /* tuple */[
                                            CubemapTextureEngineService$WonderEditor.getPYFormat,
                                            CubemapTextureEngineService$WonderEditor.setPYFormat
                                          ]);
                              }));
                        Wonder_jest.testPromise("test type_", undefined, (function (param) {
                                return _test(3, /* tuple */[
                                            CubemapTextureEngineService$WonderEditor.getNZType,
                                            CubemapTextureEngineService$WonderEditor.setNZType
                                          ]);
                              }));
                        return Wonder_jest.testPromise("test flipY", undefined, (function (param) {
                                      return _test(false, /* tuple */[
                                                  CubemapTextureEngineService$WonderEditor.getFlipY,
                                                  CubemapTextureEngineService$WonderEditor.setFlipY
                                                ]);
                                    }));
                      }));
                Wonder_jest.describe("should set data to cubemapTextureImageDataMap", (function (param) {
                        return Wonder_jest.testPromise("should set uint8Array", undefined, (function (param) {
                                      ImportPackageTool$WonderEditor.Cubemap[/* prepareForAddOneCubemapAsset */1](sandbox);
                                      return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                    var partial_arg = MainEditorAssetCubemapNodeTool$WonderEditor.getImageDataIndexByTextureComponent(ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.Cubemap[/* getImportedCubemapAssetCubemapComponents */0](/* () */0)), undefined, /* () */0);
                                                    var param$1 = OptionService$WonderEditor.unsafeGet(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                return CubemapTextureImageDataMapTool$WonderEditor.getPXImageData(partial_arg, param);
                                                              })));
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(param$1[/* uint8Array */1]).length), 156));
                                                  }), undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                      }));
                return Wonder_jest.describe("fix bug", (function (param) {
                              Wonder_jest.testPromise("support cubemap asset with no sources", undefined, (function (param) {
                                      WDBTool$WonderEditor.prepareFakeCanvas(sandbox);
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                                      return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                  }), undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                              return Wonder_jest.describe("export asb->wdb shouldn't contain skybox data", (function (param) {
                                            var sceneWDBArrayBuffer = /* record */[/* contents */1];
                                            beforeAll((function () {
                                                    sceneWDBArrayBuffer[0] = WDBTool$WonderEditor.Cubemap[/* generateWDBWithBasicSourceTextureAndSkyboxCubemap */1](/* () */0);
                                                    return /* () */0;
                                                  }));
                                            beforeEach((function () {
                                                    Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                                    LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                                                    LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                                                    return LoadTool$WonderEditor.buildFakeLoadImage();
                                                  }));
                                            return Wonder_jest.testPromise("\n            load wdb w1 with skybox data;\n            set w1->cubemap to scene skybox;\n            export;\n            import;\n\n            shouldn't error;\n            ", undefined, (function (param) {
                                                          WDBTool$WonderEditor.prepareFakeCanvas(sandbox);
                                                          TestTool$WonderEditor.openContractCheck(/* () */0);
                                                          ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                                          var errorStub = Curry._3(Sinon.createMethodStub, sandbox[0], console, "error");
                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                        Curry._1(HeaderSettingTool$WonderEditor.Scene[/* Skybox */1][/* setCubemapTextureToSceneSkybox */0], StateLogicService$WonderEditor.getEditorState(WDBTool$WonderEditor.Cubemap[/* findSkyboxCubemapFromLoadedWDB */2]));
                                                                        return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                                      return Promise.resolve(ConsoleTool$WonderEditor.judgeNotError(errorStub));
                                                                                    }), undefined, undefined, undefined, undefined, /* () */0);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test import wdb assets", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, false, undefined, undefined, /* () */0);
                        MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                        StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                        CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                        return /* () */0;
                      }));
                Wonder_jest.describe("relate wdb asset gameObjects and material assets", (function (param) {
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, false, undefined, undefined, /* () */0);
                                MainEditorAssetHeaderLoadTool$WonderEditor.prepareInspectorCanvas(sandbox);
                                MainEditorSceneTool$WonderEditor.createDefaultComponents(/* () */0);
                                var partial_arg = FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                        return FakeGlToolEngine$WonderEditor.setFakeGl(partial_arg, param);
                                      }));
                                DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                ImportPackageTool$WonderEditor.prepareFakeCanvas(sandbox);
                                LoadTool$WonderEditor.clearBlobData();
                                return LoadTool$WonderEditor.buildFakeBlob();
                              }));
                        return Wonder_jest.testPromise("test", undefined, (function (param) {
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                    return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                  var __x = LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObject(engineState);
                                                                  var material = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(__x, engineState);
                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                      MainEditorAssetMaterialNodeTool$WonderEditor.hasMaterialComponent(material, LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectMaterialType(/* () */0), editorState),
                                                                                      MaterialNodeAssetEditorService$WonderEditor.findAllMaterialNodes(editorState).length
                                                                                    ]), /* tuple */[
                                                                                  true,
                                                                                  1
                                                                                ]));
                                                                }), undefined, undefined, undefined, undefined, /* () */0);
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("relate wdb asset gameObjects and script event function assets", (function (param) {
                        var wdbArrayBuffer = /* record */[/* contents */1];
                        var scriptEventFunctionDataNameRef = /* record */[/* contents */""];
                        var scriptEventFunctionDataRef = /* record */[/* contents */1];
                        beforeAll((function () {
                                scriptEventFunctionDataNameRef[0] = "aaa";
                                scriptEventFunctionDataRef[0] = ScriptToolEngine$WonderEditor.buildScriptEventFunctionData(undefined, Caml_option.some(ScriptToolEngine$WonderEditor.buildSetLocalPositionEventFunc(/* () */0)), undefined);
                                wdbArrayBuffer[0] = WDBTool$WonderEditor.ScriptEventFunction[/* generateScriptEventFunctionWDB */1](scriptEventFunctionDataNameRef[0], scriptEventFunctionDataRef[0]);
                                return /* () */0;
                              }));
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                              }));
                        return Wonder_jest.describe("relate by event function name", (function (param) {
                                      return Wonder_jest.testPromise("\n            add script event function asset sef1;\n            load wdb which has the script gameObject that its script component has the event function data with the same name of sef1;\n            export;\n            import;\n            drag wdb gameObject to scene to be g1;\n            remove script event function asset sef1;\n\n            should remove sef1 from g1->script gameObject->script component;\n            ", undefined, (function (param) {
                                                    MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                    var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                                    AssetInspectorTool$WonderEditor.Rename[/* renameAssetScriptEventFunctionNode */3](undefined, undefined, addedNodeId, scriptEventFunctionDataNameRef[0], /* () */0);
                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                  return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                                var wdbNodeId = ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.getImportedWDBAssetNodeId(/* () */0));
                                                                                MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](wdbNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                                var scriptEventFunctionNodeId = ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.getImportedScriptEventFunctionAssetNodeId(/* () */0));
                                                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeScriptEventFunctionNode(undefined, undefined, scriptEventFunctionNodeId, /* () */0);
                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptEngineService$WonderEditor.hasScriptEventFunctionData(GameObjectComponentEngineService$WonderEditor.unsafeGetScriptComponent(WDBTool$WonderEditor.ScriptEventFunction[/* getScriptGameObject */2](engineState), engineState), scriptEventFunctionDataNameRef[0], engineState)), false));
                                                                              }), undefined, undefined, undefined, undefined, /* () */0);
                                                                }));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("relate wdb gameObjects and script attribute assets", (function (param) {
                              var wdbArrayBuffer = /* record */[/* contents */1];
                              var scriptAttributeNameRef = /* record */[/* contents */""];
                              var scriptAttributeRef = /* record */[/* contents */1];
                              beforeAll((function () {
                                      scriptAttributeNameRef[0] = "aaa";
                                      scriptAttributeRef[0] = ScriptToolEngine$WonderEditor.buildScriptAttribute(scriptAttributeNameRef[0]);
                                      wdbArrayBuffer[0] = WDBTool$WonderEditor.ScriptAttribute[/* generateScriptAttributeWDB */3](scriptAttributeNameRef[0], scriptAttributeRef[0]);
                                      return /* () */0;
                                    }));
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                      return MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
                                    }));
                              return Wonder_jest.describe("relate by attribute name", (function (param) {
                                            return Wonder_jest.describe("wdb gameObject->script component->attribute can be different from script attribute asset->attribute after import", (function (param) {
                                                          return Wonder_jest.testPromise("\n                   add script attribute asset sef1 with two fields;\n                   load wdb which has the script gameObject that its script component has the attribute with the same name of sef1 but with one field;\n                   export;\n                   import;\n                   drag wdb gameObject to scene to be g1;\n\n                   g1->script->attribute should still has one field;\n                   ", undefined, (function (param) {
                                                                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                                        var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                                                        ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                                                                        ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                                                                        AssetInspectorTool$WonderEditor.Rename[/* renameAssetScriptAttributeNode */2](undefined, undefined, addedNodeId, scriptAttributeNameRef[0], /* () */0);
                                                                        var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                                                        MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                                      return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                                                    var wdbNodeId = ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.getImportedWDBAssetNodeId(/* () */0));
                                                                                                    StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](wdbNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                                                    StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAttributeFieldTool$WonderEditor.getScriptAttributeFieldCount(GameObjectComponentEngineService$WonderEditor.unsafeGetScriptComponent(WDBTool$WonderEditor.ScriptEventFunction[/* getScriptGameObject */2](engineState), engineState), scriptAttributeNameRef[0], engineState)), 1));
                                                                                                  }), undefined, undefined, undefined, undefined, /* () */0);
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test import script event function assets", (function (param) {
                Wonder_jest.testPromise("should add script event function assets to asset tree", undefined, (function (param) {
                        MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                        MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                        return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(ScriptEventFunctionNodeAssetEditorService$WonderEditor.findAllScriptEventFunctionNodes).length), 2));
                                    }), undefined, undefined, undefined, undefined, /* () */0);
                      }));
                Wonder_jest.testPromise("script event function assets->event function data should keep the same", undefined, (function (param) {
                        MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                        MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                        var addedNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                        var jsObjStr = ScriptEventFunctionInspectorTool$WonderEditor.buildEventFunctionDataJsObjStrAndRemoveNewLinesAndSpaces(Caml_option.some(Caml_option.some((function (script, api, state) {
                                        return state;
                                      }))), undefined, Caml_option.some(Caml_option.some((function (script, api, state) {
                                        return state;
                                      }))), /* () */0);
                        var eventFunctionName2 = StateLogicService$WonderEditor.getEditorState((function (param) {
                                return ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionName(addedNodeId2, param);
                              }));
                        ScriptEventFunctionInspectorTool$WonderEditor.updateEventFunctionData(addedNodeId2, eventFunctionName2, jsObjStr);
                        return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                      var nodeId2 = ArrayService$WonderEditor.unsafeGetNth(1, ImportPackageTool$WonderEditor.getImportedScriptEventFunctionAssetNodeId(/* () */0));
                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                return ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionDataJsObjStr(nodeId2, param);
                                                              }))), jsObjStr));
                                    }), undefined, undefined, undefined, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("test with script component", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                      return MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
                                    }));
                              return Wonder_jest.testPromise("\n          first cube gameObject g1 add script component s1;\n          add script event function asset sef1;\n          s1 add sef1;\n          export;\n          import;\n\n          first cube gameObject->script component should has sef1;\n          ", undefined, (function (param) {
                                            var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                            var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                            var eventFunctionName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                    return ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionName(addedNodeId, param);
                                                  }));
                                            MainEditorScriptEventFunctionTool$WonderEditor.addScriptEventFunction(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                            return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                          var partial_arg = StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getFirstCube);
                                                          var script = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return GameObjectComponentEngineService$WonderEditor.unsafeGetScriptComponent(partial_arg, param);
                                                                }));
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                    return ScriptEngineService$WonderEditor.hasScriptEventFunctionData(script, eventFunctionName, param);
                                                                                  }))), true));
                                                        }), undefined, undefined, undefined, undefined, /* () */0);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test import script attribute assets", (function (param) {
                Wonder_jest.testPromise("should add script attribute assets to asset tree", undefined, (function (param) {
                        MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                        MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                        return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(ScriptAttributeNodeAssetEditorService$WonderEditor.findAllScriptAttributeNodes).length), 2));
                                    }), undefined, undefined, undefined, undefined, /* () */0);
                      }));
                Wonder_jest.describe("script attribute assets->attribute should keep the same", (function (param) {
                        Wonder_jest.testPromise("test has two default fields", undefined, (function (param) {
                                MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                var addedNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId1, undefined, /* () */0);
                                ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId1, undefined, /* () */0);
                                return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                              var nodeId1 = ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.getImportedScriptAttributeAssetNodeId(/* () */0));
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                        return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(nodeId1, param);
                                                                      })).length), 2));
                                            }), undefined, undefined, undefined, undefined, /* () */0);
                              }));
                        return Wonder_jest.testPromise("test set field data", undefined, (function (param) {
                                      MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      var addedNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                      ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId1, undefined, /* () */0);
                                      var match = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                  return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId1, param);
                                                })));
                                      ScriptAttributeInspectorTool$WonderEditor.updateScriptAttributeNodeByReplaceFieldData(addedNodeId1, /* tuple */[
                                            match[0],
                                            ScriptAttributeInspectorTool$WonderEditor.buildFieldJsObj("float", 0.1)
                                          ]);
                                      return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                    var nodeId1 = ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.getImportedScriptAttributeAssetNodeId(/* () */0));
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                  return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(nodeId1, param);
                                                                                })))), /* tuple */[
                                                                    ScriptAttributeNodeNameAssetService$WonderEditor.getNewFieldName(/* () */0),
                                                                    ScriptAttributeInspectorTool$WonderEditor.buildField(/* Float */1, 0.1)
                                                                  ]));
                                                  }), undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                      }));
                return Wonder_jest.describe("test with script component", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                      return MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
                                    }));
                              return Wonder_jest.testPromise("\n             first cube gameObject g1 add script component s1;\n             add script attribute asset sa1;\n             s1 add sa1;\n             export;\n             import;\n\n             first cube gameObject->script component should has sa1;\n             ", undefined, (function (param) {
                                            var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                            var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                            var attributeName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                    return ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, param);
                                                  }));
                                            MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                            return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                          var partial_arg = StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getFirstCube);
                                                          var script = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return GameObjectComponentEngineService$WonderEditor.unsafeGetScriptComponent(partial_arg, param);
                                                                }));
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                    return ScriptEngineService$WonderEditor.hasScriptAttributeData(script, attributeName, param);
                                                                                  }))), true));
                                                        }), undefined, undefined, undefined, undefined, /* () */0);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test import asset bundle assets", (function (param) {
                      return Wonder_jest.testPromise("should add asset bundle assets to asset tree", undefined, (function (param) {
                                    MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                    MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                    var assetBundle1 = new ArrayBuffer(14);
                                    var assetBundle2 = new ArrayBuffer(12);
                                    return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "A.rab", Caml_option.some(assetBundle1), /* () */0).then((function (uploadedAssetBundleNodeId1) {
                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, "B.wab", Caml_option.some(assetBundle2), /* () */0).then((function (uploadedAssetBundleNodeId2) {
                                                                return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(AssetBundleNodeAssetEditorService$WonderEditor.findAllAssetBundleNodes).map(AssetBundleNodeAssetService$WonderEditor.getNodeData)), /* array */[
                                                                                              /* record */[
                                                                                                /* name */"A",
                                                                                                /* type_ : RAB */0,
                                                                                                /* assetBundle */assetBundle1
                                                                                              ],
                                                                                              /* record */[
                                                                                                /* name */"B",
                                                                                                /* type_ : WAB */2,
                                                                                                /* assetBundle */assetBundle2
                                                                                              ]
                                                                                            ]));
                                                                            }), undefined, undefined, undefined, undefined, /* () */0);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
