'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var HeaderSettingTool$WonderEditor = require("../../../../unit/composable_component/header/tool/HeaderSettingTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var SceneEngineService$WonderEditor = require("../../../../../src/service/state/engine/SceneEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../../tool/MainEditorAssetIdTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../tool/MainEditorAssetTreeTool.js");
var CubemapTextureToolEngine$WonderEditor = require("../../../../tool/engine/CubemapTextureToolEngine.js");
var MainEditorAssetCubemapNodeTool$WonderEditor = require("../../tool/MainEditorAssetCubemapNodeTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../tool/MainEditorAssetHeaderOperateNodeTool.js");
var CubemapTextureImageDataMapAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/imageDataMap/CubemapTextureImageDataMapAssetEditorService.js");

Wonder_jest.describe("MainEditorAssetHeader->remove cubemap", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("\n        select cubemap;\n        click remove-button;\n            ", (function (param) {
                Wonder_jest.test("should remove it from assetTreeRoot", (function (param) {
                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeCubemapNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData), /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0));
                      }));
                return Wonder_jest.test("should remove it from cubemapTextureImageDataMap", (function (param) {
                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                              var addedCubemapNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                              var imageDataIndex = MainEditorAssetCubemapNodeTool$WonderEditor.getImageDataIndex(addedCubemapNodeId, undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeCubemapNode(undefined, undefined, addedCubemapNodeId, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(StateLogicService$WonderEditor.getEditorState((function (param) {
                                                        return CubemapTextureImageDataMapAssetEditorService$WonderEditor.getData(imageDataIndex, param);
                                                      })))), true);
                            }));
              }));
        return Wonder_jest.describe("should remove it from engineState", (function (param) {
                      Wonder_jest.describe("if scene skybox use it", (function (param) {
                              var _prepare = function (param) {
                                var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                var firstCubemapNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData);
                                Curry._1(HeaderSettingTool$WonderEditor.Scene[/* Skybox */1][/* setCubemapTextureToSceneSkybox */0], MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(firstCubemapNodeId, undefined, /* () */0));
                                return firstCubemapNodeId;
                              };
                              Wonder_jest.test("remove it", (function (param) {
                                      var firstCubemapNodeId = _prepare(/* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeCubemapNode(undefined, undefined, firstCubemapNodeId, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getCubemapTexture)), undefined);
                                    }));
                              return Wonder_jest.test("dispose it", (function (param) {
                                            var firstCubemapNodeId = _prepare(/* () */0);
                                            var cubemapTexture = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(firstCubemapNodeId, undefined, /* () */0);
                                            MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeCubemapNode(undefined, undefined, firstCubemapNodeId, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return CubemapTextureToolEngine$WonderEditor.isAlive(cubemapTexture, param);
                                                                }))), false);
                                          }));
                            }));
                      return Wonder_jest.describe("else", (function (param) {
                                    return Wonder_jest.test("not dispose it", (function (param) {
                                                  var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                                  var firstCubemapNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData);
                                                  var cubemapTexture = MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(firstCubemapNodeId, undefined, /* () */0);
                                                  MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeCubemapNode(undefined, undefined, firstCubemapNodeId, /* () */0);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return CubemapTextureToolEngine$WonderEditor.isAlive(cubemapTexture, param);
                                                                      }))), true);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
