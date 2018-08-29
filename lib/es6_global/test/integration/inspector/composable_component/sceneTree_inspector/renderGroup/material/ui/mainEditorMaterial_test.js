

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
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorMaterialTool$WonderEditor from "../tool/MainEditorMaterialTool.js";
import * as MeshRendererToolEngine$WonderEditor from "../../../../../../../tool/engine/MeshRendererToolEngine.js";
import * as MainEditorMaterialUtils$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/utils/MainEditorMaterialUtils.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("MainEditorMaterial", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set currentSceneTreeNode", (function () {
                beforeEach((function () {
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                      }));
                describe("test change material", (function () {
                        describe("test snapshot", (function () {
                                Wonder_jest.test("test show default light material component", (function () {
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMaterial(/* () */0));
                                      }));
                                return Wonder_jest.test("test change to basic material component", (function () {
                                              DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                                              MainEditorMaterialTool$WonderEditor.setMaterialTypeToBeBaiscMaterial(/* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMaterial(/* () */0));
                                            }));
                              }));
                        describe("test logic", (function () {
                                beforeEach((function () {
                                        return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                                      }));
                                Wonder_jest.test("currentSceneTreeNode's default material should be lightMaterial", (function () {
                                        var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                        var materialType = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                return MainEditorMaterialUtils$WonderEditor.getMaterialTypeByGameObject(partial_arg, param);
                                              }));
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](materialType), /* LightMaterial */1);
                                      }));
                                describe("test change currentSceneTreeNode's lightMaterial to basicMaterial", (function () {
                                        Wonder_jest.test("test currentSceneTreeNode's material component should be basicMaterial", (function () {
                                                MainEditorMaterialTool$WonderEditor.setMaterialTypeToBeBaiscMaterial(/* () */0);
                                                var partial_arg = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                      return GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(partial_arg, param);
                                                                    }))), true);
                                              }));
                                        return Wonder_jest.test("test gameObject should move from lightMaterialRenderArray to basicMaterialRenderArray", (function () {
                                                      var match = MeshRendererToolEngine$WonderEditor.getAllRenderArrayCount(/* () */0);
                                                      MainEditorMaterialTool$WonderEditor.setMaterialTypeToBeBaiscMaterial(/* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererToolEngine$WonderEditor.getAllRenderArrayCount(/* () */0)), /* tuple */[
                                                                  match[0] + 1 | 0,
                                                                  match[1] - 1 | 0
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("deal with specific case", (function () {
                        describe("test MainEditorMaterialUtils getMaterialTypeByGameObject function", (function () {
                                return Wonder_jest.test("test if gameObject haven't material component, should throw error", (function () {
                                              return Wonder_jest.Expect[/* toThrowMessageRe */21]((/getMaterialTypeByGameObject/img), Wonder_jest.Expect[/* expect */0]((function () {
                                                                MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectTobeCurrentSceneTreeNode(/* () */0);
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
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
