'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ControllerTool$WonderEditor = require("../../tool/ControllerTool.js");
var EventListenerTool$WonderEditor = require("../../../../tool/EventListenerTool.js");
var AssetInspectorTool$WonderEditor = require("../../../../../integration/inspector/composable_component/asset_inspector/tool/AssetInspectorTool.js");
var StateEngineService$WonderEditor = require("../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../../../../integration/asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../tool/MainEditorSceneTool.js");
var TextureInspectorTool$WonderEditor = require("../../../../../integration/inspector/composable_component/asset_inspector/atom_component/texture_inspector/tool/textureInspectorTool.js");
var MainEditorAssetNodeTool$WonderEditor = require("../../../../../integration/asset/tool/MainEditorAssetNodeTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../../../integration/asset/tool/MainEditorAssetTreeTool.js");
var BasicSourceTextureEngineService$WonderEditor = require("../../../../../../src/service/state/engine/texture/BasicSourceTextureEngineService.js");
var MainEditorAssetChildrenNodeTool$WonderEditor = require("../../../../../integration/asset/tool/MainEditorAssetChildrenNodeTool.js");

Wonder_jest.describe("controller inspector texture", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                        MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                        return MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                      }));
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                return ControllerTool$WonderEditor.run(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test set value into engineState", (function (param) {
                      Wonder_jest.test("test rename texture", (function (param) {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                              var newName = "controllerTextureName";
                              var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                              MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(nodeId, undefined, undefined, /* () */0);
                              AssetInspectorTool$WonderEditor.Rename[/* renameAssetTextureNode */4](undefined, undefined, nodeId, newName, /* () */0);
                              var textureComponent = MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromCurrentNodeId(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), newName);
                            }));
                      return Wonder_jest.test("test change wrapS", (function (param) {
                                    var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                    var wrapRepeatType = TextureInspectorTool$WonderEditor.getWrapRepeatType(/* () */0);
                                    var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData);
                                    MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(nodeId, undefined, undefined, /* () */0);
                                    TextureInspectorTool$WonderEditor.changeWrapS(MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromNodeId(nodeId), wrapRepeatType, undefined, undefined, /* () */0);
                                    var textureComponent = MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromCurrentNodeId(/* () */0);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getWrapS(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), wrapRepeatType);
                                  }));
                    }));
      }));

/*  Not a pure module */
