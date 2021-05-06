'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var TextureInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/atom_component/texture_inspector/tool/textureInspectorTool.js");
var MainEditorAssetNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetNodeTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../asset/tool/MainEditorAssetTreeTool.js");
var TextureNodeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/textureNode/TextureNodeAssetEditorService.js");
var BasicSourceTextureEngineService$WonderEditor = require("../../../../src/service/state/engine/texture/BasicSourceTextureEngineService.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetChildrenNodeTool.js");
var IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/textureNode/IMGUICustomImageTypeTextureNodeAssetEditorService.js");

Wonder_jest.describe("redo_undo: texture inspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test change type", (function (param) {
                var _prepareAndExec = function (param) {
                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                  var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                  var oldValue = StateLogicService$WonderEditor.getEditorState((function (param) {
                          return TextureNodeAssetEditorService$WonderEditor.getType(nodeId, param);
                        }));
                  MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(nodeId, undefined, undefined, /* () */0);
                  TextureInspectorTool$WonderEditor.changeType(nodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                  return /* tuple */[
                          nodeId,
                          oldValue,
                          /* IMGUICustomImage */1
                        ];
                };
                Wonder_jest.describe("test undo operate", (function (param) {
                        return Wonder_jest.test("should undo wrapS", (function (param) {
                                      var match = _prepareAndExec(/* () */0);
                                      var nodeId = match[0];
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                            return TextureNodeAssetEditorService$WonderEditor.getType(nodeId, param);
                                                          }))), match[1]);
                                    }));
                      }));
                return Wonder_jest.describe("test redo operate", (function (param) {
                              return Wonder_jest.test("should redo wrapS", (function (param) {
                                            var match = _prepareAndExec(/* () */0);
                                            var nodeId = match[0];
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                  return TextureNodeAssetEditorService$WonderEditor.getType(nodeId, param);
                                                                }))), match[2]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test texture content", (function (param) {
                return Wonder_jest.describe("test type is IMGUICustomImage", (function (param) {
                              return Wonder_jest.describe("test set id", (function (param) {
                                            var _prepareAndExec = function (param) {
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                              var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                                              MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(nodeId, undefined, undefined, /* () */0);
                                              TextureInspectorTool$WonderEditor.changeType(nodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                              var oldValue = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                      return IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor.getId(nodeId, param);
                                                    }));
                                              var id = "aaa";
                                              TextureInspectorTool$WonderEditor.IMGUICustomImageType[/* setCustomImageId */0](nodeId, undefined, id, undefined, undefined, undefined, undefined, /* () */0);
                                              return /* tuple */[
                                                      nodeId,
                                                      oldValue,
                                                      id
                                                    ];
                                            };
                                            Wonder_jest.describe("test undo operate", (function (param) {
                                                    return Wonder_jest.test("should undo wrapS", (function (param) {
                                                                  var match = _prepareAndExec(/* () */0);
                                                                  var nodeId = match[0];
                                                                  RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                        return IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor.getId(nodeId, param);
                                                                                      }))), match[1]);
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("test redo operate", (function (param) {
                                                          return Wonder_jest.test("should redo wrapS", (function (param) {
                                                                        var match = _prepareAndExec(/* () */0);
                                                                        var nodeId = match[0];
                                                                        RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                        RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                              return IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor.getId(nodeId, param);
                                                                                            }))), match[2]);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test change wrapS", (function (param) {
                var _prepareAndExec = function (param) {
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
                Wonder_jest.describe("test undo operate", (function (param) {
                        Wonder_jest.test("should undo wrapS", (function (param) {
                                var match = _prepareAndExec(/* () */0);
                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getWrapS(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[1]);
                              }));
                        return Wonder_jest.test("should mark texture->isNeedUpdate to true after undo", (function (param) {
                                      var match = _prepareAndExec(/* () */0);
                                      var textureComponent = match[0];
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                            }));
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), true);
                                    }));
                      }));
                return Wonder_jest.describe("test redo operate", (function (param) {
                              Wonder_jest.test("should redo wrapS", (function (param) {
                                      var match = _prepareAndExec(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getWrapS(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[2]);
                                    }));
                              return Wonder_jest.test("should mark texture->isNeedUpdate to true after redo", (function (param) {
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
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), true);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test change wrapT", (function (param) {
                var _prepareAndExec = function (param) {
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
                Wonder_jest.describe("test undo operate", (function (param) {
                        Wonder_jest.test("should undo wrapT", (function (param) {
                                var match = _prepareAndExec(/* () */0);
                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getWrapT(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[1]);
                              }));
                        return Wonder_jest.test("should mark texture->isNeedUpdate to true after undo", (function (param) {
                                      var match = _prepareAndExec(/* () */0);
                                      var textureComponent = match[0];
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                            }));
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), true);
                                    }));
                      }));
                return Wonder_jest.describe("test redo operate", (function (param) {
                              Wonder_jest.test("should redo wrapT", (function (param) {
                                      var match = _prepareAndExec(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getWrapT(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[2]);
                                    }));
                              return Wonder_jest.test("should mark texture->isNeedUpdate to true after redo", (function (param) {
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
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), true);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test change magFilter", (function (param) {
                var _prepareAndExec = function (param) {
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
                Wonder_jest.describe("test undo operate", (function (param) {
                        Wonder_jest.test("should undo magFilter", (function (param) {
                                var match = _prepareAndExec(/* () */0);
                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getMagFilter(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[1]);
                              }));
                        return Wonder_jest.test("should mark texture->isNeedUpdate to true after undo", (function (param) {
                                      var match = _prepareAndExec(/* () */0);
                                      var textureComponent = match[0];
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                            }));
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), true);
                                    }));
                      }));
                return Wonder_jest.describe("test redo operate", (function (param) {
                              Wonder_jest.test("should redo magFilter", (function (param) {
                                      var match = _prepareAndExec(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getMagFilter(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[2]);
                                    }));
                              return Wonder_jest.test("should mark texture->isNeedUpdate to true after redo", (function (param) {
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
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), true);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test change minFilter", (function (param) {
                      var _prepareAndExec = function (param) {
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
                      Wonder_jest.describe("test undo operate", (function (param) {
                              Wonder_jest.test("should undo minFilter", (function (param) {
                                      var match = _prepareAndExec(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getMinFilter(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[1]);
                                    }));
                              return Wonder_jest.test("should mark texture->isNeedUpdate to true after undo", (function (param) {
                                            var match = _prepareAndExec(/* () */0);
                                            var textureComponent = match[0];
                                            StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                    return BasicSourceTextureEngineService$WonderEditor.setIsNeedUpdate(false, textureComponent, param);
                                                  }));
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), true);
                                          }));
                            }));
                      return Wonder_jest.describe("test redo operate", (function (param) {
                                    Wonder_jest.test("should redo minFilter", (function (param) {
                                            var match = _prepareAndExec(/* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getMinFilter(match[0], StateEngineService$WonderEditor.unsafeGetState(/* () */0))), match[2]);
                                          }));
                                    return Wonder_jest.test("should mark texture->isNeedUpdate to true after redo", (function (param) {
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
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), true);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
