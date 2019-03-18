

import * as Block from "../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as ArrayService$WonderEditor from "../../../../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../tool/ReactTestTool.js";
import * as SceneTreeNode$WonderEditor from "../../../../../../../src/core/atom_component/dragTree/component/treeNode/SceneTreeNode.js";
import * as SceneTreeTool$WonderEditor from "../../../../../../tool/SceneTreeTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as OldNewSelfTool$WonderEditor from "../../../../../tool/OldNewSelfTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../tool/EventListenerTool.js";
import * as HashMapService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorSceneTree$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/ui/MainEditorSceneTree.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../../../tool/MainEditorSceneTreeTool.js";
import * as WDBNodeAssetEditorService$WonderEditor from "../../../../../../../src/service/state/editor/asset/WDBNodeAssetEditorService.js";
import * as CheckSceneTreeLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/sceneTree/CheckSceneTreeLogicService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../../../../../src/service/state/editor/CurrentDragSourceEditorService.js";

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
        describe("test drag", (function () {
                beforeEach((function () {
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                      }));
                afterEach((function () {
                        return GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                      }));
                describe("handleDragEnter", (function () {
                        return Wonder_jest.test("if is scene tree widget and pass check relation, return DragEnter", (function () {
                                      var partial_arg_000 = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                                      var partial_arg_001 = MainEditorSceneTool$WonderEditor.getSecondCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                      var partial_arg = /* tuple */[
                                        partial_arg_000,
                                        partial_arg_001
                                      ];
                                      StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                              return CurrentDragSourceEditorService$WonderEditor.setCurrentDragSource(partial_arg, param);
                                            }));
                                      var result = SceneTreeNode$WonderEditor.Method[/* handleDragEnter */3](MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), /* tuple */[
                                            SceneTreeWidgetService$WonderEditor.isWidget,
                                            CheckSceneTreeLogicService$WonderEditor.checkGameObjectRelation,
                                            WDBNodeAssetEditorService$WonderEditor.isWDBAssetFile
                                          ], BaseEventTool$WonderEditor.buildDragEvent());
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](result), /* DragEnter */Block.__(1, [/* DragIntoTarget */2]));
                                    }));
                      }));
                describe("handleDragDrop", (function () {
                        describe("test drag gameObject", (function () {
                                return Wonder_jest.test("if is scene tree widget and pass check relation, return DragGameObject(targetGameObject, sourceGameObject)", (function () {
                                              var sourceGameObject = MainEditorSceneTool$WonderEditor.getSecondCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                              var targetGameObject = MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                              var partial_arg_000 = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                                              var partial_arg = /* tuple */[
                                                partial_arg_000,
                                                sourceGameObject
                                              ];
                                              StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                      return CurrentDragSourceEditorService$WonderEditor.setCurrentDragSource(partial_arg, param);
                                                    }));
                                              var result = SceneTreeNode$WonderEditor.Method[/* handleDrop */7](targetGameObject, /* tuple */[
                                                    SceneTreeWidgetService$WonderEditor.isWidget,
                                                    CheckSceneTreeLogicService$WonderEditor.checkGameObjectRelation,
                                                    WDBNodeAssetEditorService$WonderEditor.isWDBAssetFile
                                                  ], /* DragIntoTarget */2, BaseEventTool$WonderEditor.buildDragEventWithDataMap(HashMapService$WonderCommonlib.set("draggedId", sourceGameObject, HashMapService$WonderCommonlib.createEmpty(/* () */0))));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](result), /* DragGameObject */Block.__(3, [
                                                            targetGameObject,
                                                            sourceGameObject,
                                                            /* DragIntoTarget */2
                                                          ]));
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
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
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              }));
                        afterEach((function () {
                                return GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                              }));
                        Wonder_jest.test("no drag", (function () {
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                              }));
                        return Wonder_jest.test("drag treeNode into target treeNode", (function () {
                                      MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectIntoGameObject */2](MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), MainEditorSceneTool$WonderEditor.getSecondCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                      }));
                describe("set current gameObject", (function () {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                                              return /* () */0;
                                            }));
                              }));
                        return Wonder_jest.test("click treeNode to set it to be currentSceneTreeNode", (function () {
                                      MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0)), MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                    }));
                      }));
                describe("deal with the specific case", (function () {
                        Wonder_jest.test("if drag treeNode into itself, keep not change", (function () {
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
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
