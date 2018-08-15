

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../../tool/GameObjectTool.js";
import * as DiffComponentTool$WonderEditor from "../../../../../../../../tool/DiffComponentTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../../../tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as DirectorToolEngine$WonderEditor from "../../../../../../../../tool/engine/DirectorToolEngine.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorMaterialTool$WonderEditor from "../../../../../../../../integration/inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("controller mainEditorMaterial", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test change material should change edit and run engineState", (function () {
                beforeEach((function () {
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                      }));
                describe("test change material", (function () {
                        beforeEach((function () {
                                return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                              }));
                        describe("test change currentSceneTreeNode's lightMaterial to basicMaterial", (function () {
                                return Wonder_jest.test("test currentSceneTreeNode's material component should be basicMaterial", (function () {
                                              MainEditorMaterialTool$WonderEditor.setMaterialTypeToBeBaiscMaterial(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(DiffComponentTool$WonderEditor.getEditEngineComponent(/* GameObject */0, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0)), StateLogicService$WonderEditor.getEditEngineState(/* () */0)),
                                                              GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0))
                                                            ]), /* tuple */[
                                                          true,
                                                          true
                                                        ]);
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
