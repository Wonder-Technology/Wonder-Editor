'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../tool/WDBTool.js");
var TestTool$WonderEditor = require("../../../tool/TestTool.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var SinonTool$WonderEditor = require("../../../tool/SinonTool.js");
var CanvasTool$WonderEditor = require("../../../unit/atom_component/canvas/tool/CanvasTool.js");
var ArrayService$WonderEditor = require("../../../../src/service/atom/ArrayService.js");
var InspectorTool$WonderEditor = require("../../../tool/ui/InspectorTool.js");
var OptionService$WonderEditor = require("../../../../src/service/primitive/OptionService.js");
var PickColorTool$WonderEditor = require("../../../tool/PickColorTool.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var SceneToolEngine$WonderEditor = require("../../../tool/engine/SceneToolEngine.js");
var FakeGlToolEngine$WonderEditor = require("../../../tool/engine/FakeGlToolEngine.js");
var ExportPackageTool$WonderEditor = require("../tool/ExportPackageTool.js");
var HeaderSettingTool$WonderEditor = require("../../../unit/composable_component/header/tool/HeaderSettingTool.js");
var ImportPackageTool$WonderEditor = require("./tool/ImportPackageTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../tool/BuildComponentTool.js");
var DirectorToolEngine$WonderEditor = require("../../../tool/engine/DirectorToolEngine.js");
var SceneEngineService$WonderEditor = require("../../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var ScriptEngineService$WonderEditor = require("../../../../src/service/state/engine/script/ScriptEngineService.js");
var MainEditorAssetIdTool$WonderEditor = require("../../asset/tool/MainEditorAssetIdTool.js");
var MaterialInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/atom_component/material_inspector/tool/MaterialInspectorTool.js");
var MainEditorMaterialTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js");
var GameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../unit/tool/MainEditorSceneTreeTool.js");
var CubemapTextureToolEngine$WonderEditor = require("../../../tool/engine/CubemapTextureToolEngine.js");
var MainEditorLeftHeaderTool$WonderEditor = require("../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js");
var ScriptAttributeFieldTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/script/tool/ScriptAttributeFieldTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../asset/tool/MainEditorAssetUploadTool.js");
var CubemapTextureEngineService$WonderEditor = require("../../../../src/service/state/engine/texture/CubemapTextureEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var ScriptAttributeInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/atom_component/script_inspector/tool/ScriptAttributeInspectorTool.js");
var MainEditorScriptAttributeTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/script/tool/MainEditorScriptAttributeTool.js");
var MainEditorAssetCubemapNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetCubemapNodeTool.js");
var MainEditorAssetMaterialNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetMaterialNodeTool.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var ScriptEventFunctionInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/atom_component/script_inspector/tool/ScriptEventFunctionInspectorTool.js");
var MainEditorScriptEventFunctionTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/script/tool/MainEditorScriptEventFunctionTool.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var MainEditorBasicMaterialForGameObjectTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorBasicMaterialForGameObjectTool.js");
var MainEditorLightMaterialForGameObjectTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialForGameObjectTool.js");

Wonder_jest.describe("header import package->import scene wdb", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                ImportPackageTool$WonderEditor.prepareLoad(sandbox);
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerEmptyJobConfig(/* () */0), undefined, undefined, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.testPromise("should reset scene gameObject", undefined, (function (param) {
                MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                              return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                            }), undefined, undefined, undefined, undefined, /* () */0);
              }));
        Wonder_jest.describe("test skybox", (function (param) {
                var _prepare = function (sandbox) {
                  WDBTool$WonderEditor.prepareFakeCanvas(sandbox);
                  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                  var addedCubemapNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                  var cubemapName = "ACubemap";
                  AssetInspectorTool$WonderEditor.Rename[/* renameAssetCubemapNode */1](undefined, undefined, addedCubemapNodeId1, cubemapName, /* () */0);
                  var match = MainEditorAssetCubemapNodeTool$WonderEditor.setAllSources(addedCubemapNodeId1, undefined, undefined, /* () */0);
                  var match$1 = match[0];
                  StateEditorService$WonderEditor.setState(match$1[0]);
                  StateEngineService$WonderEditor.setState(match$1[1]);
                  Curry._1(HeaderSettingTool$WonderEditor.Scene[/* Skybox */1][/* setCubemapTextureToSceneSkybox */0], MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(addedCubemapNodeId1, undefined, /* () */0));
                  var wpkArrayBuffer = ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                  Curry._1(HeaderSettingTool$WonderEditor.Scene[/* Skybox */1][/* removeCubemap */1], /* () */0);
                  return /* tuple */[
                          wpkArrayBuffer,
                          cubemapName
                        ];
                };
                Wonder_jest.testPromise("set package->skybox->cubemap", undefined, (function (param) {
                        var match = _prepare(sandbox);
                        var cubemapName = match[1];
                        return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureEngineService$WonderEditor.unsafeGetCubemapTextureName(OptionService$WonderEditor.unsafeGet(SceneEngineService$WonderEditor.getCubemapTexture(engineState)), engineState)), cubemapName));
                                    }), match[0], undefined, undefined, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("relate scene skybox->cubemap and cubemap assets", (function (param) {
                              Wonder_jest.testPromise("should set the corresponding one of cubemap assets to scene skybox", undefined, (function (param) {
                                      var match = _prepare(sandbox);
                                      return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        ImportPackageTool$WonderEditor.Cubemap[/* getImportedCubemapAssetCubemapComponents */0](/* () */0).length,
                                                                        OptionService$WonderEditor.unsafeGet(SceneEngineService$WonderEditor.getCubemapTexture(engineState))
                                                                      ]), /* tuple */[
                                                                    1,
                                                                    ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.Cubemap[/* getImportedCubemapAssetCubemapComponents */0](/* () */0))
                                                                  ]));
                                                  }), match[0], undefined, undefined, undefined, /* () */0);
                                    }));
                              return Wonder_jest.testPromise("should init scene skybox->cubemap", undefined, (function (param) {
                                            WDBTool$WonderEditor.prepareFakeCanvas(sandbox);
                                            var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            Sinon.returns(1, createTexture);
                                            var partial_arg = FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                    return FakeGlToolEngine$WonderEditor.setFakeGl(partial_arg, param);
                                                  }));
                                            var match = _prepare(sandbox);
                                            return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureToolEngine$WonderEditor.unsafeGetGlTexture(OptionService$WonderEditor.unsafeGet(SceneEngineService$WonderEditor.getCubemapTexture(engineState)), engineState)), 1));
                                                        }), match[0], undefined, undefined, undefined, /* () */0);
                                          }));
                            }));
              }));
        Wonder_jest.describe("relate scene gameObjects and material assets", (function (param) {
                Wonder_jest.testPromise("if scene gameObject use material asset, should still use it after import", undefined, (function (param) {
                        var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                        var gameObject = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                        var sourceMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState);
                        var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                        MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial, /* LightMaterial */1, materialComponent, /* LightMaterial */1, addedMaterialNodeId, gameObject, undefined, undefined, /* () */0);
                        return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, MainEditorSceneTool$WonderEditor.getFirstCube(engineState), /* () */0);
                                      return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                    }), undefined, undefined, undefined, undefined, /* () */0);
                      }));
                Wonder_jest.testPromise("if scene gameObject use default material, should still use it after import", undefined, (function (param) {
                        MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                        return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, MainEditorSceneTool$WonderEditor.getSecondCube(engineState), /* () */0);
                                      return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                    }), undefined, undefined, undefined, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("fix bug", (function (param) {
                              Wonder_jest.testPromise("test change default material to material asset after import", undefined, (function (param) {
                                      var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var gameObject = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                                      var sourceMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState);
                                      var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                      MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial, /* LightMaterial */1, materialComponent, /* LightMaterial */1, addedMaterialNodeId, gameObject, undefined, undefined, /* () */0);
                                      return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var match = ImportPackageTool$WonderEditor.getFirstImportedMaterialAssetData(/* () */0);
                                                    var gameObject = MainEditorSceneTool$WonderEditor.getSecondCube(engineState);
                                                    var sourceMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState);
                                                    MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial, /* LightMaterial */1, match[1], /* LightMaterial */1, match[0], gameObject, undefined, undefined, /* () */0);
                                                    MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, gameObject, /* () */0);
                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                                  }), undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                              return Wonder_jest.describe("test with material and texture assets", (function (param) {
                                            var _prepareFakeCanvas = function (sandbox) {
                                              var base64_1 = ImportPackageTool$WonderEditor.buildBase64_1(/* () */0);
                                              var base64_2 = ImportPackageTool$WonderEditor.buildBase64_2(/* () */0);
                                              var canvas1 = ImportPackageTool$WonderEditor.buildFakeCanvas(sandbox, base64_1, 0);
                                              var canvas2 = ImportPackageTool$WonderEditor.buildFakeCanvas(sandbox, base64_2, 1);
                                              var createElementStub = document.createElement;
                                              Sinon.returns(canvas2, Sinon.onCall(1, Sinon.returns(canvas1, Sinon.onCall(0, Sinon.withOneArg("canvas", createElementStub)))));
                                              return /* tuple */[
                                                      base64_1,
                                                      base64_2
                                                    ];
                                            };
                                            Wonder_jest.testPromise("\n          1.add material asset m1;\n          2.load texture asset t1;\n          3.drag t1 to m1->diffuseMap;\n          4.change scecne tree g1->material component to m1;\n          5.export;\n          6.import;\n\n          g1->material should be m1;\n          ", undefined, (function (param) {
                                                    var match = _prepareFakeCanvas(sandbox);
                                                    var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                    var material1 = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId1, undefined, /* () */0);
                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "1.png", match[0], /* () */0).then((function (uploadedTextureNodeId1) {
                                                                  MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, material1, uploadedTextureNodeId1, /* () */0);
                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                  var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                                                                  var sourceMaterial1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState);
                                                                  MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial1, /* LightMaterial */1, material1, /* LightMaterial */1, addedMaterialNodeId1, gameObject1, undefined, undefined, /* () */0);
                                                                  return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* array */[GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState)]), ImportPackageTool$WonderEditor.getImporteMaterialAssetMaterialComponents(/* () */0)));
                                                                              }), undefined, undefined, undefined, undefined, /* () */0);
                                                                }));
                                                  }));
                                            Wonder_jest.testPromise("\n             1.add material asset m1;\n             2.add material asset m2;\n             3.load texture asset t1;\n             4.load texture asset t2;\n             5.drag t1 to m1->diffuseMap;\n             6.drag t2 to m2->diffuseMap;\n             7.change scecne tree g1->material component to m1;\n             8.change scecne tree g2->material component to m2;\n             9.export;\n             10.import;\n\n\n             g1->material should be m1;\n             g2->material should be m2;\n             ", undefined, (function (param) {
                                                    var match = _prepareFakeCanvas(sandbox);
                                                    var base64_2 = match[1];
                                                    var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                    var addedMaterialNodeId2 = addedMaterialNodeId1 + 1 | 0;
                                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                    var material1 = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId1, undefined, /* () */0);
                                                    var material2 = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId2, undefined, /* () */0);
                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "1.png", match[0], /* () */0).then((function (uploadedTextureNodeId1) {
                                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "2.jpg", base64_2, /* () */0).then((function (uploadedTextureNodeId2) {
                                                                                MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, material1, uploadedTextureNodeId1, /* () */0);
                                                                                MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, material2, uploadedTextureNodeId2, /* () */0);
                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                                                                                var sourceMaterial1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState);
                                                                                MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial1, /* LightMaterial */1, material1, /* LightMaterial */1, addedMaterialNodeId1, gameObject1, undefined, undefined, /* () */0);
                                                                                var gameObject2 = MainEditorSceneTool$WonderEditor.getSecondCube(engineState);
                                                                                var sourceMaterial2 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject2, engineState);
                                                                                MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial2, /* LightMaterial */1, material2, /* LightMaterial */1, addedMaterialNodeId2, gameObject2, undefined, undefined, /* () */0);
                                                                                return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                              var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                                                                                              var gameObject2 = MainEditorSceneTool$WonderEditor.getSecondCube(engineState);
                                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* array */[
                                                                                                                  GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState),
                                                                                                                  GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject2, engineState)
                                                                                                                ]), ImportPackageTool$WonderEditor.getImporteMaterialAssetMaterialComponents(/* () */0)));
                                                                                            }), undefined, undefined, undefined, undefined, /* () */0);
                                                                              }));
                                                                }));
                                                  }));
                                            return Wonder_jest.testPromise("\n                 1.add material asset m1;\n                 2.add material asset m2;\n                 3.change m2 type to basic;\n                 4.set m1,m2 color;\n                 5.load texture asset t1;\n                 6.drag t1 to m1->diffuseMap;\n                 7.change scecne tree g1->material component to m1;\n                 8.change scecne tree g2->material component to m2;\n                 9.export;\n                 10.import;\n\n\n                 g1->material should be m1;\n                 g2->material should be m2;\n                 ", undefined, (function (param) {
                                                          var match = _prepareFakeCanvas(sandbox);
                                                          var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                          var addedMaterialNodeId2 = addedMaterialNodeId1 + 1 | 0;
                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                          var material1 = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId1, undefined, /* () */0);
                                                          var material2 = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId2, undefined, /* () */0);
                                                          MaterialInspectorTool$WonderEditor.changeMaterialType(material2, /* LightMaterial */1, /* BasicMaterial */0, addedMaterialNodeId2, undefined, undefined, /* () */0);
                                                          var color1 = PickColorTool$WonderEditor.buildColor1(/* () */0);
                                                          var color2 = PickColorTool$WonderEditor.buildColor2(/* () */0);
                                                          MainEditorLightMaterialForGameObjectTool$WonderEditor.changeColor(material1, color1);
                                                          MainEditorBasicMaterialForGameObjectTool$WonderEditor.changeColor(material2, color2);
                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "1.png", match[0], /* () */0).then((function (uploadedTextureNodeId1) {
                                                                        MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, material1, uploadedTextureNodeId1, /* () */0);
                                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                        var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                                                                        var sourceMaterial1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState);
                                                                        MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial1, /* LightMaterial */1, material1, /* LightMaterial */1, addedMaterialNodeId1, gameObject1, undefined, undefined, /* () */0);
                                                                        var gameObject2 = MainEditorSceneTool$WonderEditor.getSecondCube(engineState);
                                                                        var sourceMaterial2 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject2, engineState);
                                                                        MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial2, /* LightMaterial */1, material2, /* BasicMaterial */0, addedMaterialNodeId2, gameObject2, undefined, undefined, /* () */0);
                                                                        return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                      var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                                                                                      var gameObject2 = MainEditorSceneTool$WonderEditor.getSecondCube(engineState);
                                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                          /* array */[GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState)],
                                                                                                          /* array */[GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(gameObject2, engineState)]
                                                                                                        ]), /* tuple */[
                                                                                                      ImportPackageTool$WonderEditor.getImporteMaterialAssetLightMaterialComponents(/* () */0),
                                                                                                      ImportPackageTool$WonderEditor.getImporteMaterialAssetBasicMaterialComponents(/* () */0)
                                                                                                    ]));
                                                                                    }), undefined, undefined, undefined, undefined, /* () */0);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("relate scene gameObjects and script event function assets", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                        return MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("relate by event function name", (function (param) {
                              return Wonder_jest.testPromise("\n            add script event function asset sef1;\n            gameObject g1 in scene use sef1;\n            export;\n            import;\n            remove script event function asset sef1;\n\n            should remove sef1 from g1->script component;\n            ", undefined, (function (param) {
                                            var currentGameObjectName = "Cube1";
                                            var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                            StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                    return GameObjectEngineService$WonderEditor.setGameObjectName(currentGameObjectName, partial_arg, param);
                                                  }));
                                            MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                            var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                            var scriptEventFunctionDataName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                    return ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionName(addedNodeId, param);
                                                  }));
                                            MainEditorScriptEventFunctionTool$WonderEditor.addScriptEventFunction(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0), Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                            return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                          var scriptEventFunctionNodeId = ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.getImportedScriptEventFunctionAssetNodeId(/* () */0));
                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeScriptEventFunctionNode(undefined, undefined, scriptEventFunctionNodeId, /* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptEngineService$WonderEditor.hasScriptEventFunctionData(GameObjectComponentEngineService$WonderEditor.unsafeGetScriptComponent(ArrayService$WonderEditor.unsafeGetFirst(SceneToolEngine$WonderEditor.findGameObjectByName(currentGameObjectName, engineState)), engineState), scriptEventFunctionDataName, engineState)), false));
                                                        }), undefined, undefined, undefined, undefined, /* () */0);
                                          }));
                            }));
              }));
        Wonder_jest.describe("relate scene gameObjects and script attribute assets", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                        return MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("relate by attribute name", (function (param) {
                              return Wonder_jest.describe("gameObject->script component->attribute can be different from script attribute asset->attribute after import", (function (param) {
                                            return Wonder_jest.testPromise("\n                 add script attribute asset sef1;\n                 gameObject g1 in scene use sef1;\n                 update g1->script->attribute->field->defaultValue to d1;\n                 export;\n                 import;\n\n                 g1->script->attribute->field->defaultValue should still be d1;\n                 ", undefined, (function (param) {
                                                          var currentGameObjectName = "Cube1";
                                                          var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                          StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                                  return GameObjectEngineService$WonderEditor.setGameObjectName(currentGameObjectName, partial_arg, param);
                                                                }));
                                                          MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                          var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                                          ScriptAttributeInspectorTool$WonderEditor.addDefaultField(sandbox, addedNodeId, undefined, /* () */0);
                                                          var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                                          MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var attributeName = ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, engineState);
                                                          var attribute = ScriptAttributeInspectorTool$WonderEditor.getAttribute(addedNodeId, engineState);
                                                          var match = ArrayService$WonderEditor.unsafeGetFirst(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                      return ScriptAttributeInspectorTool$WonderEditor.getAttributeEntries(addedNodeId, param);
                                                                    })));
                                                          var fieldName = match[0];
                                                          StateEngineService$WonderEditor.setState(engineState);
                                                          MainEditorScriptAttributeTool$WonderEditor.changeScriptAttributeFieldDefaultValueFloat(script, attributeName, fieldName, attribute, 1.1);
                                                          return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                        ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.getImportedScriptAttributeAssetNodeId(/* () */0));
                                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAttributeFieldTool$WonderEditor.unsafeGetScriptAttributeFieldDefaultValue(GameObjectComponentEngineService$WonderEditor.unsafeGetScriptComponent(ArrayService$WonderEditor.unsafeGetFirst(SceneToolEngine$WonderEditor.findGameObjectByName(currentGameObjectName, engineState)), engineState), attributeName, fieldName, engineState)), ScriptAttributeFieldTool$WonderEditor.buildFloatValue(1.1)));
                                                                      }), undefined, undefined, undefined, undefined, /* () */0);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.testPromise("set scene gameObject->name to Scene", undefined, (function (param) {
                return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                              var partial_arg = StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject);
                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                        return GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(partial_arg, param);
                                                      }))), "Scene"));
                            }), undefined, undefined, undefined, undefined, /* () */0);
              }));
        return Wonder_jest.describe("test show Scene inspector", (function (param) {
                      return Wonder_jest.testPromise("should show component ui", undefined, (function (param) {
                                    return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                  MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, SceneEngineService$WonderEditor.getSceneGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), /* () */0);
                                                  return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                                }), undefined, undefined, undefined, undefined, /* () */0);
                                  }));
                    }));
      }));

/*  Not a pure module */
