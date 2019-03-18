

import * as Block from "../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as AppStore$WonderEditor from "../../../../../../../src/core/ui/store/AppStore.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as ReactTool$WonderEditor from "../../../../../../tool/ui/ReactTool.js";
import * as ArrayService$WonderEditor from "../../../../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../tool/ReactTestTool.js";
import * as SceneTreeNode$WonderEditor from "../../../../../../../src/core/atom_component/dragTree/component/treeNode/SceneTreeNode.js";
import * as SceneTreeTool$WonderEditor from "../../../../../../tool/SceneTreeTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as OldNewSelfTool$WonderEditor from "../../../../../tool/OldNewSelfTool.js";
import * as EventListenerTool$WonderEditor from "../../../../../tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../src/service/state/engine/SceneEngineService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorSceneTree$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/ui/MainEditorSceneTree.js";
import * as RefreshEngineStateTool$WonderEditor from "../../../../../../tool/RefreshEngineStateTool.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../../../tool/MainEditorSceneTreeTool.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as WDBNodeAssetEditorService$WonderEditor from "../../../../../../../src/service/state/editor/asset/WDBNodeAssetEditorService.js";
import * as CheckSceneTreeLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/sceneTree/CheckSceneTreeLogicService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../../../../../src/service/state/editor/CurrentDragSourceEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as MainEditorInspectorAddComponentTool$WonderEditor from "../../../../../../integration/inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js";
import * as MainEditorInspectorRemoveComponentTool$WonderEditor from "../../../../../../integration/inspector/atom_component/addableComponent/tool/MainEditorInspectorRemoveComponentTool.js";

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
        describe("test should update", (function () {
                Wonder_jest.test("if reatinedProps updateTypeArr include All, should update", (function (param) {
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTree$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[/* All */1]]))), true);
                      }));
                Wonder_jest.test("else if reatinedProps updateTypeArr include SceneTree, should update", (function (param) {
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTree$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[/* SceneTree */6]]))), true);
                      }));
                return Wonder_jest.test("else, should not update", (function (param) {
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTree$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[
                                                        /* Project */4,
                                                        /* Inspector */2
                                                      ]]))), false);
                            }));
              }));
        describe("test sceneTree node icon", (function () {
                describe("test refresh inspector and sceneTree", (function () {
                        describe("if add cameraGroup or light component, should refresh both", (function () {
                                beforeEach((function () {
                                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                        var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                                    }));
                                      }));
                                Wonder_jest.test("test add cameraGroup component", (function (param) {
                                        var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                        MainEditorInspectorAddComponentTool$WonderEditor.addCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                                        return Sinon.toCalledWith(/* array */[[
                                                      AppStore$WonderEditor.UpdateAction,
                                                      /* Update */[/* array */[
                                                          /* Inspector */2,
                                                          /* SceneTree */6
                                                        ]]
                                                    ]], Wonder_jest.Expect[/* expect */0](dispatchFuncStub));
                                      }));
                                return Wonder_jest.test("test add light component", (function (param) {
                                              var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                              MainEditorInspectorAddComponentTool$WonderEditor.addDirectionLightComponent(undefined, undefined, undefined, /* () */0);
                                              return Sinon.toCalledWith(/* array */[[
                                                            AppStore$WonderEditor.UpdateAction,
                                                            /* Update */[/* array */[
                                                                /* Inspector */2,
                                                                /* SceneTree */6
                                                              ]]
                                                          ]], Wonder_jest.Expect[/* expect */0](dispatchFuncStub));
                                            }));
                              }));
                        describe("else, should only refresh inspector", (function () {
                                beforeEach((function () {
                                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                        var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                                    }));
                                      }));
                                return Wonder_jest.test("test add arcball camera controller", (function (param) {
                                              var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                              MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                              return Sinon.toCalledWith(/* array */[[
                                                            AppStore$WonderEditor.UpdateAction,
                                                            /* Update */[/* array */[/* Inspector */2]]
                                                          ]], Wonder_jest.Expect[/* expect */0](dispatchFuncStub));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test set first cube to be current gameObject", (function () {
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                            }));
                              }));
                        Wonder_jest.test("test add light component, the sceneTree node icon should be lightIcon", (function (param) {
                                MainEditorInspectorAddComponentTool$WonderEditor.addDirectionLightComponent(undefined, undefined, undefined, /* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                              }));
                        return Wonder_jest.test("test add cameraGroup component, the sceneTree node icon should be cameraIcon", (function (param) {
                                      MainEditorInspectorAddComponentTool$WonderEditor.addCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                      }));
                describe("test set first camera to be current gameObject", (function () {
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                                var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                            }));
                              }));
                        return Wonder_jest.test("test remove camera component, the sceneTree node icon should be gameObjectIcon", (function (param) {
                                      MainEditorInspectorRemoveComponentTool$WonderEditor.removeCameraGroupComponent(undefined, undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                      }));
                describe("test set direction light to be current gameObject", (function () {
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectToBeCurrentSceneTreeNode);
                                var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                                            }));
                              }));
                        return Wonder_jest.test("test remove light component, the sceneTree node icon should be gameObjectIcon", (function (param) {
                                      MainEditorInspectorRemoveComponentTool$WonderEditor.removeDirectionLightComponent(undefined, undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test drag", (function () {
                describe("handleDragOver", (function () {
                        var _buildDragOverResult = function (pageY, $staropt$star, $staropt$star$1, param) {
                          var offsetTop = $staropt$star !== undefined ? $staropt$star : 10;
                          var offsetHeight = $staropt$star$1 !== undefined ? $staropt$star$1 : 8;
                          return SceneTreeNode$WonderEditor.Method[/* handleDragOver */5](MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), /* tuple */[
                                      SceneTreeWidgetService$WonderEditor.isWidget,
                                      CheckSceneTreeLogicService$WonderEditor.checkGameObjectRelation,
                                      WDBNodeAssetEditorService$WonderEditor.isWDBAssetFile
                                    ], BaseEventTool$WonderEditor.buildDragEventWithMouse(offsetTop, offsetHeight, pageY, /* () */0));
                        };
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                var partial_arg_000 = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                                var partial_arg_001 = MainEditorSceneTool$WonderEditor.getSecondCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                var partial_arg = /* tuple */[
                                  partial_arg_000,
                                  partial_arg_001
                                ];
                                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                              return CurrentDragSourceEditorService$WonderEditor.setCurrentDragSource(partial_arg, param);
                                            }));
                              }));
                        afterEach((function () {
                                return GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                              }));
                        Wonder_jest.test("if pageY < offsetTop + gapHeight, return DragOver(DragBeforeTarget) ", (function (param) {
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_buildDragOverResult(12, undefined, undefined, /* () */0)), /* DragOver */Block.__(1, [/* DragBeforeTarget */1]));
                              }));
                        Wonder_jest.test("if pageY > offsetTop + offsetHeight - gapHeight, return DragOver(DragAfterTarget)", (function (param) {
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_buildDragOverResult(25, undefined, undefined, /* () */0)), /* DragOver */Block.__(1, [/* DragAfterTarget */3]));
                              }));
                        return Wonder_jest.test("else, return DragOver(DragIntoTarget)", (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_buildDragOverResult(20, undefined, undefined, /* () */0)), /* DragOver */Block.__(1, [/* DragIntoTarget */2]));
                                    }));
                      }));
                describe("handleDragDrop", (function () {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              }));
                        afterEach((function () {
                                return GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                              }));
                        describe("test drag gameObject", (function () {
                                return Wonder_jest.test("if is scene tree widget and pass check relation, return DragGameObject(targetGameObject, sourceGameObject)", (function (param) {
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
                                              var result = SceneTreeNode$WonderEditor.Method[/* handleDrop */6](targetGameObject, /* tuple */[
                                                    SceneTreeWidgetService$WonderEditor.isWidget,
                                                    CheckSceneTreeLogicService$WonderEditor.checkGameObjectRelation,
                                                    WDBNodeAssetEditorService$WonderEditor.isWDBAssetFile
                                                  ], /* DragIntoTarget */2, BaseEventTool$WonderEditor.buildDragEventWithDataMap(MutableHashMapService$WonderCommonlib.set("draggedId", sourceGameObject, MutableHashMapService$WonderCommonlib.createEmpty(/* () */0))));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](result), /* DragGameObject */Block.__(2, [
                                                            targetGameObject,
                                                            sourceGameObject,
                                                            /* DragIntoTarget */2
                                                          ]));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test drag gameObject to be target gameObject sib", (function () {
                        describe("test drag gameObject before target gameObject", (function () {
                                beforeEach((function () {
                                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                      }));
                                afterEach((function () {
                                        return GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                      }));
                                describe("test target gameObject isn't scene gameObject", (function () {
                                        Wonder_jest.test("test snapshot", (function (param) {
                                                MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), /* DragBeforeTarget */1, undefined, undefined, /* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                              }));
                                        return Wonder_jest.test("test scene children", (function (param) {
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var match = MainEditorSceneTool$WonderEditor.getDefaultGameObjects(engineState);
                                                      var match$1 = match[1];
                                                      var directionLight = match$1[3];
                                                      var camera = match$1[0];
                                                      var scene = match[0];
                                                      MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](camera, directionLight, /* DragBeforeTarget */1, undefined, undefined, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      HierarchyGameObjectEngineService$WonderEditor.getChildren(scene, engineState),
                                                                      HierarchyGameObjectEngineService$WonderEditor.getParentGameObject(camera, engineState),
                                                                      HierarchyGameObjectEngineService$WonderEditor.getParentGameObject(directionLight, engineState)
                                                                    ]), /* tuple */[
                                                                  /* array */[
                                                                    match$1[1],
                                                                    match$1[2],
                                                                    camera,
                                                                    directionLight
                                                                  ],
                                                                  scene,
                                                                  scene
                                                                ]);
                                                    }));
                                      }));
                                describe("test target gameObject is scene gameObject", (function () {
                                        describe("set dragged gameobject to be scene first child", (function () {
                                                Wonder_jest.test("test snapshot", (function (param) {
                                                        MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), /* DragBeforeTarget */1, undefined, undefined, /* () */0);
                                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                                      }));
                                                return Wonder_jest.test("test scene children", (function (param) {
                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                              var match = MainEditorSceneTool$WonderEditor.getDefaultGameObjects(engineState);
                                                              var match$1 = match[1];
                                                              var directionLight = match$1[3];
                                                              var scene = match[0];
                                                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](directionLight, scene, /* DragBeforeTarget */1, undefined, undefined, /* () */0);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(scene, engineState)), /* array */[
                                                                          directionLight,
                                                                          match$1[0],
                                                                          match$1[1],
                                                                          match$1[2]
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("test drag gameObject into target gameObject", (function () {
                                describe("test target gameObject isn't scene gameObject", (function () {
                                        beforeEach((function () {
                                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                              }));
                                        afterEach((function () {
                                                return GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                              }));
                                        return Wonder_jest.test("test snapshot", (function (param) {
                                                      MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), /* DragIntoTarget */2, undefined, undefined, /* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                                    }));
                                      }));
                                describe("test target gameObject is scene gameObject", (function () {
                                        describe("set dragged gameobject to be scene last child", (function () {
                                                Wonder_jest.test("test snapshot", (function (param) {
                                                        var match = SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                                                        MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](match[1][1], match[0], /* DragIntoTarget */2, undefined, undefined, /* () */0);
                                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                                      }));
                                                return Wonder_jest.test("test scene children", (function (param) {
                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                              var match = SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                                                              var match$1 = match[1];
                                                              var cube4 = match$1[1];
                                                              var scene = match[0];
                                                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](cube4, scene, /* DragIntoTarget */2, undefined, undefined, /* () */0);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(scene, engineState)), /* array */[
                                                                          match$1[0],
                                                                          match[2],
                                                                          match[3],
                                                                          cube4
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("test drag gameObject after target gameObject", (function () {
                                beforeEach((function () {
                                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                      }));
                                afterEach((function () {
                                        return GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                      }));
                                describe("test target gameObject isn't scene gameObject", (function () {
                                        Wonder_jest.test("test snapshot", (function (param) {
                                                MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), /* DragAfterTarget */3, undefined, undefined, /* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                              }));
                                        return Wonder_jest.test("test scene children", (function (param) {
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var match = MainEditorSceneTool$WonderEditor.getDefaultGameObjects(engineState);
                                                      var match$1 = match[1];
                                                      var directionLight = match$1[3];
                                                      var camera = match$1[0];
                                                      MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](camera, directionLight, /* DragAfterTarget */3, undefined, undefined, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(match[0], engineState)), /* array */[
                                                                  match$1[1],
                                                                  match$1[2],
                                                                  directionLight,
                                                                  camera
                                                                ]);
                                                    }));
                                      }));
                                describe("test target gameObject is scene gameObject", (function () {
                                        describe("set dragged gameobject to be scene first child", (function () {
                                                Wonder_jest.test("test snapshot", (function (param) {
                                                        MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), /* DragAfterTarget */3, undefined, undefined, /* () */0);
                                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                                      }));
                                                return Wonder_jest.test("test scene children", (function (param) {
                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                              var match = MainEditorSceneTool$WonderEditor.getDefaultGameObjects(engineState);
                                                              var match$1 = match[1];
                                                              var directionLight = match$1[3];
                                                              var scene = match[0];
                                                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](directionLight, scene, /* DragAfterTarget */3, undefined, undefined, /* () */0);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(scene, engineState)), /* array */[
                                                                          directionLight,
                                                                          match$1[0],
                                                                          match$1[1],
                                                                          match$1[2]
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return Wonder_jest.test("should refresh engine state", (function (param) {
                                      return RefreshEngineStateTool$WonderEditor.testRefreshEngineState(sandbox, (function (param) {
                                                    return MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](MainEditorSceneTool$WonderEditor.getSecondCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), /* DragBeforeTarget */1, undefined, undefined, /* () */0);
                                                  }));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("get sceneTree from engine", (function () {
                describe("test simple scene graph data which haven't children case", (function () {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              }));
                        afterEach((function () {
                                return GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                              }));
                        Wonder_jest.test("test no drag", (function (param) {
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                              }));
                        return Wonder_jest.test("test drag treeNode into target treeNode", (function (param) {
                                      MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), MainEditorSceneTool$WonderEditor.getSecondCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), undefined, undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                      }));
                describe("set current gameObject", (function () {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                                              return /* () */0;
                                            }));
                              }));
                        return Wonder_jest.test("test click treeNode to set it to be currentSceneTreeNode", (function (param) {
                                      MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0)), MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                    }));
                      }));
                Wonder_jest.test("should refresh engine state", (function (param) {
                        return RefreshEngineStateTool$WonderEditor.testRefreshEngineState(sandbox, (function (param) {
                                      return MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), /* () */0);
                                    }));
                      }));
                describe("deal with the specific case", (function () {
                        Wonder_jest.test("if drag treeNode into itself, keep not change", (function (param) {
                                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTreeTool$WonderEditor.Drag[/* isTriggerDragCurrentSceneTreeNode */0](GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0))), false);
                              }));
                        Wonder_jest.test("if drag treeNode into it's first layer chidlren, keep not change", (function (param) {
                                var match = SceneTreeTool$WonderEditor.buildThreeLayerSceneGraphToEngine(sandbox);
                                var match$1 = match[1];
                                GameObjectTool$WonderEditor.setCurrentSceneTreeNode(match$1[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTreeTool$WonderEditor.Drag[/* isTriggerDragCurrentSceneTreeNode */0](match$1[1])), false);
                              }));
                        describe("if drag treeNode into it's second layer chidlren", (function () {
                                return Wonder_jest.test("if drag treeNode into it's second layer chidlren, keep not change", (function (param) {
                                              var match = SceneTreeTool$WonderEditor.buildFourLayerSceneGraphToEngine(sandbox);
                                              var match$1 = match[1];
                                              GameObjectTool$WonderEditor.setCurrentSceneTreeNode(match$1[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTreeTool$WonderEditor.Drag[/* isTriggerDragCurrentSceneTreeNode */0](match$1[2])), false);
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
