

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as ArrayService$WonderEditor from "../../../../../../../src/service/atom/ArrayService.js";
import * as ReactTestTool$WonderEditor from "../../../../../../tool/ReactTestTool.js";
import * as SceneTreeTool$WonderEditor from "../../../../../../tool/SceneTreeTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as OldNewSelfTool$WonderEditor from "../../../../../tool/OldNewSelfTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../tool/EventListenerTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorSceneTree$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/ui/MainEditorSceneTree.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../../../tool/MainEditorSceneTreeTool.js";

describe("MainEditorSceneTree", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("get sceneTree from engine", (function () {
                describe("test should update", (function () {
                        Wonder_jest.test("if reatinedProps updateTypeArr include All, should update", (function () {
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTree$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[/* All */1]]))), true);
                              }));
                        Wonder_jest.test("else if reatinedProps updateTypeArr include SceneTree, should update", (function () {
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTree$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[/* SceneTree */6]]))), true);
                              }));
                        return Wonder_jest.test("else, should not update", (function () {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTree$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[
                                                                /* Project */4,
                                                                /* Inspector */2
                                                              ]]))), false);
                                    }));
                      }));
                describe("test simple scene graph data which haven't children case", (function () {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                              }));
                        afterEach((function () {
                                return GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                              }));
                        Wonder_jest.test("no drag", (function () {
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                              }));
                        return Wonder_jest.test("drag treeNode into target treeNode", (function () {
                                      MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectIntoGameObject */2](MainEditorSceneTool$WonderEditor.getFirstBox(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), MainEditorSceneTool$WonderEditor.getSecondBox(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                    }));
                      }));
                describe("set current gameObject", (function () {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                                              return /* () */0;
                                            }));
                              }));
                        return Wonder_jest.test("click treeNode to set it to be currentSceneTreeNode", (function () {
                                      MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, MainEditorSceneTool$WonderEditor.getFirstBox(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0)), MainEditorSceneTool$WonderEditor.getFirstBox(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                    }));
                      }));
                describe("deal with the specific case", (function () {
                        Wonder_jest.test("if drag treeNode into itself, keep not change", (function () {
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTreeTool$WonderEditor.Drag[/* isTriggerDragCurrentSceneTreeNode */0](GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0))), false);
                              }));
                        Wonder_jest.test("if drag treeNode into it's first layer chidlren, keep not change", (function () {
                                var match = SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                                var match$1 = match[1];
                                GameObjectTool$WonderEditor.setCurrentSceneTreeNode(match$1[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTreeTool$WonderEditor.Drag[/* isTriggerDragCurrentSceneTreeNode */0](match$1[1])), false);
                              }));
                        describe("if drag treeNode into it's second layer chidlren", (function () {
                                return Wonder_jest.test("if drag treeNode into it's second layer chidlren, keep not change", (function () {
                                              var match = SceneTreeTool$WonderEditor.buildFourLayerSceneGraphToEngine(sandbox);
                                              var match$1 = match[1];
                                              GameObjectTool$WonderEditor.setCurrentSceneTreeNode(match$1[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTreeTool$WonderEditor.Drag[/* isTriggerDragCurrentSceneTreeNode */0](match$1[2])), false);
                                            }));
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
