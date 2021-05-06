'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var Base64Tool$WonderEditor = require("../../../../../../tool/Base64Tool.js");
var InspectorTool$WonderEditor = require("../../../../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var AssetIMGUITool$WonderEditor = require("../../../../../tool/AssetIMGUITool.js");
var FileNameService$WonderEditor = require("../../../../../../../src/service/atom/FileNameService.js");
var TextureAssetTool$WonderEditor = require("../../../../../asset/tool/TextureAssetTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../tool/AssetInspectorTool.js");
var AssetWidgetService$WonderEditor = require("../../../../../../../src/service/record/editor/widget/AssetWidgetService.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var TextureInspectorTool$WonderEditor = require("./tool/textureInspectorTool.js");
var RefreshEngineStateTool$WonderEditor = require("../../../../../../tool/RefreshEngineStateTool.js");
var AssetIMGUIEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/imgui/AssetIMGUIEngineService.js");
var IndexAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/IndexAssetEditorService.js");
var MainEditorAssetNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetNodeTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorAssetUploadTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetUploadTool.js");
var BasicSourceTextureToolEngine$WonderEditor = require("../../../../../../tool/engine/BasicSourceTextureToolEngine.js");
var TextureNodeAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/textureNode/TextureNodeAssetEditorService.js");
var MainEditorAssetTextureNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTextureNodeTool.js");
var BasicSourceTextureEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/texture/BasicSourceTextureEngineService.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetChildrenNodeTool.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var IMGUICustomImageTextureContentMapTool$WonderEditor = require("../../../../../asset/tool/IMGUICustomImageTextureContentMapTool.js");
var IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/textureNode/IMGUICustomImageTypeTextureNodeAssetEditorService.js");
var IMGUICustomImageTextureContentMapAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/textureContentMap/IMGUICustomImageTextureContentMapAssetEditorService.js");

Wonder_jest.describe("texture inspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("prepare currentSelectSource", (function (param) {
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                              var partial_arg = AssetWidgetService$WonderEditor.getWidget(/* () */0);
                              return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                            return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                          }));
                            }));
                      Wonder_jest.describe("test texture inspector->show default value", (function (param) {
                              return Wonder_jest.test("test snapshot", (function (param) {
                                            var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                            MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), undefined, undefined, /* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                          }));
                            }));
                      Wonder_jest.describe("test texture rename", (function (param) {
                              Wonder_jest.describe("test rename to specific name", (function (param) {
                                      return Wonder_jest.test("test snapshot", (function (param) {
                                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                    AssetInspectorTool$WonderEditor.Rename[/* renameAssetTextureNode */4](undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), "newTextureName", /* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                  }));
                                    }));
                              Wonder_jest.testPromise("upload texture;\n            rename texture;\n\n            texture name should be renamed\n              ", undefined, (function (param) {
                                      Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                      Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                      Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                      var newName = "newTextureToEngine";
                                      return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                    AssetInspectorTool$WonderEditor.Rename[/* renameAssetTextureNode */4](undefined, undefined, uploadedTextureNodeId, newName, /* () */0);
                                                    MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(uploadedTextureNodeId, undefined, undefined, /* () */0);
                                                    var partial_arg = MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromCurrentNodeId(/* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                              return BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(partial_arg, param);
                                                                            }))), newName));
                                                  }));
                                    }));
                              return Wonder_jest.test("if rename to the existed name in the same dir, should fail", (function (param) {
                                            var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildTwoTextureAssetTree */1], /* () */0);
                                            var newName = "newTextureName";
                                            var firstTextureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                                            var secondTextureNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getSecondTextureNodeId */3], assetTreeData);
                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetTextureNode */4](undefined, undefined, firstTextureNodeId, newName, /* () */0);
                                            var texture2OldName = MainEditorAssetTextureNodeTool$WonderEditor.getTextureName(secondTextureNodeId, undefined, undefined, /* () */0);
                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetTextureNode */4](undefined, undefined, secondTextureNodeId, newName, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            MainEditorAssetTextureNodeTool$WonderEditor.getTextureName(firstTextureNodeId, undefined, undefined, /* () */0),
                                                            MainEditorAssetTextureNodeTool$WonderEditor.getTextureName(secondTextureNodeId, undefined, undefined, /* () */0)
                                                          ]), /* tuple */[
                                                        newName,
                                                        texture2OldName
                                                      ]);
                                          }));
                            }));
                      Wonder_jest.describe("test change texture type", (function (param) {
                              beforeEach((function () {
                                      Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                      return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                    }));
                              Wonder_jest.describe("update engine data", (function (param) {
                                      Wonder_jest.describe("if old type is IMGUICustomImage", (function (param) {
                                              return Wonder_jest.describe("if the custom image data has set to engine", (function (param) {
                                                            var _test = function (judgeFunc) {
                                                              return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                            TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                                                            var customImageId = "i1";
                                                                            TextureInspectorTool$WonderEditor.IMGUICustomImageType[/* setCustomImageId */0](uploadedTextureNodeId, undefined, customImageId, undefined, undefined, undefined, undefined, /* () */0);
                                                                            var partial_arg = AssetIMGUITool$WonderEditor.buildFakeCustomImageData(customImageId, /* () */0);
                                                                            StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                                                    return AssetIMGUITool$WonderEditor.addSettedAssetCustomImageData(partial_arg, param);
                                                                                  }));
                                                                            TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* BasicSource */0, undefined, undefined, /* () */0);
                                                                            return Curry._1(judgeFunc, customImageId);
                                                                          }));
                                                            };
                                                            Wonder_jest.testPromise("remove it", undefined, (function (param) {
                                                                    return _test((function (customImageId) {
                                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                            return AssetIMGUIEngineService$WonderEditor.hasSettedAssetCustomImageData(customImageId, param);
                                                                                                          }))), false));
                                                                                }));
                                                                  }));
                                                            return Wonder_jest.testPromise("refresh engine data", undefined, (function (param) {
                                                                          return RefreshEngineStateTool$WonderEditor.testRefreshEngineStatePromise(sandbox, (function (param) {
                                                                                        return _test((function (param) {
                                                                                                      return Promise.resolve(/* () */0);
                                                                                                    }));
                                                                                      }));
                                                                        }));
                                                          }));
                                            }));
                                      return Wonder_jest.describe("if old type is BasicSource", (function (param) {
                                                    return Wonder_jest.describe("if the texture has set to engine as imgui font-> bitmap", (function (param) {
                                                                  var _test = function (judgeFunc) {
                                                                    var bitmapName = "bitmap.png";
                                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, bitmapName, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                                  StateEngineService$WonderEditor.setState(AssetIMGUITool$WonderEditor.setSettedAssetBitmapData(FileNameService$WonderEditor.getBaseName(bitmapName), undefined, undefined, /* () */0));
                                                                                  TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                                                                  return Curry._1(judgeFunc, bitmapName);
                                                                                }));
                                                                  };
                                                                  Wonder_jest.testPromise("remove it", undefined, (function (param) {
                                                                          return _test((function (bitmapName) {
                                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                                  return AssetIMGUIEngineService$WonderEditor.hasSettedAssetBitmapData(bitmapName, param);
                                                                                                                }))), false));
                                                                                      }));
                                                                        }));
                                                                  return Wonder_jest.testPromise("refresh engine data", undefined, (function (param) {
                                                                                return RefreshEngineStateTool$WonderEditor.testRefreshEngineStatePromise(sandbox, (function (param) {
                                                                                              return _test((function (param) {
                                                                                                            return Promise.resolve(/* () */0);
                                                                                                          }));
                                                                                            }));
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("update editor data", (function (param) {
                                            Wonder_jest.describe("if new type is BasicSource", (function (param) {
                                                    var _test = function (judgeFunc) {
                                                      return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                    TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                                                    var textureContentIndex = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                            return IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor.unsafeGetTextureContentIndex(uploadedTextureNodeId, param);
                                                                          }));
                                                                    TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* BasicSource */0, undefined, undefined, /* () */0);
                                                                    return Curry._2(judgeFunc, uploadedTextureNodeId, textureContentIndex);
                                                                  }));
                                                    };
                                                    Wonder_jest.testPromise("remove old texture content", undefined, (function (param) {
                                                            return _test((function (uploadedTextureNodeId, textureContentIndex) {
                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](IMGUICustomImageTextureContentMapTool$WonderEditor.hasContent(textureContentIndex, undefined, /* () */0)), false));
                                                                        }));
                                                          }));
                                                    return Wonder_jest.testPromise("update texture node->type_, textureContentIndex", undefined, (function (param) {
                                                                  return _test((function (uploadedTextureNodeId, textureContentIndex) {
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                    StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                            return TextureNodeAssetEditorService$WonderEditor.getType(uploadedTextureNodeId, param);
                                                                                                          })),
                                                                                                    StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                            return TextureAssetTool$WonderEditor.getTextureContentIndex(uploadedTextureNodeId, param);
                                                                                                          }))
                                                                                                  ]), /* tuple */[
                                                                                                /* BasicSource */0,
                                                                                                undefined
                                                                                              ]));
                                                                              }));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("if new type is IMGUICustomImage", (function (param) {
                                                          var _test = function (judgeFunc) {
                                                            return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                          TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* BasicSource */0, undefined, undefined, /* () */0);
                                                                          var textureContentIndex = StateLogicService$WonderEditor.getEditorState(IndexAssetEditorService$WonderEditor.getIMGUICustomImageTextureContentIndex);
                                                                          TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                                                          return Curry._2(judgeFunc, uploadedTextureNodeId, textureContentIndex);
                                                                        }));
                                                          };
                                                          Wonder_jest.testPromise("update texture node->type_, textureContentIndex", undefined, (function (param) {
                                                                  return _test((function (uploadedTextureNodeId, textureContentIndex) {
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                    StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                            return TextureNodeAssetEditorService$WonderEditor.getType(uploadedTextureNodeId, param);
                                                                                                          })),
                                                                                                    StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                            return TextureAssetTool$WonderEditor.getTextureContentIndex(uploadedTextureNodeId, param);
                                                                                                          }))
                                                                                                  ]), /* tuple */[
                                                                                                /* IMGUICustomImage */1,
                                                                                                textureContentIndex + 1 | 0
                                                                                              ]));
                                                                              }));
                                                                }));
                                                          return Wonder_jest.testPromise("add empty texture content", undefined, (function (param) {
                                                                        return _test((function (uploadedTextureNodeId, textureContentIndex) {
                                                                                      var partial_arg = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                              return IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor.unsafeGetTextureContentIndex(uploadedTextureNodeId, param);
                                                                                            }));
                                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                                return IMGUICustomImageTextureContentMapAssetEditorService$WonderEditor.unsafeGetContent(partial_arg, param);
                                                                                                              }))), IMGUICustomImageTextureContentMapAssetEditorService$WonderEditor.generateEmptyContent(/* () */0)));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test texture content", (function (param) {
                              beforeEach((function () {
                                      Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                      return Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                    }));
                              return Wonder_jest.describe("test type is IMGUICustomImage", (function (param) {
                                            Wonder_jest.testPromise("show default texture content", undefined, (function (param) {
                                                    return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                  TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                                                  TextureInspectorTool$WonderEditor.IMGUICustomImageType[/* setCustomImageId */0](uploadedTextureNodeId, undefined, "i1", undefined, undefined, undefined, undefined, /* () */0);
                                                                  MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(uploadedTextureNodeId, undefined, undefined, /* () */0);
                                                                  return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("test set custom image id", (function (param) {
                                                          Wonder_jest.testPromise("if target id already exist, warn", undefined, (function (param) {
                                                                  var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                                                  return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, undefined, /* () */0).then((function (uploadedTextureNodeId) {
                                                                                TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                                                                var customImageId = "i1";
                                                                                TextureInspectorTool$WonderEditor.IMGUICustomImageType[/* setCustomImageId */0](uploadedTextureNodeId, undefined, customImageId, undefined, undefined, undefined, undefined, /* () */0);
                                                                                TextureInspectorTool$WonderEditor.IMGUICustomImageType[/* setCustomImageId */0](uploadedTextureNodeId, undefined, customImageId, undefined, undefined, undefined, undefined, /* () */0);
                                                                                return Promise.resolve(Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](warn)));
                                                                              }));
                                                                }));
                                                          return Wonder_jest.describe("else", (function (param) {
                                                                        var _test = function (judgeFunc) {
                                                                          return MainEditorAssetUploadTool$WonderEditor.loadOneTexture(undefined, undefined, undefined, Base64Tool$WonderEditor.buildFakeBase64_1(/* () */0), /* () */0).then((function (uploadedTextureNodeId) {
                                                                                        TextureInspectorTool$WonderEditor.changeType(uploadedTextureNodeId, /* IMGUICustomImage */1, undefined, undefined, /* () */0);
                                                                                        var customImageId1 = "i1";
                                                                                        var customImageId2 = "i2";
                                                                                        TextureInspectorTool$WonderEditor.IMGUICustomImageType[/* setCustomImageId */0](uploadedTextureNodeId, undefined, customImageId1, undefined, undefined, undefined, undefined, /* () */0);
                                                                                        var partial_arg = AssetIMGUITool$WonderEditor.buildFakeCustomImageData(customImageId1, /* () */0);
                                                                                        StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                                                                return AssetIMGUITool$WonderEditor.addSettedAssetCustomImageData(partial_arg, param);
                                                                                              }));
                                                                                        TextureInspectorTool$WonderEditor.IMGUICustomImageType[/* setCustomImageId */0](uploadedTextureNodeId, undefined, customImageId2, undefined, undefined, undefined, undefined, /* () */0);
                                                                                        return Curry._2(judgeFunc, uploadedTextureNodeId, /* tuple */[
                                                                                                    customImageId1,
                                                                                                    customImageId2
                                                                                                  ]);
                                                                                      }));
                                                                        };
                                                                        Wonder_jest.describe("update engine data", (function (param) {
                                                                                return Wonder_jest.describe("if the custom image data has set to engine", (function (param) {
                                                                                              Wonder_jest.testPromise("remove it", undefined, (function (param) {
                                                                                                      return _test((function (param, param$1) {
                                                                                                                    var oldCustomImageId = param$1[0];
                                                                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                                                              return AssetIMGUIEngineService$WonderEditor.hasSettedAssetCustomImageData(oldCustomImageId, param);
                                                                                                                                            }))), false));
                                                                                                                  }));
                                                                                                    }));
                                                                                              Wonder_jest.testPromise("add the custom image data of the new id", undefined, (function (param) {
                                                                                                      return _test((function (param, param$1) {
                                                                                                                    var newCustomImageId = param$1[1];
                                                                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                                                              return AssetIMGUITool$WonderEditor.findSettedAssetCustomImageDataById(newCustomImageId, param);
                                                                                                                                            }))), AssetIMGUITool$WonderEditor.buildFakeCustomImageData(newCustomImageId, /* () */0)));
                                                                                                                  }));
                                                                                                    }));
                                                                                              return Wonder_jest.testPromise("refresh engine data", undefined, (function (param) {
                                                                                                            return RefreshEngineStateTool$WonderEditor.testRefreshEngineStatePromise(sandbox, (function (param) {
                                                                                                                          return _test((function (param, param$1) {
                                                                                                                                        return Promise.resolve(/* () */0);
                                                                                                                                      }));
                                                                                                                        }));
                                                                                                          }));
                                                                                            }));
                                                                              }));
                                                                        return Wonder_jest.describe("update editor data", (function (param) {
                                                                                      return Wonder_jest.testPromise("set id to texture content", undefined, (function (param) {
                                                                                                    return _test((function (uploadedTextureNodeId, param) {
                                                                                                                  var partial_arg = StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                                          return IMGUICustomImageTypeTextureNodeAssetEditorService$WonderEditor.unsafeGetTextureContentIndex(uploadedTextureNodeId, param);
                                                                                                                        }));
                                                                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                                                                            return IMGUICustomImageTextureContentMapAssetEditorService$WonderEditor.unsafeGetId(partial_arg, param);
                                                                                                                                          }))), param[1]));
                                                                                                                }));
                                                                                                  }));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test texture change wrap", (function (param) {
                              return Wonder_jest.describe("test set wrapS to Repeat", (function (param) {
                                            var _prepareAndExec = function (param) {
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                              var wrapRepeatType = TextureInspectorTool$WonderEditor.getWrapRepeatType(/* () */0);
                                              var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                                              TextureInspectorTool$WonderEditor.changeWrapS(MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromNodeId(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData)), wrapRepeatType, undefined, undefined, /* () */0);
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
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return BasicSourceTextureEngineService$WonderEditor.getWrapS(textureComponent, param);
                                                                        }))), match[1]);
                                                  }));
                                            return Wonder_jest.test("mark need update", (function (param) {
                                                          var match = _prepareAndExec(/* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureToolEngine$WonderEditor.getIsNeedUpdate(match[0], engineState)), true);
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test texture change filter", (function (param) {
                                    Wonder_jest.describe("test set MagFilter", (function (param) {
                                            var _prepareAndExec = function (param) {
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                              var filterNearestType = TextureInspectorTool$WonderEditor.getFilterNearestType(/* () */0);
                                              var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                                              TextureInspectorTool$WonderEditor.changeMagFilter(MainEditorAssetTextureNodeTool$WonderEditor.getTextureComponent(nodeId, StateEditorService$WonderEditor.getState(/* () */0)), filterNearestType, undefined, undefined, /* () */0);
                                              return /* tuple */[
                                                      MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromNodeId(nodeId),
                                                      filterNearestType
                                                    ];
                                            };
                                            Wonder_jest.test("set magFilter", (function (param) {
                                                    var match = _prepareAndExec(/* () */0);
                                                    var textureComponent = match[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return BasicSourceTextureEngineService$WonderEditor.getMagFilter(textureComponent, param);
                                                                        }))), match[1]);
                                                  }));
                                            return Wonder_jest.test("mark need update", (function (param) {
                                                          var match = _prepareAndExec(/* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureToolEngine$WonderEditor.getIsNeedUpdate(match[0], engineState)), true);
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test set MinFilter to Nearest_mipmap_linear", (function (param) {
                                                  var _prepareAndExec = function (param) {
                                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                    var filterLinearMipmapLinearType = TextureInspectorTool$WonderEditor.getFilterLinearMipmapLinearType(/* () */0);
                                                    var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                                                    TextureInspectorTool$WonderEditor.changeMinFilter(MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromNodeId(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData)), filterLinearMipmapLinearType, undefined, undefined, /* () */0);
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
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return BasicSourceTextureEngineService$WonderEditor.getMinFilter(textureComponent, param);
                                                                              }))), match[1]);
                                                        }));
                                                  return Wonder_jest.test("mark need update", (function (param) {
                                                                var match = _prepareAndExec(/* () */0);
                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureToolEngine$WonderEditor.getIsNeedUpdate(match[0], engineState)), true);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
