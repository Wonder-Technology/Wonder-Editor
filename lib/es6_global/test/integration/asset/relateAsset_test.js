

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ImageTool$WonderEditor from "../tool/ImageTool.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as LightMaterialToolEngine$WonderEditor from "../../tool/engine/LightMaterialToolEngine.js";
import * as LightMaterialEngineService$WonderEditor from "../../../src/service/state/engine/LightMaterialEngineService.js";
import * as RelateGameObjectAndTextureAssetUtils$WonderEditor from "../../../src/core/composable_component/utils/RelateGameObjectAndTextureAssetUtils.js";
import * as RelateGameObjectAndMaterialAssetUtils$WonderEditor from "../../../src/core/composable_component/utils/RelateGameObjectAndMaterialAssetUtils.js";

describe("relate asset", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test isLightMaterialDataEqual", (function () {
                describe("test judge name is equal", (function () {
                        Wonder_jest.test("if sourceName and targetName are all default name, return true", (function () {
                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                var match = LightMaterialToolEngine$WonderEditor.createGameObject(engineState);
                                var material = match[2];
                                var engineState$1 = LightMaterialEngineService$WonderEditor.setLightMaterialName(material, "lightMaterial_3", match[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](RelateGameObjectAndMaterialAssetUtils$WonderEditor._isLightMaterialNameEqual("lightMaterial_1", material, engineState$1)), true);
                              }));
                        Wonder_jest.test("else if all are None, return true", (function () {
                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                var match = LightMaterialToolEngine$WonderEditor.createGameObject(engineState);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](RelateGameObjectAndMaterialAssetUtils$WonderEditor._isLightMaterialNameEqual(undefined, match[2], match[0])), true);
                              }));
                        return Wonder_jest.test("else, judge sourceName == targetName", (function () {
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var match = LightMaterialToolEngine$WonderEditor.createGameObject(engineState);
                                      var material = match[2];
                                      var engineState$1 = LightMaterialEngineService$WonderEditor.setLightMaterialName(material, "name2", match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](RelateGameObjectAndMaterialAssetUtils$WonderEditor._isLightMaterialNameEqual("lightMaterial_1", material, engineState$1)), false);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test _isImageNodeDataEqual", (function () {
                describe("test judge name is equal", (function () {
                        Wonder_jest.test("if sourceName and targetName are all default name, return true", (function () {
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](RelateGameObjectAndTextureAssetUtils$WonderEditor.isImageNameEqual("image_1", ImageTool$WonderEditor.buildImage("image_3", /* () */0))), true);
                              }));
                        return Wonder_jest.test("else, judge sourceName == targetName", (function () {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](RelateGameObjectAndTextureAssetUtils$WonderEditor.isImageNameEqual("image_1", ImageTool$WonderEditor.buildImage("name2", /* () */0))), false);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
