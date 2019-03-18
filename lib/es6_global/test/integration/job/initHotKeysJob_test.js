

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../tool/TestTool.js";
import * as EventTool$WonderEditor from "./tool/EventTool.js";
import * as FloatTool$WonderEditor from "../../tool/FloatTool.js";
import * as MainUtils$WonderEditor from "../../../src/core/utils/engine/MainUtils.js";
import * as FloatService$WonderEditor from "../../../src/service/atom/FloatService.js";
import * as ReactTestTool$WonderEditor from "../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../tool/GameObjectTool.js";
import * as Vector3Service$WonderEditor from "../../../src/service/primitive/Vector3Service.js";
import * as EventListenerTool$WonderEditor from "../../unit/tool/EventListenerTool.js";
import * as KeyboardEventTool$WonderEditor from "./tool/KeyboardEventTool.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as SceneViewEditorService$WonderEditor from "../../../src/service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../src/service/state/engine/TransformEngineService.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../src/service/state/engine/gameObject/TransformGameObjectEngineService.js";
import * as CurrentTransformGizmoSceneViewEditorService$WonderEditor from "../../../src/service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js";

describe("init hotKeys job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareKeyboardEvent = function (sandbox, param) {
          return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n                [\n                  {\n                    \"name\": \"default\",\n                    \"jobs\": [\n                      {\n                        \"name\": \"init_hotkeys\"\n                      },\n                      {\n                         \"name\": \"init_transform_gizmos\"\n                      }\n                    ]\n                  }\n                ]\n            ", "\n                     [\n                         {\n                             \"name\": \"default\",\n                             \"jobs\": [\n                                 {\n                                     \"name\": \"dispose\"\n                                 }\n                             ]\n                         }\n                     ]\n                 ", undefined, undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("bind document hotKeys event, need add hot-key into SettingTool", (function () {
                var _execKeyboardEvent = function (keyboardDomEventName, keyCode, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
                  var ctrlKey = $staropt$star !== undefined ? $staropt$star : false;
                  var altKey = $staropt$star$1 !== undefined ? $staropt$star$1 : false;
                  var shiftKey = $staropt$star$2 !== undefined ? $staropt$star$2 : false;
                  return EventTool$WonderEditor.triggerDomEvent(keyboardDomEventName, EventTool$WonderEditor.getDocument(/* () */0), KeyboardEventTool$WonderEditor.buildKeyboardDomEvent(ctrlKey, altKey, shiftKey, undefined, keyCode, undefined, /* () */0));
                };
                var triggerRedoHotKeyEvent = function (param) {
                  _execKeyboardEvent("keydown", 89, true, undefined, undefined, /* () */0);
                  return /* () */0;
                };
                var triggerUndoHotKeyEvent = function (param) {
                  _execKeyboardEvent("keydown", 90, true, undefined, undefined, /* () */0);
                  return /* () */0;
                };
                var triggerCloneHotKeyEvent = function (param) {
                  _execKeyboardEvent("keydown", 68, true, undefined, undefined, /* () */0);
                  return /* () */0;
                };
                var triggerDeleteHotKeyEvent = function (param) {
                  _execKeyboardEvent("keydown", 46, undefined, undefined, undefined, /* () */0);
                  return /* () */0;
                };
                var triggerFocusHotKeyEvent = function (param) {
                  _execKeyboardEvent("keydown", 70, undefined, undefined, undefined, /* () */0);
                  return /* () */0;
                };
                var triggerTranslationHotKeyEvent = function (param) {
                  _execKeyboardEvent("keydown", 49, undefined, undefined, undefined, /* () */0);
                  return /* () */0;
                };
                var triggerRotationHotKeyEvent = function (param) {
                  _execKeyboardEvent("keydown", 50, undefined, undefined, undefined, /* () */0);
                  return /* () */0;
                };
                var triggerScaleHotKeyEvent = function (param) {
                  _execKeyboardEvent("keydown", 51, undefined, undefined, undefined, /* () */0);
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
                        return Wonder_jest.test("key down ctrl+z, should execute undo operate", (function (param) {
                                      MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                      triggerUndoHotKeyEvent(/* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                      }));
                describe("test bind clone hot-key", (function () {
                        return Wonder_jest.test("key down ctrl+d, should execute clone operate", (function (param) {
                                      Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                                      MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                      triggerCloneHotKeyEvent(/* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                      }));
                describe("test bind redo hot-key", (function () {
                        return Wonder_jest.test("key down ctrl+y, should execute redo operate", (function (param) {
                                      MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                      MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                      triggerUndoHotKeyEvent(/* () */0);
                                      triggerUndoHotKeyEvent(/* () */0);
                                      triggerRedoHotKeyEvent(/* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                      }));
                describe("test bind delete hot-key", (function () {
                        describe("key down delete", (function () {
                                Wonder_jest.test("if has currentSceneTreeNode, should delete it", (function (param) {
                                        MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                        triggerDeleteHotKeyEvent(/* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                      }));
                                return Wonder_jest.test("else if has current asset tree node, should delete it", (function (param) {
                                              GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                                              var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildOneFolderAssetTree */0], /* () */0);
                                              MainEditorAssetTreeTool$WonderEditor.Select[/* selectFolderNode */1](Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), undefined, /* () */0);
                                              triggerDeleteHotKeyEvent(/* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildAssetTree(/* () */0));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test bind focus hot-key", (function () {
                        var _unsafeGetEditCameraArcballCameraController = function (param) {
                          return GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(SceneViewEditorService$WonderEditor.unsafeGetEditCamera(param[0]), param[1]);
                        };
                        var _getDistance = function (param) {
                          var engineState = param[1];
                          var __x = ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance(_unsafeGetEditCameraArcballCameraController(/* tuple */[
                                    param[0],
                                    engineState
                                  ]), engineState);
                          return FloatService$WonderEditor.truncateFloatValue(__x, 3);
                        };
                        var _getTarget = function (param) {
                          var engineState = param[1];
                          return Vector3Service$WonderEditor.truncate(3, ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTarget(_unsafeGetEditCameraArcballCameraController(/* tuple */[
                                              param[0],
                                              engineState
                                            ]), engineState));
                        };
                        describe("calc currentSceneTreeNode's all children and its self->aabb", (function () {
                                var _prepareSceneGameObject = function (param) {
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
                                  return /* () */0;
                                };
                                describe("\n          use aabb's center as arcball camera controller target;\n          use aabb's radius * factor as arcball camera controller distance;\n          ", (function () {
                                        Wonder_jest.test("test the currentSceneTreeNode is scene gameObject", (function (param) {
                                                _prepareSceneGameObject(/* () */0);
                                                triggerFocusHotKeyEvent(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                                        return Wonder_jest.test("test the currentSceneTreeNode is scene children", (function (param) {
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
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                                Wonder_jest.test("set edit camera->arcball move speed", (function (param) {
                                        _prepareSceneGameObject(/* () */0);
                                        triggerFocusHotKeyEvent(/* () */0);
                                        var cameraController = StateLogicService$WonderEditor.getStateToGetData(_unsafeGetEditCameraArcballCameraController);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        FloatTool$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerMoveSpeedX(cameraController, param);
                                                                  }))),
                                                        FloatTool$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerMoveSpeedY(cameraController, param);
                                                                  })))
                                                      ]), /* tuple */[
                                                    0.226,
                                                    0.226
                                                  ]);
                                      }));
                                return Wonder_jest.test("set edit camera->arcball wheel speed", (function (param) {
                                              _prepareSceneGameObject(/* () */0);
                                              triggerFocusHotKeyEvent(/* () */0);
                                              var partial_arg = StateLogicService$WonderEditor.getStateToGetData(_unsafeGetEditCameraArcballCameraController);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatTool$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerWheelSpeed(partial_arg, param);
                                                                      })))), 0.451);
                                            }));
                              }));
                        describe("fix bug", (function () {
                                describe("if currentSceneTreeNode and its all children has no geometry component", (function () {
                                        var _prepareAndExec = function (param) {
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
                                        Wonder_jest.test("use currentSceneTreeNode->position as target", (function (param) {
                                                var pos = _prepareAndExec(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getStateToGetData(_getTarget)), pos);
                                              }));
                                        Wonder_jest.test("use fixed value as distance", (function (param) {
                                                _prepareAndExec(/* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getStateToGetData(_getDistance)), 3);
                                              }));
                                        return Wonder_jest.test("set wheel speed to 0.5", (function (param) {
                                                      _prepareAndExec(/* () */0);
                                                      var partial_arg = StateLogicService$WonderEditor.getStateToGetData(_unsafeGetEditCameraArcballCameraController);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatTool$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerWheelSpeed(partial_arg, param);
                                                                              })))), 0.5);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test bind translation hot-key", (function () {
                        return Wonder_jest.test("key down 1, should set current transform gizmo type is translation", (function (param) {
                                      StateEditorService$WonderEditor.setState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.mark(/* Scale */2, StateEditorService$WonderEditor.getState(/* () */0)));
                                      triggerTranslationHotKeyEvent(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CurrentTransformGizmoSceneViewEditorService$WonderEditor.getCurrentGizmoType(StateEditorService$WonderEditor.getState(/* () */0))), /* Translation */0);
                                    }));
                      }));
                describe("test bind rotation hot-key", (function () {
                        return Wonder_jest.test("key down 2, should set current transform gizmo type is rotation", (function (param) {
                                      StateEditorService$WonderEditor.setState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.mark(/* Scale */2, StateEditorService$WonderEditor.getState(/* () */0)));
                                      triggerRotationHotKeyEvent(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CurrentTransformGizmoSceneViewEditorService$WonderEditor.getCurrentGizmoType(StateEditorService$WonderEditor.getState(/* () */0))), /* Rotation */1);
                                    }));
                      }));
                describe("test bind scale hot-key", (function () {
                        return Wonder_jest.test("key down 3, should set current transform gizmo type is scale", (function (param) {
                                      StateEditorService$WonderEditor.setState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.mark(/* Translation */0, StateEditorService$WonderEditor.getState(/* () */0)));
                                      triggerScaleHotKeyEvent(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CurrentTransformGizmoSceneViewEditorService$WonderEditor.getCurrentGizmoType(StateEditorService$WonderEditor.getState(/* () */0))), /* Scale */2);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
