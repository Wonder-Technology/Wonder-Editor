'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Color$WonderEditor = require("../../../src/core/external/Color.js");
var TestTool$WonderEditor = require("../../tool/TestTool.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var ConsoleTool$WonderEditor = require("../../unit/tool/external/ConsoleTool.js");
var PickColorTool$WonderEditor = require("../../tool/PickColorTool.js");
var ReactTestTool$WonderEditor = require("../../tool/ReactTestTool.js");
var ControllerTool$WonderEditor = require("../../unit/composable_component/controller/tool/ControllerTool.js");
var HeaderSettingTool$WonderEditor = require("../../unit/composable_component/header/tool/HeaderSettingTool.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var AssetInspectorTool$WonderEditor = require("../inspector/composable_component/asset_inspector/tool/AssetInspectorTool.js");
var SceneEngineService$WonderEditor = require("../../../src/service/state/engine/SceneEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var MainEditorAssetIdTool$WonderEditor = require("../asset/tool/MainEditorAssetIdTool.js");
var RefreshEngineStateTool$WonderEditor = require("../../tool/RefreshEngineStateTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../asset/tool/MainEditorAssetTreeTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var MainEditorAssetCubemapNodeTool$WonderEditor = require("../asset/tool/MainEditorAssetCubemapNodeTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("Header Setting->Scene", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test Scene", (function (param) {
                      Wonder_jest.test("test ui->scene modal snapshot", (function (param) {
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(HeaderSettingTool$WonderEditor.UI[/* buildSetting */0](undefined, undefined, undefined, true, undefined, undefined, /* () */0));
                            }));
                      Wonder_jest.describe("test ambient light", (function (param) {
                              return Wonder_jest.describe("test change color", (function (param) {
                                            Wonder_jest.test("should set into engine", (function (param) {
                                                    var newColor = PickColorTool$WonderEditor.buildColor1(/* () */0);
                                                    Curry._1(HeaderSettingTool$WonderEditor.Scene[/* Ambient */0][/* changeColor */1], newColor);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getAmbientLightColor))), newColor.hex);
                                                  }));
                                            return Wonder_jest.test("should update ui", (function (param) {
                                                          var newColor = PickColorTool$WonderEditor.buildColor1(/* () */0);
                                                          Curry._1(HeaderSettingTool$WonderEditor.Scene[/* Ambient */0][/* changeColor */1], newColor);
                                                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(HeaderSettingTool$WonderEditor.UI[/* buildSetting */0](undefined, undefined, undefined, true, undefined, undefined, /* () */0));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test skybox", (function (param) {
                                    Wonder_jest.describe("test select cubemap group -> show order", (function (param) {
                                            return Wonder_jest.test("\n        order should be:\n        sort cubemap assets by firstname alphabetically\n        ", (function (param) {
                                                          var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                                                          var addedCubemapNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                                                          AssetInspectorTool$WonderEditor.Rename[/* renameAssetCubemapNode */1](undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData), "BCubemap", /* () */0);
                                                          AssetInspectorTool$WonderEditor.Rename[/* renameAssetCubemapNode */1](undefined, undefined, addedCubemapNodeId, "ACubemap", /* () */0);
                                                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(HeaderSettingTool$WonderEditor.UI[/* buildSettingSceneModal */1](undefined, undefined, undefined, true, undefined, /* () */0));
                                                        }));
                                          }));
                                    Wonder_jest.describe("test has no cubemap", (function (param) {
                                            return Wonder_jest.test("ui->modal->skybox should has no cubemap", (function (param) {
                                                          StateLogicService$WonderEditor.getAndSetEngineState(SceneEngineService$WonderEditor.removeCubemapTexture);
                                                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(HeaderSettingTool$WonderEditor.UI[/* buildSettingSceneModal */1](undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                        }));
                                          }));
                                    Wonder_jest.describe("test select cubemap", (function (param) {
                                            var _prepareAndExec = function (param) {
                                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                              var addedCubemapNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                                              return Curry._1(HeaderSettingTool$WonderEditor.Scene[/* Skybox */1][/* setCubemapTextureToSceneSkybox */0], MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(addedCubemapNodeId, undefined, /* () */0));
                                            };
                                            Wonder_jest.test("ui->modal->skybox should has cubemap", (function (param) {
                                                    _prepareAndExec(/* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(HeaderSettingTool$WonderEditor.UI[/* buildSettingSceneModal */1](undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                  }));
                                            Wonder_jest.test("should set to skybox", (function (param) {
                                                    _prepareAndExec(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isSome(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getCubemapTexture))), true);
                                                  }));
                                            Wonder_jest.test("should render when stop", (function (param) {
                                                    return RefreshEngineStateTool$WonderEditor.testRefreshEngineState(sandbox, (function (param) {
                                                                  ControllerTool$WonderEditor.setIsRun(false);
                                                                  return _prepareAndExec(/* () */0);
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("handle error", (function (param) {
                                                          var _prepareState = function (param) {
                                                            MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_texture\"\n            },\n            {\n              \"name\": \"init_skybox\"\n            }\n          ]\n        }\n      ]\n            ", "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n\n                               {\n                                   \"name\": \"render_skybox\"\n                               }\n           ]\n         }\n       ]\n             ", undefined, undefined, /* () */0), undefined, false, undefined, undefined, /* () */0);
                                                            return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                                                          };
                                                          return Wonder_jest.test("test handle \"should has all sources\" error", (function (param) {
                                                                        _prepareState(/* () */0);
                                                                        TestTool$WonderEditor.openContractCheck(/* () */0);
                                                                        StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                                                        ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                                                        var error = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                                                                        _prepareAndExec(/* () */0);
                                                                        return Sinon.toCalledWith(/* array */["\"expect has all sources, but actual not\""], Wonder_jest.Expect[/* expect */0](error));
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test remove cubemap", (function (param) {
                                                  return Wonder_jest.test("should render when stop", (function (param) {
                                                                return RefreshEngineStateTool$WonderEditor.testRefreshEngineState(sandbox, (function (param) {
                                                                              ControllerTool$WonderEditor.setIsRun(false);
                                                                              MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                                                                              MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addCubemap(undefined, undefined, /* () */0);
                                                                              return Curry._1(HeaderSettingTool$WonderEditor.Scene[/* Skybox */1][/* removeCubemap */1], /* () */0);
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
