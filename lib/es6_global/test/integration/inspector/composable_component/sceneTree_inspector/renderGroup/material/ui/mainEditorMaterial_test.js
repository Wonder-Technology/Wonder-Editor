

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTestTool$WonderEditor from "../../../../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../../tool/BuildComponentTool.js";
import * as DirectorToolEngine$WonderEditor from "../../../../../../../tool/engine/DirectorToolEngine.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetIdTool$WonderEditor from "../../../../../../asset/tool/MainEditorAssetIdTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../../../../assetTree_inspector/tool/AssetTreeInspectorTool.js";
import * as MeshRendererToolEngine$WonderEditor from "../../../../../../../tool/engine/MeshRendererToolEngine.js";
import * as LightMaterialToolEngine$WonderEditor from "../../../../../../../tool/engine/LightMaterialToolEngine.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../../../../../asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorMaterialUtils$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/utils/MainEditorMaterialUtils.js";
import * as MainEditorBasicMaterialTool$WonderEditor from "../tool/MainEditorBasicMaterialTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js";

describe("MainEditorMaterial", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set currentSceneTreeNode", (function (param) {
                beforeEach((function (param) {
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                      }));
                describe("test change material", (function (param) {
                        describe("test snapshot", (function (param) {
                                return Wonder_jest.test("test show default light material component", (function (param) {
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMaterial(undefined, undefined, undefined, undefined, /* () */0));
                                            }));
                              }));
                        describe("test logic", (function (param) {
                                beforeEach((function (param) {
                                        return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                                      }));
                                Wonder_jest.test("currentSceneTreeNode's default material should be lightMaterial", (function (param) {
                                        var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                        var materialType = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                return MainEditorMaterialUtils$WonderEditor.getMaterialTypeByGameObject(partial_arg, param);
                                              }));
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](materialType), /* LightMaterial */1);
                                      }));
                                describe("test change currentSceneTreeNode's lightMaterial to basicMaterial", (function (param) {
                                        Wonder_jest.test("test currentSceneTreeNode's material component should be basicMaterial", (function (param) {
                                                MainEditorBasicMaterialTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(undefined, undefined, /* () */0);
                                                var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                      return GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(partial_arg, param);
                                                                    }))), true);
                                              }));
                                        Wonder_jest.test("test gameObject should move from lightMaterialRenderArray to basicMaterialRenderArray", (function (param) {
                                                var match = MeshRendererToolEngine$WonderEditor.getAllRenderArrayCount(/* () */0);
                                                MainEditorBasicMaterialTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(undefined, undefined, /* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererToolEngine$WonderEditor.getAllRenderArrayCount(/* () */0)), /* tuple */[
                                                            match[0] + 2 | 0,
                                                            match[1] - 2 | 0
                                                          ]);
                                              }));
                                        return Wonder_jest.test("should remove lightMaterial instead of dispose it", (function (param) {
                                                      var currentGameObject = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var oldLightMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(currentGameObject, engineState);
                                                      MainEditorBasicMaterialTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(undefined, undefined, /* () */0);
                                                      var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      LightMaterialToolEngine$WonderEditor.isAlive(oldLightMaterial, engineState$1),
                                                                      GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(currentGameObject, engineState$1)
                                                                    ]), /* tuple */[
                                                                  true,
                                                                  false
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("deal with specific case", (function (param) {
                        describe("test MainEditorMaterialUtils getMaterialTypeByGameObject function", (function (param) {
                                return Wonder_jest.test("test if gameObject haven't material component, should throw error", (function (param) {
                                              return Wonder_jest.Expect[/* toThrowMessageRe */21]((/should\shas\smaterial\scomponent/g), Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectToBeCurrentSceneTreeNode(/* () */0);
                                                                var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                                return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                              return MainEditorMaterialUtils$WonderEditor.getMaterialTypeByGameObject(partial_arg, param);
                                                                            }));
                                                              })));
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test select material group->show order", (function (param) {
                beforeEach((function (param) {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                        return /* () */0;
                      }));
                return Wonder_jest.test("\n        order should be:\n        1)default material is in the end;\n        2)sort material assets by firstname alphabetically\n        ", (function (param) {
                              var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                              var addedMaterialNodeId2 = addedMaterialNodeId1 + 1 | 0;
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                              AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */2](undefined, undefined, addedMaterialNodeId1, "BMaterial", /* () */0);
                              AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */2](undefined, undefined, addedMaterialNodeId2, "AMaterial", /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMaterial(GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), undefined, undefined, true, /* () */0));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
