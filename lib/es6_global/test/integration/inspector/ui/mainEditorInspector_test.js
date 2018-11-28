

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as InspectorTool$WonderEditor from "../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";
import * as OldNewSelfTool$WonderEditor from "../../../unit/tool/OldNewSelfTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as MainEditorAssetTool$WonderEditor from "../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorInspector$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/inspector/ui/MainEditorInspector.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorAssetChildrenNodeTool$WonderEditor from "../../asset/tool/MainEditorAssetChildrenNodeTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";

describe("MainEditorInspector", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test should update", (function () {
                Wonder_jest.test("if reatinedProps updateTypeArr include All, should update", (function () {
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorInspector$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[/* All */1]]))), true);
                      }));
                Wonder_jest.test("else if reatinedProps updateTypeArr include Inspector, should update", (function () {
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorInspector$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[/* Inspector */2]]))), true);
                      }));
                return Wonder_jest.test("else, should not update", (function () {
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorInspector$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[/* SceneTree */6]]))), false);
                            }));
              }));
        describe("change source to show it's inspector", (function () {
                Wonder_jest.test("if not set currentSelectSource, show nothing", (function () {
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                      }));
                describe("else set currentSelectSource is SceneTree", (function () {
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode(/* () */0);
                                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                                            }));
                              }));
                        return Wonder_jest.test("show currentSceneTreeNode component", (function () {
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                    }));
                      }));
                describe("else set currentSelectSource is Asset", (function () {
                        beforeEach((function () {
                                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* Asset */1, param);
                                            }));
                              }));
                        return Wonder_jest.test("show currentNodeId's asset node component", (function () {
                                      var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* buildOneTextureAssetTree */0], /* () */0);
                                      MainEditorAssetChildrenNodeTool$WonderEditor.selectTextureNode(Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Texture */1][/* getFirstTextureNodeId */2], assetTreeData), undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
