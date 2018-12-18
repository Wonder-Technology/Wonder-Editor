

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as ConsoleTool$WonderEditor from "../../../../../../unit/tool/external/ConsoleTool.js";
import * as InspectorTool$WonderEditor from "../../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../tool/ReactTestTool.js";
import * as AssetNodeUtils$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/utils/AssetNodeUtils.js";
import * as MaterialAssetTool$WonderEditor from "../../../../../asset/tool/MaterialAssetTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../../tool/AssetTreeInspectorTool.js";
import * as MainEditorMaterialTool$WonderEditor from "../../../sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js";
import * as MainEditorAssetChildrenNodeTool$WonderEditor from "../../../../../asset/tool/MainEditorAssetChildrenNodeTool.js";

describe("material inspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test rename material", (function (param) {
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
                describe("fix bug", (function (param) {
                        return Wonder_jest.test("if rename the same name, shouldn't warn", (function (param) {
                                      ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                                      var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                      var addedMaterialNodeId = MaterialAssetTool$WonderEditor.addOneLightMaterial(/* () */0);
                                      var newName = StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                              return AssetNodeUtils$WonderEditor.getAssetNodeTotalName(/* Material */3, addedMaterialNodeId, param);
                                            }));
                                      AssetTreeInspectorTool$WonderEditor.Rename[/* renameAssetMaterialNode */2](undefined, undefined, addedMaterialNodeId, newName, /* () */0);
                                      return Sinon.toCalled(Wonder_jest.Expect[/* noT_ */22](Wonder_jest.Expect[/* expect */0](warn)));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
