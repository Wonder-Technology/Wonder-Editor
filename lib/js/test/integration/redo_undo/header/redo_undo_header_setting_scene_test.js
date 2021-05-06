'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var HeaderSettingTool$WonderEditor = require("../../../unit/composable_component/header/tool/HeaderSettingTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorAssetCubemapNodeTool$WonderEditor = require("../../asset/tool/MainEditorAssetCubemapNodeTool.js");

Wonder_jest.describe("redo_undo: header->setting->scene", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _beforeEach = function (param) {
          return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
        };
        var _afterEach = function (param) {
          return /* () */0;
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test skybox", (function (param) {
                      var _simulateSetSkyboxCubemapTexture = function (param) {
                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                        return Curry._1(HeaderSettingTool$WonderEditor.Scene[/* Skybox */1][/* setCubemapTextureToSceneSkybox */0], MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData), undefined, /* () */0));
                      };
                      var _simulateRemoveSkyboxCubemapTexture = function (param) {
                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* buildOneCubemapAssetTree */0], /* () */0);
                        Curry._1(HeaderSettingTool$WonderEditor.Scene[/* Skybox */1][/* setCubemapTextureToSceneSkybox */0], MainEditorAssetCubemapNodeTool$WonderEditor.getCubemapTextureComponent(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Cubemap */6][/* getFirstCubemapNodeId */2], assetTreeData), undefined, /* () */0));
                        return Curry._1(HeaderSettingTool$WonderEditor.Scene[/* Skybox */1][/* removeCubemap */1], /* () */0);
                      };
                      RedoUndoTool$WonderEditor.testRedoUndoOneStep(sandbox, "test set skybox->cubemap texture", /* tuple */[
                            _simulateSetSkyboxCubemapTexture,
                            _beforeEach,
                            _afterEach
                          ], (function (eta) {
                              return HeaderSettingTool$WonderEditor.UI[/* buildSettingSceneModal */1](undefined, undefined, undefined, undefined, undefined, eta);
                            }));
                      return RedoUndoTool$WonderEditor.testRedoUndoOneStep(sandbox, "test remove skybox->cubemap texture", /* tuple */[
                                  _simulateRemoveSkyboxCubemapTexture,
                                  _beforeEach,
                                  _afterEach
                                ], (function (eta) {
                                    return HeaderSettingTool$WonderEditor.UI[/* buildSettingSceneModal */1](undefined, undefined, undefined, undefined, undefined, eta);
                                  }));
                    }));
      }));

/*  Not a pure module */
