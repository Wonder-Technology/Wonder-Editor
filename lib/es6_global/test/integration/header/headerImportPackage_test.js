

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as WDBTool$WonderEditor from "../../tool/WDBTool.js";
import * as LoadTool$WonderEditor from "../asset/tool/LoadTool.js";
import * as TestTool$WonderEditor from "../../tool/TestTool.js";
import * as JudgeTool$WonderEditor from "../../tool/JudgeTool.js";
import * as ConsoleTool$WonderEditor from "../../unit/tool/external/ConsoleTool.js";
import * as LoadWDBTool$WonderEditor from "../tool/LoadWDBTool.js";
import * as ArrayService$WonderEditor from "../../../src/service/atom/ArrayService.js";
import * as InspectorTool$WonderEditor from "../../tool/ui/InspectorTool.js";
import * as OptionService$WonderEditor from "../../../src/service/primitive/OptionService.js";
import * as PickColorTool$WonderEditor from "../../tool/PickColorTool.js";
import * as ReactTestTool$WonderEditor from "../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../tool/GameObjectTool.js";
import * as GameObjectUtils$WonderEditor from "../../../src/core/utils/engine/GameObjectUtils.js";
import * as SceneToolEngine$WonderEditor from "../../tool/engine/SceneToolEngine.js";
import * as FakeGlToolEngine$WonderEditor from "../../tool/engine/FakeGlToolEngine.js";
import * as JobEngineService$WonderEditor from "../../../src/service/state/engine/JobEngineService.js";
import * as SparseMapService$WonderEditor from "../../../src/service/atom/SparseMapService.js";
import * as ExportPackageTool$WonderEditor from "./tool/ExportPackageTool.js";
import * as ImportPackageTool$WonderEditor from "./tool/ImportPackageTool.js";
import * as SettingToolEngine$WonderEditor from "../../tool/engine/SettingToolEngine.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../tool/BuildComponentTool.js";
import * as DirectorToolEngine$WonderEditor from "../../tool/engine/DirectorToolEngine.js";
import * as GeometryToolEngine$WonderEditor from "../../tool/engine/GeometryToolEngine.js";
import * as SceneEngineService$WonderEditor from "../../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as GameObjectToolEngine$WonderEditor from "../../tool/engine/GameObjectToolEngine.js";
import * as GeometryEngineService$WonderEditor from "../../../src/service/state/engine/GeometryEngineService.js";
import * as MainEditorAssetIdTool$WonderEditor from "../asset/tool/MainEditorAssetIdTool.js";
import * as MaterialInspectorTool$WonderEditor from "../inspector/composable_component/assetTree_inspector/atom_component/material_inspector/tool/MaterialInspectorTool.js";
import * as MainEditorMaterialTool$WonderEditor from "../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js";
import * as PrimitiveEngineService$WonderEditor from "../../../src/service/state/engine/PrimitiveEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../src/service/state/engine/GameObjectEngineService.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../unit/tool/MainEditorSceneTreeTool.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";
import * as GeometryAssetLogicService$WonderEditor from "../../../src/service/stateTuple/logic/asset/GeometryAssetLogicService.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../asset/tool/MainEditorAssetUploadTool.js";
import * as LightMaterialEngineService$WonderEditor from "../../../src/service/state/engine/LightMaterialEngineService.js";
import * as MainEditorAssetWDBNodeTool$WonderEditor from "../asset/tool/MainEditorAssetWDBNodeTool.js";
import * as MainEditorBasicMaterialTool$WonderEditor from "../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorBasicMaterialTool.js";
import * as MainEditorLightMaterialTool$WonderEditor from "../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GeometryDataAssetEditorService$WonderEditor from "../../../src/service/state/editor/asset/GeometryDataAssetEditorService.js";
import * as MainEditorAssetTextureNodeTool$WonderEditor from "../asset/tool/MainEditorAssetTextureNodeTool.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../src/service/state/engine/BasicSourceTextureEngineService.js";
import * as MainEditorAssetChildrenNodeTool$WonderEditor from "../asset/tool/MainEditorAssetChildrenNodeTool.js";
import * as MainEditorAssetMaterialNodeTool$WonderEditor from "../asset/tool/MainEditorAssetMaterialNodeTool.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../src/service/state/editor/asset/MaterialNodeMapAssetEditorService.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../asset/tool/MainEditorAssetHeaderOperateNodeTool.js";

