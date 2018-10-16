

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Color$WonderEditor from "../../../../../../../../../../src/core/external/Color.js";
import * as TestTool$WonderEditor from "../../../../../../../../../tool/TestTool.js";
import * as ConsoleTool$WonderEditor from "../../../../../../../../../unit/tool/external/ConsoleTool.js";
import * as FloatService$WonderEditor from "../../../../../../../../../../src/service/atom/FloatService.js";
import * as BaseEventTool$WonderEditor from "../../../../../../../../../tool/ui/BaseEventTool.js";
import * as InspectorTool$WonderEditor from "../../../../../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../../../../tool/BuildComponentTool.js";
import * as DirectorToolEngine$WonderEditor from "../../../../../../../../../tool/engine/DirectorToolEngine.js";
import * as PickColorEventTool$WonderEditor from "../../../../../../../../../tool/PickColorEventTool.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../../../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../../../tool/MainEditorSceneTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../../../../../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as GeometryEngineService$WonderEditor from "../../../../../../../../../../src/service/state/engine/GeometryEngineService.js";
import * as MainEditorMaterialTool$WonderEditor from "../../../tool/MainEditorMaterialTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../../../../../../../asset/tool/MainEditorAssetNodeTool.js";
import * as OperateComponentEventTool$WonderEditor from "../../../../../../../../../tool/OperateComponentEventTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../../../../../../tool/BuildComponentForCurryTool.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../../../../../src/service/state/engine/LightMaterialEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

