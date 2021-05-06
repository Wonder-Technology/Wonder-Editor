'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var AppStore$WonderEditor = require("../../../../../../../src/core/ui/store/AppStore.js");
var TestTool$WonderEditor = require("../../../../../../tool/TestTool.js");
var ReactTool$WonderEditor = require("../../../../../../tool/ui/ReactTool.js");
var ArrayService$WonderEditor = require("../../../../../../../src/service/atom/ArrayService.js");
var BaseEventTool$WonderEditor = require("../../../../../../tool/ui/BaseEventTool.js");
var ReactTestTool$WonderEditor = require("../../../../../../tool/ReactTestTool.js");
var SceneTreeNode$WonderEditor = require("../../../../../../../src/core/atom_component/dragTree/component/treeNode/SceneTreeNode.js");
var SceneTreeTool$WonderEditor = require("../../../../../../tool/SceneTreeTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var OldNewSelfTool$WonderEditor = require("../../../../../tool/OldNewSelfTool.js");
var EventListenerTool$WonderEditor = require("../../../../../tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../../../../tool/BuildComponentTool.js");
var SceneEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/SceneEngineService.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var MainEditorSceneTree$WonderEditor = require("../../../../../../../src/core/composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/ui/MainEditorSceneTree.js");
var RefreshEngineStateTool$WonderEditor = require("../../../../../../tool/RefreshEngineStateTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../../../tool/MainEditorSceneTreeTool.js");
var MutableHashMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableHashMapService.js");
var WDBNodeAssetEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/asset/WDBNodeAssetEditorService.js");
var CheckSceneTreeLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/sceneTree/CheckSceneTreeLogicService.js");
var CurrentDragSourceEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/CurrentDragSourceEditorService.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../../../../../integration/inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");
var MainEditorInspectorRemoveComponentTool$WonderEditor = require("../../../../../../integration/inspector/atom_component/addableComponent/tool/MainEditorInspectorRemoveComponentTool.js");

Wonder_jest.describe("MainEditorSceneTree", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test should update", (function (param) {
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
        Wonder_jest.describe("test sceneTree node icon", (function (param) {
                Wonder_jest.describe("test refresh inspector and sceneTree", (function (param) {
                        Wonder_jest.describe("if add cameraGroup or light component, should refresh both", (function (param) {
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
                        return Wonder_jest.describe("else, should only refresh inspector", (function (param) {
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
                      }));
                Wonder_jest.describe("test set first cube to be current gameObject", (function (param) {
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
                Wonder_jest.describe("test set first camera to be current gameObject", (function (param) {
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
                return Wonder_jest.describe("test set direction light to be current gameObject", (function (param) {
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
              }));
        Wonder_jest.describe("test drag", (function (param) {
                Wonder_jest.describe("handleDragOver", (function (param) {
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
                Wonder_jest.describe("handleDragDrop", (function (param) {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                              }));
                        afterEach((function () {
                                return GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                              }));
                        return Wonder_jest.describe("test drag gameObject", (function (param) {
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
                      }));
                return Wonder_jest.describe("test drag gameObject to be target gameObject sib", (function (param) {
                              Wonder_jest.describe("test drag gameObject before target gameObject", (function (param) {
                                      beforeEach((function () {
                                              return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                            }));
                                      afterEach((function () {
                                              return GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                            }));
                                      Wonder_jest.describe("test target gameObject isn't scene gameObject", (function (param) {
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
                                      return Wonder_jest.describe("test target gameObject is scene gameObject", (function (param) {
                                                    return Wonder_jest.describe("set dragged gameobject to be scene first child", (function (param) {
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
                                                  }));
                                    }));
                              Wonder_jest.describe("test drag gameObject into target gameObject", (function (param) {
                                      Wonder_jest.describe("test target gameObject isn't scene gameObject", (function (param) {
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
                                      return Wonder_jest.describe("test target gameObject is scene gameObject", (function (param) {
                                                    return Wonder_jest.describe("set dragged gameobject to be scene last child", (function (param) {
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
                                                  }));
                                    }));
                              Wonder_jest.describe("test drag gameObject after target gameObject", (function (param) {
                                      beforeEach((function () {
                                              return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                            }));
                                      afterEach((function () {
                                              return GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                            }));
                                      Wonder_jest.describe("test target gameObject isn't scene gameObject", (function (param) {
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
                                      return Wonder_jest.describe("test target gameObject is scene gameObject", (function (param) {
                                                    return Wonder_jest.describe("set dragged gameobject to be scene first child", (function (param) {
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
                                                  }));
                                    }));
                              return Wonder_jest.test("should refresh engine state", (function (param) {
                                            return RefreshEngineStateTool$WonderEditor.testRefreshEngineState(sandbox, (function (param) {
                                                          return MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](MainEditorSceneTool$WonderEditor.getSecondCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), /* DragBeforeTarget */1, undefined, undefined, /* () */0);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("get sceneTree from engine", (function (param) {
                      Wonder_jest.describe("test simple scene graph data which haven't children case", (function (param) {
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
                      Wonder_jest.describe("set current gameObject", (function (param) {
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
                      return Wonder_jest.describe("deal with the specific case", (function (param) {
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
                                    return Wonder_jest.describe("if drag treeNode into it's second layer chidlren", (function (param) {
                                                  return Wonder_jest.test("if drag treeNode into it's second layer chidlren, keep not change", (function (param) {
                                                                var match = SceneTreeTool$WonderEditor.buildFourLayerSceneGraphToEngine(sandbox);
                                                                var match$1 = match[1];
                                                                GameObjectTool$WonderEditor.setCurrentSceneTreeNode(match$1[0]);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorSceneTreeTool$WonderEditor.Drag[/* isTriggerDragCurrentSceneTreeNode */0](match$1[2])), false);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
