'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ReactTestTool$WonderEditor = require("../../../../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../../../asset_inspector/tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../../../../../tool/BuildComponentTool.js");
var DirectorToolEngine$WonderEditor = require("../../../../../../../tool/engine/DirectorToolEngine.js");
var StateEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetIdTool.js");
var MeshRendererToolEngine$WonderEditor = require("../../../../../../../tool/engine/MeshRendererToolEngine.js");
var LightMaterialToolEngine$WonderEditor = require("../../../../../../../tool/engine/LightMaterialToolEngine.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorMaterialUtils$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/utils/MainEditorMaterialUtils.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var MainEditorBasicMaterialForGameObjectTool$WonderEditor = require("../tool/MainEditorBasicMaterialForGameObjectTool.js");

Wonder_jest.describe("MainEditorMaterial", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test set currentSceneTreeNode", (function (param) {
                beforeEach((function () {
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                      }));
                Wonder_jest.describe("test change material", (function (param) {
                        Wonder_jest.describe("test snapshot", (function (param) {
                                return Wonder_jest.test("test show default light material component", (function (param) {
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMaterial(undefined, undefined, undefined, undefined, /* () */0));
                                            }));
                              }));
                        return Wonder_jest.describe("test logic", (function (param) {
                                      beforeEach((function () {
                                              return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                                            }));
                                      Wonder_jest.test("currentSceneTreeNode's default material should be lightMaterial", (function (param) {
                                              var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              var materialType = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                      return MainEditorMaterialUtils$WonderEditor.getMaterialTypeByGameObject(partial_arg, param);
                                                    }));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](materialType), /* LightMaterial */1);
                                            }));
                                      return Wonder_jest.describe("test change currentSceneTreeNode's lightMaterial to basicMaterial", (function (param) {
                                                    Wonder_jest.test("test currentSceneTreeNode's material component should be basicMaterial", (function (param) {
                                                            MainEditorBasicMaterialForGameObjectTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(undefined, undefined, /* () */0);
                                                            var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                  return GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(partial_arg, param);
                                                                                }))), true);
                                                          }));
                                                    Wonder_jest.test("test gameObject should move from lightMaterialRenderGameObjectArray to basicMaterialRenderGameObjectArray", (function (param) {
                                                            var match = MeshRendererToolEngine$WonderEditor.getAllRenderArrayCount(/* () */0);
                                                            MainEditorBasicMaterialForGameObjectTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(undefined, undefined, /* () */0);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererToolEngine$WonderEditor.getAllRenderArrayCount(/* () */0)), /* tuple */[
                                                                        match[0] + 2 | 0,
                                                                        match[1] - 2 | 0
                                                                      ]);
                                                          }));
                                                    return Wonder_jest.test("should remove lightMaterial instead of dispose it", (function (param) {
                                                                  var currentGameObject = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                  var oldLightMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(currentGameObject, engineState);
                                                                  MainEditorBasicMaterialForGameObjectTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(undefined, undefined, /* () */0);
                                                                  var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  LightMaterialToolEngine$WonderEditor.isAlive(oldLightMaterial, engineState$1),
                                                                                  GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(currentGameObject, engineState$1)
                                                                                ]), /* tuple */[
                                                                              true,
                                                                              false
                                                                            ]);
                                                                }));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("deal with specific case", (function (param) {
                              return Wonder_jest.describe("test MainEditorMaterialUtils getMaterialTypeByGameObject function", (function (param) {
                                            return Wonder_jest.test("test if gameObject haven't material component, should throw error", (function (param) {
                                                          return Wonder_jest.Expect[/* toThrowMessageRe */22]((/should\shas\smaterial\scomponent/g), Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                            MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectToBeCurrentSceneTreeNode(/* () */0);
                                                                            var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                                            return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                          return MainEditorMaterialUtils$WonderEditor.getMaterialTypeByGameObject(partial_arg, param);
                                                                                        }));
                                                                          })));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test select material group->show order", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                              return /* () */0;
                            }));
                      return Wonder_jest.test("\n        order should be:\n        1)default material is in the end;\n        2)sort material assets by firstname alphabetically\n        ", (function (param) {
                                    var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                    var addedMaterialNodeId2 = addedMaterialNodeId1 + 1 | 0;
                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                    AssetInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */5](undefined, undefined, addedMaterialNodeId1, "BMaterial", /* () */0);
                                    AssetInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */5](undefined, undefined, addedMaterialNodeId2, "AMaterial", /* () */0);
                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMaterial(GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), undefined, undefined, true, /* () */0));
                                  }));
                    }));
      }));

/*  Not a pure module */