describe("MainEditorLightMaterial", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareWithEmptyJob = function () {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
          return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
        };
        var _prepareWithJob = function () {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
          return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set currentSceneTreeNode", (function () {
                describe("test change color", (function () {
                        beforeEach((function () {
                                _prepareWithJob(/* () */0);
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                                return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                              }));
                        return PickColorEventTool$WonderEditor.testOperateColorPickToChangeColor(sandbox, BuildComponentForCurryTool$WonderEditor.buildLightMaterial, /* tuple */[
                                    GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial,
                                    PickColorEventTool$WonderEditor.triggerChangeLightMaterialColor,
                                    LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor
                                  ]);
                      }));
                describe("test gameObject light material texture", (function () {
                        var _getGameObjectMaterialMap = function (engineState, gameObject) {
                          return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState), engineState);
                        };
                        beforeEach((function () {
                                _prepareWithEmptyJob(/* () */0);
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                                        MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                                        return MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode(/* () */0);
                                      }));
                                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                                            }));
                              }));
                        afterEach((function () {
                                StateEditorService$WonderEditor.setState(AssetCurrentNodeParentIdEditorService$WonderEditor.clearCurrentNodeParentId(AssetCurrentNodeDataEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
                                return /* () */0;
                              }));
                        describe("test drag texture to set gameObject material map", (function () {
                                describe("test snapshot", (function () {
                                        Wonder_jest.test("test no drag", (function () {
                                                MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                              }));
                                        Wonder_jest.test("test drag texture asset into gameObject material map zone, the zone should show the texture source", (function () {
                                                var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */8](assetTreeDomRecord));
                                                MainEditorMaterialTool$WonderEditor.triggerDragTextureToGameObjectMaterial(/* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                              }));
                                        return Wonder_jest.test("test set map when already has map, material's map should be the new one", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      var firstTextureDomIndex = MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */8](assetTreeDomRecord);
                                                      var secondTextureDomIndex = MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getSecondTextureDomIndex */9](assetTreeDomRecord);
                                                      MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(firstTextureDomIndex);
                                                      MainEditorMaterialTool$WonderEditor.triggerDragTextureToGameObjectMaterial(/* () */0);
                                                      MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(secondTextureDomIndex);
                                                      MainEditorMaterialTool$WonderEditor.triggerDragTextureToGameObjectMaterial(/* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                    }));
                                      }));
                                describe("test logic", (function () {
                                        describe("\n              upload texture;\n              drag texture to set gameObject->material->map;\n               ", (function () {
                                                var _prepare = function (testFunc) {
                                                  var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                  return MainEditorAssetTool$WonderEditor.fileLoad(TestTool$WonderEditor.getDispatch(/* () */0), BaseEventTool$WonderEditor.buildFileEvent(undefined, undefined, undefined, undefined, /* () */0)).then((function () {
                                                                return Curry._1(testFunc, assetTreeDomRecord);
                                                              }));
                                                };
                                                var _exec = function (assetTreeDomRecord, $staropt$star, _) {
                                                  var sceneTreeInspectorDomIndex = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : undefined;
                                                  MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getAddedFirstNodeDomIndex */3](assetTreeDomRecord));
                                                  if (sceneTreeInspectorDomIndex !== undefined) {
                                                    return MainEditorMaterialTool$WonderEditor.triggerDragTextureToGameObjectMaterialWithSceneTreeInspectorDomIndex(sceneTreeInspectorDomIndex);
                                                  } else {
                                                    return MainEditorMaterialTool$WonderEditor.triggerDragTextureToGameObjectMaterial(/* () */0);
                                                  }
                                                };
                                                var _getMap = function () {
                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                  var currentGameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                                  return LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialDiffuseMap(GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(currentGameObject, engineState), engineState);
                                                };
                                                beforeEach((function () {
                                                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                                        return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                                      }));
                                                Wonder_jest.testPromise("should set texture to be material's map", (function () {
                                                        return _prepare((function (assetTreeDomRecord) {
                                                                      _exec(assetTreeDomRecord, undefined, /* () */0);
                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getMap(/* () */0)), MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getUploadedTextureIndex */0](assetTreeDomRecord)));
                                                                    }));
                                                      }));
                                                Wonder_jest.testPromise("if gameObject has no geometry, still can set", (function () {
                                                        return _prepare((function (assetTreeDomRecord) {
                                                                      OperateComponentEventTool$WonderEditor.removeComponentFromCurrentGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getGeometryComponentFromBox */7](/* () */0));
                                                                      _exec(assetTreeDomRecord, 2, /* () */0);
                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getMap(/* () */0)), MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getUploadedTextureIndex */0](assetTreeDomRecord)));
                                                                    }));
                                                      }));
                                                return Wonder_jest.testPromise("if gameObject->geometry has no texCoords, warn and can't set", (function () {
                                                              return _prepare((function (assetTreeDomRecord) {
                                                                            var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                                                            var currentGameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                            var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(currentGameObject, engineState);
                                                                            var engineState$1 = GeometryEngineService$WonderEditor.setGeometryTexCoords(__x, new Float32Array(/* array */[]), engineState);
                                                                            StateEngineService$WonderEditor.setState(engineState$1);
                                                                            _exec(assetTreeDomRecord, undefined, /* () */0);
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
                                describe("fix bug", (function () {
                                        return Wonder_jest.test("\n              set lightMaterial color;\n              drag texture to set gameObject material texture;\n\n              the color should == original color\n            ", (function () {
                                                      var currentGameObjectMaterial = GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial(/* () */0);
                                                      var newColor = {
                                                        hex: "#7df1e8",
                                                        rgb: {
                                                          r: 125,
                                                          g: 241,
                                                          b: 232
                                                        }
                                                      };
                                                      PickColorEventTool$WonderEditor.triggerChangeLightMaterialColor(currentGameObjectMaterial, newColor);
                                                      var oldColor = Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(currentGameObjectMaterial, param);
                                                                })));
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */8](assetTreeDomRecord));
                                                      MainEditorMaterialTool$WonderEditor.triggerDragTextureToGameObjectMaterial(/* () */0);
                                                      var currentGameObjectMaterial$1 = GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial(/* () */0);
                                                      var newColor$1 = Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(currentGameObjectMaterial$1, param);
                                                                })));
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](newColor$1), oldColor);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test set remove texture", (function () {
                                describe("test snapshop", (function () {
                                        Wonder_jest.test("test if not set map,should change nothing", (function () {
                                                MainEditorMaterialTool$WonderEditor.triggerTextureRemoveClickEvent(/* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                              }));
                                        return Wonder_jest.test("test if have already set map,should remove map", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */8](assetTreeDomRecord));
                                                      MainEditorMaterialTool$WonderEditor.triggerDragTextureToGameObjectMaterial(/* () */0);
                                                      MainEditorMaterialTool$WonderEditor.triggerTextureRemoveClickEvent(/* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                    }));
                                      }));
                                describe("test logic", (function () {
                                        return Wonder_jest.test("should remove material's map", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */8](assetTreeDomRecord));
                                                      MainEditorMaterialTool$WonderEditor.triggerDragTextureToGameObjectMaterial(/* () */0);
                                                      MainEditorMaterialTool$WonderEditor.triggerTextureRemoveClickEvent(/* () */0);
                                                      var currentGameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                                      var engineMaterialMap = _getGameObjectMaterialMap(StateEngineService$WonderEditor.unsafeGetState(/* () */0), currentGameObject);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](engineMaterialMap), undefined);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test change light material shininess", (function () {
                        beforeEach((function () {
                                _prepareWithEmptyJob(/* () */0);
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                              }));
                        describe("test logic", (function () {
                                return Wonder_jest.test("test change shininess should set into engine", (function () {
                                              var currentGameObjectMaterial = GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial(/* () */0);
                                              var component = BuildComponentTool$WonderEditor.buildLightMaterial(currentGameObjectMaterial);
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      return MainEditorMaterialTool$WonderEditor.triggerShininessChangeEvent(1.1, param);
                                                    }));
                                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                                      return MainEditorMaterialTool$WonderEditor.triggerShininessBlurEvent(1.1, param);
                                                    }));
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
