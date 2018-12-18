

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Color$WonderEditor from "../../../../../../../../../../src/core/external/Color.js";
import * as TestTool$WonderEditor from "../../../../../../../../../tool/TestTool.js";
import * as ConsoleTool$WonderEditor from "../../../../../../../../../unit/tool/external/ConsoleTool.js";
import * as FloatService$WonderEditor from "../../../../../../../../../../src/service/atom/FloatService.js";
import * as InspectorTool$WonderEditor from "../../../../../../../../../tool/ui/InspectorTool.js";
import * as PickColorTool$WonderEditor from "../../../../../../../../../tool/PickColorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../../../../tool/BuildComponentTool.js";
import * as DirectorToolEngine$WonderEditor from "../../../../../../../../../tool/engine/DirectorToolEngine.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../../../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../../../tool/MainEditorSceneTool.js";
import * as GeometryEngineService$WonderEditor from "../../../../../../../../../../src/service/state/engine/GeometryEngineService.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../../../../../../../asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../../../../../../../asset/tool/MainEditorAssetUploadTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../../../../../../tool/BuildComponentForCurryTool.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../../../../../src/service/state/engine/LightMaterialEngineService.js";
import * as MainEditorLightMaterialTool$WonderEditor from "../../../tool/MainEditorLightMaterialTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/asset/CurrentNodeDataAssetEditorService.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../../../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js";
import * as CurrentNodeParentIdAssetEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/asset/CurrentNodeParentIdAssetEditorService.js";
import * as MainEditorInspectorRemoveComponentTool$WonderEditor from "../../../../../../../atom_component/addableComponent/tool/MainEditorInspectorRemoveComponentTool.js";

