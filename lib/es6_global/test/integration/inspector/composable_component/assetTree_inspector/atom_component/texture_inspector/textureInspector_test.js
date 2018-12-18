

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as InspectorTool$WonderEditor from "../../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../tool/ReactTestTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as TextureInspectorTool$WonderEditor from "./tool/textureInspectorTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../../tool/AssetTreeInspectorTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../../../../asset/tool/MainEditorAssetNodeTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../../../../asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorAssetUploadTool$WonderEditor from "../../../../../asset/tool/MainEditorAssetUploadTool.js";
import * as BasicSourceTextureToolEngine$WonderEditor from "../../../../../../tool/engine/BasicSourceTextureToolEngine.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../src/service/state/engine/BasicSourceTextureEngineService.js";
import * as MainEditorAssetChildrenNodeTool$WonderEditor from "../../../../../asset/tool/MainEditorAssetChildrenNodeTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";

describe("texture inspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("prepare currentSelectSource", (function (param) {
                beforeEach((function (param) {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* Asset */1, param);
                                    }));
                      }));
                describe("test texture inspector->show default value", (function (param) {
                        return Wonder_jest.test("test snapshot", (function (param) {
                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                      MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData), undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                    }));
                      }));
                describe("test texture rename", (function (param) {
                        describe("test rename to specific name", (function (param) {
                                return Wonder_jest.test("test snapshot", (function (param) {
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                              AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetTextureNode */1](undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData), "newTextureName", /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                            }));
                              }));
                        return Wonder_jest.testPromise("upload texture;\n            rename texture;\n\n            texture name should be renamed\n              ", (function (param) {
                                      Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                      Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                      Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                      var newName = "newTextureToEngine";
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                    AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetTextureNode */1](undefined, undefined, uploadedTextureNodeId, newName, /* () */0);
                                                    MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(uploadedTextureNodeId, undefined, undefined, /* () */0);
                                                    var partial_arg = MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromCurrentNodeId(/* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                              return BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(partial_arg, param);
                                                                            }))), newName));
                                                  }));
                                    }));
                      }));
                describe("test texture change wrap", (function (param) {
                        describe("test set wrapS to Repeat", (function (param) {
                                var _prepareAndExec = function (param) {
                                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                  var wrapRepeatType = TextureInspectorTool$WonderEditor.getWrapRepeatType(/* () */0);
                                  var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData);
                                  TextureInspectorTool$WonderEditor.changeWrapS(MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromNodeId(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData)), wrapRepeatType);
                                  return /* tuple */[
                                          MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromNodeId(nodeId),
                                          wrapRepeatType
                                        ];
                                };
                                Wonder_jest.test("test snapshot", (function (param) {
                                        _prepareAndExec(/* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                      }));
                                Wonder_jest.test("set wrapS", (function (param) {
                                        var match = _prepareAndExec(/* () */0);
                                        var textureComponent = match[0];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return BasicSourceTextureEngineService$WonderEditor.getWrapS(textureComponent, param);
                                                            }))), match[1]);
                                      }));
                                return Wonder_jest.test("mark need update", (function (param) {
                                              var match = _prepareAndExec(/* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureToolEngine$WonderEditor.getIsNeedUpdate(match[0], engineState)), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test texture change filter", (function (param) {
                        describe("test set MagFilter", (function (param) {
                                var _prepareAndExec = function (param) {
                                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                  var filterNearestType = TextureInspectorTool$WonderEditor.getFilterNearestType(/* () */0);
                                  var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData);
                                  TextureInspectorTool$WonderEditor.changeMagFilter(MainEditorAssetNodeTool$WonderEditor.getTextureNode(nodeId)[/* textureComponent */0], filterNearestType);
                                  return /* tuple */[
                                          MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromNodeId(nodeId),
                                          filterNearestType
                                        ];
                                };
                                Wonder_jest.test("set magFilter", (function (param) {
                                        var match = _prepareAndExec(/* () */0);
                                        var textureComponent = match[0];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return BasicSourceTextureEngineService$WonderEditor.getMagFilter(textureComponent, param);
                                                            }))), match[1]);
                                      }));
                                return Wonder_jest.test("mark need update", (function (param) {
                                              var match = _prepareAndExec(/* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureToolEngine$WonderEditor.getIsNeedUpdate(match[0], engineState)), true);
                                            }));
                              }));
                        describe("test set MinFilter to Nearest_mipmap_linear", (function (param) {
                                var _prepareAndExec = function (param) {
                                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                  var filterLinearMipmapLinearType = TextureInspectorTool$WonderEditor.getFilterLinearMipmapLinearType(/* () */0);
                                  var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData);
                                  TextureInspectorTool$WonderEditor.changeMinFilter(MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromNodeId(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData)), filterLinearMipmapLinearType);
                                  return /* tuple */[
                                          MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromNodeId(nodeId),
                                          filterLinearMipmapLinearType
                                        ];
                                };
                                Wonder_jest.test("test snapshot", (function (param) {
                                        _prepareAndExec(/* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                      }));
                                Wonder_jest.test("set minFilter", (function (param) {
                                        var match = _prepareAndExec(/* () */0);
                                        var textureComponent = match[0];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return BasicSourceTextureEngineService$WonderEditor.getMinFilter(textureComponent, param);
                                                            }))), match[1]);
                                      }));
                                return Wonder_jest.test("mark need update", (function (param) {
                                              var match = _prepareAndExec(/* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureToolEngine$WonderEditor.getIsNeedUpdate(match[0], engineState)), true);
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
