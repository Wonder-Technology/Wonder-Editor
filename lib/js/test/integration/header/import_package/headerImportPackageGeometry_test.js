'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../tool/WDBTool.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var CanvasTool$WonderEditor = require("../../../unit/atom_component/canvas/tool/CanvasTool.js");
var ArrayService$WonderEditor = require("../../../../src/service/atom/ArrayService.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var ImportPackageTool$WonderEditor = require("./tool/ImportPackageTool.js");
var BuildComponentTool$WonderEditor = require("../../../tool/BuildComponentTool.js");
var DirectorToolEngine$WonderEditor = require("../../../tool/engine/DirectorToolEngine.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var PrimitiveLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/PrimitiveLogicService.js");
var GameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../unit/tool/MainEditorSceneTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../asset/tool/MainEditorAssetUploadTool.js");
var LightMaterialEngineService$WonderEditor = require("../../../../src/service/state/engine/LightMaterialEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var GeometryDataAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/GeometryDataAssetEditorService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");

Wonder_jest.describe("header import package->geometry", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                ImportPackageTool$WonderEditor.prepareLoad(sandbox);
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.testPromise("\n          1.export;\n          2.import;\n\n          select geometry group widget should have only default geometrys\n          ", undefined, (function (param) {
                return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                              GameObjectTool$WonderEditor.setCurrentSceneTreeNode(MainEditorSceneTool$WonderEditor.getFirstCube(engineState));
                              MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* () */0);
                              var component = BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0);
                              return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(component));
                            }), undefined, undefined, undefined, undefined, /* () */0);
              }));
        return Wonder_jest.describe("test with wdb assets", (function (param) {
                      beforeEach((function () {
                              ImportPackageTool$WonderEditor.prepareFakeCanvas(sandbox);
                              return /* () */0;
                            }));
                      return Wonder_jest.describe("relate wdb asset gameObjects with default geometrys", (function (param) {
                                    var cubeWDBArrayBuffer = /* record */[/* contents */1];
                                    var _generateCubeWDB = function (param) {
                                      return WDBTool$WonderEditor.generateWDB((function (editorState, engineState) {
                                                    var geometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState);
                                                    var match = LightMaterialEngineService$WonderEditor.create(engineState);
                                                    var match$1 = PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                                                          geometry,
                                                          match[1]
                                                        ], editorState, match[0]);
                                                    var match$2 = GameObjectEngineService$WonderEditor.create(match$1[1]);
                                                    var rootGameObject = match$2[1];
                                                    var engineState$1 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, match$1[2], match$2[0]);
                                                    return /* tuple */[
                                                            rootGameObject,
                                                            /* tuple */[
                                                              match$1[0],
                                                              engineState$1
                                                            ]
                                                          ];
                                                  }));
                                    };
                                    beforeAll((function () {
                                            cubeWDBArrayBuffer[0] = _generateCubeWDB(/* () */0);
                                            return /* () */0;
                                          }));
                                    Wonder_jest.testPromise("\n               1.load cube wdb asset w1(with default cube geometry);\n               2.export;\n               3.import;\n               4.drag w1 to scene tree to be gameObject g1;\n\n\n               g1->geometry->select geometry group widget should only have default geometrys and be using default cube geometry\n               ", undefined, (function (param) {
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                          return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                        var wdbNodeId = ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.getImportedWDBAssetNodeId(/* () */0));
                                                                        MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](wdbNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                        GameObjectTool$WonderEditor.setCurrentSceneTreeNode(MainEditorSceneTool$WonderEditor.getFirstCube(engineState));
                                                                        MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* () */0);
                                                                        var component = BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0);
                                                                        return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(component));
                                                                      }), undefined, undefined, undefined, undefined, /* () */0);
                                                        }));
                                          }));
                                    return Wonder_jest.describe("\n                  1.load cube wdb asset w1(with default cube geometry);\n                  1.load cube wdb asset w2(with default cube geometry);\n                  2.export;\n                  3.import;\n                  4.drag w1 to scene tree to be gameObject g1;\n                  5.drag w2 to scene tree to be gameObject g2;\n                  ", (function (param) {
                                                  var _prepare = function (testFunc) {
                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId1) {
                                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId2) {
                                                                                return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                                              var wdbNodeId1 = ArrayService$WonderEditor.unsafeGetFirst(ImportPackageTool$WonderEditor.getImportedWDBAssetNodeId(/* () */0));
                                                                                              var wdbNodeId2 = ArrayService$WonderEditor.unsafeGetNth(1, ImportPackageTool$WonderEditor.getImportedWDBAssetNodeId(/* () */0));
                                                                                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](wdbNodeId1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](wdbNodeId2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                                              return Curry._1(testFunc, /* () */0);
                                                                                            }), undefined, undefined, undefined, undefined, /* () */0);
                                                                              }));
                                                                }));
                                                  };
                                                  Wonder_jest.testPromise("g1->geometry->select geometry group widget should only have default geometrys and be using default cube geometry", undefined, (function (param) {
                                                          return _prepare((function (param) {
                                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                        GameObjectTool$WonderEditor.setCurrentSceneTreeNode(MainEditorSceneTool$WonderEditor.getFirstCube(engineState));
                                                                        MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* () */0);
                                                                        var component = BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0);
                                                                        return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(component));
                                                                      }));
                                                        }));
                                                  return Wonder_jest.testPromise("g2->geometry->select geometry group widget should only have default geometrys and be using default cube geometry", undefined, (function (param) {
                                                                return _prepare((function (param) {
                                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                              GameObjectTool$WonderEditor.setCurrentSceneTreeNode(MainEditorSceneTool$WonderEditor.getSecondCube(engineState));
                                                                              MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0), /* () */0);
                                                                              var component = BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0);
                                                                              return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(component));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
