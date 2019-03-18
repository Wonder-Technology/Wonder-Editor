

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as LightMaterialToolEngine$WonderEditor from "../../../../tool/engine/LightMaterialToolEngine.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../tool/MainEditorAssetTreeTool.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../src/service/state/engine/LightMaterialEngineService.js";
import * as MainEditorLightMaterialTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialTool.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../tool/MainEditorAssetHeaderOperateNodeTool.js";
import * as SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js";

describe("MainEditorAssetHeader->remove node", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                StateEditorService$WonderEditor.setState(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0))));
                return /* () */0;
              }));
        describe("test remove tree node", (function () {
                Wonder_jest.test("if not select specific treeNode, remove-button's disabled props should == true ", (function (param) {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                      }));
                describe("else", (function () {
                        Wonder_jest.test("remove-button's disabled props should == false", (function (param) {
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                                var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), undefined, /* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                              }));
                        describe("test select folder", (function () {
                                beforeEach((function () {
                                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                                      }));
                                return Wonder_jest.test("click remove-button should remove folder from assetTreeRoot", (function (param) {
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                              BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeFolderNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                            }));
                              }));
                        describe("test select file", (function () {
                                beforeEach((function () {
                                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                                      }));
                                describe("test texture", (function () {
                                        describe("select texture;\n            click remove-button;\n            ", (function () {
                                                return Wonder_jest.test("should remove it from assetTreeRoot", (function (param) {
                                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                            }));
                                              }));
                                        describe("select texture;\n            drag texture to set gameObject material map;\n            select texture;\n            click remove-button;\n            ", (function () {
                                                describe("should remove it from engineState", (function () {
                                                        beforeEach((function () {
                                                                var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                                                                StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                                        return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                                                      }));
                                                                return MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                              }));
                                                        describe("should remove it from scene->materials", (function () {
                                                                describe("test remove lightMaterial->diffuseMap", (function () {
                                                                        var _drag = function (assetTreeData) {
                                                                          return MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                                        };
                                                                        var _remove = function (assetTreeData) {
                                                                          return MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                                        };
                                                                        Wonder_jest.test("test one gameObject use one material", (function (param) {
                                                                                var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                                                _drag(assetTreeData);
                                                                                _remove(assetTreeData);
                                                                                MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                                                var lightMaterial = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeLightMaterial(/* () */0);
                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(lightMaterial, engineState)), undefined);
                                                                              }));
                                                                        describe("test two gameObjects use one material", (function () {
                                                                                return Wonder_jest.test("test gameObjects are in scene", (function (param) {
                                                                                              var currentGameObject = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                              var oldMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(currentGameObject, engineState);
                                                                                              var secondCubeGameObject = MainEditorSceneTool$WonderEditor.getCubeByIndex(1, engineState);
                                                                                              var engineState$1 = LightMaterialToolEngine$WonderEditor.replaceGameObjectLightMaterial(secondCubeGameObject, oldMaterial, engineState);
                                                                                              StateEngineService$WonderEditor.setState(engineState$1);
                                                                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */2][/* buildOneTextureAssetTree */0], /* () */0);
                                                                                              _drag(assetTreeData);
                                                                                              MainEditorSceneTool$WonderEditor.setSecondCubeToBeCurrentSceneTreeNode(/* () */0);
                                                                                              _drag(assetTreeData);
                                                                                              _remove(assetTreeData);
                                                                                              var engineState$2 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                              var newMaterial1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(currentGameObject, engineState$2);
                                                                                              var newMaterial2 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(secondCubeGameObject, engineState$2);
                                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                              LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(newMaterial1, engineState$2),
                                                                                                              LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(newMaterial2, engineState$2)
                                                                                                            ]), /* tuple */[
                                                                                                          undefined,
                                                                                                          undefined
                                                                                                        ]);
                                                                                            }));
                                                                              }));
                                                                        return /* () */0;
                                                                      }));
                                                                return /* () */0;
                                                              }));
                                                        return /* () */0;
                                                      }));
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