describe("header import package", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
        var directionPointLightsAndBoxWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function (param) {
                boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                directionPointLightsAndBoxWDBArrayBuffer[0] = WDBTool$WonderEditor.generateDirectionPointLightsAndBoxWDB(/* () */0);
                return /* () */0;
              }));
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                Curry._1(LoadTool$WonderEditor.buildFakeAtob, /* () */0);
                Curry._1(LoadTool$WonderEditor.buildFakeBtoa, /* () */0);
                Curry._1(LoadTool$WonderEditor.buildFakeTextEncoder, /* () */0);
                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                Curry._1(LoadTool$WonderEditor.buildFakeLoadImage, /* () */0);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                return /* () */0;
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("dispose assets", (function (param) {
                describe("dispose wdb assets", (function (param) {
                        beforeEach((function (param) {
                                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, false, undefined, /* () */0);
                                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                              }));
                        describe("dispose geometry assets", (function (param) {
                                Wonder_jest.testPromise("\n          1.load BoxTextured wdb asset w1;\n          2.drag w1 to scene tree to be gameObject g1;\n          3.export;\n          4.import;\n\n\n          g1->geometry->select geometry group widget should have only one wdb geometry and be using it\n          ", (function (param) {
                                        ImportPackageTool$WonderEditor.prepareFakeCanvas(sandbox);
                                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                      MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                      return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                    GameObjectTool$WonderEditor.setCurrentSceneTreeNode(LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObject(engineState));
                                                                    MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* () */0);
                                                                    var component = BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0);
                                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(component));
                                                                  }), undefined, undefined, undefined, undefined, /* () */0);
                                                    }));
                                      }));
                                return Wonder_jest.testPromise("should dispose geometry engine data", (function (param) {
                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                            var geometryAssets = GeometryAssetLogicService$WonderEditor.getGeometryAssets(editorState, engineState);
                                                            ImportPackageTool$WonderEditor.disposeAssets(/* () */0);
                                                            var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](geometryAssets.filter((function (geometryAsset) {
                                                                                      return !GeometryToolEngine$WonderEditor.isGeometryDisposed(geometryAsset, engineState$1);
                                                                                    })).length), 0));
                                                          }));
                                            }));
                              }));
                        describe("dispose wdb gameObjects", (function (param) {
                                var wdbArrayBuffer = /* record */[/* contents */1];
                                var generateWDB = function (param) {
                                  return WDBTool$WonderEditor.generateWDB((function (editorState, engineState) {
                                                var match = GeometryEngineService$WonderEditor.createSphereGeometry(1, 3, engineState);
                                                var match$1 = LightMaterialEngineService$WonderEditor.create(match[0]);
                                                var match$2 = PrimitiveEngineService$WonderEditor.createCube(/* tuple */[
                                                      match[1],
                                                      match$1[1]
                                                    ], editorState, match$1[0]);
                                                var editorState$1 = match$2[0];
                                                var defaultCubeGeometryComponent = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState$1);
                                                var match$3 = LightMaterialEngineService$WonderEditor.create(match$2[1]);
                                                var match$4 = PrimitiveEngineService$WonderEditor.createCube(/* tuple */[
                                                      defaultCubeGeometryComponent,
                                                      match$3[1]
                                                    ], editorState$1, match$3[0]);
                                                var match$5 = GameObjectEngineService$WonderEditor.create(match$4[1]);
                                                var rootGameObject = match$5[1];
                                                var engineState$1 = GameObjectUtils$WonderEditor.addChild(rootGameObject, match$4[2], GameObjectUtils$WonderEditor.addChild(rootGameObject, match$2[2], match$5[0]));
                                                return /* tuple */[
                                                        rootGameObject,
                                                        /* tuple */[
                                                          match$4[0],
                                                          engineState$1
                                                        ]
                                                      ];
                                              }));
                                };
                                beforeAll((function (param) {
                                        wdbArrayBuffer[0] = generateWDB(/* () */0);
                                        return /* () */0;
                                      }));
                                return Wonder_jest.testPromise("should dispose gameObject engine data", (function (param) {
                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                            var allWDBGameObjects = MainEditorAssetWDBNodeTool$WonderEditor.getAllWDBGameObjects(editorState, engineState);
                                                            ImportPackageTool$WonderEditor.disposeAssets(/* () */0);
                                                            var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](allWDBGameObjects.filter((function (gameObject) {
                                                                                      return GameObjectToolEngine$WonderEditor.isAlive(gameObject, engineState$1);
                                                                                    })).length), 0));
                                                          }));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("dispose material assets", (function (param) {
                        beforeEach((function (param) {
                                MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                ImportPackageTool$WonderEditor.prepareFakeCanvas(sandbox);
                                return /* () */0;
                              }));
                        return Wonder_jest.testPromise("\n          1.load BoxTextured wdb asset w1;\n          2.drag w1 to scene tree to be gameObject g1;\n          3.export;\n          4.import;\n\n          g1->material->select material group widget should have only one wdb material\n          ", (function (param) {
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                    return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                  GameObjectTool$WonderEditor.setCurrentSceneTreeNode(LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObject(engineState));
                                                                  return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMaterial(GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), undefined, undefined, true, /* () */0)));
                                                                }), undefined, undefined, undefined, undefined, /* () */0);
                                                  }));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("reallocate", (function (param) {
                describe("reallocate geometry", (function (param) {
                        beforeEach((function (param) {
                                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), SettingToolEngine$WonderEditor.buildBufferConfigStr(5000, 5, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), false, undefined, /* () */0);
                                MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                ImportPackageTool$WonderEditor.prepareFakeCanvas(sandbox);
                                return /* () */0;
                              }));
                        return Wonder_jest.testPromise("if geometry-buffer-use percent >= 10%, reallocate geometry to new buffer", (function (param) {
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var verticesBeforeImport = GeometryToolEngine$WonderEditor.getVertices(engineState);
                                                    return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](JudgeTool$WonderEditor.isSame(GeometryToolEngine$WonderEditor.getVertices(engineState), verticesBeforeImport)), false));
                                                                }), undefined, undefined, undefined, undefined, /* () */0);
                                                  }));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test import scene wdb", (function (param) {
                beforeEach((function (param) {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, false, undefined, /* () */0);
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                        DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                        return /* () */0;
                      }));
                Wonder_jest.testPromise("should reset scene gameObject", (function (param) {
                        MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                        return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                      return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0))));
                                    }), undefined, undefined, undefined, undefined, /* () */0);
                      }));
                describe("relate scene gameObjects and material assets", (function (param) {
                        Wonder_jest.testPromise("if scene gameObject use material asset, should still use it after import", (function (param) {
                                var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                var gameObject = MainEditorSceneTool$WonderEditor.getFirstBox(engineState);
                                var sourceMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState);
                                var match = MaterialNodeMapAssetEditorService$WonderEditor.unsafeGetResult(addedMaterialNodeId, StateEditorService$WonderEditor.getState(/* () */0));
                                MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial, /* LightMaterial */1, match[/* materialComponent */2], /* LightMaterial */1, addedMaterialNodeId, gameObject, undefined, undefined, /* () */0);
                                return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, MainEditorSceneTool$WonderEditor.getFirstBox(engineState), /* () */0);
                                              return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                            }), undefined, undefined, undefined, undefined, /* () */0);
                              }));
                        Wonder_jest.testPromise("if scene gameObject use default material, should still use it after import", (function (param) {
                                MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, MainEditorSceneTool$WonderEditor.getSecondBox(engineState), /* () */0);
                                              return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                            }), undefined, undefined, undefined, undefined, /* () */0);
                              }));
                        describe("fix bug", (function (param) {
                                Wonder_jest.testPromise("test change default material to material asset after import", (function (param) {
                                        var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var gameObject = MainEditorSceneTool$WonderEditor.getFirstBox(engineState);
                                        var sourceMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState);
                                        var match = MaterialNodeMapAssetEditorService$WonderEditor.unsafeGetResult(addedMaterialNodeId, StateEditorService$WonderEditor.getState(/* () */0));
                                        MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial, /* LightMaterial */1, match[/* materialComponent */2], /* LightMaterial */1, addedMaterialNodeId, gameObject, undefined, undefined, /* () */0);
                                        return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var match = ImportPackageTool$WonderEditor.getFirstImportedMaterialAssetData(/* () */0);
                                                      var gameObject = MainEditorSceneTool$WonderEditor.getSecondBox(engineState);
                                                      var sourceMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState);
                                                      MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial, /* LightMaterial */1, match[1], /* LightMaterial */1, match[0], gameObject, undefined, undefined, /* () */0);
                                                      MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, gameObject, /* () */0);
                                                      return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                                    }), undefined, undefined, undefined, undefined, /* () */0);
                                      }));
                                describe("test with material and texture assets", (function (param) {
                                        var _prepareFakeCanvas = function (param) {
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
                                        Wonder_jest.testPromise("\n          1.add material asset m1;\n          2.load texture asset t1;\n          3.drag t1 to m1->diffuseMap;\n          4.change scecne tree g1->material component to m1;\n          5.export;\n          6.import;\n\n          g1->material should be m1;\n          ", (function (param) {
                                                var match = _prepareFakeCanvas(/* () */0);
                                                var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                var material1 = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId1, undefined, /* () */0);
                                                return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "1.png", match[0], /* () */0).then((function (uploadedTextureNodeId1) {
                                                              MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, material1, uploadedTextureNodeId1, /* () */0);
                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                              var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstBox(engineState);
                                                              var sourceMaterial1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState);
                                                              MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial1, /* LightMaterial */1, material1, /* LightMaterial */1, addedMaterialNodeId1, gameObject1, undefined, undefined, /* () */0);
                                                              return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                            var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstBox(engineState);
                                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* array */[GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState)]), ImportPackageTool$WonderEditor.getImporteMaterialAssetMaterialComponents(/* () */0)));
                                                                          }), undefined, undefined, undefined, undefined, /* () */0);
                                                            }));
                                              }));
                                        Wonder_jest.testPromise("\n             1.add material asset m1;\n             2.add material asset m2;\n             3.load texture asset t1;\n             4.load texture asset t2;\n             5.drag t1 to m1->diffuseMap;\n             6.drag t2 to m2->diffuseMap;\n             7.change scecne tree g1->material component to m1;\n             8.change scecne tree g2->material component to m2;\n             9.export;\n             10.import;\n\n\n             g1->material should be m1;\n             g2->material should be m2;\n             ", (function (param) {
                                                var match = _prepareFakeCanvas(/* () */0);
                                                var base64_2 = match[1];
                                                var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                var addedMaterialNodeId2 = addedMaterialNodeId1 + 1 | 0;
                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                var material1 = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId1, undefined, /* () */0);
                                                var material2 = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId2, undefined, /* () */0);
                                                return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "1.png", match[0], /* () */0).then((function (uploadedTextureNodeId1) {
                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "2.jpg", base64_2, /* () */0).then((function (uploadedTextureNodeId2) {
                                                                            MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, material1, uploadedTextureNodeId1, /* () */0);
                                                                            MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, material2, uploadedTextureNodeId2, /* () */0);
                                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                            var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstBox(engineState);
                                                                            var sourceMaterial1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState);
                                                                            MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial1, /* LightMaterial */1, material1, /* LightMaterial */1, addedMaterialNodeId1, gameObject1, undefined, undefined, /* () */0);
                                                                            var gameObject2 = MainEditorSceneTool$WonderEditor.getSecondBox(engineState);
                                                                            var sourceMaterial2 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject2, engineState);
                                                                            MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial2, /* LightMaterial */1, material2, /* LightMaterial */1, addedMaterialNodeId2, gameObject2, undefined, undefined, /* () */0);
                                                                            return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                          var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstBox(engineState);
                                                                                          var gameObject2 = MainEditorSceneTool$WonderEditor.getSecondBox(engineState);
                                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* array */[
                                                                                                              GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState),
                                                                                                              GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject2, engineState)
                                                                                                            ]), ImportPackageTool$WonderEditor.getImporteMaterialAssetMaterialComponents(/* () */0)));
                                                                                        }), undefined, undefined, undefined, undefined, /* () */0);
                                                                          }));
                                                            }));
                                              }));
                                        return Wonder_jest.testPromise("\n                 1.add material asset m1;\n                 2.add material asset m2;\n                 3.change m2 type to basic;\n                 4.set m1,m2 color;\n                 5.load texture asset t1;\n                 6.drag t1 to m1->diffuseMap;\n                 7.change scecne tree g1->material component to m1;\n                 8.change scecne tree g2->material component to m2;\n                 9.export;\n                 10.import;\n\n\n                 g1->material should be m1;\n                 g2->material should be m2;\n                 ", (function (param) {
                                                      var match = _prepareFakeCanvas(/* () */0);
                                                      var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                      var addedMaterialNodeId2 = addedMaterialNodeId1 + 1 | 0;
                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                      var material1 = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId1, undefined, /* () */0);
                                                      var material2 = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId2, undefined, /* () */0);
                                                      MaterialInspectorTool$WonderEditor.changeMaterialType(material2, /* LightMaterial */1, /* BasicMaterial */0, addedMaterialNodeId2, undefined, undefined, /* () */0);
                                                      var color1 = PickColorTool$WonderEditor.buildColor1(/* () */0);
                                                      var color2 = PickColorTool$WonderEditor.buildColor2(/* () */0);
                                                      MainEditorLightMaterialTool$WonderEditor.changeColor(material1, color1);
                                                      MainEditorBasicMaterialTool$WonderEditor.changeColor(material2, color2);
                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "1.png", match[0], /* () */0).then((function (uploadedTextureNodeId1) {
                                                                    MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, material1, uploadedTextureNodeId1, /* () */0);
                                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                    var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstBox(engineState);
                                                                    var sourceMaterial1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState);
                                                                    MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial1, /* LightMaterial */1, material1, /* LightMaterial */1, addedMaterialNodeId1, gameObject1, undefined, undefined, /* () */0);
                                                                    var gameObject2 = MainEditorSceneTool$WonderEditor.getSecondBox(engineState);
                                                                    var sourceMaterial2 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject2, engineState);
                                                                    MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial2, /* LightMaterial */1, material2, /* BasicMaterial */0, addedMaterialNodeId2, gameObject2, undefined, undefined, /* () */0);
                                                                    return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                  var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstBox(engineState);
                                                                                  var gameObject2 = MainEditorSceneTool$WonderEditor.getSecondBox(engineState);
                                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test geometry", (function (param) {
                beforeEach((function (param) {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, false, undefined, /* () */0);
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                        DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                        return /* () */0;
                      }));
                Wonder_jest.testPromise("\n          1.export;\n          2.import;\n\n          select geometry group widget should have only default geometrys\n          ", (function (param) {
                        return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      GameObjectTool$WonderEditor.setCurrentSceneTreeNode(MainEditorSceneTool$WonderEditor.getFirstBox(engineState));
                                      MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* () */0);
                                      var component = BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0);
                                      return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(component));
                                    }), undefined, undefined, undefined, undefined, /* () */0);
                      }));
                describe("test with wdb assets", (function (param) {
                        beforeEach((function (param) {
                                ImportPackageTool$WonderEditor.prepareFakeCanvas(sandbox);
                                return /* () */0;
                              }));
                        describe("relate wdb asset gameObjects with default geometrys", (function (param) {
                                var boxWDBArrayBuffer = /* record */[/* contents */1];
                                var _generateBoxWDB = function (param) {
                                  return WDBTool$WonderEditor.generateWDB((function (editorState, engineState) {
                                                var geometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState);
                                                var match = LightMaterialEngineService$WonderEditor.create(engineState);
                                                var match$1 = PrimitiveEngineService$WonderEditor.createCube(/* tuple */[
                                                      geometry,
                                                      match[1]
                                                    ], editorState, match[0]);
                                                var match$2 = GameObjectEngineService$WonderEditor.create(match$1[1]);
                                                var rootGameObject = match$2[1];
                                                var engineState$1 = GameObjectUtils$WonderEditor.addChild(rootGameObject, match$1[2], match$2[0]);
                                                return /* tuple */[
                                                        rootGameObject,
                                                        /* tuple */[
                                                          match$1[0],
                                                          engineState$1
                                                        ]
                                                      ];
                                              }));
                                };
                                beforeAll((function (param) {
                                        boxWDBArrayBuffer[0] = _generateBoxWDB(/* () */0);
                                        return /* () */0;
                                      }));
                                Wonder_jest.testPromise("\n               1.load box wdb asset w1(with default cube geometry);\n               2.export;\n               3.import;\n               4.drag w1 to scene tree to be gameObject g1;\n\n\n               g1->geometry->select geometry group widget should only have default geometrys and be using default cube geometry\n               ", (function (param) {
                                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                      return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                    var match = ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.getImportedWDBAssetData(/* () */0));
                                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](match[0], undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                    GameObjectTool$WonderEditor.setCurrentSceneTreeNode(MainEditorSceneTool$WonderEditor.getFirstBox(engineState));
                                                                    MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* () */0);
                                                                    var component = BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0);
                                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(component));
                                                                  }), undefined, undefined, undefined, undefined, /* () */0);
                                                    }));
                                      }));
                                describe("\n               1.load box wdb asset w1(with default cube geometry);\n               1.load box wdb asset w2(with default cube geometry);\n               2.export;\n               3.import;\n               4.drag w1 to scene tree to be gameObject g1;\n               5.drag w2 to scene tree to be gameObject g2;\n               ", (function (param) {
                                        var _prepare = function (testFunc) {
                                          return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId2) {
                                                                      return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                                    var match = ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.getImportedWDBAssetData(/* () */0));
                                                                                    var match$1 = ArrayService$WonderEditor.unsafeGetNth(1, ImportPackageTool$WonderEditor.getImportedWDBAssetData(/* () */0));
                                                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](match[0], undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](match$1[0], undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                                    return Curry._1(testFunc, /* () */0);
                                                                                  }), undefined, undefined, undefined, undefined, /* () */0);
                                                                    }));
                                                      }));
                                        };
                                        Wonder_jest.testPromise("g1->geometry->select geometry group widget should only have default geometrys and be using default cube geometry", (function (param) {
                                                return _prepare((function (param) {
                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                              GameObjectTool$WonderEditor.setCurrentSceneTreeNode(MainEditorSceneTool$WonderEditor.getFirstBox(engineState));
                                                              MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* () */0);
                                                              var component = BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0);
                                                              return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(component));
                                                            }));
                                              }));
                                        return Wonder_jest.testPromise("g2->geometry->select geometry group widget should only have default geometrys and be using default cube geometry", (function (param) {
                                                      return _prepare((function (param) {
                                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                    GameObjectTool$WonderEditor.setCurrentSceneTreeNode(MainEditorSceneTool$WonderEditor.getSecondBox(engineState));
                                                                    MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* () */0);
                                                                    var component = BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0);
                                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(component));
                                                                  }));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test import assets", (function (param) {
                describe("test import material assets", (function (param) {
                        beforeEach((function (param) {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                              }));
                        Wonder_jest.testPromise("should add material assets to asset tree", (function (param) {
                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                              return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                            }), undefined, undefined, undefined, undefined, /* () */0);
                              }));
                        describe("fix bug", (function (param) {
                                beforeEach((function (param) {
                                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, false, undefined, /* () */0);
                                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                                        DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                                        return /* () */0;
                                      }));
                                return Wonder_jest.testPromise("\n          1.add material asset m1;\n          2.export;\n          3.import;\n          4.change scecne tree gameObject->material component to m1;\n          5.change m1->type to BasicMaterial\n          6.change m1->type to LightMaterial\n\n          MaterialInspector should be LightMaterial\n          ", (function (param) {
                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                              return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                            var match = ImportPackageTool$WonderEditor.getFirstImportedMaterialAssetData(/* () */0);
                                                            var materialComponent = match[1];
                                                            var materialNodeId = match[0];
                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                            var gameObject = MainEditorSceneTool$WonderEditor.getFirstBox(engineState);
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
                        return /* () */0;
                      }));
                describe("test import texture assets", (function (param) {
                        beforeEach((function (param) {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                              }));
                        Wonder_jest.testPromise("should add texture assets to asset tree", (function (param) {
                                return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "loadImg.png", "newImgBase64", /* () */0).then((function (uploadedTextureNodeId) {
                                              return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                          }), undefined, undefined, undefined, undefined, /* () */0);
                                            }));
                              }));
                        describe("should keep texture data not change", (function (param) {
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
                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._2(getValueFunc, textureComponent, engineState)), value));
                                                            }), undefined, undefined, undefined, undefined, /* () */0);
                                              }));
                                };
                                Wonder_jest.testPromise("test format", (function (param) {
                                        return _test(/* Luminance */3, /* tuple */[
                                                    BasicSourceTextureEngineService$WonderEditor.getFormat,
                                                    BasicSourceTextureEngineService$WonderEditor.setFormat
                                                  ]);
                                      }));
                                Wonder_jest.testPromise("test type_", (function (param) {
                                        return _test(3, /* tuple */[
                                                    BasicSourceTextureEngineService$WonderEditor.getType,
                                                    BasicSourceTextureEngineService$WonderEditor.setType
                                                  ]);
                                      }));
                                return Wonder_jest.testPromise("test flipY", (function (param) {
                                              return _test(false, /* tuple */[
                                                          BasicSourceTextureEngineService$WonderEditor.getFlipY,
                                                          BasicSourceTextureEngineService$WonderEditor.setFlipY
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test import wdb assets", (function (param) {
                        beforeEach((function (param) {
                                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, false, undefined, /* () */0);
                                MainEditorSceneTool$WonderEditor.createDefaultComponents(/* () */0);
                                var partial_arg = FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                        return FakeGlToolEngine$WonderEditor.setFakeGl(partial_arg, param);
                                      }));
                                DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                                ImportPackageTool$WonderEditor.prepareFakeCanvas(sandbox);
                                LoadTool$WonderEditor.clearBlobData();
                                return LoadTool$WonderEditor.buildFakeBlob();
                              }));
                        describe("relate wdb asset gameObjects and material assets", (function (param) {
                                return Wonder_jest.testPromise("test", (function (param) {
                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                            MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                            return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                          var __x = LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObject(engineState);
                                                                          var material = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(__x, engineState);
                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                              MainEditorAssetMaterialNodeTool$WonderEditor.hasMaterialComponent(material, LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectMaterialType(/* () */0), editorState),
                                                                                              SparseMapService$WonderEditor.length(MaterialNodeMapAssetEditorService$WonderEditor.getValidValues(editorState))
                                                                                            ]), /* tuple */[
                                                                                          true,
                                                                                          1
                                                                                        ]));
                                                                        }), undefined, undefined, undefined, undefined, /* () */0);
                                                          }));
                                            }));
                              }));
                        describe("fix bug", (function (param) {
                                return Wonder_jest.testPromise("\n          1.load BoxTextured wdb asset w1;\n          2.load texture asset t1;\n          3.export;\n          4.import;\n\n          import asb->t1->blob data should be correct\n          ", (function (param) {
                                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                            return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, "loadImg.png", "newImgBase64", /* () */0).then((function (uploadedTextureNodeId1) {
                                                                          LoadTool$WonderEditor.clearBlobData();
                                                                          return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                                        var blobData = LoadTool$WonderEditor.getBlobData();
                                                                                        var match = blobData[1];
                                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                            blobData.length,
                                                                                                            match[0].byteLength,
                                                                                                            match[1]
                                                                                                          ]), /* tuple */[
                                                                                                        2,
                                                                                                        3,
                                                                                                        {
                                                                                                          type: "image/png"
                                                                                                        }
                                                                                                      ]));
                                                                                      }), undefined, undefined, undefined, undefined, /* () */0);
                                                                        }));
                                                          }));
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("shouldn't warn exceed max count when c1(current scene(before import package)->total light count) + c2(scene wdb->total light count) is exceed but c2 is not exceed", (function (param) {
                beforeEach((function (param) {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, false, undefined, /* () */0);
                        MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                        return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                      }));
                return Wonder_jest.testPromise("test", (function (param) {
                              ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                              var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                              var match = PrimitiveEngineService$WonderEditor.createDirectionLight(editorState, engineState);
                              var match$1 = PrimitiveEngineService$WonderEditor.createDirectionLight(match[0], match[1]);
                              var match$2 = PrimitiveEngineService$WonderEditor.createDirectionLight(match$1[0], match$1[1]);
                              var match$3 = PrimitiveEngineService$WonderEditor.createDirectionLight(match$2[0], match$2[1]);
                              var engineState$1 = SceneEngineService$WonderEditor.addSceneChildren(/* array */[
                                    match[2],
                                    match$1[2],
                                    match$2[2],
                                    match$3[2]
                                  ], match$3[1]);
                              StateEditorService$WonderEditor.setState(match$3[0]);
                              StateEngineService$WonderEditor.setState(engineState$1);
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(directionPointLightsAndBoxWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                            return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                          return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* noT_ */22](Wonder_jest.Expect[/* expect */0](warn))));
                                                        }), undefined, undefined, (function (param) {
                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var engineState$1 = JobEngineService$WonderEditor.execDisposeJob(SceneEngineService$WonderEditor.disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial(engineState));
                                                          var match = PrimitiveEngineService$WonderEditor.createDirectionLight(editorState, engineState$1);
                                                          var engineState$2 = SceneEngineService$WonderEditor.addSceneChild(match[2], match[1]);
                                                          StateEditorService$WonderEditor.setState(match[0]);
                                                          StateEngineService$WonderEditor.setState(engineState$2);
                                                          return /* () */0;
                                                        }), undefined, /* () */0);
                                          }));
                            }));
              }));
        describe("fix bug", (function (param) {
                var stoveWDBArrayBuffer = /* record */[/* contents */1];
                beforeAll((function (param) {
                        stoveWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("SuperLowPolyStove");
                        return /* () */0;
                      }));
                beforeEach((function (param) {
                        ImportPackageTool$WonderEditor.prepareFakeCanvas(sandbox);
                        return /* () */0;
                      }));
                Wonder_jest.testPromise("\n            1.import package p1(error);\n            2.import package p2;\n\n            should import p2 success\n            ", (function (param) {
                        MainEditorSceneTool$WonderEditor.initState(sandbox, false, SettingToolEngine$WonderEditor.buildBufferConfigStr(100000, 30, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                        MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                        ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                      var boxTexturedWPKArrayBuffer = ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(stoveWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                    var boxTextuedAndStoveWPKArrayBuffer = ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                                    MainEditorSceneTool$WonderEditor.initState(sandbox, false, SettingToolEngine$WonderEditor.buildBufferConfigStr(5000, 30, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                                    MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                                    ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                                    return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                                                  var error = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                                                                  return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                                                                return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* noT_ */22](Wonder_jest.Expect[/* expect */0](error))));
                                                                              }), boxTexturedWPKArrayBuffer, undefined, undefined, undefined, /* () */0);
                                                                }), boxTextuedAndStoveWPKArrayBuffer, undefined, undefined, undefined, /* () */0);
                                                  }));
                                    }));
                      }));
                describe("test use extracted assets from wdb assets to scene gameObject before export package", (function (param) {
                        var error = /* record */[/* contents */-1];
                        beforeEach((function (param) {
                                error[0] = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                              }));
                        Wonder_jest.testPromise("\n          add gameObject g1 to scene tree;\n          add material asset m1;\n          load BoxTextured wdb asset w1;\n          drag w1 to scene tree to be gameObject g2;\n          drag w1->extracted texture t1 to be m1->diffuseMap;\n          set g1->material to be m1;\n          export;\n          import;\n\n          g1->material should be m1;\n          g1->material->diffuseMap should be t1;\n          ", (function (param) {
                                var firstBox = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                var firstBoxName = "firstBox";
                                StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                        return GameObjectEngineService$WonderEditor.setGameObjectName(firstBoxName, firstBox, param);
                                      }));
                                var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                var materialComponent1 = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId1, undefined, /* () */0);
                                var materialComponent1Name = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                        return LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialName(materialComponent1, param);
                                      }));
                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var boxTexturedMeshDiffuseMap = LoadWDBTool$WonderEditor.unsafeGetBoxTexturedMeshDiffuseMap(engineState);
                                              var boxTexturedMeshDiffuseMapName = BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(boxTexturedMeshDiffuseMap, engineState);
                                              MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, materialComponent1, OptionService$WonderEditor.unsafeGet(MainEditorAssetTextureNodeTool$WonderEditor.findTextureNodeIdByTextureComponent(boxTexturedMeshDiffuseMap, editorState)), /* () */0);
                                              StateEditorService$WonderEditor.setState(editorState);
                                              StateEngineService$WonderEditor.setState(engineState);
                                              MainEditorMaterialTool$WonderEditor.changeMaterial(GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial(/* () */0), /* LightMaterial */1, materialComponent1, /* LightMaterial */1, addedMaterialNodeId1, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), undefined, undefined, /* () */0);
                                              var wpkArrayBuffer = ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                              return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                            var firstBox = ArrayService$WonderEditor.unsafeGetFirst(SceneToolEngine$WonderEditor.findGameObjectByName(firstBoxName, engineState));
                                                            var firstBoxMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(firstBox, engineState);
                                                            var __x = LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialDiffuseMap(firstBoxMaterial, engineState);
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                Sinon.getCallCount(error[0]),
                                                                                LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialName(firstBoxMaterial, engineState),
                                                                                BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(__x, engineState)
                                                                              ]), /* tuple */[
                                                                            0,
                                                                            materialComponent1Name,
                                                                            boxTexturedMeshDiffuseMapName
                                                                          ]));
                                                          }), wpkArrayBuffer, undefined, undefined, undefined, /* () */0);
                                            }));
                              }));
                        return Wonder_jest.testPromise("\n          add gameObject g1 to scene tree;\n          load texture asset t1;\n          load BoxTextured wdb asset w1;\n          drag w1 to scene tree to be gameObject g2;\n          drag t1 to be w1->extracted material m1->diffuseMap;\n          set g1->material to be m1;\n          export;\n          import;\n\n          g1->material should be m1;\n          g1->material->diffuseMap should be t1;\n          ", (function (param) {
                                      var firstBox = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                      var firstBoxName = "firstBox";
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return GameObjectEngineService$WonderEditor.setGameObjectName(firstBoxName, firstBox, param);
                                            }));
                                      var imgName1 = "image1.png";
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, imgName1, undefined, /* () */0).then((function (uploadedTextureNodeId1) {
                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                  MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                  var wdbMaterial = LoadWDBTool$WonderEditor.unsafeGetBoxTexturedMeshLightMaterial(engineState);
                                                                  var wdbMaterialName = LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialName(wdbMaterial, engineState);
                                                                  var wdbMaterialNodeId = MainEditorAssetMaterialNodeTool$WonderEditor.findNodeIdByMaterialComponent(wdbMaterial, /* LightMaterial */1, editorState);
                                                                  MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, wdbMaterial, uploadedTextureNodeId1, /* () */0);
                                                                  StateEditorService$WonderEditor.setState(editorState);
                                                                  StateEngineService$WonderEditor.setState(engineState);
                                                                  MainEditorMaterialTool$WonderEditor.changeMaterial(GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial(/* () */0), /* LightMaterial */1, wdbMaterial, /* LightMaterial */1, wdbMaterialNodeId, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), undefined, undefined, /* () */0);
                                                                  var boxTexturedWPKArrayBuffer = ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                                                  return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                var firstBox = ArrayService$WonderEditor.unsafeGetFirst(SceneToolEngine$WonderEditor.findGameObjectByName(firstBoxName, engineState));
                                                                                var firstBoxMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(firstBox, engineState);
                                                                                var __x = LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialDiffuseMap(firstBoxMaterial, engineState);
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                    Sinon.getCallCount(error[0]),
                                                                                                    LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialName(firstBoxMaterial, engineState),
                                                                                                    BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(__x, engineState)
                                                                                                  ]), /* tuple */[
                                                                                                0,
                                                                                                wdbMaterialName,
                                                                                                MainEditorAssetTextureNodeTool$WonderEditor.buildTextureAssetName(imgName1)
                                                                                              ]));
                                                                              }), boxTexturedWPKArrayBuffer, undefined, undefined, undefined, /* () */0);
                                                                }));
                                                  }));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
