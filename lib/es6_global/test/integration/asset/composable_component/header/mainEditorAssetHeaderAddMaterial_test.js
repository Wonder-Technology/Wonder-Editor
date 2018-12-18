

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as OptionService$WonderEditor from "../../../../../src/service/primitive/OptionService.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetIdTool$WonderEditor from "../../tool/MainEditorAssetIdTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../../../inspector/composable_component/assetTree_inspector/tool/AssetTreeInspectorTool.js";
import * as LightMaterialToolEngine$WonderEditor from "../../../../tool/engine/LightMaterialToolEngine.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../tool/MainEditorAssetTreeTool.js";
import * as MainEditorMaterialUtils$WonderEditor from "../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/utils/MainEditorMaterialUtils.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/MaterialNodeMapAssetEditorService.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../tool/MainEditorAssetHeaderOperateNodeTool.js";

describe("MainEditorAssetHeader->add material", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareAndExecAndGetMaterialNode = function (param) {
          var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */2][/* buildOneMaterialAssetTree */0], /* () */0);
          var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
          return /* tuple */[
                  assetTreeData,
                  MaterialNodeMapAssetEditorService$WonderEditor.unsafeGetResult(addedMaterialNodeId, StateEditorService$WonderEditor.getState(/* () */0))
                ];
        };
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                              return /* () */0;
                            }));
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("if not select specific treeNode", (function (param) {
                describe("should add material into root treeNode", (function (param) {
                        Wonder_jest.test("test snapshot", (function (param) {
                                Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */2][/* buildOneMaterialAssetTree */0], /* () */0);
                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                              }));
                        return Wonder_jest.test("the added material parent node should be root", (function (param) {
                                      var match = _prepareAndExecAndGetMaterialNode(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(match[1][/* parentFolderNodeId */0])), Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */2][/* getRootNodeId */1], match[0]));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("else", (function (param) {
                describe("add material into specific treeNode", (function (param) {
                        return Wonder_jest.test("test snapshot", (function (param) {
                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */4][/* ThreeLayer */0][/* buildFolderAndTextureAndMaterialAssetTree */0], /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */4][/* ThreeLayer */0][/* getSecondLayerFirstFolderNodeId */2], assetTreeData), undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                                    }));
                      }));
                return /* () */0;
              }));
        Wonder_jest.test("create new material", (function (param) {
                Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */2][/* buildOneMaterialAssetTree */0], /* () */0);
                var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                var newLightMaterial = LightMaterialToolEngine$WonderEditor.getNewLightMaterial(undefined, /* () */0);
                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                var match = MaterialNodeMapAssetEditorService$WonderEditor.unsafeGetResult(addedMaterialNodeId, StateEditorService$WonderEditor.getState(/* () */0));
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[/* materialComponent */2]), newLightMaterial);
              }));
        Wonder_jest.test("material type should be LightMaterial", (function (param) {
                var match = _prepareAndExecAndGetMaterialNode(/* () */0);
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[1][/* type_ */1]), /* LightMaterial */1);
              }));
        describe("test name", (function (param) {
                Wonder_jest.test("test default name", (function (param) {
                        Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */2][/* buildOneMaterialAssetTree */0], /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                      }));
                return Wonder_jest.test("remove first material which use default name;\n          add three material;\n\n          the first new one's name should be removed-material's name;\n                  ", (function (param) {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */2][/* buildOneMaterialAssetTree */0], /* () */0);
                              var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */2][/* getFirstMaterialNodeId */2], assetTreeData);
                              AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */2](undefined, undefined, nodeId, MainEditorMaterialUtils$WonderEditor.getNoNameMaterialName(/* () */0), /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, nodeId, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                              MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */2][/* getRootNodeId */1], assetTreeData), undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
