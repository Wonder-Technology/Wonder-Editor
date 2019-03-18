

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as ConsoleTool$WonderEditor from "../../../../../../unit/tool/external/ConsoleTool.js";
import * as InspectorTool$WonderEditor from "../../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../tool/ReactTestTool.js";
import * as MaterialAssetTool$WonderEditor from "../../../../../asset/tool/MaterialAssetTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetIdTool$WonderEditor from "../../../../../asset/tool/MainEditorAssetIdTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../../tool/AssetTreeInspectorTool.js";
import * as MainEditorMaterialTool$WonderEditor from "../../../sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../../../../../src/service/record/editor/asset/MaterialNodeAssetService.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as MainEditorAssetChildrenNodeTool$WonderEditor from "../../../../../asset/tool/MainEditorAssetChildrenNodeTool.js";
import * as MainEditorAssetMaterialNodeTool$WonderEditor from "../../../../../asset/tool/MainEditorAssetMaterialNodeTool.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js";

describe("material inspector", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test rename material", (function () {
                Wonder_jest.test("if type is basicMaterial, rename to default basic material name should not work", (function (param) {
                        ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                        var addedMaterialNodeId = MaterialAssetTool$WonderEditor.addOneBasicMaterial(/* () */0);
                        var newName = MainEditorMaterialTool$WonderEditor.getDefaultBasicMaterialName(/* () */0);
                        AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */2](undefined, undefined, addedMaterialNodeId, newName, /* () */0);
                        MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(addedMaterialNodeId, undefined, undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                      }));
                Wonder_jest.test("if type is lightMaterial, rename to default light material name should not work", (function (param) {
                        ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                        var addedMaterialNodeId = MaterialAssetTool$WonderEditor.addOneLightMaterial(/* () */0);
                        var newName = MainEditorMaterialTool$WonderEditor.getDefaultLightMaterialName(/* () */0);
                        AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */2](undefined, undefined, addedMaterialNodeId, newName, /* () */0);
                        MainEditorAssetChildrenNodeTool$WonderEditor.selectMaterialNode(addedMaterialNodeId, undefined, undefined, /* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                      }));
                describe("fix bug", (function () {
                        Wonder_jest.test("if rename to the same name, should warn", (function (param) {
                                ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                var addedMaterialNodeId = MaterialAssetTool$WonderEditor.addOneLightMaterial(/* () */0);
                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                var match = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(addedMaterialNodeId, editorState));
                                var newName = NodeNameAssetLogicService$WonderEditor.getMaterialNodeName(match[/* materialComponent */1], match[/* type_ */0], engineState);
                                AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */2](undefined, undefined, addedMaterialNodeId, newName, /* () */0);
                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](warn));
                              }));
                        return Wonder_jest.test("if rename to the existed name in the same dir, should fail", (function (param) {
                                      var addedMaterialNodeId1 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                      var addedMaterialNodeId2 = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
                                      MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
                                      var newName = "materialName";
                                      AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */2](undefined, undefined, addedMaterialNodeId1, newName, /* () */0);
                                      var material2OldName = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialName(addedMaterialNodeId2, undefined, undefined, /* () */0);
                                      AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */2](undefined, undefined, addedMaterialNodeId2, newName, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialName(addedMaterialNodeId1, undefined, undefined, /* () */0),
                                                      MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialName(addedMaterialNodeId2, undefined, undefined, /* () */0)
                                                    ]), /* tuple */[
                                                  newName,
                                                  material2OldName
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
