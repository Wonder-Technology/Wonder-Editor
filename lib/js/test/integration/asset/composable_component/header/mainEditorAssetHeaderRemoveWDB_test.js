'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../../tool/LoadTool.js");
var TestTool$WonderEditor = require("../../../../tool/TestTool.js");
var MainUtils$WonderEditor = require("../../../../../src/core/utils/engine/MainUtils.js");
var BufferTool$WonderEditor = require("../../../../tool/BufferTool.js");
var CanvasTool$WonderEditor = require("../../../../unit/atom_component/canvas/tool/CanvasTool.js");
var LoadWDBTool$WonderEditor = require("../../../tool/LoadWDBTool.js");
var ArrayService$WonderEditor = require("../../../../../src/service/atom/ArrayService.js");
var InspectorTool$WonderEditor = require("../../../../tool/ui/InspectorTool.js");
var OptionService$WonderEditor = require("../../../../../src/service/primitive/OptionService.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../../unit/tool/EventListenerTool.js");
var ImportPackageTool$WonderEditor = require("../../../header/import_package/tool/ImportPackageTool.js");
var SettingToolEngine$WonderEditor = require("../../../../tool/engine/SettingToolEngine.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var PrimitiveLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/PrimitiveLogicService.js");
var GameObjectEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../../unit/tool/MainEditorSceneTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../tool/MainEditorAssetUploadTool.js");
var LightMaterialEngineService$WonderEditor = require("../../../../../src/service/state/engine/LightMaterialEngineService.js");
var MainEditorAssetWDBNodeTool$WonderEditor = require("../../tool/MainEditorAssetWDBNodeTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var GeometryDataAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/GeometryDataAssetEditorService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("MainEditorAssetHeader->remove wdb", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
        var sceneWDBArrayBuffer = /* record */[/* contents */1];
        beforeAll((function () {
                boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                sceneWDBArrayBuffer[0] = WDBTool$WonderEditor.generateSceneWDBWithArcballCameraController(/* () */0);
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                LoadTool$WonderEditor.buildFakeLoadImage();
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("drag wdb asset into scene;\n              select wdb to be currentNode;\n              click remove-button;\n              ", (function (param) {
                Wonder_jest.describe("test cloned gameObjects of the wdb asset", (function (param) {
                        Wonder_jest.testPromise("cloned gameObjects shouldn't be removed", undefined, (function (param) {
                                MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                                              return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0))));
                                            }));
                              }));
                        return Wonder_jest.describe("cloned gameObjects->geometrys should be disposed", (function (param) {
                                      var _prepare = function (testFunc) {
                                        MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                        return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                      MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                      MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var clonedGameObjectsWhoHasGeometryWhenCloned = LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjects(engineState);
                                                      StateEngineService$WonderEditor.setState(engineState);
                                                      return Curry._2(testFunc, clonedGameObjectsWhoHasGeometryWhenCloned, engineState);
                                                    }));
                                      };
                                      Wonder_jest.testPromise("test engine", undefined, (function (param) {
                                              return _prepare((function (clonedGameObjectsWhoHasGeometryWhenCloned, engineState) {
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](clonedGameObjectsWhoHasGeometryWhenCloned.map((function (gameObject) {
                                                                                      return GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(gameObject, engineState);
                                                                                    }))), /* array */[
                                                                            false,
                                                                            false
                                                                          ]));
                                                          }));
                                            }));
                                      return Wonder_jest.testPromise("test snapshot", undefined, (function (param) {
                                                    return _prepare((function (clonedGameObjectsWhoHasGeometryWhenCloned, engineState) {
                                                                  MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, ArrayService$WonderEditor.unsafeGetFirst(clonedGameObjectsWhoHasGeometryWhenCloned), /* () */0);
                                                                  return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                                                }));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("dispose wdb asset gameObject", (function (param) {
                              Wonder_jest.testPromise("it's geometry should be disposed", undefined, (function (param) {
                                      MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                    MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                                                    MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                    var component = BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0);
                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(component));
                                                  }));
                                    }));
                              Wonder_jest.describe("it's material should be removed", (function (param) {
                                      return Wonder_jest.testPromise("the material asset related with the material component should exist", undefined, (function (param) {
                                                    MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                                  MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                                                                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                  MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeIdByName("Materials", /* tuple */[
                                                                                editorState,
                                                                                engineState
                                                                              ])), undefined, /* () */0);
                                                                  return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0)));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.testPromise("it should be disposed", undefined, (function (param) {
                                            MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                          MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var wdbGameObject = LoadWDBTool$WonderEditor.getBoxTexturedMeshGameObjectFromAssetNode(uploadedWDBNodeId, /* tuple */[
                                                                editorState,
                                                                engineState
                                                              ]);
                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.isAlive(wdbGameObject, engineState)), false));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.testPromise("load BoxTextured.wdb;\n              remove BoxTextured.wdb;\n              load Scene.wdb;\n              load BoxTextured.wdb;\n\n              the MainEditorAssetChildrenNode panel should show \"Scene\",\"Cubetextured\"\n                ", undefined, (function (param) {
                MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(sceneWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (param) {
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (param) {
                                                          return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0)));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      Wonder_jest.describe("the default geometry with wdb asset should be remove instead of dispose when remove wdb asset", (function (param) {
                              var wdbArrayBuffer = /* record */[/* contents */1];
                              var _generateWDB = function (param) {
                                return WDBTool$WonderEditor.generateWDB((function (editorState, engineState) {
                                              var match = GameObjectEngineService$WonderEditor.create(engineState);
                                              var rootGameObject = match[1];
                                              var geometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState);
                                              var match$1 = LightMaterialEngineService$WonderEditor.create(match[0]);
                                              var match$2 = PrimitiveLogicService$WonderEditor.createCube(/* tuple */[
                                                    geometry,
                                                    match$1[1]
                                                  ], editorState, match$1[0]);
                                              var cube1 = match$2[2];
                                              var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("Cube1", cube1, match$2[1]);
                                              var engineState$2 = HierarchyGameObjectEngineService$WonderEditor.addChild(rootGameObject, cube1, engineState$1);
                                              return /* tuple */[
                                                      rootGameObject,
                                                      /* tuple */[
                                                        match$2[0],
                                                        engineState$2
                                                      ]
                                                    ];
                                            }));
                              };
                              beforeAll((function () {
                                      wdbArrayBuffer[0] = _generateWDB(/* () */0);
                                      return /* () */0;
                                    }));
                              return Wonder_jest.testPromise("\n        1.create gameObject g1 with default cube geometry in scene;\n        2.load wdb asset w1(has one cube gameObject with default cube geometry);\n        3.drag wdb asset to scene tree to be c1;\n        4.remove w1;\n\n        c1's and g1's geometry shouldn't be changed\n        ", undefined, (function (param) {
                                            MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                            MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            var firstCubeGameObject = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(wdbArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                          MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                          StateEditorService$WonderEditor.getState(/* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var clonedGameObject = LoadWDBTool$WonderEditor.findGameObjectByName("Cube1", engineState);
                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, uploadedWDBNodeId, /* () */0);
                                                          var engineState$1 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(clonedGameObject, engineState$1),
                                                                              GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(firstCubeGameObject, engineState$1)
                                                                            ]), /* tuple */[
                                                                          true,
                                                                          true
                                                                        ]));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test with import package", (function (param) {
                                    var truckWDBArrayBuffer = /* record */[/* contents */1];
                                    beforeAll((function () {
                                            truckWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("CesiumMilkTruck");
                                            return /* () */0;
                                          }));
                                    beforeEach((function () {
                                            MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), SettingToolEngine$WonderEditor.buildBufferConfigStr(300000, 300, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), false, undefined, undefined, /* () */0);
                                            MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                                            StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                            CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                                            Curry._1(BufferTool$WonderEditor.buildFakeAtob, /* () */0);
                                            return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                          }));
                                    return Wonder_jest.testPromise("\n        1.load truck wdb asset w1;\n        2.drag w1 to scene tree to be c1;\n        3.export package;\n        4.import package;\n        3.export package;\n        4.import package;\n        4.remove w1;\n\n        c1's all geometrys should be disposed\n        ", undefined, (function (param) {
                                                  ImportPackageTool$WonderEditor.prepareFakeCanvas(sandbox);
                                                  var wdbName = "TruckWDB";
                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(truckWDBArrayBuffer[0], undefined, undefined, wdbName, /* () */0).then((function (uploadedWDBNodeId) {
                                                                MainEditorSceneTreeTool$WonderEditor.Drag[/* dragWDBAssetToSceneTree */1](uploadedWDBNodeId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                              return ImportPackageTool$WonderEditor.testImportPackage((function (param) {
                                                                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeWDBNode(undefined, undefined, MainEditorAssetWDBNodeTool$WonderEditor.getWDBNodeIdByName(wdbName, /* tuple */[
                                                                                                      editorState,
                                                                                                      engineState
                                                                                                    ]), /* () */0);
                                                                                            var __x = LoadWDBTool$WonderEditor.findGameObjectByName(LoadWDBTool$WonderEditor.Truck[/* getTruck1GameObjectName */2](/* () */0), engineState);
                                                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(__x, engineState)), false));
                                                                                          }), undefined, undefined, undefined, undefined, /* () */0);
                                                                            }), undefined, undefined, undefined, undefined, /* () */0);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
