

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../../../../../tool/ui/BaseEventTool.js";
import * as InspectorTool$WonderEditor from "../../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../tool/ReactTestTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as TextureInspectorTool$WonderEditor from "./tool/textureInspectorTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../../../../asset/tool/MainEditorAssetNodeTool.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../src/service/state/engine/BasicSourceTextureEngineService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../../../src/service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../../../src/service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

describe("TextureInspector", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                StateEditorService$WonderEditor.setState(AssetCurrentNodeParentIdEditorService$WonderEditor.clearCurrentNodeParentId(AssetCurrentNodeDataEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
                return /* () */0;
              }));
        describe("prepare currentSelectSource", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* Asset */1, param);
                                    }));
                      }));
                describe("test component snapshot", (function () {
                        return Wonder_jest.test("test texture inspector->show default value", (function () {
                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                      MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */7](assetTreeDomRecord));
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                    }));
                      }));
                describe("test texture rename", (function () {
                        describe("test snapshot", (function () {
                                return Wonder_jest.test("test rename to specific name", (function () {
                                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                              MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */7](assetTreeDomRecord));
                                              TextureInspectorTool$WonderEditor.triggerInspectorRenameEvent("newTextureName");
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                            }));
                              }));
                        describe("test logic", (function () {
                                describe("test engine", (function () {
                                        beforeEach((function () {
                                                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                                return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                              }));
                                        return Wonder_jest.testPromise("upload texture;\n              rename texture;", (function () {
                                                      var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                                      var newName = "newTextureToEngine";
                                                      return MainEditorAssetTool$WonderEditor.fileLoad(TestTool$WonderEditor.getDispatch(/* () */0), BaseEventTool$WonderEditor.buildFileEvent(undefined, undefined, undefined, undefined, /* () */0)).then((function () {
                                                                    MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getUploadedeTextureNodeDomIndex */1](assetTreeDomRecord));
                                                                    TextureInspectorTool$WonderEditor.triggerInspectorRenameEvent(newName);
                                                                    var partial_arg = MainEditorAssetNodeTool$WonderEditor.getTextureIndexFromCurrentNodeId(/* () */0);
                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                              return BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(partial_arg, param);
                                                                                            }))), newName));
                                                                  }));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test texture change wrap", (function () {
                        describe("test set wrapS to REPEAT", (function () {
                                Wonder_jest.test("test snapshot", (function () {
                                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                        var wrapSDomIndex = TextureInspectorTool$WonderEditor.getWrapSDomIndex(/* () */0);
                                        var wrapRepeatType = TextureInspectorTool$WonderEditor.getWrapRepeatType(/* () */0);
                                        MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */7](assetTreeDomRecord));
                                        TextureInspectorTool$WonderEditor.triggerInspectorChangeWrapEvent(wrapSDomIndex, wrapRepeatType);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                      }));
                                return Wonder_jest.test("test logic", (function () {
                                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                              var wrapSDomIndex = TextureInspectorTool$WonderEditor.getWrapSDomIndex(/* () */0);
                                              var wrapRepeatType = TextureInspectorTool$WonderEditor.getWrapRepeatType(/* () */0);
                                              MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */7](assetTreeDomRecord));
                                              TextureInspectorTool$WonderEditor.triggerInspectorChangeWrapEvent(wrapSDomIndex, wrapRepeatType);
                                              var textureIndex = TextureInspectorTool$WonderEditor.getTextureIndexFromCurrentNodeData(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return BasicSourceTextureEngineService$WonderEditor.getWrapS(textureIndex, param);
                                                                  }))), wrapRepeatType);
                                            }));
                              }));
                        describe("test set wrapT to MIRRORED_REPEAT", (function () {
                                Wonder_jest.test("test snapshot", (function () {
                                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                        var wrapTDomIndex = TextureInspectorTool$WonderEditor.getWrapTDomIndex(/* () */0);
                                        var wrapMirroredRepeatType = TextureInspectorTool$WonderEditor.getWrapMirroredRepeatType(/* () */0);
                                        MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */7](assetTreeDomRecord));
                                        TextureInspectorTool$WonderEditor.triggerInspectorChangeWrapEvent(wrapTDomIndex, wrapMirroredRepeatType);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                      }));
                                return Wonder_jest.test("test logic", (function () {
                                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                              var wrapTDomIndex = TextureInspectorTool$WonderEditor.getWrapTDomIndex(/* () */0);
                                              var wrapMirroredRepeatType = TextureInspectorTool$WonderEditor.getWrapMirroredRepeatType(/* () */0);
                                              MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */7](assetTreeDomRecord));
                                              TextureInspectorTool$WonderEditor.triggerInspectorChangeWrapEvent(wrapTDomIndex, wrapMirroredRepeatType);
                                              var textureIndex = TextureInspectorTool$WonderEditor.getTextureIndexFromCurrentNodeData(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return BasicSourceTextureEngineService$WonderEditor.getWrapT(textureIndex, param);
                                                                  }))), wrapMirroredRepeatType);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test texture change filter", (function () {
                        describe("test set MagFilter to LINEAR_MIPMAP_LINEAR", (function () {
                                Wonder_jest.test("test snapshot", (function () {
                                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                        var magFilterDomIndex = TextureInspectorTool$WonderEditor.getMagFilterDomIndex(/* () */0);
                                        var filterLinearMipmapLinearType = TextureInspectorTool$WonderEditor.getFilterLinearMipmapLinearType(/* () */0);
                                        MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */7](assetTreeDomRecord));
                                        TextureInspectorTool$WonderEditor.triggerInspectorChangeFilterEvent(magFilterDomIndex, filterLinearMipmapLinearType);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                      }));
                                return Wonder_jest.test("test logic", (function () {
                                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                              var magFilterDomIndex = TextureInspectorTool$WonderEditor.getMagFilterDomIndex(/* () */0);
                                              var filterLinearMipmapLinearType = TextureInspectorTool$WonderEditor.getFilterLinearMipmapLinearType(/* () */0);
                                              MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */7](assetTreeDomRecord));
                                              TextureInspectorTool$WonderEditor.triggerInspectorChangeFilterEvent(magFilterDomIndex, filterLinearMipmapLinearType);
                                              var textureIndex = TextureInspectorTool$WonderEditor.getTextureIndexFromCurrentNodeData(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return BasicSourceTextureEngineService$WonderEditor.getMagFilter(textureIndex, param);
                                                                  }))), filterLinearMipmapLinearType);
                                            }));
                              }));
                        describe("test set MinFilter to NEAREST_MIPMAP_LINEAR", (function () {
                                Wonder_jest.test("test snapshot", (function () {
                                        var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                        var minFilterDomIndex = TextureInspectorTool$WonderEditor.getMinFilterDomIndex(/* () */0);
                                        var filterNearestMipmapLinearType = TextureInspectorTool$WonderEditor.getFilterNearestMipmapLinearType(/* () */0);
                                        MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */7](assetTreeDomRecord));
                                        TextureInspectorTool$WonderEditor.triggerInspectorChangeFilterEvent(minFilterDomIndex, filterNearestMipmapLinearType);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                      }));
                                return Wonder_jest.test("test logic", (function () {
                                              var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
                                              var minFilterDomIndex = TextureInspectorTool$WonderEditor.getMinFilterDomIndex(/* () */0);
                                              var filterNearestMipmapLinearType = TextureInspectorTool$WonderEditor.getFilterNearestMipmapLinearType(/* () */0);
                                              MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */7](assetTreeDomRecord));
                                              TextureInspectorTool$WonderEditor.triggerInspectorChangeFilterEvent(minFilterDomIndex, filterNearestMipmapLinearType);
                                              var textureIndex = TextureInspectorTool$WonderEditor.getTextureIndexFromCurrentNodeData(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return BasicSourceTextureEngineService$WonderEditor.getMinFilter(textureIndex, param);
                                                                  }))), filterNearestMipmapLinearType);
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
