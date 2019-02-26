

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../tool/TestTool.js";
import * as EventTool$WonderEditor from "./tool/EventTool.js";
import * as MainUtils$WonderEditor from "../../../src/core/utils/engine/MainUtils.js";
import * as FloatService$WonderEditor from "../../../src/service/atom/FloatService.js";
import * as ReactTestTool$WonderEditor from "../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../tool/GameObjectTool.js";
import * as Vector3Service$WonderEditor from "../../../src/service/primitive/Vector3Service.js";
import * as KeyboardEventTool$WonderEditor from "./tool/KeyboardEventTool.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as SceneViewEditorService$WonderEditor from "../../../src/service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../src/service/state/engine/TransformEngineService.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../src/service/state/engine/gameObject/TransformGameObjectEngineService.js";

describe("init hotKeys job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareKeyboardEvent = function (sandbox, _) {
          return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n                [\n                  {\n                    \"name\": \"default\",\n                    \"jobs\": [\n                      {\n                        \"name\": \"init_hotkeys\"\n                      }\n                    ]\n                  }\n                ]\n            ", "\n                     [\n                         {\n                             \"name\": \"default\",\n                             \"jobs\": [\n                                 {\n                                     \"name\": \"dispose\"\n                                 }\n                             ]\n                         }\n                     ]\n                 ", "\n                [\n\n                    {\n                       \"name\": \"init_hotkeys\"\n                    }\n                ]\n            ", undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("bind document hotKeys event", (function () {
                var _execKeyboardEvent = function (keyboardDomEventName, keyCode, $staropt$star, $staropt$star$1, $staropt$star$2, _) {
                  var ctrlKey = $staropt$star !== undefined ? $staropt$star : false;
                  var altKey = $staropt$star$1 !== undefined ? $staropt$star$1 : false;
                  var shiftKey = $staropt$star$2 !== undefined ? $staropt$star$2 : false;
                  return EventTool$WonderEditor.triggerDomEvent(keyboardDomEventName, EventTool$WonderEditor.getDocument(/* () */0), KeyboardEventTool$WonderEditor.buildKeyboardEvent(ctrlKey, altKey, shiftKey, undefined, keyCode, /* () */0));
                };
                var triggerRedoHotKeyEvent = function () {
                  _execKeyboardEvent("keydown", 89, true, undefined, undefined, /* () */0);
                  return /* () */0;
                };
                var triggerUndoHotKeyEvent = function () {
                  _execKeyboardEvent("keydown", 90, true, undefined, undefined, /* () */0);
                  return /* () */0;
                };
                var triggerCloneHotKeyEvent = function () {
                  _execKeyboardEvent("keydown", 68, true, undefined, undefined, /* () */0);
                  return /* () */0;
                };
                var triggerDeleteHotKeyEvent = function () {
                  _execKeyboardEvent("keydown", 46, undefined, undefined, undefined, /* () */0);
                  return /* () */0;
                };
                var triggerFocusHotKeyEvent = function () {
                  _execKeyboardEvent("keydown", 70, undefined, undefined, undefined, /* () */0);
                  return /* () */0;
                };
                beforeEach((function () {
                        _prepareKeyboardEvent(sandbox, /* () */0);
                        MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                        Curry._1(EventTool$WonderEditor.buildFakeDocumentSetToWindow, /* () */0);
                        return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                      }));
                afterEach((function () {
                        return EventTool$WonderEditor.restoreHotKeys(/* () */0);
                      }));
                describe("test bind undo hot-key", (function () {
                        return Wonder_jest.test("key down ctrl+z, should execute undo operate", (function () {
                                      MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                      triggerUndoHotKeyEvent(/* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                      }));
                describe("test bind clone hot-key", (function () {
                        return Wonder_jest.test("key down ctrl+d, should execute clone operate", (function () {
                                      triggerCloneHotKeyEvent(/* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                      }));
                describe("test bind redo hot-key", (function () {
                        return Wonder_jest.test("key down ctrl+y, should execute redo operate", (function () {
                                      MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                      MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                      triggerUndoHotKeyEvent(/* () */0);
                                      triggerUndoHotKeyEvent(/* () */0);
                                      triggerRedoHotKeyEvent(/* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                      }));
                describe("test bind delete hot-key", (function () {
                        return Wonder_jest.test("key down delete,if has currentSceneTreeNode, should delete it", (function () {
                                      MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                      triggerDeleteHotKeyEvent(/* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                      }));
                describe("test bind focus hot-key", (function () {
                        var _getDistance = function (param) {
                          var engineState = param[1];
                          var __x = ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance(GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(SceneViewEditorService$WonderEditor.unsafeGetEditCamera(param[0]), engineState), engineState);
                          return FloatService$WonderEditor.truncateFloatValue(__x, 3);
                        };
                        var _getTarget = function (param) {
                          var engineState = param[1];
                          return Vector3Service$WonderEditor.truncate(3, ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTarget(GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(SceneViewEditorService$WonderEditor.unsafeGetEditCamera(param[0]), engineState), engineState));
                        };
                        describe("\n          calc currentSceneTreeNode's all children and its self->aabb;\n          use aabb's center as arcball camera controller target;\n          use aabb's radius * factor as arcball camera controller distance;\n          ", (function () {
                                Wonder_jest.test("test the currentSceneTreeNode is scene gameObject", (function () {
                                        GameObjectTool$WonderEditor.setCurrentSceneTreeNode(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0));
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var engineState$1 = TransformEngineService$WonderEditor.setScale(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), engineState), /* tuple */[
                                              3,
                                              1,
                                              1
                                            ], engineState);
                                        var firstChild = MainEditorSceneTool$WonderEditor.getFirstCube(engineState$1);
                                        var secondChild = MainEditorSceneTool$WonderEditor.getSecondCube(engineState$1);
                                        var engineState$2 = TransformGameObjectEngineService$WonderEditor.setLocalPosition(secondChild, /* tuple */[
                                              -3,
                                              0,
                                              0
                                            ], TransformGameObjectEngineService$WonderEditor.setLocalPosition(firstChild, /* tuple */[
                                                  2,
                                                  0,
                                                  0
                                                ], engineState$1));
                                        StateEngineService$WonderEditor.setState(engineState$2);
                                        triggerFocusHotKeyEvent(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        StateLogicService$WonderEditor.getStateToGetData(_getDistance),
                                                        StateLogicService$WonderEditor.getStateToGetData(_getTarget)
                                                      ]), /* tuple */[
                                                    22.569,
                                                    /* tuple */[
                                                      -1.5,
                                                      0,
                                                      0
                                                    ]
                                                  ]);
                                      }));
                                return Wonder_jest.test("test the currentSceneTreeNode is scene children", (function () {
                                              MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var firstChild = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                                              var secondChild = MainEditorSceneTool$WonderEditor.getSecondCube(engineState);
                                              var engineState$1 = TransformEngineService$WonderEditor.setScale(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(firstChild, engineState), /* tuple */[
                                                    3,
                                                    1,
                                                    1
                                                  ], engineState);
                                              var engineState$2 = TransformGameObjectEngineService$WonderEditor.setLocalPosition(secondChild, /* tuple */[
                                                    -3,
                                                    0,
                                                    0
                                                  ], TransformGameObjectEngineService$WonderEditor.setLocalPosition(firstChild, /* tuple */[
                                                        2,
                                                        0,
                                                        0
                                                      ], engineState$1));
                                              StateEngineService$WonderEditor.setState(engineState$2);
                                              triggerFocusHotKeyEvent(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              StateLogicService$WonderEditor.getStateToGetData(_getDistance),
                                                              StateLogicService$WonderEditor.getStateToGetData(_getTarget)
                                                            ]), /* tuple */[
                                                          4.146,
                                                          /* tuple */[
                                                            2,
                                                            0,
                                                            0
                                                          ]
                                                        ]);
                                            }));
                              }));
                        describe("fix bug", (function () {
                                describe("if currentSceneTreeNode and its all children has no geometry component", (function () {
                                        var _prepareAndExec = function () {
                                          GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getCameraInDefaultScene));
                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                          var camera = MainEditorSceneTool$WonderEditor.getCameraInDefaultScene(engineState);
                                          var pos = /* tuple */[
                                            2,
                                            0,
                                            0
                                          ];
                                          var engineState$1 = TransformGameObjectEngineService$WonderEditor.setLocalPosition(camera, pos, engineState);
                                          StateEngineService$WonderEditor.setState(engineState$1);
                                          triggerFocusHotKeyEvent(/* () */0);
                                          return pos;
                                        };
                                        Wonder_jest.test("use currentSceneTreeNode->position as target", (function () {
                                                var pos = _prepareAndExec(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getStateToGetData(_getTarget)), pos);
                                              }));
                                        return Wonder_jest.test("use fixed value as distance", (function () {
                                                      _prepareAndExec(/* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getStateToGetData(_getDistance)), 3);
                                                    }));
                                      }));
                                return /* () */0;
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