describe("MainEditorLightMaterial", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareWithEmptyJob = function (param) {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
        };
        var _prepareWithJob = function (param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
          return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
        };
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set currentSceneTreeNode", (function (param) {
                describe("test change color", (function (param) {
                        beforeEach((function (param) {
                                _prepareWithJob(/* () */0);
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                                return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                              }));
                        return PickColorTool$WonderEditor.testOperateColorPickToChangeColor(sandbox, BuildComponentForCurryTool$WonderEditor.buildLightMaterial, /* tuple */[
                                    GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial,
                                    MainEditorLightMaterialTool$WonderEditor.changeColor,
                                    LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor
                                  ]);
                      }));
                describe("test gameObject light material texture", (function (param) {
                        var _getGameObjectMaterialMap = function (engineState, gameObject) {
                          return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState), engineState);
                        };
                        beforeEach((function (param) {
                                _prepareWithEmptyJob(/* () */0);
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                                        MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                                        return MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode(/* () */0);
                                      }));
                                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                                            }));
                              }));
                        afterEach((function (param) {
                                StateEditorService$WonderEditor.setState(CurrentNodeParentIdAssetEditorService$WonderEditor.clearCurrentNodeParentId(CurrentNodeDataAssetEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
                                return /* () */0;
                              }));
                        describe("test drag texture to set gameObject material map", (function (param) {
                                describe("test snapshot", (function (param) {
                                        Wonder_jest.test("test no drag", (function (param) {
                                                Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                              }));
                                        Wonder_jest.test("test drag texture asset into gameObject material map zone, the zone should show the texture source", (function (param) {
                                                var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildTwoTextureAssetTree */1], /* () */0);
                                                MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getSecondTextureNodeId */3], assetTreeData), /* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                              }));
                                        return Wonder_jest.test("test set map when already has map, material's map should be the new one", (function (param) {
                                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildTwoTextureAssetTree */1], /* () */0);
                                                      MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                      MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getSecondTextureNodeId */3], assetTreeData), /* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                    }));
                                      }));
                                describe("test logic", (function (param) {
                                        describe("\n              upload texture;\n              drag texture to set gameObject->material->map;\n               ", (function (param) {
                                                var _prepare = function (testFunc) {
                                                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                return Curry._2(testFunc, uploadedTextureNodeId, assetTreeData);
                                                              }));
                                                };
                                                var _exec = function (uploadedTextureNodeId) {
                                                  return MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, uploadedTextureNodeId, /* () */0);
                                                };
                                                var _hasMap = function (param) {
                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                  var currentGameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                                  return LightMaterialEngineService$WonderEditor.hasLightMaterialDiffuseMap(GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(currentGameObject, engineState), engineState);
                                                };
                                                beforeEach((function (param) {
                                                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                                        return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                                      }));
                                                Wonder_jest.testPromise("should set texture to be material's map", (function (param) {
                                                        return _prepare((function (uploadedTextureNodeId, assetTreeData) {
                                                                      _exec(uploadedTextureNodeId);
                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_hasMap(/* () */0)), true));
                                                                    }));
                                                      }));
                                                Wonder_jest.testPromise("if gameObject has no geometry, still can set", (function (param) {
                                                        return _prepare((function (uploadedTextureNodeId, assetTreeData) {
                                                                      MainEditorInspectorRemoveComponentTool$WonderEditor.removeGeometryComponent(undefined, undefined, undefined, /* () */0);
                                                                      _exec(uploadedTextureNodeId);
                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_hasMap(/* () */0)), true));
                                                                    }));
                                                      }));
                                                return Wonder_jest.testPromise("if gameObject->geometry has no texCoords, warn and can't set", (function (param) {
                                                              return _prepare((function (uploadedTextureNodeId, assetTreeData) {
                                                                            ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                                                            var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                                                            var currentGameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                            var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(currentGameObject, engineState);
                                                                            var engineState$1 = GeometryEngineService$WonderEditor.setGeometryTexCoords(__x, new Float32Array(/* array */[]), engineState);
                                                                            StateEngineService$WonderEditor.setState(engineState$1);
                                                                            _exec(uploadedTextureNodeId);
                                                                            var engineMaterialMap = _getGameObjectMaterialMap(StateEngineService$WonderEditor.unsafeGetState(/* () */0), currentGameObject);
                                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                ConsoleTool$WonderEditor.getMessage(warn).includes("have no texCoords"),
                                                                                                engineMaterialMap
                                                                                              ]), /* tuple */[
                                                                                            true,
                                                                                            undefined
                                                                                          ]));
                                                                          }));
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("fix bug", (function (param) {
                                        return Wonder_jest.test("\n              set lightMaterial color;\n              drag texture to set gameObject material texture;\n\n              the color should == original color\n            ", (function (param) {
                                                      var currentGameObjectMaterial = GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial(/* () */0);
                                                      var newColor = {
                                                        hex: "#7df1e8",
                                                        rgb: {
                                                          r: 125,
                                                          g: 241,
                                                          b: 232
                                                        }
                                                      };
                                                      MainEditorLightMaterialTool$WonderEditor.changeColor(currentGameObjectMaterial, newColor);
                                                      var oldColor = Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(currentGameObjectMaterial, param);
                                                                })));
                                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildTwoTextureAssetTree */1], /* () */0);
                                                      MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                      MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getSecondTextureNodeId */3], assetTreeData), /* () */0);
                                                      var currentGameObjectMaterial$1 = GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial(/* () */0);
                                                      var newColor$1 = Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(currentGameObjectMaterial$1, param);
                                                                })));
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](newColor$1), oldColor);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test set remove texture", (function (param) {
                                describe("test snapshop", (function (param) {
                                        Wonder_jest.test("test if not set map,should change nothing", (function (param) {
                                                var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                              }));
                                        return Wonder_jest.test("test if have already set map,should remove map", (function (param) {
                                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                                      var textureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData);
                                                      MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, textureNodeId, /* () */0);
                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, textureNodeId, /* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                    }));
                                      }));
                                describe("test logic", (function (param) {
                                        return Wonder_jest.test("should remove material's map", (function (param) {
                                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                                      var textureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData);
                                                      MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, textureNodeId, /* () */0);
                                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, textureNodeId, /* () */0);
                                                      var currentGameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                                      var engineMaterialMap = _getGameObjectMaterialMap(StateEngineService$WonderEditor.unsafeGetState(/* () */0), currentGameObject);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](engineMaterialMap), undefined);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test change light material shininess", (function (param) {
                        beforeEach((function (param) {
                                _prepareWithEmptyJob(/* () */0);
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                              }));
                        describe("test logic", (function (param) {
                                return Wonder_jest.test("test change shininess should set into engine", (function (param) {
                                              var currentGameObjectMaterial = GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial(/* () */0);
                                              BuildComponentTool$WonderEditor.buildLightMaterial(currentGameObjectMaterial);
                                              MainEditorLightMaterialTool$WonderEditor.changeShininess(currentGameObjectMaterial, 1.1, /* () */0);
                                              MainEditorLightMaterialTool$WonderEditor.blurShininess(undefined, undefined, currentGameObjectMaterial, 1.1, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return LightMaterialEngineService$WonderEditor.getLightMaterialShininess(currentGameObjectMaterial, param);
                                                                      })), 5)), 1.1);
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
