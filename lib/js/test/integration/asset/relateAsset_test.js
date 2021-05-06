'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ImageTool$WonderEditor = require("../tool/ImageTool.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var LightMaterialToolEngine$WonderEditor = require("../../tool/engine/LightMaterialToolEngine.js");
var LightMaterialEngineService$WonderEditor = require("../../../src/service/state/engine/LightMaterialEngineService.js");
var RelateGameObjectAndTextureAssetUtils$WonderEditor = require("../../../src/core/composable_component/utils/RelateGameObjectAndTextureAssetUtils.js");
var RelateGameObjectAndMaterialAssetUtils$WonderEditor = require("../../../src/core/composable_component/utils/RelateGameObjectAndMaterialAssetUtils.js");

Wonder_jest.describe("relate asset", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test isLightMaterialDataEqual", (function (param) {
                return Wonder_jest.describe("test judge name is equal", (function (param) {
                              Wonder_jest.test("if sourceName and targetName are all default name, return true", (function (param) {
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var match = LightMaterialToolEngine$WonderEditor.createGameObject(engineState);
                                      var material = match[2];
                                      var engineState$1 = LightMaterialEngineService$WonderEditor.setLightMaterialName("lightMaterial_3", material, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](RelateGameObjectAndMaterialAssetUtils$WonderEditor._isLightMaterialNameEqual("lightMaterial_1", material, engineState$1)), true);
                                    }));
                              Wonder_jest.test("else if all are None, return true", (function (param) {
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var match = LightMaterialToolEngine$WonderEditor.createGameObject(engineState);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](RelateGameObjectAndMaterialAssetUtils$WonderEditor._isLightMaterialNameEqual(undefined, match[2], match[0])), true);
                                    }));
                              return Wonder_jest.test("else, judge sourceName == targetName", (function (param) {
                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            var match = LightMaterialToolEngine$WonderEditor.createGameObject(engineState);
                                            var material = match[2];
                                            var engineState$1 = LightMaterialEngineService$WonderEditor.setLightMaterialName("name2", material, match[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](RelateGameObjectAndMaterialAssetUtils$WonderEditor._isLightMaterialNameEqual("lightMaterial_1", material, engineState$1)), false);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test _isImageDataDataEqual", (function (param) {
                      return Wonder_jest.describe("test judge name is equal", (function (param) {
                                    Wonder_jest.test("if sourceName and targetName are all default name, return true", (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](RelateGameObjectAndTextureAssetUtils$WonderEditor.isImageNameEqual("image_1", ImageTool$WonderEditor.buildImage("image_3", /* () */0))), true);
                                          }));
                                    return Wonder_jest.test("else, judge sourceName == targetName", (function (param) {
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](RelateGameObjectAndTextureAssetUtils$WonderEditor.isImageNameEqual("image_1", ImageTool$WonderEditor.buildImage("name2", /* () */0))), false);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
