

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ControllerTool$WonderEditor from "../../../../controller/tool/ControllerTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../tool/EventListenerTool.js";
import * as StateEngineService$WonderEditor from "../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../../../../integration/asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as TextureInspectorTool$WonderEditor from "../../../../../../integration/inspector/composable_component/assetTree_inspector/atom_component/texture_inspector/tool/textureInspectorTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../../../../../../integration/inspector/composable_component/assetTree_inspector/tool/AssetTreeInspectorTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../../../../../integration/asset/tool/MainEditorAssetNodeTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../../../../../integration/asset/tool/MainEditorAssetTreeTool.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../src/service/state/engine/BasicSourceTextureEngineService.js";
import * as MainEditorAssetChildrenNodeTool$WonderEditor from "../../../../../../integration/asset/tool/MainEditorAssetChildrenNodeTool.js";

describe("controller inspector texture", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                        MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                        return MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode(/* () */0);
                      }));
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                return ControllerTool$WonderEditor.run(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set value into engineState", (function () {
                Wonder_jest.test("test rename texture", (function () {
                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                        var newName = "controllerTextureName";
                        var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData);
                        MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(nodeId, undefined, undefined, /* () */0);
                        AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetTextureNode */1](undefined, undefined, nodeId, newName, /* () */0);
                        var textureComponent = MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromCurrentNodeId(/* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.unsafeGetBasicSourceTextureName(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), newName);
                      }));
                return Wonder_jest.test("test change wrapS", (function () {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                              var wrapRepeatType = TextureInspectorTool$WonderEditor.getWrapRepeatType(/* () */0);
                              var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData);
                              MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(nodeId, undefined, undefined, /* () */0);
                              TextureInspectorTool$WonderEditor.changeWrapS(MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromNodeId(nodeId), wrapRepeatType);
                              var textureComponent = MainEditorAssetNodeTool$WonderEditor.getTextureComponentFromCurrentNodeId(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureEngineService$WonderEditor.getWrapS(textureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), wrapRepeatType);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
