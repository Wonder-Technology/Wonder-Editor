'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../tool/TestTool.js");
var EventTool$WonderEditor = require("../tool/EventTool.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var BuildComponentTool$WonderEditor = require("../../../tool/BuildComponentTool.js");
var InitHotKeysJobTool$WonderEditor = require("./tool/InitHotKeysJobTool.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorLeftHeaderTool$WonderEditor = require("../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js");
var CurrentTransformGizmoSceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js");

Wonder_jest.describe("init hotKeys job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("bind document hotKeys event, need add hot-key into SettingTool", (function (param) {
                      var triggerRedoHotKeyEvent = function (param) {
                        InitHotKeysJobTool$WonderEditor.execKeyboardEvent("keydown", 89, true, undefined, undefined, /* () */0);
                        return /* () */0;
                      };
                      var triggerUndoHotKeyEvent = function (param) {
                        InitHotKeysJobTool$WonderEditor.execKeyboardEvent("keydown", 90, true, undefined, undefined, /* () */0);
                        return /* () */0;
                      };
                      var triggerCloneHotKeyEvent = function (param) {
                        InitHotKeysJobTool$WonderEditor.execKeyboardEvent("keydown", 68, true, undefined, undefined, /* () */0);
                        return /* () */0;
                      };
                      var triggerDeleteHotKeyEvent = function (param) {
                        InitHotKeysJobTool$WonderEditor.execKeyboardEvent("keydown", 46, undefined, undefined, undefined, /* () */0);
                        return /* () */0;
                      };
                      var triggerTranslationHotKeyEvent = function (param) {
                        InitHotKeysJobTool$WonderEditor.execKeyboardEvent("keydown", 49, undefined, undefined, undefined, /* () */0);
                        return /* () */0;
                      };
                      var triggerRotationHotKeyEvent = function (param) {
                        InitHotKeysJobTool$WonderEditor.execKeyboardEvent("keydown", 50, undefined, undefined, undefined, /* () */0);
                        return /* () */0;
                      };
                      var triggerScaleHotKeyEvent = function (param) {
                        InitHotKeysJobTool$WonderEditor.execKeyboardEvent("keydown", 51, undefined, undefined, undefined, /* () */0);
                        return /* () */0;
                      };
                      beforeEach((function () {
                              InitHotKeysJobTool$WonderEditor.prepareKeyboardEvent(sandbox, /* () */0);
                              return Curry._1(EventTool$WonderEditor.buildFakeDocumentSetToWindow, /* () */0);
                            }));
                      afterEach((function () {
                              return EventTool$WonderEditor.restoreHotKeys(/* () */0);
                            }));
                      Wonder_jest.describe("test bind undo hot-key", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                      return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                    }));
                              return Wonder_jest.test("key down ctrl+z, should execute undo operate", (function (param) {
                                            MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                            triggerUndoHotKeyEvent(/* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                          }));
                            }));
                      Wonder_jest.describe("test bind clone hot-key", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                      return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                    }));
                              return Wonder_jest.test("key down ctrl+d, should execute clone operate", (function (param) {
                                            Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                            MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                            triggerCloneHotKeyEvent(/* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                          }));
                            }));
                      Wonder_jest.describe("test bind redo hot-key", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                      return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                    }));
                              return Wonder_jest.test("key down ctrl+y, should execute redo operate", (function (param) {
                                            MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                            MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                            triggerUndoHotKeyEvent(/* () */0);
                                            triggerUndoHotKeyEvent(/* () */0);
                                            triggerRedoHotKeyEvent(/* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                          }));
                            }));
                      Wonder_jest.describe("test bind delete hot-key", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                      return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                    }));
                              return Wonder_jest.describe("key down delete", (function (param) {
                                            Wonder_jest.test("if has currentSceneTreeNode, should delete it", (function (param) {
                                                    MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                    triggerDeleteHotKeyEvent(/* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                                  }));
                                            return Wonder_jest.test("else if has current asset tree node, should delete it", (function (param) {
                                                          GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                                          var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                                          MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */8][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), undefined, /* () */0);
                                                          triggerDeleteHotKeyEvent(/* () */0);
                                                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test bind translation hot-key", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                      return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                    }));
                              return Wonder_jest.test("key down 1, should set current transform gizmo type is translation", (function (param) {
                                            StateEditorService$WonderEditor.setState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.mark(/* Scale */2, StateEditorService$WonderEditor.getState(/* () */0)));
                                            triggerTranslationHotKeyEvent(/* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CurrentTransformGizmoSceneViewEditorService$WonderEditor.getCurrentGizmoType(StateEditorService$WonderEditor.getState(/* () */0))), /* Translation */0);
                                          }));
                            }));
                      Wonder_jest.describe("test bind rotation hot-key", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                      return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                    }));
                              return Wonder_jest.test("key down 2, should set current transform gizmo type is rotation", (function (param) {
                                            StateEditorService$WonderEditor.setState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.mark(/* Scale */2, StateEditorService$WonderEditor.getState(/* () */0)));
                                            triggerRotationHotKeyEvent(/* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CurrentTransformGizmoSceneViewEditorService$WonderEditor.getCurrentGizmoType(StateEditorService$WonderEditor.getState(/* () */0))), /* Rotation */1);
                                          }));
                            }));
                      return Wonder_jest.describe("test bind scale hot-key", (function (param) {
                                    beforeEach((function () {
                                            MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                            return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                          }));
                                    return Wonder_jest.test("key down 3, should set current transform gizmo type is scale", (function (param) {
                                                  StateEditorService$WonderEditor.setState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.mark(/* Translation */0, StateEditorService$WonderEditor.getState(/* () */0)));
                                                  triggerScaleHotKeyEvent(/* () */0);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CurrentTransformGizmoSceneViewEditorService$WonderEditor.getCurrentGizmoType(StateEditorService$WonderEditor.getState(/* () */0))), /* Scale */2);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
