

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as InspectorTool$WonderEditor from "../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as DirectorToolEngine$WonderEditor from "../../../tool/engine/DirectorToolEngine.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetIdTool$WonderEditor from "../tool/MainEditorAssetIdTool.js";
import * as MaterialInspectorTool$WonderEditor from "../../inspector/composable_component/assetTree_inspector/atom_component/material_inspector/tool/MaterialInspectorTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../../inspector/composable_component/assetTree_inspector/tool/AssetTreeInspectorTool.js";
import * as MainEditorMaterialTool$WonderEditor from "../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js";
import * as LightMaterialToolEngine$WonderEditor from "../../../tool/engine/LightMaterialToolEngine.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../tool/MainEditorAssetTreeTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../tool/MainEditorAssetUploadTool.js";
import * as MainEditorBasicMaterialTool$WonderEditor from "../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorBasicMaterialTool.js";
import * as MainEditorLightMaterialTool$WonderEditor from "../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as MainEditorAssetTextureNodeTool$WonderEditor from "../tool/MainEditorAssetTextureNodeTool.js";
import * as MainEditorAssetChildrenNodeTool$WonderEditor from "../tool/MainEditorAssetChildrenNodeTool.js";
import * as MainEditorAssetMaterialNodeTool$WonderEditor from "../tool/MainEditorAssetMaterialNodeTool.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../tool/MainEditorAssetHeaderOperateNodeTool.js";

