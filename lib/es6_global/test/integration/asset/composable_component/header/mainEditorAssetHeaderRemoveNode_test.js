

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ArrayService$WonderEditor from "../../../../../src/service/atom/ArrayService.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as LightMaterialToolEngine$WonderEditor from "../../../../tool/engine/LightMaterialToolEngine.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../tool/MainEditorAssetTreeTool.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../src/service/state/engine/LightMaterialEngineService.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/TreeRootAssetEditorService.js";
import * as MainEditorLightMaterialTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/CurrentNodeDataAssetEditorService.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../tool/MainEditorAssetHeaderOperateNodeTool.js";
import * as CurrentNodeParentIdAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/CurrentNodeParentIdAssetEditorService.js";
import * as RemovedAssetIdArrayAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/RemovedAssetIdArrayAssetEditorService.js";

describe("MainEditorAssetHeader->remove node", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function (param) {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                StateEditorService$WonderEditor.setState(CurrentNodeParentIdAssetEditorService$WonderEditor.clearCurrentNodeParentId(CurrentNodeDataAssetEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
                return /* () */0;
              }));
        describe("test remove tree node", (function (param) {
                Wonder_jest.test("if not select specific treeNode, remove-button's disabled props should == true ", (function (param) {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                        MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */0](/* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                      }));
                describe("else", (function (param) {
                        Wonder_jest.test("remove-button's disabled props should == false", (function (param) {
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                                var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), undefined, /* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                              }));
                        describe("test select folder", (function (param) {
                                beforeEach((function (param) {
                                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                                      }));
                                return Wonder_jest.test("click remove-button should remove folder from assetTreeRoot", (function (param) {
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                              BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeFolderNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                            }));
                              }));
                        describe("test select file", (function (param) {
                                beforeEach((function (param) {
                                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                                      }));
                                describe("test texture", (function (param) {
                                        describe("select texture;\n            click remove-button;\n            ", (function (param) {
                                                return Wonder_jest.test("should remove it from assetTreeRoot", (function (param) {
                                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                                                            }));
                                              }));
                                        describe("select texture;\n            drag texture to set gameObject material map;\n            select texture;\n            click remove-button;\n            ", (function (param) {
                                                describe("should remove it from engineState", (function (param) {
                                                        beforeEach((function (param) {
                                                                StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                                        return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                                                                      }));
                                                                return MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode(/* () */0);
                                                              }));
                                                        describe("should remove it from scene->materials", (function (param) {
                                                                describe("test remove lightMaterial->diffuseMap", (function (param) {
                                                                        var _drag = function (assetTreeData) {
                                                                          return MainEditorLightMaterialTool$WonderEditor.Drag[/* dragAssetTextureToMap */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                                        };
                                                                        var _remove = function (assetTreeData) {
                                                                          return MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeTextureNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData), /* () */0);
                                                                        };
                                                                        Wonder_jest.test("test one gameObject use one material", (function (param) {
                                                                                var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                                                                _drag(assetTreeData);
                                                                                _remove(assetTreeData);
                                                                                MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode(/* () */0);
                                                                                var lightMaterial = GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial(/* () */0);
                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseMap(lightMaterial, engineState)), undefined);
                                                                              }));
                                                                        describe("test two gameObjects use one material", (function (param) {
                                                                                return Wonder_jest.test("test gameObjects are in scene", (function (param) {
                                                                                              var currentGameObject = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                              var oldMaterial = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(currentGameObject, engineState);
                                                                                              var secondBoxGameObject = MainEditorSceneTool$WonderEditor.getBoxByIndex(1, engineState);
                                                                                              var engineState$1 = LightMaterialToolEngine$WonderEditor.replaceGameObjectLightMaterial(secondBoxGameObject, oldMaterial, engineState);
                                                                                              StateEngineService$WonderEditor.setState(engineState$1);
                                                                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                                                                              _drag(assetTreeData);
                                                                                              MainEditorSceneTool$WonderEditor.setSecondBoxToBeCurrentSceneTreeNode(/* () */0);
                                                                                              _drag(assetTreeData);
                                                                                              _remove(assetTreeData);
                                                                                              var engineState$2 = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                              var newMaterial1 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(currentGameObject, engineState$2);
                                                                                              var newMaterial2 = GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(secondBoxGameObject, engineState$2);
                                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                                describe("test removed asset node, the id should be added into removedAssetIdArray", (function (param) {
                                        describe("test remove first folder", (function (param) {
                                                beforeEach((function (param) {
                                                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
                                                      }));
                                                Wonder_jest.test("test the folderId should add into removedAssetIdArray", (function (param) {
                                                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                                        var removedFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeFolderNode(undefined, undefined, removedFolderNodeId, /* () */0);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](RemovedAssetIdArrayAssetEditorService$WonderEditor.getRemovedAssetIdArray(StateEditorService$WonderEditor.getState(/* () */0))), /* array */[removedFolderNodeId]);
                                                      }));
                                                Wonder_jest.test("test add a new folder, use the removed id", (function (param) {
                                                        var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                                        var removedFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeFolderNode(undefined, undefined, removedFolderNodeId, /* () */0);
                                                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$WonderEditor.unsafeGetLast(TreeRootAssetEditorService$WonderEditor.unsafeGetAssetTreeRoot(StateEditorService$WonderEditor.getState(/* () */0))[/* children */1])[/* nodeId */0]), removedFolderNodeId);
                                                      }));
                                                return Wonder_jest.test("test add two new folders, use the removed id and generate one new id", (function (param) {
                                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                                              var removedFolderNodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */3][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData);
                                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeFolderNode(undefined, undefined, removedFolderNodeId, /* () */0);
                                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addFolder(undefined, undefined, /* () */0);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TreeRootAssetEditorService$WonderEditor.unsafeGetAssetTreeRoot(StateEditorService$WonderEditor.getState(/* () */0))[/* children */1].slice(-2).map((function (assetNode) {
                                                                                    return assetNode[/* nodeId */0];
                                                                                  }))), /* array */[
                                                                          removedFolderNodeId,
                                                                          removedFolderNodeId + 1 | 0
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

export {
  
}
/*  Not a pure module */
