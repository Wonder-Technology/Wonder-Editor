

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ControllerTool$WonderEditor from "../../../../../../integration/redo_undo/tool/ControllerTool.js";
import * as DiffComponentTool$WonderEditor from "../../../../../../tool/DiffComponentTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../../../integration/asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as TextureInspectorTool$WonderEditor from "../../../../../../integration/inspector/composable_component/assetTree_inspector/atom_component/texture_inspector/tool/textureInspectorTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../../../../../integration/asset/tool/MainEditorAssetNodeTool.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../src/service/state/engine/BasicSourceTextureEngineService.js";

describe("controller inspector texture", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                        MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                        return MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode(/* () */0);
                      }));
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                return ControllerTool$WonderEditor.run(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set value into edit and run engineState", (function () {
                Wonder_jest.test("test rename texture", (function () {
                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                        var newName = "controllerTextureName";
                        MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */8](assetTreeDomRecord));
                        TextureInspectorTool$WonderEditor.triggerInspectorRenameEvent(newName);
                        var textureIndex = MainEditorAssetNodeTool$WonderEditor.getTextureIndexFromCurrentNodeId(/* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(DiffComponentTool$WonderEditor.getEditEngineComponent(/* Texture */11, textureIndex), StateLogicService$WonderEditor.getEditEngineState(/* () */0)),
                                        BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(textureIndex, StateLogicService$WonderEditor.getRunEngineState(/* () */0))
                                      ]), /* tuple */[
                                    newName,
                                    newName
                                  ]);
                      }));
                Wonder_jest.test("test change wrapS", (function () {
                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                        var wrapSDomIndex = TextureInspectorTool$WonderEditor.getWrapSDomIndex(/* () */0);
                        var wrapRepeatType = TextureInspectorTool$WonderEditor.getWrapRepeatType(/* () */0);
                        MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */8](assetTreeDomRecord));
                        TextureInspectorTool$WonderEditor.triggerInspectorChangeWrapEvent(wrapSDomIndex, wrapRepeatType);
                        var textureIndex = MainEditorAssetNodeTool$WonderEditor.getTextureIndexFromCurrentNodeId(/* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        BasicSourceTextureEngineService$WonderEditor.getWrapS(DiffComponentTool$WonderEditor.getEditEngineComponent(/* Texture */11, textureIndex), StateLogicService$WonderEditor.getEditEngineState(/* () */0)),
                                        BasicSourceTextureEngineService$WonderEditor.getWrapS(textureIndex, StateLogicService$WonderEditor.getEditEngineState(/* () */0))
                                      ]), /* tuple */[
                                    wrapRepeatType,
                                    wrapRepeatType
                                  ]);
                      }));
                Wonder_jest.test("test change wrapT", (function () {
                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                        var wrapTDomIndex = TextureInspectorTool$WonderEditor.getWrapTDomIndex(/* () */0);
                        var wrapMirroredRepeatType = TextureInspectorTool$WonderEditor.getWrapMirroredRepeatType(/* () */0);
                        MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */8](assetTreeDomRecord));
                        TextureInspectorTool$WonderEditor.triggerInspectorChangeWrapEvent(wrapTDomIndex, wrapMirroredRepeatType);
                        var textureIndex = TextureInspectorTool$WonderEditor.getTextureIndexFromCurrentNodeData(/* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        BasicSourceTextureEngineService$WonderEditor.getWrapT(DiffComponentTool$WonderEditor.getEditEngineComponent(/* Texture */11, textureIndex), StateLogicService$WonderEditor.getEditEngineState(/* () */0)),
                                        BasicSourceTextureEngineService$WonderEditor.getWrapT(textureIndex, StateLogicService$WonderEditor.getEditEngineState(/* () */0))
                                      ]), /* tuple */[
                                    wrapMirroredRepeatType,
                                    wrapMirroredRepeatType
                                  ]);
                      }));
                Wonder_jest.test("test change magFilter", (function () {
                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                        var magFilterDomIndex = TextureInspectorTool$WonderEditor.getMagFilterDomIndex(/* () */0);
                        var filterLinearMipmapLinearType = TextureInspectorTool$WonderEditor.getFilterLinearMipmapLinearType(/* () */0);
                        MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */8](assetTreeDomRecord));
                        TextureInspectorTool$WonderEditor.triggerInspectorChangeFilterEvent(magFilterDomIndex, filterLinearMipmapLinearType);
                        var textureIndex = TextureInspectorTool$WonderEditor.getTextureIndexFromCurrentNodeData(/* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        BasicSourceTextureEngineService$WonderEditor.getMagFilter(DiffComponentTool$WonderEditor.getEditEngineComponent(/* Texture */11, textureIndex), StateLogicService$WonderEditor.getEditEngineState(/* () */0)),
                                        BasicSourceTextureEngineService$WonderEditor.getMagFilter(textureIndex, StateLogicService$WonderEditor.getEditEngineState(/* () */0))
                                      ]), /* tuple */[
                                    filterLinearMipmapLinearType,
                                    filterLinearMipmapLinearType
                                  ]);
                      }));
                return Wonder_jest.test("test change minFilter", (function () {
                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                              var minFilterDomIndex = TextureInspectorTool$WonderEditor.getMinFilterDomIndex(/* () */0);
                              var filterNearestMipmapLinearType = TextureInspectorTool$WonderEditor.getFilterNearestMipmapLinearType(/* () */0);
                              MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */8](assetTreeDomRecord));
                              TextureInspectorTool$WonderEditor.triggerInspectorChangeFilterEvent(minFilterDomIndex, filterNearestMipmapLinearType);
                              var textureIndex = TextureInspectorTool$WonderEditor.getTextureIndexFromCurrentNodeData(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              BasicSourceTextureEngineService$WonderEditor.getMinFilter(DiffComponentTool$WonderEditor.getEditEngineComponent(/* Texture */11, textureIndex), StateLogicService$WonderEditor.getEditEngineState(/* () */0)),
                                              BasicSourceTextureEngineService$WonderEditor.getMinFilter(textureIndex, StateLogicService$WonderEditor.getEditEngineState(/* () */0))
                                            ]), /* tuple */[
                                          filterNearestMipmapLinearType,
                                          filterNearestMipmapLinearType
                                        ]);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