describe("fix material asset bug", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("fix bug", (function () {
                describe("fix change material type bug", (function () {
                        var _prepareTwoGameObjects = function () {
                          MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                          var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                          var gameObject1 = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                          var gameObject2 = MainEditorSceneTool$WonderEditor.getSecondCube(engineState);
                          var sourceMaterial1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject1, engineState);
                          var sourceMaterial2 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject2, engineState);
                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                          var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                          MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial1, /* LightMaterial */1, materialComponent, /* LightMaterial */1, addedMaterialNodeId, gameObject1, undefined, undefined, /* () */0);
                          MainEditorMaterialTool$WonderEditor.changeMaterial(sourceMaterial2, /* LightMaterial */1, materialComponent, /* LightMaterial */1, addedMaterialNodeId, gameObject2, undefined, undefined, /* () */0);
                          return /* tuple */[
                                  /* tuple */[
                                    gameObject1,
                                    gameObject2
                                  ],
                                  materialComponent,
                                  addedMaterialNodeId
                                ];
                        };
                        describe("fix change gameObject->material->type bug", (function () {
                                describe("\n        add material m1;\n        select sceneTree->gameObject g1;\n        g1 change material to m1;\n        change g1->material->type to basicMaterial;\n        ", (function () {
                                        return Wonder_jest.test("m1->type should be basicMaterial", (function () {
                                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                      var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                      var gameObject = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                      var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                                      MainEditorMaterialTool$WonderEditor.changeMaterial(GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial(/* () */0), /* LightMaterial */1, materialComponent, /* LightMaterial */1, addedMaterialNodeId, gameObject, undefined, undefined, /* () */0);
                                                      MainEditorBasicMaterialTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(undefined, undefined, /* () */0);
                                                      var type_ = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialType(addedMaterialNodeId, undefined, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](type_), /* BasicMaterial */0);
                                                    }));
                                      }));
                                describe("\n        add material m1;\n        select sceneTree->gameObject g1;\n        g1 change material to m1;\n        select sceneTree->gameObject g2;\n        g2 change material to m1;\n        change g1->material->type to basicMaterial;\n        change g1->material->type to lightMaterial;\n        ", (function () {
                                        return Wonder_jest.test("m1->type and g2->material->type should be lightMaterial", (function () {
                                                      var match = _prepareTwoGameObjects(/* () */0);
                                                      var match$1 = match[0];
                                                      GameObjectTool$WonderEditor.setCurrentSceneTreeNode(match$1[0]);
                                                      MainEditorBasicMaterialTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(undefined, undefined, /* () */0);
                                                      MainEditorLightMaterialTool$WonderEditor.changeMaterialTypeToBeLightMaterial(undefined, undefined, /* () */0);
                                                      var type_ = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialType(match[2], undefined, /* () */0);
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      type_,
                                                                      GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(match$1[1], engineState)
                                                                    ]), /* tuple */[
                                                                  /* LightMaterial */1,
                                                                  true
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("fix change MaterialInspector->type bug", (function () {
                                var _prepareAndExec = function () {
                                  var match = _prepareTwoGameObjects(/* () */0);
                                  var addedMaterialNodeId = match[2];
                                  var materialComponent = match[1];
                                  var match$1 = match[0];
                                  MaterialInspectorTool$WonderEditor.changeMaterialType(materialComponent, /* LightMaterial */1, /* BasicMaterial */0, addedMaterialNodeId, undefined, undefined, /* () */0);
                                  return /* tuple */[
                                          /* tuple */[
                                            match$1[0],
                                            match$1[1]
                                          ],
                                          materialComponent,
                                          addedMaterialNodeId
                                        ];
                                };
                                describe("fix name", (function () {
                                        beforeEach((function () {
                                                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                return /* () */0;
                                              }));
                                        Wonder_jest.test("\n              1.change to basic material type;\n\n              name shouldn't change\n              ", (function () {
                                                var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                                MaterialInspectorTool$WonderEditor.changeMaterialType(materialComponent, /* LightMaterial */1, /* BasicMaterial */0, addedMaterialNodeId, undefined, undefined, /* () */0);
                                                MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(addedMaterialNodeId, undefined, undefined, /* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                              }));
                                        Wonder_jest.test("\n              1.change name to n1;\n              2.change to basic material type;\n\n              name should still be n1\n              ", (function () {
                                                var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */2](undefined, undefined, addedMaterialNodeId, "Material222", /* () */0);
                                                var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                                MaterialInspectorTool$WonderEditor.changeMaterialType(materialComponent, /* LightMaterial */1, /* BasicMaterial */0, addedMaterialNodeId, undefined, undefined, /* () */0);
                                                MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(addedMaterialNodeId, undefined, undefined, /* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                              }));
                                        Wonder_jest.test("\n              add material m1;\n              change m1->name to n1;\n              select sceneTree->gameObject g1;\n              g1 change material to m1;\n              change m1->type to basicMaterial;\n\n              m1->name should still be n1\n              ", (function () {
                                                var match = _prepareAndExec(/* () */0);
                                                var addedMaterialNodeId = match[2];
                                                AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */2](undefined, undefined, addedMaterialNodeId, "Material222", /* () */0);
                                                StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                GameObjectTool$WonderEditor.setCurrentSceneTreeNode(match[0][0]);
                                                MainEditorLightMaterialTool$WonderEditor.changeMaterialTypeToBeLightMaterial(undefined, undefined, /* () */0);
                                                MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(addedMaterialNodeId, undefined, undefined, /* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                              }));
                                        describe("\n        add material m1;\n        add material m2;\n        change m2->type to basicMaterial;\n        ", (function () {
                                                return Wonder_jest.test("m2->name shouldn't equal m1->name", (function () {
                                                              var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                              var addedMaterialNodeId2 = addedMaterialNodeId1 + 1 | 0;
                                                              GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                              var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId2, undefined, /* () */0);
                                                              MaterialInspectorTool$WonderEditor.changeMaterialType(materialComponent, /* LightMaterial */1, /* BasicMaterial */0, addedMaterialNodeId2, undefined, undefined, /* () */0);
                                                              MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(addedMaterialNodeId2, undefined, undefined, /* () */0);
                                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("\n        add material m1;\n        select sceneTree->gameObject g1;\n        g1 change material to m1;\n        select sceneTree->gameObject g2;\n        g2 change material to m1;\n        change m1->type to basicMaterial;\n        ", (function () {
                                        Wonder_jest.test("g1,g2->material->material type should be basicMaterial;", (function () {
                                                var match = _prepareAndExec(/* () */0);
                                                var match$1 = match[0];
                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(match$1[0], engineState),
                                                                GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(match$1[1], engineState)
                                                              ]), /* tuple */[
                                                            true,
                                                            true
                                                          ]);
                                              }));
                                        Wonder_jest.test("should dispose source material asset->materialComponent", (function () {
                                                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, false, undefined, /* () */0);
                                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                                var match = _prepareAndExec(/* () */0);
                                                DirectorToolEngine$WonderEditor.runWithDefaultTimeEngineState(/* () */0);
                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialToolEngine$WonderEditor.isAlive(match[1], engineState)), false);
                                              }));
                                        describe("\n    change g1->material->type to lightMaterial;\n    ", (function () {
                                                return Wonder_jest.test("m1->type and g2->material->type should be lightMaterial", (function () {
                                                              var match = _prepareAndExec(/* () */0);
                                                              var match$1 = match[0];
                                                              StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                              GameObjectTool$WonderEditor.setCurrentSceneTreeNode(match$1[0]);
                                                              MainEditorLightMaterialTool$WonderEditor.changeMaterialTypeToBeLightMaterial(undefined, undefined, /* () */0);
                                                              var type_ = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialType(match[2], undefined, /* () */0);
                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              type_,
                                                                              GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(match$1[1], engineState)
                                                                            ]), /* tuple */[
                                                                          /* LightMaterial */1,
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
                describe("\n        add material m1;\n        upload texture t1;\n        drag t1 to m1->diffuseMap;\n        remove t1 by remove texture asset;\n        ", (function () {
                        beforeEach((function () {
                                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                              }));
                        return Wonder_jest.testPromise("m1->materialInspector->diffuseMap should be none", (function () {
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                      var material = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                    MainEditorAssetTextureNodeTool$WonderEditor.getTextureComponent(uploadedTextureNodeId, editorState);
                                                    MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, material, uploadedTextureNodeId, /* () */0);
                                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, uploadedTextureNodeId, /* () */0);
                                                    MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(addedMaterialNodeId, undefined, undefined, /* () */0);
                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
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
