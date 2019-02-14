

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
import * as MaterialNodeAssetService$WonderEditor from "../../../../../src/service/record/editor/asset/MaterialNodeAssetService.js";
import * as OperateMaterialLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/material/OperateMaterialLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as MainEditorAssetMaterialNodeTool$WonderEditor from "../../tool/MainEditorAssetMaterialNodeTool.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../tool/MainEditorAssetHeaderOperateNodeTool.js";

describe("MainEditorAssetHeader->add material", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareAndExecAndGetMaterialNode = function () {
          var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
          var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
          return /* tuple */[
                  assetTreeData,
                  OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedMaterialNodeId, StateEditorService$WonderEditor.getState(/* () */0))
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                              return /* () */0;
                            }));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("if not select specific treeNode", (function () {
                describe("should add material into root treeNode", (function () {
                        Wonder_jest.test("test snapshot", (function () {
                                Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
                                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                              }));
                        return Wonder_jest.test("the added material parent node should be root", (function () {
                                      var match = _prepareAndExecAndGetMaterialNode(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(MainEditorAssetTreeTool$WonderEditor.findNodeParentId(match[1], StateEditorService$WonderEditor.getState(/* () */0)))), Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* getRootNodeId */1], match[0]));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("else", (function () {
                describe("add material into specific treeNode", (function () {
                        return Wonder_jest.test("test snapshot", (function () {
                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* buildFolderAndTextureAndMaterialAssetTree */0], /* () */0);
                                      MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* All */6][/* ThreeLayer */0][/* getSecondLayerFirstFolderNodeId */2], assetTreeData), undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                                    }));
                      }));
                return /* () */0;
              }));
        Wonder_jest.test("create new material", (function () {
                Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
                var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                var newLightMaterial = LightMaterialToolEngine$WonderEditor.getNewLightMaterial(undefined, /* () */0);
                MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](materialComponent), newLightMaterial);
              }));
        Wonder_jest.test("material type should be LightMaterial", (function () {
                var match = _prepareAndExecAndGetMaterialNode(/* () */0);
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MaterialNodeAssetService$WonderEditor.getNodeData(match[1])[/* type_ */0]), /* LightMaterial */1);
              }));
        describe("test name", (function () {
                Wonder_jest.test("test default name", (function () {
                        Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
                        MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0));
                      }));
                return Wonder_jest.test("remove first material which use default name;\n          add three material;\n\n          the first new one's name should be removed-material's name;\n                  ", (function () {
                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
                              var nodeId = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* getFirstMaterialNodeId */2], assetTreeData);
                              AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */2](undefined, undefined, nodeId, OperateMaterialLogicService$WonderEditor.getDefaultName(/* () */0), /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeMaterialNode(undefined, undefined, nodeId, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                              MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                              MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* getRootNodeId */1], assetTreeData), undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, /* () */0));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
