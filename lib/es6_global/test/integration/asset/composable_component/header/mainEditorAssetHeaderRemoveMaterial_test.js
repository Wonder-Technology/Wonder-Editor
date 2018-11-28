

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetIdTool$WonderEditor from "../../tool/MainEditorAssetIdTool.js";
import * as MainEditorMaterialTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../tool/MainEditorAssetTreeTool.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/MaterialNodeMapAssetEditorService.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../tool/MainEditorAssetHeaderOperateNodeTool.js";

describe("MainEditorAssetHeader->remove material", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("\n        select material;\n        click remove-button;\n            ", (function () {
                return Wonder_jest.test("should remove it from assetTreeRoot", (function () {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */2][/* buildOneMaterialAssetTree */0], /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */2][/* getFirstMaterialNodeId */2], assetTreeData), /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                            }));
              }));
        describe("\n        add material m1;\n        select sceneTree->gameObject g1;\n        g1 change material to m1;\n        remove m1;\n        ", (function () {
                Wonder_jest.test("select material group shouldn't contain removed material assets", (function () {
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                        var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                        var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstBox(engineState);
                        var sourceMaterial1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                        var match = MaterialNodeMapAssetEditorService$WonderEditor.unsafeGetResult(addedMaterialNodeId, StateEditorService$WonderEditor.getState(/* () */0));
                        MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial1, /* LightMaterial */1, match[/* materialComponent */2], /* LightMaterial */1, addedMaterialNodeId, gameObject1, undefined, undefined, /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, addedMaterialNodeId, /* () */0);
                        GameObjectTool$WonderEditor.setCurrentSceneTreeNode(gameObject1);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMaterial(gameObject1, undefined, undefined, true, /* () */0));
                      }));
                describe("g1 should use default light material", (function () {
                        Wonder_jest.test("test snapshot", (function () {
                                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                                var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstBox(engineState);
                                var sourceMaterial1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState);
                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                var match = MaterialNodeMapAssetEditorService$WonderEditor.unsafeGetResult(addedMaterialNodeId, StateEditorService$WonderEditor.getState(/* () */0));
                                MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial1, /* LightMaterial */1, match[/* materialComponent */2], /* LightMaterial */1, addedMaterialNodeId, gameObject1, undefined, undefined, /* () */0);
                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, addedMaterialNodeId, /* () */0);
                                GameObjectTool$WonderEditor.setCurrentSceneTreeNode(gameObject1);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMaterial(gameObject1, undefined, undefined, true, /* () */0));
                              }));
                        return Wonder_jest.test("g1's material component shouldn't be m1", (function () {
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                                      var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstBox(engineState);
                                      var sourceMaterial1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                      var match = MaterialNodeMapAssetEditorService$WonderEditor.unsafeGetResult(addedMaterialNodeId, StateEditorService$WonderEditor.getState(/* () */0));
                                      var materialComponent = match[/* materialComponent */2];
                                      MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial1, /* LightMaterial */1, materialComponent, /* LightMaterial */1, addedMaterialNodeId, gameObject1, undefined, undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, addedMaterialNodeId, /* () */0);
                                      var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      return Wonder_jest.Expect[/* toEqual */12](materialComponent)(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState$1))));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
