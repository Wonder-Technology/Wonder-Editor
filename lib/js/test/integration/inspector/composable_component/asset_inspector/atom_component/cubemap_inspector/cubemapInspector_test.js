'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var LoadTool$WonderEditor = require("../../../../../asset/tool/LoadTool.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var InspectorTool$WonderEditor = require("../../../../../../tool/ui/InspectorTool.js");
var OptionService$WonderEditor = require("../../../../../../../src/service/primitive/OptionService.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var ImportPackageTool$WonderEditor = require("../../../../../header/import_package/tool/ImportPackageTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../../tool/AssetInspectorTool.js");
var AssetWidgetService$WonderEditor = require("../../../../../../../src/service/record/editor/widget/AssetWidgetService.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var CubemapInspectorTool$WonderEditor = require("./tool/CubemapInspectorTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetIdTool.js");
var RefreshEngineStateTool$WonderEditor = require("../../../../../../tool/RefreshEngineStateTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetTreeTool.js");
var CubemapTextureToolEngine$WonderEditor = require("../../../../../../tool/engine/CubemapTextureToolEngine.js");
var CubemapTextureEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/texture/CubemapTextureEngineService.js");
var CubemapTextureImageDataMapTool$WonderEditor = require("../../../../../asset/tool/CubemapTextureImageDataMapTool.js");
var MainEditorAssetCubemapNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetCubemapNodeTool.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetChildrenNodeTool.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");
var CubemapTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/imageDataMap/CubemapTextureImageDataMapAssetEditorService.js");

Wonder_jest.describe("cubemap inspector", (function (param) {
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
                      Wonder_jest.describe("test cubemap inspector->show default value", (function (param) {
                              return Wonder_jest.test("test snapshot", (function (param) {
                                            var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                            MainEditorAssetChildrenNodeTool$WonderEditor.selectCubemapNode(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData), undefined, undefined, /* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                          }));
                            }));
                      Wonder_jest.describe("test cubemap rename", (function (param) {
                              Wonder_jest.describe("test rename to specific name", (function (param) {
                                      return Wonder_jest.test("test snapshot", (function (param) {
                                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                                    AssetInspectorTool$WonderEditor.Rename[/* renameAssetCubemapNode */1](undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData), "newCubemapName", /* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0));
                                                  }));
                                    }));
                              Wonder_jest.test("add cubemap;\n            rename cubemap;\n\n            cubemap name should be renamed\n              ", (function (param) {
                                      Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                      var newName = "newCubemapToEngine";
                                      var addedCubemapNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                                      AssetInspectorTool$WonderEditor.Rename[/* renameAssetCubemapNode */1](undefined, undefined, addedCubemapNodeId, newName, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapName(addedCubemapNodeId, undefined, undefined, /* () */0)), newName);
                                    }));
                              return Wonder_jest.test("if rename to the existed name in the same dir, should fail", (function (param) {
                                            var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                            var cubemap1OldName = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapName(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData), undefined, undefined, /* () */0);
                                            var addedCubemapNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                                            var cubemap2OldName = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapName(addedCubemapNodeId, undefined, undefined, /* () */0);
                                            AssetInspectorTool$WonderEditor.Rename[/* renameAssetCubemapNode */1](undefined, undefined, addedCubemapNodeId, cubemap1OldName, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapName(addedCubemapNodeId, undefined, undefined, /* () */0)), cubemap2OldName);
                                          }));
                            }));
                      Wonder_jest.describe("test load and set face source", (function (param) {
                              beforeEach((function () {
                                      Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                                      Curry._1(MainEditorAssetTool$WonderEditor.buildFakeImage, /* () */0);
                                      LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                                      LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                                      return LoadTool$WonderEditor.buildFakeLoadImage();
                                    }));
                              Wonder_jest.testPromise("set image data to cubemapTextureImageDataMap", undefined, (function (param) {
                                      MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                      var addedCubemapNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                                      var cubemapTexture = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(addedCubemapNodeId, undefined, /* () */0);
                                      var imgName = "1.png";
                                      var imgSrc = ImportPackageTool$WonderEditor.buildBase64_2(/* () */0);
                                      return CubemapInspectorTool$WonderEditor.loadAndSetFaceSource(undefined, undefined, imgName, imgSrc, cubemapTexture, CubemapTextureEngineService$WonderEditor.setPXSource, undefined, CubemapTextureImageDataMapAssetEditorService$WonderEditor.setPXImageData, /* () */0).then((function (param) {
                                                    var imageDataIndex = MainEditorAssetCubemapNodeTool$WonderEditor.getImageDataIndex(addedCubemapNodeId, undefined, /* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                                                  return CubemapTextureImageDataMapTool$WonderEditor.getPXImageData(imageDataIndex, param);
                                                                                })))), /* record */[
                                                                    /* base64 */imgSrc,
                                                                    /* uint8Array */Caml_option.some(new Uint8Array(/* array */[
                                                                              109,
                                                                              182
                                                                            ])),
                                                                    /* blobObjectURL */undefined,
                                                                    /* name */imgName,
                                                                    /* mimeType */"image/png"
                                                                  ]));
                                                  }));
                                    }));
                              Wonder_jest.testPromise("set source name and src", undefined, (function (param) {
                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                      var cubemapTexture = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData), undefined, /* () */0);
                                      var imgName = "1.png";
                                      var imgSrc = "newImgBase64222";
                                      return CubemapInspectorTool$WonderEditor.loadAndSetFaceSource(undefined, undefined, imgName, imgSrc, cubemapTexture, CubemapTextureEngineService$WonderEditor.setPXSource, undefined, undefined, /* () */0).then((function (param) {
                                                    var source = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                            return CubemapTextureEngineService$WonderEditor.unsafeGetPXSource(cubemapTexture, param);
                                                          }));
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        source.name,
                                                                        source.src
                                                                      ]), /* tuple */[
                                                                    imgName,
                                                                    imgSrc
                                                                  ]));
                                                  }));
                                    }));
                              Wonder_jest.describe("set source format", (function (param) {
                                      var _test = function (imgName, targetFormat) {
                                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                        var cubemapTexture = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData), undefined, /* () */0);
                                        return CubemapInspectorTool$WonderEditor.loadAndSetFaceSource(undefined, undefined, imgName, undefined, cubemapTexture, CubemapTextureEngineService$WonderEditor.setPXSource, undefined, undefined, /* () */0).then((function (param) {
                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return CubemapTextureEngineService$WonderEditor.getPXFormat(cubemapTexture, param);
                                                                              }))), targetFormat));
                                                    }));
                                      };
                                      Wonder_jest.testPromise("set jpg texture to rgb format", undefined, (function (param) {
                                              return _test("1.jpg", /* Rgb */0);
                                            }));
                                      Wonder_jest.testPromise("set jpeg texture to rgb format", undefined, (function (param) {
                                              return _test("1.jpeg", /* Rgb */0);
                                            }));
                                      return Wonder_jest.testPromise("set png texture to rgba format", undefined, (function (param) {
                                                    return _test("1.png", /* Rgba */1);
                                                  }));
                                    }));
                              Wonder_jest.testPromise("mark need update", undefined, (function (param) {
                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                      var cubemapTexture = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData), undefined, /* () */0);
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return CubemapTextureEngineService$WonderEditor.setIsNeedUpdate(false, cubemapTexture, param);
                                            }));
                                      return CubemapInspectorTool$WonderEditor.loadAndSetFaceSource(undefined, undefined, undefined, undefined, cubemapTexture, CubemapTextureEngineService$WonderEditor.setPXSource, undefined, undefined, /* () */0).then((function (param) {
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                              return CubemapTextureEngineService$WonderEditor.getIsNeedUpdate(cubemapTexture, param);
                                                                            }))), true));
                                                  }));
                                    }));
                              Wonder_jest.testPromise("should refresh engine state", undefined, (function (param) {
                                      return RefreshEngineStateTool$WonderEditor.testRefreshEngineStatePromise(sandbox, (function (param) {
                                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                                    var cubemapTexture = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData), undefined, /* () */0);
                                                    return CubemapInspectorTool$WonderEditor.loadAndSetFaceSource(undefined, undefined, undefined, undefined, cubemapTexture, CubemapTextureEngineService$WonderEditor.setPXSource, undefined, undefined, /* () */0);
                                                  }));
                                    }));
                              return Wonder_jest.describe("test snapshot", (function (param) {
                                            Wonder_jest.test("should has no face source defaultly", (function (param) {
                                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                                    MainEditorAssetChildrenNodeTool$WonderEditor.selectCubemapNode(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData), undefined, undefined, /* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                  }));
                                            return Wonder_jest.testPromise("should show face source image after load", undefined, (function (param) {
                                                          var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                                          return CubemapInspectorTool$WonderEditor.loadAndSetFaceSource(undefined, undefined, undefined, "newImgBase64222", MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData), undefined, /* () */0), undefined, undefined, undefined, /* () */0).then((function (param) {
                                                                        MainEditorAssetChildrenNodeTool$WonderEditor.selectCubemapNode(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData), undefined, undefined, /* () */0);
                                                                        return Promise.resolve(ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0))));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test change wrap", (function (param) {
                              return Wonder_jest.describe("test set wrapS to Repeat", (function (param) {
                                            var _prepareAndExec = function (param) {
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                              var wrapRepeatType = CubemapInspectorTool$WonderEditor.getWrapRepeatType(/* () */0);
                                              var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData);
                                              var cubemapTexture = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(nodeId, undefined, /* () */0);
                                              MainEditorAssetChildrenNodeTool$WonderEditor.selectCubemapNode(nodeId, undefined, undefined, /* () */0);
                                              CubemapInspectorTool$WonderEditor.changeWrapS(cubemapTexture, wrapRepeatType, undefined, undefined, /* () */0);
                                              return /* tuple */[
                                                      cubemapTexture,
                                                      wrapRepeatType
                                                    ];
                                            };
                                            Wonder_jest.test("test snapshot", (function (param) {
                                                    _prepareAndExec(/* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                  }));
                                            Wonder_jest.test("set wrapS", (function (param) {
                                                    var match = _prepareAndExec(/* () */0);
                                                    var cubemapTexture = match[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return CubemapTextureEngineService$WonderEditor.getWrapS(cubemapTexture, param);
                                                                        }))), match[1]);
                                                  }));
                                            return Wonder_jest.test("mark need update", (function (param) {
                                                          var match = _prepareAndExec(/* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureToolEngine$WonderEditor.getIsNeedUpdate(match[0], engineState)), true);
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test change filter", (function (param) {
                                    return Wonder_jest.describe("test set MagFilter", (function (param) {
                                                  var _prepareAndExec = function (param) {
                                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                                    var filterNearestType = CubemapInspectorTool$WonderEditor.getFilterNearestType(/* () */0);
                                                    var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData);
                                                    var cubemapTexture = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(nodeId, undefined, /* () */0);
                                                    CubemapInspectorTool$WonderEditor.changeMagFilter(cubemapTexture, filterNearestType, undefined, undefined, /* () */0);
                                                    return /* tuple */[
                                                            cubemapTexture,
                                                            filterNearestType
                                                          ];
                                                  };
                                                  Wonder_jest.test("set magFilter", (function (param) {
                                                          var match = _prepareAndExec(/* () */0);
                                                          var textureComponent = match[0];
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return CubemapTextureEngineService$WonderEditor.getMagFilter(textureComponent, param);
                                                                              }))), match[1]);
                                                        }));
                                                  return Wonder_jest.test("mark need update", (function (param) {
                                                                var match = _prepareAndExec(/* () */0);
                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureToolEngine$WonderEditor.getIsNeedUpdate(match[0], engineState)), true);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
