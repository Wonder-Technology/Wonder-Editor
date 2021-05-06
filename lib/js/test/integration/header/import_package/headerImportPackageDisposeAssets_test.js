'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../tool/WDBTool.js");
var JudgeTool$WonderEditor = require("../../../tool/JudgeTool.js");
var SinonTool$WonderEditor = require("../../../tool/SinonTool.js");
var CanvasTool$WonderEditor = require("../../../unit/atom_component/canvas/tool/CanvasTool.js");
var LoadWDBTool$WonderEditor = require("../../tool/LoadWDBTool.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var ImportPackageTool$WonderEditor = require("./tool/ImportPackageTool.js");
var SettingToolEngine$WonderEditor = require("../../../tool/engine/SettingToolEngine.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../tool/BuildComponentTool.js");
var GeometryToolEngine$WonderEditor = require("../../../tool/engine/GeometryToolEngine.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var InspectorCanvasTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/tool/InspectorCanvasTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var ScriptEngineService$WonderEditor = require("../../../../src/service/state/engine/script/ScriptEngineService.js");
var GameObjectToolEngine$WonderEditor = require("../../../tool/engine/GameObjectToolEngine.js");
var GeometryEngineService$WonderEditor = require("../../../../src/service/state/engine/GeometryEngineService.js");
var MainEditorAssetIdTool$WonderEditor = require("../../asset/tool/MainEditorAssetIdTool.js");
var PrimitiveLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/PrimitiveLogicService.js");
var GameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../unit/tool/MainEditorSceneTreeTool.js");
var GeometryAssetLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/asset/GeometryAssetLogicService.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../asset/tool/MainEditorAssetUploadTool.js");
var LightMaterialEngineService$WonderEditor = require("../../../../src/service/state/engine/LightMaterialEngineService.js");
var MainEditorAssetWDBNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetWDBNodeTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var ScriptAttributeInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/atom_component/script_inspector/tool/ScriptAttributeInspectorTool.js");
var CubemapNodeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/CubemapNodeAssetEditorService.js");
var MainEditorAssetHeaderLoadTool$WonderEditor = require("../../asset/composable_component/header/tool/MainEditorAssetHeaderLoadTool.js");
var MainEditorScriptAttributeTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/script/tool/MainEditorScriptAttributeTool.js");
var GeometryDataAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/GeometryDataAssetEditorService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var ScriptEventFunctionInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/atom_component/script_inspector/tool/ScriptEventFunctionInspectorTool.js");
var AssetBundleNodeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/AssetBundleNodeAssetEditorService.js");
var MainEditorScriptEventFunctionTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/script/tool/MainEditorScriptEventFunctionTool.js");
var BasicSourceTextureImageDataMapTool$WonderEditor = require("../../asset/tool/BasicSourceTextureImageDataMapTool.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var ScriptAttributeNodeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/ScriptAttributeNodeAssetEditorService.js");
var ScriptEventFunctionNodeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/ScriptEventFunctionNodeAssetEditorService.js");

Wonder_jest.describe("header import package->dispose assets", (function (param) {
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
        Wonder_jest.describe("dispose wdb assets", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                        InspectorCanvasTool$WonderEditor.prepareInspectorEngineState(sandbox);
                        CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                        return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                      }));
                Wonder_jest.describe("dispose geometry assets", (function (param) {
                        Wonder_jest.testPromise("\n          1.load BoxTextured wdb asset w1;\n          2.drag w1 to scene tree to be gameObject g1;\n          3.export;\n          4.import;\n\n\n          g1->geometry->select geometry group widget should have only one wdb geometry and be using it\n          ", undefined, (function (param) {
                                ImportPackageTool$WonderEditor.prepareFakeCanvas(sandbox);
                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                              return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                            GameObjectTool$WonderEditor.setCurrentSceneTreeNode(LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObject(engineState));
                                                            MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* () */0);
                                                            var component = BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0);
                                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(component));
                                                          }), undefined, undefined, undefined, undefined, /* () */0);
                                            }));
                              }));
                        return Wonder_jest.testPromise("should dispose geometry engine data", undefined, (function (param) {
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                    var geometryAssets = GeometryAssetLogicService$WonderEditor.getGeometryAssets(editorState, engineState);
                                                    ImportPackageTool$WonderEditor.disposeAssets(/* () */0);
                                                    var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](geometryAssets.filter((function (geometryAsset) {
                                                                              return !GeometryToolEngine$WonderEditor.isGeometryDisposed(geometryAsset, engineState$1);
                                                                            })).length), 0));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("dispose wdb gameObjects", (function (param) {
                              var wdbArrayBuffer = /* record */[/* contents */1];
                              var generateWDB = function (param) {
                                return WDBTool$WonderEditor.generateWDB((function (editorState, engineState) {
                                              var match = GeometryEngineService$WonderEditor.createSphereGeometry(1, 3, engineState);
                                              var match$1 = LightMaterialEngineService$WonderEditor.create(match[0]);
                                              var match$2 = PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                                                    match[1],
                                                    match$1[1]
                                                  ], editorState, match$1[0]);
                                              var editorState$1 = match$2[0];
                                              var defaultCubeGeometryComponent = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState$1);
                                              var match$3 = LightMaterialEngineService$WonderEditor.create(match$2[1]);
                                              var match$4 = PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                                                    defaultCubeGeometryComponent,
                                                    match$3[1]
                                                  ], editorState$1, match$3[0]);
                                              var match$5 = GameObjectEngineService$WonderEditor.create(match$4[1]);
                                              var rootGameObject = match$5[1];
                                              var engineState$1 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$4[2], HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$2[2], match$5[0]));
                                              return /* tuple */[
                                                      rootGameObject,
                                                      /* tuple */[
                                                        match$4[0],
                                                        engineState$1
                                                      ]
                                                    ];
                                            }));
                              };
                              beforeAll((function () {
                                      wdbArrayBuffer[0] = generateWDB(/* () */0);
                                      return /* () */0;
                                    }));
                              return Wonder_jest.testPromise("should dispose gameObject engine data", undefined, (function (param) {
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                          var allWDBGameObjects = MainEditorAssetWDBNodeTool$WonderEditor.getAllWDBGameObjects(editorState, engineState);
                                                          ImportPackageTool$WonderEditor.disposeAssets(/* () */0);
                                                          var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](allWDBGameObjects.filter((function (gameObject) {
                                                                                    return GameObjectToolEngine$WonderEditor.isAlive(gameObject, engineState$1);
                                                                                  })).length), 0));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("dispose material assets", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                        MainEditorAssetHeaderLoadTool$WonderEditor.prepareInspectorCanvas(sandbox);
                        MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                        ImportPackageTool$WonderEditor.prepareFakeCanvas(sandbox);
                        return /* () */0;
                      }));
                return Wonder_jest.testPromise("\n          1.load BoxTextured wdb asset w1;\n          2.drag w1 to scene tree to be gameObject g1;\n          3.export;\n          4.import;\n\n          g1->material->select material group widget should have only one wdb material\n          ", undefined, (function (param) {
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                            MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          GameObjectTool$WonderEditor.setCurrentSceneTreeNode(LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObject(engineState));
                                                          return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMaterial(GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), undefined, undefined, true, /* () */0)));
                                                        }), undefined, undefined, undefined, undefined, /* () */0);
                                          }));
                            }));
              }));
        Wonder_jest.describe("dispose cubemap assets", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                        return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                      }));
                return Wonder_jest.testPromise("\n          add cubemap asset;\n          export;\n          import;\n\n          should has one cubemap asset;\n          ", undefined, (function (param) {
                              ImportPackageTool$WonderEditor.Cubemap[/* prepareForAddOneCubemapAsset */1](sandbox);
                              return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(CubemapNodeAssetEditorService$WonderEditor.findAllCubemapNodes).length), 1));
                                          }), undefined, undefined, undefined, undefined, /* () */0);
                            }));
              }));
        Wonder_jest.describe("dispose script event function assets", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                        return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                      }));
                Wonder_jest.testPromise("\n          add script event function asset;\n          export;\n          import;\n\n          should has one script event function asset;\n          ", undefined, (function (param) {
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                        MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                        return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(ScriptEventFunctionNodeAssetEditorService$WonderEditor.findAllScriptEventFunctionNodes).length), 1));
                                    }), undefined, undefined, undefined, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("should remove from script components", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                      return MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
                                    }));
                              return Wonder_jest.test("\n          current gameObject g1 add script component s1;\n          add script event function asset sef1;\n          s1 add sef1;\n          invoke import package->disposeAssets\n\n          sef1 should only be removed from s1;\n          ", (function (param) {
                                            var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                            var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
                                            var eventFunctionName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                    return ScriptEventFunctionInspectorTool$WonderEditor.getEventFunctionName(addedNodeId, param);
                                                  }));
                                            MainEditorScriptEventFunctionTool$WonderEditor.addScriptEventFunction(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                            ImportPackageTool$WonderEditor.disposeAssets(/* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return ScriptEngineService$WonderEditor.hasScriptEventFunctionData(script, eventFunctionName, param);
                                                                }))), false);
                                          }));
                            }));
              }));
        Wonder_jest.describe("dispose script attribute assets", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                        return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                      }));
                Wonder_jest.testPromise("\n          add script attribute asset;\n          export;\n          import;\n\n          should has one script attribute asset;\n          ", undefined, (function (param) {
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                        MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                        return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(ScriptAttributeNodeAssetEditorService$WonderEditor.findAllScriptAttributeNodes).length), 1));
                                    }), undefined, undefined, undefined, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("should remove from script components", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                      return MainEditorInspectorAddComponentTool$WonderEditor.addScriptComponent(undefined, undefined, undefined, /* () */0);
                                    }));
                              return Wonder_jest.test("\n          current gameObject g1 add script component s1;\n          add script attribute asset sa1;\n          s1 add sa1;\n          invoke import package->disposeAssets\n\n          sa1 should only be removed from s1;\n          ", (function (param) {
                                            var script = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeScript(/* () */0);
                                            MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                            var addedNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptAttribute(undefined, undefined, /* () */0);
                                            MainEditorScriptAttributeTool$WonderEditor.addScriptAttribute(script, Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]), undefined, undefined, undefined, /* () */0);
                                            var attributeName = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                    return ScriptAttributeInspectorTool$WonderEditor.getAttributeName(addedNodeId, param);
                                                  }));
                                            ImportPackageTool$WonderEditor.disposeAssets(/* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return ScriptEngineService$WonderEditor.hasScriptAttributeData(script, attributeName, param);
                                                                }))), false);
                                          }));
                            }));
              }));
        Wonder_jest.describe("dispose asset bundle assets", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                        return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                      }));
                return Wonder_jest.testPromise("\n          add asset bundle asset;\n          export;\n          import;\n\n          should has one asset bundle asset;\n          ", undefined, (function (param) {
                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                              return MainEditorAssetUploadTool$WonderEditor.loadOneAssetBundle(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedAssetBundleNodeId) {
                                            return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(AssetBundleNodeAssetEditorService$WonderEditor.findAllAssetBundleNodes).length), 1));
                                                        }), undefined, undefined, undefined, undefined, /* () */0);
                                          }));
                            }));
              }));
        Wonder_jest.testPromise("clear imageData map", undefined, (function (param) {
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorAssetHeaderLoadTool$WonderEditor.prepareInspectorCanvas(sandbox);
                MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                              return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                            return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(BasicSourceTextureImageDataMapTool$WonderEditor.getMapValidLength)), 3));
                                                        }), undefined, undefined, undefined, undefined, /* () */0);
                                          }), undefined, undefined, undefined, undefined, /* () */0);
                            }));
              }));
        return Wonder_jest.describe("reallocate", (function (param) {
                      return Wonder_jest.describe("reallocate geometry", (function (param) {
                                    beforeEach((function () {
                                            MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), SettingToolEngine$WonderEditor.buildBufferConfigStr(5000, 5, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                                            MainEditorAssetHeaderLoadTool$WonderEditor.prepareInspectorCanvas(sandbox);
                                            MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                            ImportPackageTool$WonderEditor.prepareFakeCanvas(sandbox);
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
      }));

/*  Not a pure module */
