

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as WDBTool$WonderEditor from "../../../../../tool/WDBTool.js";
import * as LoadTool$WonderEditor from "../../../../asset/tool/LoadTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as GeometryToolEngine$WonderEditor from "../../../../../tool/engine/GeometryToolEngine.js";
import * as StateEditorService$WonderEditor from "../../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as IdAssetEditorService$WonderEditor from "../../../../../../src/service/state/editor/asset/IdAssetEditorService.js";
import * as GeometryEngineService$WonderEditor from "../../../../../../src/service/state/engine/GeometryEngineService.js";
import * as MainEditorGeometryTool$WonderEditor from "./tool/MainEditorGeometryTool.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../../../asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../../../asset/tool/MainEditorAssetUploadTool.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../src/service/state/engine/LightMaterialEngineService.js";
import * as MainEditorAssetWDBNodeTool$WonderEditor from "../../../../asset/tool/MainEditorAssetWDBNodeTool.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../src/service/state/engine/BasicSourceTextureEngineService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("MainEditorGeometry component", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                            }));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set currentSceneTreeNode", (function () {
                describe("test change geometry", (function () {
                        describe("test snapshot", (function () {
                                describe("test show select geometry group widget", (function () {
                                        var _addNoTexCoordGeometryWDBGameObject = function () {
                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                          var match = GeometryToolEngine$WonderEditor.createGameObjectAndSetPointData(engineState, false, /* () */0);
                                          var match$1 = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
                                          var editorState$1 = MainEditorAssetWDBNodeTool$WonderEditor.addWDBNodeToRoot(match[1], match$1[1], match$1[0], match[4], undefined, /* () */0);
                                          StateEditorService$WonderEditor.setState(editorState$1);
                                          StateEngineService$WonderEditor.setState(match[0]);
                                          return /* () */0;
                                        };
                                        var _setGameObjectLightMateiralDiffuseMap = function (gameObject) {
                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                          var match = BasicSourceTextureEngineService$WonderEditor.create(engineState);
                                          var engineState$1 = match[0];
                                          var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState$1);
                                          return StateEngineService$WonderEditor.setState(LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseMap(__x, match[1], engineState$1));
                                        };
                                        Wonder_jest.test("if current material has no map, select geometry group should contain geometry which has texCoord or no texCoord", (function () {
                                                _addNoTexCoordGeometryWDBGameObject(/* () */0);
                                                var currentGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildGeometry(currentGameObjectGeometry, undefined, undefined, undefined, true, /* () */0));
                                              }));
                                        return Wonder_jest.test("else, select geometry group should only contain geometry which has texCoord", (function () {
                                                      _addNoTexCoordGeometryWDBGameObject(/* () */0);
                                                      _setGameObjectLightMateiralDiffuseMap(GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0));
                                                      var currentGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildGeometry(currentGameObjectGeometry, undefined, undefined, undefined, true, /* () */0));
                                                    }));
                                      }));
                                return Wonder_jest.test("test hide select geometry group widget", (function () {
                                              var currentGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildGeometry(currentGameObjectGeometry, undefined, undefined, undefined, false, /* () */0));
                                            }));
                              }));
                        describe("test logic", (function () {
                                Wonder_jest.test("test the current gameObject geometry should be Cube", (function () {
                                        var currentGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return GeometryEngineService$WonderEditor.unsafeGetGeometryName(currentGameObjectGeometry, param);
                                                            }))), MainEditorGeometryTool$WonderEditor.getDefaultCubeGeometryName(/* () */0));
                                      }));
                                Wonder_jest.test("change geometry to be Sphere, the current gameObject geometry should be Sphere", (function () {
                                        MainEditorGeometryTool$WonderEditor.changeGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), MainEditorGeometryTool$WonderEditor.getDefaultSphereGeometryComponent(undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                                        var newGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return GeometryEngineService$WonderEditor.unsafeGetGeometryName(newGameObjectGeometry, param);
                                                            }))), MainEditorGeometryTool$WonderEditor.getDefaultSphereGeometryName(/* () */0));
                                      }));
                                return Wonder_jest.test("test add Cube geometry component again and again, currentSceneTreeNode's geometry should be Cube", (function () {
                                              BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), undefined, undefined, undefined, undefined, /* () */0);
                                              MainEditorGeometryTool$WonderEditor.changeGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), MainEditorGeometryTool$WonderEditor.getDefaultSphereGeometryComponent(undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                                              MainEditorGeometryTool$WonderEditor.changeGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), MainEditorGeometryTool$WonderEditor.getDefaultCubeGeometryComponent(undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                                              MainEditorGeometryTool$WonderEditor.changeGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), MainEditorGeometryTool$WonderEditor.getDefaultSphereGeometryComponent(undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                                              MainEditorGeometryTool$WonderEditor.changeGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), MainEditorGeometryTool$WonderEditor.getDefaultCubeGeometryComponent(undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                                              var newGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryEngineService$WonderEditor.unsafeGetGeometryName(newGameObjectGeometry, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), "Wonder-Default-Cube");
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test load asset wdb", (function () {
                        var cubeTexturedWDBArrayBuffer = /* record */[/* contents */1];
                        beforeAll((function () {
                                cubeTexturedWDBArrayBuffer[0] = WDBTool$WonderEditor.convertGLBToWDB("CubeTextured");
                                return /* () */0;
                              }));
                        beforeEach((function () {
                                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                                return LoadTool$WonderEditor.buildFakeLoadImage();
                              }));
                        Wonder_jest.testPromise("test select geometry group widget should show all geometry", (function () {
                                MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, "CubeTextured", /* () */0).then((function () {
                                              var component = BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0);
                                              return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(component));
                                            }));
                              }));
                        return Wonder_jest.testPromise("test set new geometry should set into engineState", (function () {
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      var newGeometry = GeometryToolEngine$WonderEditor.getNewGeometry(undefined, /* () */0);
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(cubeTexturedWDBArrayBuffer[0], undefined, undefined, "CubeTextured", /* () */0).then((function () {
                                                    var oldGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0);
                                                    MainEditorGeometryTool$WonderEditor.changeGeometry(oldGameObjectGeometry, newGeometry, undefined, undefined, undefined, /* () */0);
                                                    var newGameObjectGeometry = GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                              return GeometryEngineService$WonderEditor.unsafeGetGeometryName(newGameObjectGeometry, param);
                                                                            }))), MainEditorGeometryTool$WonderEditor.getCubeTexturedGeometryName(/* () */0)));
                                                  }));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test select geometry group->show order", (function () {
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
                return Wonder_jest.testPromise("\n        order should be:\n        1)default geometry is in the end;\n        2)sort geometry assets by firstname alphabetically\n        ", (function () {
                              return MainEditorAssetUploadTool$WonderEditor.loadOneWDB(truckWDBArrayBuffer[0], undefined, undefined, undefined, /* () */0).then((function () {
                                            return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), undefined, undefined, undefined, true, /* () */0)));
                                          }));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
