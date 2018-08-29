

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../src/core/external/DomHelper.js";
import * as ControllerTool$WonderEditor from "../../../../../../../../integration/redo_undo/tool/ControllerTool.js";
import * as DiffComponentTool$WonderEditor from "../../../../../../../../tool/DiffComponentTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../../../tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../../../../src/service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../../../../../integration/asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../../tool/MainEditorSceneTool.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as MainEditorMaterialTool$WonderEditor from "../../../../../../../../integration/inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../../../../../../../integration/asset/tool/MainEditorAssetNodeTool.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../src/service/state/engine/BasicMaterialEngineService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../src/service/state/engine/BasicSourceTextureEngineService.js";
import * as AssetImageBase64MapEditorService$WonderEditor from "../../../../../../../../../src/service/state/editor/asset/AssetImageBase64MapEditorService.js";
import * as AssetTextureNodeMapEditorService$WonderEditor from "../../../../../../../../../src/service/state/editor/asset/AssetTextureNodeMapEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("controller inspector basic material", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                        MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                        return MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode(/* () */0);
                      }));
                StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                        return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                      }));
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                MainEditorMaterialTool$WonderEditor.setMaterialTypeToBeBaiscMaterial(/* () */0);
                return ControllerTool$WonderEditor.run(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set value into edit and run engineState", (function () {
                var _getGameObjectMaterialSourceSrc = function (engineState, gameObject) {
                  return DomHelper$WonderEditor.getAttribute(BasicSourceTextureEngineService$WonderEditor.unsafeGetSource(BasicMaterialEngineService$WonderEditor.unsafeGetMap(GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(gameObject, engineState), engineState), engineState), "src");
                };
                var _getGameObjectMaterialMap = function (engineState, gameObject) {
                  return BasicMaterialEngineService$WonderEditor.getMap(GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(gameObject, engineState), engineState);
                };
                Wonder_jest.test("test drag texture to set gameObject material map", (function () {
                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                        MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */7](assetTreeDomRecord));
                        var dragTextureImageSrc = SparseMapService$WonderCommonlib.unsafeGet(SparseMapService$WonderCommonlib.unsafeGet(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureNodeId */13](assetTreeDomRecord), AssetTextureNodeMapEditorService$WonderEditor.getTextureNodeMap(editorState))[/* textureIndex */0], AssetImageBase64MapEditorService$WonderEditor.getImageBase64Map(editorState));
                        MainEditorMaterialTool$WonderEditor.triggerDragTextureToGameObjectMaterial(/* () */0);
                        var currentGameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                        var editEngineMaterialSourceSrc = _getGameObjectMaterialSourceSrc(StateLogicService$WonderEditor.getEditEngineState(/* () */0), DiffComponentTool$WonderEditor.getEditEngineComponent(/* GameObject */0, currentGameObject));
                        var runEngineMaterialSourceSrc = _getGameObjectMaterialSourceSrc(StateLogicService$WonderEditor.getRunEngineState(/* () */0), currentGameObject);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        editEngineMaterialSourceSrc,
                                        runEngineMaterialSourceSrc
                                      ]), /* tuple */[
                                    dragTextureImageSrc,
                                    dragTextureImageSrc
                                  ]);
                      }));
                return Wonder_jest.test("test remove texture", (function () {
                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                              MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */7](assetTreeDomRecord));
                              MainEditorMaterialTool$WonderEditor.triggerDragTextureToGameObjectMaterial(/* () */0);
                              MainEditorMaterialTool$WonderEditor.triggerTextureRemoveClickEvent(/* () */0);
                              var currentGameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                              var editEngineMaterialMap = _getGameObjectMaterialMap(StateLogicService$WonderEditor.getEditEngineState(/* () */0), DiffComponentTool$WonderEditor.getEditEngineComponent(/* GameObject */0, currentGameObject));
                              var runEngineMaterialMap = _getGameObjectMaterialMap(StateLogicService$WonderEditor.getRunEngineState(/* () */0), currentGameObject);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              editEngineMaterialMap,
                                              runEngineMaterialMap
                                            ]), /* tuple */[
                                          undefined,
                                          undefined
                                        ]);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
