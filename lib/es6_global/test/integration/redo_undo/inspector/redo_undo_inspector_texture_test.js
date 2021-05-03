

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as TextureInspectorTool$WonderEditor from "../../inspector/composable_component/assetTree_inspector/atom_component/texture_inspector/tool/textureInspectorTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../asset/tool/MainEditorAssetNodeTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../asset/tool/MainEditorAssetTreeTool.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../src/service/state/engine/BasicSourceTextureEngineService.js";
import * as MainEditorAssetChildrenNodeTool$WonderEditor from "../../asset/tool/MainEditorAssetChildrenNodeTool.js";

describe("redo_undo: texture inspector", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test change wrapS", (function () {
                var _prepareAndExec = function () {
                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                  var wrapRepeatType = TextureInspectorTool$WonderEditor.getWrapRepeatType(/* () */0);
                  var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                  var textureComponent = MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromNodeId(nodeId);
                  var oldValue = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                          return BasicSourceTextureEngineService$WonderEditor.getWrapS(textureComponent, param);
                        }));
                  MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(nodeId, undefined, undefined, /* () */0);
                  TextureInspectorTool$WonderEditor.changeWrapS(textureComponent, wrapRepeatType, undefined, undefined, /* () */0);
                  return /* tuple */[
                          textureComponent,
                          oldValue,
                          wrapRepeatType
                        ];
                };
                describe("test undo operate", (function () {
                        Wonder_jest.test("should undo wrapS", (function () {
                                var match = _prepareAndExec(/* () */0);
                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getWrapS(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[1]);
                              }));
                        return Wonder_jest.test("should mark texture->isNeedUpdate to true after undo", (function () {
                                      var match = _prepareAndExec(/* () */0);
                                      var textureComponent = match[0];
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                            }));
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* NeedUpdate */1);
                                    }));
                      }));
                describe("test redo operate", (function () {
                        Wonder_jest.test("should redo wrapS", (function () {
                                var match = _prepareAndExec(/* () */0);
                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getWrapS(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[2]);
                              }));
                        return Wonder_jest.test("should mark texture->isNeedUpdate to true after redo", (function () {
                                      var match = _prepareAndExec(/* () */0);
                                      var textureComponent = match[0];
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                            }));
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                            }));
                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* NeedUpdate */1);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test change wrapT", (function () {
                var _prepareAndExec = function () {
                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                  var wrapRepeatType = TextureInspectorTool$WonderEditor.getWrapRepeatType(/* () */0);
                  var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                  var textureComponent = MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromNodeId(nodeId);
                  var oldValue = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                          return BasicSourceTextureEngineService$WonderEditor.getWrapT(textureComponent, param);
                        }));
                  MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(nodeId, undefined, undefined, /* () */0);
                  TextureInspectorTool$WonderEditor.changeWrapT(textureComponent, wrapRepeatType, undefined, undefined, /* () */0);
                  return /* tuple */[
                          textureComponent,
                          oldValue,
                          wrapRepeatType
                        ];
                };
                describe("test undo operate", (function () {
                        Wonder_jest.test("should undo wrapT", (function () {
                                var match = _prepareAndExec(/* () */0);
                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getWrapT(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[1]);
                              }));
                        return Wonder_jest.test("should mark texture->isNeedUpdate to true after undo", (function () {
                                      var match = _prepareAndExec(/* () */0);
                                      var textureComponent = match[0];
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                            }));
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* NeedUpdate */1);
                                    }));
                      }));
                describe("test redo operate", (function () {
                        Wonder_jest.test("should redo wrapT", (function () {
                                var match = _prepareAndExec(/* () */0);
                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getWrapT(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[2]);
                              }));
                        return Wonder_jest.test("should mark texture->isNeedUpdate to true after redo", (function () {
                                      var match = _prepareAndExec(/* () */0);
                                      var textureComponent = match[0];
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                            }));
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                            }));
                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* NeedUpdate */1);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test change magFilter", (function () {
                var _prepareAndExec = function () {
                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                  var filterLinearMipmapLinearType = TextureInspectorTool$WonderEditor.getFilterLinearMipmapLinearType(/* () */0);
                  var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                  var textureComponent = MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromNodeId(nodeId);
                  var oldValue = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                          return BasicSourceTextureEngineService$WonderEditor.getMagFilter(textureComponent, param);
                        }));
                  MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(nodeId, undefined, undefined, /* () */0);
                  TextureInspectorTool$WonderEditor.changeMagFilter(textureComponent, filterLinearMipmapLinearType, undefined, undefined, /* () */0);
                  return /* tuple */[
                          textureComponent,
                          oldValue,
                          filterLinearMipmapLinearType
                        ];
                };
                describe("test undo operate", (function () {
                        Wonder_jest.test("should undo magFilter", (function () {
                                var match = _prepareAndExec(/* () */0);
                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getMagFilter(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[1]);
                              }));
                        return Wonder_jest.test("should mark texture->isNeedUpdate to true after undo", (function () {
                                      var match = _prepareAndExec(/* () */0);
                                      var textureComponent = match[0];
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                            }));
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* NeedUpdate */1);
                                    }));
                      }));
                describe("test redo operate", (function () {
                        Wonder_jest.test("should redo magFilter", (function () {
                                var match = _prepareAndExec(/* () */0);
                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getMagFilter(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[2]);
                              }));
                        return Wonder_jest.test("should mark texture->isNeedUpdate to true after redo", (function () {
                                      var match = _prepareAndExec(/* () */0);
                                      var textureComponent = match[0];
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                            }));
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                            }));
                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* NeedUpdate */1);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test change minFilter", (function () {
                var _prepareAndExec = function () {
                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                  var filterLinearMipmapLinearType = TextureInspectorTool$WonderEditor.getFilterLinearMipmapLinearType(/* () */0);
                  var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                  var textureComponent = MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromNodeId(nodeId);
                  var oldValue = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                          return BasicSourceTextureEngineService$WonderEditor.getMinFilter(textureComponent, param);
                        }));
                  MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(nodeId, undefined, undefined, /* () */0);
                  TextureInspectorTool$WonderEditor.changeMinFilter(textureComponent, filterLinearMipmapLinearType, undefined, undefined, /* () */0);
                  return /* tuple */[
                          textureComponent,
                          oldValue,
                          filterLinearMipmapLinearType
                        ];
                };
                describe("test undo operate", (function () {
                        Wonder_jest.test("should undo minFilter", (function () {
                                var match = _prepareAndExec(/* () */0);
                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getMinFilter(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[1]);
                              }));
                        return Wonder_jest.test("should mark texture->isNeedUpdate to true after undo", (function () {
                                      var match = _prepareAndExec(/* () */0);
                                      var textureComponent = match[0];
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                            }));
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* NeedUpdate */1);
                                    }));
                      }));
                describe("test redo operate", (function () {
                        Wonder_jest.test("should redo minFilter", (function () {
                                var match = _prepareAndExec(/* () */0);
                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getMinFilter(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[2]);
                              }));
                        return Wonder_jest.test("should mark texture->isNeedUpdate to true after redo", (function () {
                                      var match = _prepareAndExec(/* () */0);
                                      var textureComponent = match[0];
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                            }));
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                            }));
                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* NeedUpdate */1);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
