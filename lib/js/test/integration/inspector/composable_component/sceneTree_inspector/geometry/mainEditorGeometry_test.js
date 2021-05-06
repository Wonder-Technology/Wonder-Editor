'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var WDBTool$WonderEditor = require("../../../../../tool/WDBTool.js");
var LoadTool$WonderEditor = require("../../../../asset/tool/LoadTool.js");
var MainUtils$WonderEditor = require("../../../../../../src/core/utils/engine/MainUtils.js");
var CanvasTool$WonderEditor = require("../../../../../unit/atom_component/canvas/tool/CanvasTool.js");
var ReactTestTool$WonderEditor = require("../../../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../../tool/BuildComponentTool.js");
var GeometryToolEngine$WonderEditor = require("../../../../../tool/engine/GeometryToolEngine.js");
var StateEditorService$WonderEditor = require("../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../tool/MainEditorSceneTool.js");
var IdAssetEditorService$WonderEditor = require("../../../../../../src/service/state/editor/asset/IdAssetEditorService.js");
var GeometryEngineService$WonderEditor = require("../../../../../../src/service/state/engine/GeometryEngineService.js");
var MainEditorGeometryTool$WonderEditor = require("./tool/MainEditorGeometryTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var IndexAssetEditorService$WonderEditor = require("../../../../../../src/service/state/editor/asset/IndexAssetEditorService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../../../asset/tool/MainEditorAssetUploadTool.js");
var LightMaterialEngineService$WonderEditor = require("../../../../../../src/service/state/engine/LightMaterialEngineService.js");
var MainEditorAssetWDBNodeTool$WonderEditor = require("../../../../asset/tool/MainEditorAssetWDBNodeTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var BasicSourceTextureEngineService$WonderEditor = require("../../../../../../src/service/state/engine/texture/BasicSourceTextureEngineService.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");

Wonder_jest.describe("MainEditorGeometry component", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
                StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                CanvasTool$WonderEditor.prepareInspectorCanvasAndImgCanvas(sandbox);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                            }));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test set currentSceneTreeNode", (function (param) {
                Wonder_jest.describe("test change geometry", (function (param) {
                        Wonder_jest.describe("test snapshot", (function (param) {
                                Wonder_jest.describe("test show select geometry group widget", (function (param) {
                                        var _addNoTexCoordGeometryWDBGameObject = function (param) {
                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                          var match = IndexAssetEditorService$WonderEditor.generateBasicSourceTextureImageDataMapIndex(editorState);
                                          var match$1 = GeometryToolEngine$WonderEditor.createGameObjectAndSetPointData(engineState, false, /* () */0);
                                          var match$2 = IdAssetEditorService$WonderEditor.generateNodeId(match[0]);
                                          var editorState$1 = MainEditorAssetWDBNodeTool$WonderEditor.addWDBNodeToRoot(match$1[1], match$2[1], match$2[0], match$1[4], undefined, match[1], /* () */0);
                                          StateEditorService$WonderEditor.setState(editorState$1);
                                          StateEngineService$WonderEditor.setState(match$1[0]);
                                          return /* () */0;
                                        };
                                        var _setGameObjectLightMateiralDiffuseMap = function (gameObject) {
                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                          var match = BasicSourceTextureEngineService$WonderEditor.create(engineState);
                                          var engineState$1 = match[0];
                                          var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState$1);
                                          return StateEngineService$WonderEditor.setState(LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseMap(__x, match[1], engineState$1));
                                        };
                                        Wonder_jest.test("if current material has no map, select geometry group should contain geometry which has texCoord or no texCoord", (function (param) {
                                                _addNoTexCoordGeometryWDBGameObject(/* () */0);
                                                var currentGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildGeometry(currentGameObjectGeometry, undefined, undefined, undefined, true, /* () */0));
                                              }));
                                        return Wonder_jest.test("else, select geometry group should only contain geometry which has texCoord", (function (param) {
                                                      _addNoTexCoordGeometryWDBGameObject(/* () */0);
                                                      _setGameObjectLightMateiralDiffuseMap(GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0));
                                                      var currentGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildGeometry(currentGameObjectGeometry, undefined, undefined, undefined, true, /* () */0));
                                                    }));
                                      }));
                                return Wonder_jest.test("test hide select geometry group widget", (function (param) {
                                              var currentGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildGeometry(currentGameObjectGeometry, undefined, undefined, undefined, false, /* () */0));
                                            }));
                              }));
                        return Wonder_jest.describe("test logic", (function (param) {
                                      Wonder_jest.test("test the current gameObject geometry should be Cube", (function (param) {
                                              var currentGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return GeometryEngineService$WonderEditor.unsafeGetGeometryName(currentGameObjectGeometry, param);
                                                                  }))), MainEditorGeometryTool$WonderEditor.getDefaultCubeGeometryName(/* () */0));
                                            }));
                                      Wonder_jest.test("change geometry to be Sphere, the current gameObject geometry should be Sphere", (function (param) {
                                              MainEditorGeometryTool$WonderEditor.changeGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), MainEditorGeometryTool$WonderEditor.getDefaultSphereGeometryComponent(undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                                              var newGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return GeometryEngineService$WonderEditor.unsafeGetGeometryName(newGameObjectGeometry, param);
                                                                  }))), MainEditorGeometryTool$WonderEditor.getDefaultSphereGeometryName(/* () */0));
                                            }));
                                      return Wonder_jest.test("test add Cube geometry component again and again, currentSceneTreeNode's geometry should be Cube", (function (param) {
                                                    BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), undefined, undefined, undefined, undefined, /* () */0);
                                                    MainEditorGeometryTool$WonderEditor.changeGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), MainEditorGeometryTool$WonderEditor.getDefaultSphereGeometryComponent(undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                                                    MainEditorGeometryTool$WonderEditor.changeGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), MainEditorGeometryTool$WonderEditor.getDefaultCubeGeometryComponent(undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                                                    MainEditorGeometryTool$WonderEditor.changeGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), MainEditorGeometryTool$WonderEditor.getDefaultSphereGeometryComponent(undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                                                    MainEditorGeometryTool$WonderEditor.changeGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), MainEditorGeometryTool$WonderEditor.getDefaultCubeGeometryComponent(undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                                                    var newGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryEngineService$WonderEditor.unsafeGetGeometryName(newGameObjectGeometry, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), "Wonder-Default-Cube");
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test load asset wdb", (function (param) {
                              var boxTexturedWDBArrayBuffer = /* record */[/* contents */1];
                              beforeAll((function () {
                                      boxTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("BoxTextured");
                                      return /* () */0;
                                    }));
                              beforeEach((function () {
                                      Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                      Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                      LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                                      LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                                      return LoadTool$WonderEditor.buildFakeLoadImage();
                                    }));
                              Wonder_jest.testPromise("test select geometry group widget should show all geometry", undefined, (function (param) {
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, "BoxTextured", /* () */0).then((function (uploadedWDBNodeId) {
                                                    var component = BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0);
                                                    return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(component));
                                                  }));
                                    }));
                              return Wonder_jest.testPromise("test set new geometry should set into engineState", undefined, (function (param) {
                                            MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                            var newGeometry = GeometryToolEngine$WonderEditor.getNewGeometry(undefined, /* () */0);
                                            return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(boxTexturedWDBArrayBuffer[0], undefined, undefined, "BoxTextured", /* () */0).then((function (uploadedWDBNodeId) {
                                                          var oldGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0);
                                                          MainEditorGeometryTool$WonderEditor.changeGeometry(oldGameObjectGeometry, newGeometry, undefined, undefined, undefined, /* () */0);
                                                          var newGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                    return GeometryEngineService$WonderEditor.unsafeGetGeometryName(newGameObjectGeometry, param);
                                                                                  }))), MainEditorGeometryTool$WonderEditor.getBoxTexturedGeometryName(/* () */0)));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test select geometry group->show order", (function (param) {
                      var truckWDBArrayBuffer = /* record */[/* contents */1];
                      beforeAll((function () {
                              truckWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("CesiumMilkTruck");
                              return /* () */0;
                            }));
                      beforeEach((function () {
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                              Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                              LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                              LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                              LoadTool$WonderEditor.buildFakeLoadImage();
                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                              return /* () */0;
                            }));
                      return Wonder_jest.testPromise("\n        order should be:\n        1)default geometry is in the end;\n        2)sort geometry assets by firstname alphabetically\n        ", undefined, (function (param) {
                                    return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(truckWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function (uploadedWDBNodeId) {
                                                  return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0)));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
