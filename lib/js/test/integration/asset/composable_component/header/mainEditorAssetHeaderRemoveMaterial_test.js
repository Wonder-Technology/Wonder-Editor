'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var NoWorkerJobTool$WonderEditor = require("../../../tool/NoWorkerJobTool.js");
var JobEngineService$WonderEditor = require("../../../../../src/service/state/engine/job/JobEngineService.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var InspectorCanvasTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/tool/InspectorCanvasTool.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../tool/MainEditorAssetIdTool.js");
var MaterialInspectorTool$WonderEditor = require("../../../inspector/composable_component/asset_inspector/atom_component/material_inspector/tool/MaterialInspectorTool.js");
var MainEditorMaterialTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js");
var BasicMaterialToolEngine$WonderEditor = require("../../../../tool/engine/BasicMaterialToolEngine.js");
var LightMaterialToolEngine$WonderEditor = require("../../../../tool/engine/LightMaterialToolEngine.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var MaterialNodeAssetService$WonderEditor = require("../../../../../src/service/record/editor/asset/MaterialNodeAssetService.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../tool/MainEditorAssetUploadTool.js");
var BasicSourceTextureToolEngine$WonderEditor = require("../../../../tool/engine/BasicSourceTextureToolEngine.js");
var OperateTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js");
var MainEditorAssetTextureNodeTool$WonderEditor = require("../../tool/MainEditorAssetTextureNodeTool.js");
var MainEditorAssetMaterialNodeTool$WonderEditor = require("../../tool/MainEditorAssetMaterialNodeTool.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../tool/MainEditorAssetHeaderOperateNodeTool.js");
var MainEditorLightMaterialForGameObjectTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialForGameObjectTool.js");
var BasicSourceTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/imageDataMap/BasicSourceTextureImageDataMapAssetEditorService.js");

Wonder_jest.describe("MainEditorAssetHeader->remove material", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                InspectorCanvasTool$WonderEditor.prepareInspectorEngineState(sandbox);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("\n        select material;\n        click remove-button;\n            ", (function (param) {
                Wonder_jest.test("should remove it from assetTreeRoot", (function (param) {
                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* getFirstMaterialNodeId */2], assetTreeData), /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0));
                      }));
                return Wonder_jest.test("should remove its imageData from basicSourceTextureImageDataMap", (function (param) {
                              var materialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                              var match = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(materialNodeId, StateEditorService$WonderEditor.getState(/* () */0)));
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, materialNodeId, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(BasicSourceTextureImageDataMapAssetEditorService$WonderEditor.getData(match[/* snapshotImageDataIndex */2], StateEditorService$WonderEditor.getState(/* () */0)))), true);
                            }));
              }));
        Wonder_jest.describe("if material has no gameObjects, dispose material", (function (param) {
                beforeEach((function () {
                        NoWorkerJobTool$WonderEditor.initStateWithDisposeJob(sandbox, undefined, /* () */0);
                        return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                      }));
                Wonder_jest.describe("test basic material", (function (param) {
                        return Wonder_jest.test("material shouldn't be alive", (function (param) {
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                      var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                      MaterialInspectorTool$WonderEditor.changeMaterialType(materialComponent, /* LightMaterial */1, /* BasicMaterial */0, addedMaterialNodeId, undefined, undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, addedMaterialNodeId, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                            return BasicMaterialToolEngine$WonderEditor.isAlive(materialComponent, param);
                                                          }))), false);
                                    }));
                      }));
                return Wonder_jest.describe("test light material", (function (param) {
                              Wonder_jest.test("material shouldn't be alive", (function (param) {
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                      var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, addedMaterialNodeId, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                            return LightMaterialToolEngine$WonderEditor.isAlive(materialComponent, param);
                                                          }))), false);
                                    }));
                              return Wonder_jest.describe("should remove instead of dispose material->maps ", (function (param) {
                                            beforeEach((function () {
                                                    Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                                    return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                                  }));
                                            return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                          MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                        var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                                        var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                                                        MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, materialComponent, uploadedTextureNodeId, /* () */0);
                                                                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, addedMaterialNodeId, /* () */0);
                                                                        var texture = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                return MainEditorAssetTextureNodeTool$WonderEditor.getTextureComponent(uploadedTextureNodeId, param);
                                                                              }));
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                  return BasicSourceTextureToolEngine$WonderEditor.isAlive(texture, param);
                                                                                                }))), true));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("else, replace material's gameObjects' material to default material", (function (param) {
                      Wonder_jest.describe("\n        add material m1;\n        select sceneTree->gameObject g1;\n        g1 change material to m1;\n        remove m1;\n        ", (function (param) {
                              var _prepareAndExec = function (param) {
                                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                                var sourceMaterial1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState);
                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial1, /* LightMaterial */1, materialComponent, /* LightMaterial */1, addedMaterialNodeId, gameObject1, undefined, undefined, /* () */0);
                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, addedMaterialNodeId, /* () */0);
                                return /* tuple */[
                                        gameObject1,
                                        materialComponent
                                      ];
                              };
                              Wonder_jest.test("select material group shouldn't contain removed material assets", (function (param) {
                                      var match = _prepareAndExec(/* () */0);
                                      var gameObject1 = match[0];
                                      GameObjectTool$WonderEditor.setCurrentSceneTreeNode(gameObject1);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMaterial(gameObject1, undefined, undefined, true, /* () */0));
                                    }));
                              return Wonder_jest.describe("g1 should use default light material", (function (param) {
                                            Wonder_jest.test("test snapshot", (function (param) {
                                                    var match = _prepareAndExec(/* () */0);
                                                    var gameObject1 = match[0];
                                                    GameObjectTool$WonderEditor.setCurrentSceneTreeNode(gameObject1);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMaterial(gameObject1, undefined, undefined, true, /* () */0));
                                                  }));
                                            return Wonder_jest.test("g1's material component shouldn't be m1", (function (param) {
                                                          var match = _prepareAndExec(/* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          return Wonder_jest.Expect[/* toEqual */12](match[1], Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(match[0], engineState))));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("should remove instead of dispose material->maps ", (function (param) {
                                    beforeEach((function () {
                                            Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                            return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                          }));
                                    return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                                var targetMaterial = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                                                                var sourceMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState);
                                                                MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial, /* LightMaterial */1, targetMaterial, /* LightMaterial */1, addedMaterialNodeId, gameObject1, undefined, undefined, /* () */0);
                                                                MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, targetMaterial, uploadedTextureNodeId, /* () */0);
                                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, addedMaterialNodeId, /* () */0);
                                                                StateLogicService$WonderEditor.getAndSetEngineState(JobEngineService$WonderEditor.execDisposeJob);
                                                                var texture = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                        return MainEditorAssetTextureNodeTool$WonderEditor.getTextureComponent(uploadedTextureNodeId, param);
                                                                      }));
                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                          return BasicSourceTextureToolEngine$WonderEditor.isAlive(texture, param);
                                                                                        }))), true));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
