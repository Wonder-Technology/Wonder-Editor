'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../tool/TestTool.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var CanvasTool$WonderEditor = require("../../../unit/atom_component/canvas/tool/CanvasTool.js");
var InspectorTool$WonderEditor = require("../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var AssetInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/tool/AssetInspectorTool.js");
var BuildComponentTool$WonderEditor = require("../../../tool/BuildComponentTool.js");
var DirectorToolEngine$WonderEditor = require("../../../tool/engine/DirectorToolEngine.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../tool/MainEditorAssetIdTool.js");
var MaterialInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/atom_component/material_inspector/tool/MaterialInspectorTool.js");
var MainEditorMaterialTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js");
var LightMaterialToolEngine$WonderEditor = require("../../../tool/engine/LightMaterialToolEngine.js");
var MainEditorAssetTreeTool$WonderEditor = require("../tool/MainEditorAssetTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../tool/MainEditorAssetUploadTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var MainEditorAssetTextureNodeTool$WonderEditor = require("../tool/MainEditorAssetTextureNodeTool.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../tool/MainEditorAssetChildrenNodeTool.js");
var MainEditorAssetMaterialNodeTool$WonderEditor = require("../tool/MainEditorAssetMaterialNodeTool.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../tool/MainEditorAssetHeaderOperateNodeTool.js");
var MainEditorBasicMaterialForGameObjectTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorBasicMaterialForGameObjectTool.js");
var MainEditorLightMaterialForGameObjectTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialForGameObjectTool.js");

Wonder_jest.describe("fix material asset bug", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      Wonder_jest.describe("fix change material type bug", (function (param) {
                              var _prepareTwoGameObjects = function (param) {
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
                              Wonder_jest.describe("fix change gameObject->material->type bug", (function (param) {
                                      Wonder_jest.describe("\n        add material m1;\n        select sceneTree->gameObject g1;\n        g1 change material to m1;\n        change g1->material->type to basicMaterial;\n        ", (function (param) {
                                              return Wonder_jest.test("m1->type should be basicMaterial", (function (param) {
                                                            MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                            var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                            var gameObject = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                            var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                                            MainEditorMaterialTool$WonderEditor.changeMaterial(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeLightMaterial(/* () */0), /* LightMaterial */1, materialComponent, /* LightMaterial */1, addedMaterialNodeId, gameObject, undefined, undefined, /* () */0);
                                                            MainEditorBasicMaterialForGameObjectTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(undefined, undefined, /* () */0);
                                                            var type_ = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialType(addedMaterialNodeId, undefined, /* () */0);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](type_), /* BasicMaterial */0);
                                                          }));
                                            }));
                                      return Wonder_jest.describe("\n        add material m1;\n        select sceneTree->gameObject g1;\n        g1 change material to m1;\n        select sceneTree->gameObject g2;\n        g2 change material to m1;\n        change g1->material->type to basicMaterial;\n        change g1->material->type to lightMaterial;\n        ", (function (param) {
                                                    return Wonder_jest.test("m1->type and g2->material->type should be lightMaterial", (function (param) {
                                                                  var match = _prepareTwoGameObjects(/* () */0);
                                                                  var match$1 = match[0];
                                                                  GameObjectTool$WonderEditor.setCurrentSceneTreeNode(match$1[0]);
                                                                  MainEditorBasicMaterialForGameObjectTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(undefined, undefined, /* () */0);
                                                                  MainEditorLightMaterialForGameObjectTool$WonderEditor.changeMaterialTypeToBeLightMaterial(undefined, undefined, /* () */0);
                                                                  var type_ = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialType(match[2], undefined, /* () */0);
                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  type_,
                                                                                  GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(match$1[1], engineState)
                                                                                ]), /* tuple */[
                                                                              /* LightMaterial */1,
                                                                              true
                                                                            ]);
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("fix change MaterialInspector->type bug", (function (param) {
                                            var _prepareAndExec = function (param) {
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
                                            Wonder_jest.describe("fix name", (function (param) {
                                                    beforeEach((function () {
                                                            MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                            return /* () */0;
                                                          }));
                                                    Wonder_jest.test("\n              1.change to basic material type;\n\n              name shouldn't change\n              ", (function (param) {
                                                            var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                            var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                                            MaterialInspectorTool$WonderEditor.changeMaterialType(materialComponent, /* LightMaterial */1, /* BasicMaterial */0, addedMaterialNodeId, undefined, undefined, /* () */0);
                                                            MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(addedMaterialNodeId, undefined, undefined, /* () */0);
                                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                          }));
                                                    Wonder_jest.test("\n              1.change name to n1;\n              2.change to basic material type;\n\n              name should still be n1\n              ", (function (param) {
                                                            var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */5](undefined, undefined, addedMaterialNodeId, "Material222", /* () */0);
                                                            var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                                            MaterialInspectorTool$WonderEditor.changeMaterialType(materialComponent, /* LightMaterial */1, /* BasicMaterial */0, addedMaterialNodeId, undefined, undefined, /* () */0);
                                                            MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(addedMaterialNodeId, undefined, undefined, /* () */0);
                                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                          }));
                                                    Wonder_jest.test("\n              add material m1;\n              change m1->name to n1;\n              select sceneTree->gameObject g1;\n              g1 change material to m1;\n              change m1->type to basicMaterial;\n\n              m1->name should still be n1\n              ", (function (param) {
                                                            var match = _prepareAndExec(/* () */0);
                                                            var addedMaterialNodeId = match[2];
                                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */5](undefined, undefined, addedMaterialNodeId, "Material222", /* () */0);
                                                            StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                            GameObjectTool$WonderEditor.setCurrentSceneTreeNode(match[0][0]);
                                                            MainEditorLightMaterialForGameObjectTool$WonderEditor.changeMaterialTypeToBeLightMaterial(undefined, undefined, /* () */0);
                                                            MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(addedMaterialNodeId, undefined, undefined, /* () */0);
                                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                          }));
                                                    return Wonder_jest.describe("\n        add material m1;\n        add material m2;\n        change m2->type to basicMaterial;\n        ", (function (param) {
                                                                  return Wonder_jest.test("m2->name shouldn't equal m1->name", (function (param) {
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
                                                  }));
                                            return Wonder_jest.describe("\n        add material m1;\n        select sceneTree->gameObject g1;\n        g1 change material to m1;\n        select sceneTree->gameObject g2;\n        g2 change material to m1;\n        change m1->type to basicMaterial;\n        ", (function (param) {
                                                          Wonder_jest.test("g1,g2->material->material type should be basicMaterial;", (function (param) {
                                                                  var match = _prepareAndExec(/* () */0);
                                                                  var match$1 = match[0];
                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(match$1[0], engineState),
                                                                                  GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(match$1[1], engineState)
                                                                                ]), /* tuple */[
                                                                              true,
                                                                              true
                                                                            ]);
                                                                }));
                                                          Wonder_jest.test("should dispose source material asset->materialComponent", (function (param) {
                                                                  MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, false, undefined, undefined, /* () */0);
                                                                  MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                                                  var match = _prepareAndExec(/* () */0);
                                                                  DirectorToolEngine$WonderEditor.runWithDefaultTimeEngineState(/* () */0);
                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialToolEngine$WonderEditor.isAlive(match[1], engineState)), false);
                                                                }));
                                                          return Wonder_jest.describe("\n    change g1->material->type to lightMaterial;\n    ", (function (param) {
                                                                        return Wonder_jest.test("m1->type and g2->material->type should be lightMaterial", (function (param) {
                                                                                      var match = _prepareAndExec(/* () */0);
                                                                                      var match$1 = match[0];
                                                                                      StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                      GameObjectTool$WonderEditor.setCurrentSceneTreeNode(match$1[0]);
                                                                                      MainEditorLightMaterialForGameObjectTool$WonderEditor.changeMaterialTypeToBeLightMaterial(undefined, undefined, /* () */0);
                                                                                      var type_ = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialType(match[2], undefined, /* () */0);
                                                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                      type_,
                                                                                                      GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(match$1[1], engineState)
                                                                                                    ]), /* tuple */[
                                                                                                  /* LightMaterial */1,
                                                                                                  true
                                                                                                ]);
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("\n        add material m1;\n        upload texture t1;\n        drag t1 to m1->diffuseMap;\n        remove t1 by remove texture asset;\n        ", (function (param) {
                                    beforeEach((function () {
                                            Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                            return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                          }));
                                    return Wonder_jest.testPromise("m1->materialInspector->diffuseMap should be none", undefined, (function (param) {
                                                  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                  var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                                  var material = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                MainEditorAssetTextureNodeTool$WonderEditor.getTextureComponent(uploadedTextureNodeId, editorState);
                                                                MainEditorLightMaterialForGameObjectTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, material, uploadedTextureNodeId, /* () */0);
                                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, uploadedTextureNodeId, /* () */0);
                                                                MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(addedMaterialNodeId, undefined, undefined, /* () */0);
                                                                return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
