

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../../../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../../../../../../../../tool/ui/BaseEventTool.js";
import * as InspectorTool$WonderEditor from "../../../../../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../../../../tool/BuildComponentTool.js";
import * as PickColorEventTool$WonderEditor from "../../../../../../../../../tool/PickColorEventTool.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../../../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorMaterialTool$WonderEditor from "../../../tool/MainEditorMaterialTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../../../../../../../asset/tool/MainEditorAssetNodeTool.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../../src/service/state/engine/BasicMaterialEngineService.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../../../../../../tool/BuildComponentForCurryTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../../../../../../src/service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

describe("MainEditorBasicMaterial component", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set currentSceneTreeNode", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                        return MainEditorMaterialTool$WonderEditor.setMaterialTypeToBeBaiscMaterial(/* () */0);
                      }));
                return PickColorEventTool$WonderEditor.testOperateColorPickToChangeColor(sandbox, BuildComponentForCurryTool$WonderEditor.buildBasicMaterial, /* tuple */[
                            GameObjectTool$WonderEditor.getCurrentGameObjectBasicMaterial,
                            PickColorEventTool$WonderEditor.triggerChangeBasicMaterialColor,
                            BasicMaterialEngineService$WonderEditor.getColor
                          ]);
              }));
        describe("test gameObject basic material texture", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                                MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                                return MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode(/* () */0);
                              }));
                        StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                              }));
                        return MainEditorMaterialTool$WonderEditor.setMaterialTypeToBeBaiscMaterial(/* () */0);
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
                                describe("test engine ", (function () {
                                        beforeEach((function () {
                                                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                                return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                              }));
                                        return Wonder_jest.testPromise("test upload texture;\n               drag texture to set gameObject material texture;", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      return MainEditorAssetTool$WonderEditor.fileLoad(TestTool$WonderEditor.getDispatch(/* () */0), BaseEventTool$WonderEditor.buildFileEvent(undefined, undefined, undefined, undefined, /* () */0)).then((function () {
                                                                    MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getUploadedeTextureNodeDomIndex */1](assetTreeDomRecord));
                                                                    MainEditorMaterialTool$WonderEditor.triggerDragTextureToGameObjectMaterial(/* () */0);
                                                                    var currentGameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                                                    var engineStateToGetData = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                                                    var mapId = BasicMaterialEngineService$WonderEditor.unsafeGetMap(GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(currentGameObject, engineStateToGetData), engineStateToGetData);
                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](mapId), MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getUploadedTextureIndex */0](assetTreeDomRecord)));
                                                                  }));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("deal with specific case", (function () {
                                Wonder_jest.test("if drag texture-asset dragLeave gameObject material texture, should change nothing", (function () {
                                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                        MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */8](assetTreeDomRecord));
                                        MainEditorMaterialTool$WonderEditor.triggerDragTextureLeaveGameObjectMaterial(/* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                      }));
                                return Wonder_jest.test("if drag folder into gameObject material texture,should change nothing", (function () {
                                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                              MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */5](assetTreeDomRecord));
                                              MainEditorMaterialTool$WonderEditor.triggerTextureDragEvent(/* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
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
                                return Wonder_jest.test("test removeTexture should remove material map from engine", (function () {
                                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                              MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */8](assetTreeDomRecord));
                                              MainEditorMaterialTool$WonderEditor.triggerDragTextureToGameObjectMaterial(/* () */0);
                                              MainEditorMaterialTool$WonderEditor.triggerTextureRemoveClickEvent(/* () */0);
                                              var currentGameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                              var engineStateToGetData = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialEngineService$WonderEditor.getMap(GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(currentGameObject, engineStateToGetData), engineStateToGetData)), undefined);
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
