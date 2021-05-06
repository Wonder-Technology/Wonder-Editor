'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GLBTool$WonderEditor = require("../../../tool/GLBTool.js");
var WDBTool$WonderEditor = require("../../../tool/WDBTool.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var CanvasTool$WonderEditor = require("../../../unit/atom_component/canvas/tool/CanvasTool.js");
var ConsoleTool$WonderEditor = require("../../../unit/tool/external/ConsoleTool.js");
var LoadWDBTool$WonderEditor = require("../../tool/LoadWDBTool.js");
var ArrayService$WonderEditor = require("../../../../src/service/atom/ArrayService.js");
var OptionService$WonderEditor = require("../../../../src/service/primitive/OptionService.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var SceneToolEngine$WonderEditor = require("../../../tool/engine/SceneToolEngine.js");
var ExportPackageTool$WonderEditor = require("../tool/ExportPackageTool.js");
var ImportPackageTool$WonderEditor = require("./tool/ImportPackageTool.js");
var SettingToolEngine$WonderEditor = require("../../../tool/engine/SettingToolEngine.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../tool/BuildComponentTool.js");
var InitPickingJobTool$WonderEditor = require("../../job/tool/InitPickingJobTool.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../asset/tool/MainEditorAssetIdTool.js");
var MainEditorMaterialTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js");
var GameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var LightMaterialToolEngine$WonderEditor = require("../../../tool/engine/LightMaterialToolEngine.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../unit/tool/MainEditorSceneTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../asset/tool/MainEditorAssetUploadTool.js");
var LightMaterialEngineService$WonderEditor = require("../../../../src/service/state/engine/LightMaterialEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var MainEditorAssetTextureNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetTextureNodeTool.js");
var BasicSourceTextureEngineService$WonderEditor = require("../../../../src/service/state/engine/texture/BasicSourceTextureEngineService.js");
var MainEditorAssetMaterialNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetMaterialNodeTool.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var MainEditorInspectorRemoveComponentTool$WonderEditor = require("../../inspector/atom_component/addableComponent/tool/MainEditorInspectorRemoveComponentTool.js");
var MainEditorLightMaterialForGameObjectTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialForGameObjectTool.js");

Wonder_jest.describe("header import package->fix bug", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
        var stoveWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                stoveWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("SuperLowPolyStove");
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return ImportPackageTool$WonderEditor.prepareLoad(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.testPromise("\n            1.import package p1(error);\n            2.import package p2;\n\n            should import p2 success\n            ", undefined, (function (param) {
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, SettingToolEngine$WonderEditor.buildBufferConfigStr(100000, 30, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                ImportPackageTool$WonderEditor.prepareFakeCanvas(sandbox);
                MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                              var boxTexturedWPKArrayBuffer = ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(stoveWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                            var cubeTextuedAndStoveWPKArrayBuffer = ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                            MainEditorSceneTool$WonderEditor.initState(sandbox, false, SettingToolEngine$WonderEditor.buildBufferConfigStr(5000, 30, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                            MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                            ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                            return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                                          var error = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                                                          return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                                                        return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](error))));
                                                                      }), boxTexturedWPKArrayBuffer, undefined, undefined, undefined, /* () */0);
                                                        }), cubeTextuedAndStoveWPKArrayBuffer, undefined, undefined, undefined, /* () */0);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test use extracted assets from wdb assets to scene gameObject before export package", (function (param) {
                var error = /* record */[/* contents */-1];
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                        MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                        StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                        CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                        error[0] = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                      }));
                Wonder_jest.testPromise("\n             add gameObject g1 to scene tree;\n             add material asset m1;\n             load BoxTextured wdb asset w1;\n             drag w1 to scene tree to be gameObject g2;\n             drag w1->extracted texture t1 to be m1->diffuseMap;\n             set g1->material to be m1;\n             export;\n             import;\n\n             g1->material should be m1;\n             g1->material->diffuseMap should be t1;\n             ", undefined, (function (param) {
                        var firstCube = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                        var firstCubeName = "firstCube";
                        StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                return GameObjectEngineService$WonderEditor.setGameObjectName(firstCubeName, firstCube, param);
                              }));
                        var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                        var materialComponent1 = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId1, undefined, /* () */0);
                        var materialComponent1Name = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                return LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialName(materialComponent1, param);
                              }));
                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                      MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var boxTexturedMeshDiffuseMap = LoadWDBTool$WonderEditor.unsafeGetBoxTexturedMeshDiffuseMap(engineState);
                                      var boxTexturedMeshDiffuseMapName = BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(boxTexturedMeshDiffuseMap, engineState);
                                      MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, materialComponent1, OptionService$WonderEditor.unsafeGet(MainEditorAssetTextureNodeTool$WonderEditor.findBasicSourceTypeTextureNodeIdByTextureComponent(boxTexturedMeshDiffuseMap, editorState)), /* () */0);
                                      StateEditorService$WonderEditor.setState(editorState);
                                      StateEngineService$WonderEditor.setState(engineState);
                                      MainEditorMaterialTool$WonderEditor.changeMaterial(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeLightMaterial(/* () */0), /* LightMaterial */1, materialComponent1, /* LightMaterial */1, addedMaterialNodeId1, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), undefined, undefined, /* () */0);
                                      var wpkArrayBuffer = ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                      return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var firstCube = ArrayService$WonderEditor.unsafeGetFirst(SceneToolEngine$WonderEditor.findGameObjectByName(firstCubeName, engineState));
                                                    var firstCubeMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(firstCube, engineState);
                                                    var __x = LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialDiffuseMap(firstCubeMaterial, engineState);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialName(firstCubeMaterial, engineState),
                                                                        BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(__x, engineState)
                                                                      ]), /* tuple */[
                                                                    materialComponent1Name,
                                                                    boxTexturedMeshDiffuseMapName
                                                                  ]));
                                                  }), wpkArrayBuffer, undefined, undefined, undefined, /* () */0);
                                    }));
                      }));
                return Wonder_jest.testPromise("\n          add gameObject g1 to scene tree;\n          load texture asset t1;\n          load BoxTextured wdb asset w1;\n          drag w1 to scene tree to be gameObject g2;\n          drag t1 to be w1->extracted material m1->diffuseMap;\n          set g1->material to be m1;\n          export;\n          import;\n\n          g1->material should be m1;\n          g1->material->diffuseMap should be t1;\n          ", undefined, (function (param) {
                              var firstCube = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                              var firstCubeName = "firstCube";
                              StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                      return GameObjectEngineService$WonderEditor.setGameObjectName(firstCubeName, firstCube, param);
                                    }));
                              var imgName1 = "image1.png";
                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, imgName1, undefined, /* () */0).then((function (uploadedTextureNodeId1) {
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                          MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var wdbMaterial = LoadWDBTool$WonderEditor.unsafeGetBoxTexturedMeshLightMaterial(engineState);
                                                          var wdbMaterialName = LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialName(wdbMaterial, engineState);
                                                          var wdbMaterialNodeId = MainEditorAssetMaterialNodeTool$WonderEditor.findNodeIdByMaterialComponentAndType(wdbMaterial, /* LightMaterial */1, editorState);
                                                          MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, wdbMaterial, uploadedTextureNodeId1, /* () */0);
                                                          StateEditorService$WonderEditor.setState(editorState);
                                                          StateEngineService$WonderEditor.setState(engineState);
                                                          MainEditorMaterialTool$WonderEditor.changeMaterial(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeLightMaterial(/* () */0), /* LightMaterial */1, wdbMaterial, /* LightMaterial */1, wdbMaterialNodeId, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), undefined, undefined, /* () */0);
                                                          var boxTexturedWPKArrayBuffer = ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                                          return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                        var firstCube = ArrayService$WonderEditor.unsafeGetFirst(SceneToolEngine$WonderEditor.findGameObjectByName(firstCubeName, engineState));
                                                                        var firstCubeMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(firstCube, engineState);
                                                                        var __x = LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialDiffuseMap(firstCubeMaterial, engineState);
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                            Sinon.getCallCount(error[0]),
                                                                                            LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialName(firstCubeMaterial, engineState),
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
        Wonder_jest.describe("test pick", (function (param) {
                var truckGLBArrayBuffer = /* record */[/* contents */1];
                var _prepare = function (param) {
                  return InitPickingJobTool$WonderEditor.prepare(sandbox, 500, 200, 0, 0, /* tuple */[
                              0,
                              2,
                              3
                            ], undefined, undefined, /* () */0);
                };
                beforeAll((function () {
                        truckGLBArrayBuffer[0] = GLBTool$WonderEditor.getGLBArrayBuffer("CesiumMilkTruck");
                        return /* () */0;
                      }));
                beforeEach((function () {
                        _prepare(/* () */0);
                        MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                        StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                        CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                        MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                        return /* () */0;
                      }));
                return Wonder_jest.testPromise("\n          import glb;\n          drag the converted wdb to scene tree to be gameObject g1;\n          export wpk w1;\n          import w1;\n          pick g1;\n          import w1;\n          pick g1;\n\n          should pick g1;\n          ", undefined, (function (param) {
                              var glbName = "Wdb";
                              return MainEditorAssetUploadTool$WonderEditor.loadOneGLB(truckGLBArrayBuffer[0], undefined, undefined, glbName, /* () */0).then((function (uploadedWDBNodeId) {
                                            MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            var wpkArrayBuffer = ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                            return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                                          InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                          return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                                                        InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                                        return Promise.resolve(InitPickingJobTool$WonderEditor.pickOne(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                              return LoadWDBTool$WonderEditor.findGameObjectByName(glbName, param);
                                                                                            }))));
                                                                      }), wpkArrayBuffer, undefined, undefined, undefined, /* () */0);
                                                        }), wpkArrayBuffer, undefined, undefined, undefined, /* () */0);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test dispose renderGroup component", (function (param) {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                        return /* () */0;
                      }));
                Wonder_jest.testPromise("\n          add gameObject g1 to scene tree;\n          g1->add default light material component;\n          g1->dispose renderGroup component;\n          export wpk w1;\n          import w1;\n\n          g1 should has no meshRenderer and lightMaterial component;\n          ", undefined, (function (param) {
                        var gameObjectName = "g1";
                        var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                        StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                return GameObjectEngineService$WonderEditor.setGameObjectName(gameObjectName, partial_arg, param);
                              }));
                        MainEditorInspectorRemoveComponentTool$WonderEditor.removeRenderGroupComponent(undefined, undefined, undefined, /* () */0);
                        var wpkArrayBuffer = ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                        return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var g1 = LoadWDBTool$WonderEditor.findGameObjectByName(gameObjectName, engineState);
                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                          GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent(g1, engineState),
                                                          GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(g1, engineState)
                                                        ]), /* tuple */[
                                                      false,
                                                      false
                                                    ]));
                                    }), wpkArrayBuffer, undefined, undefined, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("removed material asset should exist after import", (function (param) {
                              return Wonder_jest.testPromise("\n          add gameObject g1 to scene tree;\n          add material asset m1;\n          g1->add m1 lightMaterial component;\n          g1->dispose renderGroup component;\n          export wpk w1;\n          import w1;\n\n          m1 should alive;\n          ", undefined, (function (param) {
                                            var g1 = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                            var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                            var removedMaterialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                            MainEditorMaterialTool$WonderEditor.changeMaterial(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                        return GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(g1, param);
                                                      })), /* LightMaterial */1, removedMaterialComponent, /* LightMaterial */1, addedMaterialNodeId, g1, undefined, undefined, /* () */0);
                                            MainEditorInspectorRemoveComponentTool$WonderEditor.removeRenderGroupComponent(undefined, undefined, undefined, /* () */0);
                                            var wpkArrayBuffer = ExportPackageTool$WonderEditor.exportWPK(/* () */0);
                                            return ImportPackageTool$WonderEditor.testImportPackageWithoutExport((function (param) {
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              LightMaterialToolEngine$WonderEditor.isAlive(removedMaterialComponent, engineState),
                                                                              LightMaterialEngineService$WonderEditor.hasLightMaterialGameObjects(removedMaterialComponent, engineState)
                                                                            ]), /* tuple */[
                                                                          true,
                                                                          false
                                                                        ]));
                                                        }), wpkArrayBuffer, undefined, undefined, undefined, /* () */0);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test material assets after import", (function (param) {
                      var truckWDBArrayBuffer = /* record */[/* contents */1];
                      beforeAll((function () {
                              truckWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("CesiumMilkTruck");
                              return /* () */0;
                            }));
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                              MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), SettingToolEngine$WonderEditor.buildBufferConfigStr(50000, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), false, /* () */0);
                              StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                              CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                              MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                              return /* () */0;
                            }));
                      return Wonder_jest.testPromise("\n             load wdb w1;\n             add folder f1 to root;\n             enter f1;\n             load wdb w2;\n             export;\n             import;\n             enter f1->Materials folder;\n\n             should show w2->materials;\n             ", undefined, (function (param) {
                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (param) {
                                                  var addedFolderNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                  MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](addedFolderNodeId, undefined, /* () */0);
                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(truckWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (param) {
                                                                return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                              var __x = OptionService$WonderEditor.unsafeGet(StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                                                                          return MainEditorAssetTreeTool$WonderEditor.findNodeIdsByName("Materials", param);
                                                                                        })));
                                                                              var truckMaterialsFolderId = List.nth(__x, 1);
                                                                              MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](truckMaterialsFolderId, undefined, /* () */0);
                                                                              return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                            }), undefined, undefined, undefined, undefined, /* () */0);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
