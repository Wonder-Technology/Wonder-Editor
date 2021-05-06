'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var LoadTool$WonderEditor = require("../../asset/tool/LoadTool.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var CubemapInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/atom_component/cubemap_inspector/tool/CubemapInspectorTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../asset/tool/MainEditorAssetTreeTool.js");
var CubemapTextureEngineService$WonderEditor = require("../../../../src/service/state/engine/texture/CubemapTextureEngineService.js");
var MainEditorAssetCubemapNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetCubemapNodeTool.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetChildrenNodeTool.js");

Wonder_jest.describe("redo_undo: cubemap inspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test load and set face source", (function (param) {
                var _prepareAndExec = function (judgeFunc) {
                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                  var cubemapTexture = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData), undefined, /* () */0);
                  return CubemapInspectorTool$WonderEditor.loadAndSetFaceSource(undefined, undefined, undefined, undefined, cubemapTexture, CubemapTextureEngineService$WonderEditor.setPXSource, undefined, undefined, /* () */0).then((function (param) {
                                return Curry._1(judgeFunc, cubemapTexture);
                              }));
                };
                beforeEach((function () {
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                        Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                        LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                        LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                        return LoadTool$WonderEditor.buildFakeLoadImage();
                      }));
                Wonder_jest.describe("test undo operate", (function (param) {
                        Wonder_jest.testPromise("should undo \"set source\"", undefined, (function (param) {
                                return _prepareAndExec((function (cubemapTexture) {
                                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return CubemapTextureEngineService$WonderEditor.getPXSource(cubemapTexture, param);
                                                                      }))), undefined));
                                            }));
                              }));
                        return Wonder_jest.testPromise("should mark texture->isNeedUpdate to true after undo", undefined, (function (param) {
                                      return _prepareAndExec((function (cubemapTexture) {
                                                    StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                            return CubemapTextureEngineService$WonderEditor.setIsNeedUpdate(false, cubemapTexture, param);
                                                          }));
                                                    RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureEngineService$WonderEditor.getIsNeedUpdate(cubemapTexture, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), true));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test redo operate", (function (param) {
                              Wonder_jest.testPromise("should redo \"set source\"", undefined, (function (param) {
                                      return _prepareAndExec((function (cubemapTexture) {
                                                    RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isSome(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                  return CubemapTextureEngineService$WonderEditor.getPXSource(cubemapTexture, param);
                                                                                })))), true));
                                                  }));
                                    }));
                              return Wonder_jest.testPromise("should mark texture->isNeedUpdate to true after undo", undefined, (function (param) {
                                            return _prepareAndExec((function (cubemapTexture) {
                                                          RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                                  return CubemapTextureEngineService$WonderEditor.setIsNeedUpdate(false, cubemapTexture, param);
                                                                }));
                                                          RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureEngineService$WonderEditor.getIsNeedUpdate(cubemapTexture, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), true));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test change wrapS", (function (param) {
                      var _prepareAndExec = function (param) {
                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                        var wrapRepeatType = CubemapInspectorTool$WonderEditor.getWrapRepeatType(/* () */0);
                        var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData);
                        var cubemapTexture = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(nodeId, undefined, /* () */0);
                        var oldValue = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                return CubemapTextureEngineService$WonderEditor.getWrapS(cubemapTexture, param);
                              }));
                        MainEditorAssetChildrenNodeTool$WonderEditor.selectCubemapNode(nodeId, undefined, undefined, /* () */0);
                        CubemapInspectorTool$WonderEditor.changeWrapS(cubemapTexture, wrapRepeatType, undefined, undefined, /* () */0);
                        return /* tuple */[
                                cubemapTexture,
                                oldValue,
                                wrapRepeatType
                              ];
                      };
                      Wonder_jest.describe("test undo operate", (function (param) {
                              Wonder_jest.test("should undo wrapS", (function (param) {
                                      var match = _prepareAndExec(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureEngineService$WonderEditor.getWrapS(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[1]);
                                    }));
                              return Wonder_jest.test("should mark texture->isNeedUpdate to true after undo", (function (param) {
                                            var match = _prepareAndExec(/* () */0);
                                            var cubemapTexture = match[0];
                                            StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                    return CubemapTextureEngineService$WonderEditor.setIsNeedUpdate(false, cubemapTexture, param);
                                                  }));
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureEngineService$WonderEditor.getIsNeedUpdate(cubemapTexture, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), true);
                                          }));
                            }));
                      return Wonder_jest.describe("test redo operate", (function (param) {
                                    Wonder_jest.test("should redo wrapS", (function (param) {
                                            var match = _prepareAndExec(/* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureEngineService$WonderEditor.getWrapS(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[2]);
                                          }));
                                    return Wonder_jest.test("should mark texture->isNeedUpdate to true after redo", (function (param) {
                                                  var match = _prepareAndExec(/* () */0);
                                                  var cubemapTexture = match[0];
                                                  RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                          return CubemapTextureEngineService$WonderEditor.setIsNeedUpdate(false, cubemapTexture, param);
                                                        }));
                                                  RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureEngineService$WonderEditor.getIsNeedUpdate(cubemapTexture, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), true);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
