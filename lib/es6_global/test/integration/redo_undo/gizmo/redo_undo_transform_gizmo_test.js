

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as EventTool$WonderEditor from "../../job/tool/EventTool.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";
import * as Vector3Service$WonderEditor from "../../../../src/service/primitive/Vector3Service.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as InitPickingJobTool$WonderEditor from "../../job/tool/InitPickingJobTool.js";
import * as RotationGizmosTool$WonderEditor from "../../job/tool/RotationGizmosTool.js";
import * as EventTransformGizmosTool$WonderEditor from "../../job/tool/EventTransformGizmosTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";
import * as InitTransformGizmosJobTool$WonderEditor from "../../job/tool/InitTransformGizmosJobTool.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/TransformGameObjectEngineService.js";
import * as CurrentTransformGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js";

describe("redo_undo: transform gizmo", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                return EventTool$WonderEditor.restore(/* () */0);
              }));
        describe("test translation gizmo", (function () {
                var _prepareGameObject = function (sandbox) {
                  return InitTransformGizmosJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 200, 0, 0, /* tuple */[
                              0,
                              0,
                              3
                            ], /* tuple */[
                              0,
                              0,
                              0
                            ], /* tuple */[
                              0,
                              0,
                              0
                            ], /* () */0);
                };
                var _prepare = function (sandbox) {
                  var gameObject = _prepareGameObject(sandbox);
                  InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 100, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 270, 100, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                  return gameObject;
                };
                describe("test undo operate", (function () {
                        describe("test undo one step", (function () {
                                return Wonder_jest.test("\n            pick gameObject g1;\n            drag gizmo to (0.173,0,0);\n            undo;\n\n            g1->localPosition should be (0,0,0);\n            ", (function (param) {
                                              var gameObject = _prepare(sandbox);
                                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(3, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return TransformGameObjectEngineService$WonderEditor.getLocalPosition(gameObject, param);
                                                                      })))), /* tuple */[
                                                          0,
                                                          0,
                                                          0
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test redo operate", (function () {
                        describe("test redo one step", (function () {
                                return Wonder_jest.test("\n            pick gameObject g1;\n            drag gizmo to (0.173,0,0);\n            undo;\n            redo\n\n            g1->localPosition should be (0.173,0,0);\n            ", (function (param) {
                                              var gameObject = _prepare(sandbox);
                                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                              RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(3, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return TransformGameObjectEngineService$WonderEditor.getLocalPosition(gameObject, param);
                                                                      })))), /* tuple */[
                                                          0.173,
                                                          0,
                                                          0
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test rotation gizmo", (function () {
                var _prepare = function (sandbox) {
                  var gameObject1 = InitTransformGizmosJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 400, 0, 0, /* tuple */[
                        0,
                        16.180339813232422,
                        11.755704879760742
                      ], /* tuple */[
                        0,
                        0,
                        0
                      ], /* tuple */[
                        0,
                        0,
                        0
                      ], /* () */0);
                  StateLogicService$WonderEditor.getAndSetEditorState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.markRotation);
                  InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 200, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 226, 172, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 236, 172, /* () */0);
                  RotationGizmosTool$WonderEditor.refreshInspectorTransform(/* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 236, 172, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 246, 172, /* () */0);
                  RotationGizmosTool$WonderEditor.refreshInspectorTransform(/* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                  return gameObject1;
                };
                describe("test undo operate", (function () {
                        describe("test undo one step", (function () {
                                return Wonder_jest.test("\n               pick gameObject g1;\n               drag rotate by xy circle gizmo to r1;\n               drag rotate by xy circle gizmo to r2;\n               undo;\n\n               g1->localEulerAngle should be r1;\n               ", (function (param) {
                                              var gameObject = _prepare(sandbox);
                                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getGameObjectLocalEulerAngles(gameObject)), /* tuple */[
                                                          0,
                                                          0,
                                                          -10.4
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test redo operate", (function () {
                        describe("test redo one step", (function () {
                                return Wonder_jest.test("\n            pick gameObject g1;\n            drag rotate by xy circle gizmo to r1;\n            drag rotate by xy circle gizmo to r2;\n            undo;\n            undo;\n            redo;\n\n            g1->localEulerAngle should be r1;\n            ", (function (param) {
                                              var gameObject = _prepare(sandbox);
                                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                              RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getGameObjectLocalEulerAngles(gameObject)), /* tuple */[
                                                          0,
                                                          0,
                                                          -10.4
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("fix bug", (function () {
                        return Wonder_jest.test("\n            pick gameObject g1;\n            drag rotate by xy circle gizmo to r1;\n            drag rotate by xy circle gizmo to r2;\n            undo;\n\n            ui->inspector->transform->g1->rotation should be r1\n            ", (function (param) {
                                      _prepare(sandbox);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentForCurryTool$WonderEditor.buildMainEditorTransformComponent(/* () */0));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test scale gizmo", (function () {
                var _prepareGameObject = function (sandbox) {
                  return InitTransformGizmosJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 200, 0, 0, /* tuple */[
                              0,
                              0,
                              3
                            ], /* tuple */[
                              0,
                              0,
                              0
                            ], /* tuple */[
                              0,
                              0,
                              0
                            ], /* () */0);
                };
                var _prepare = function (sandbox) {
                  var gameObject = _prepareGameObject(sandbox);
                  StateLogicService$WonderEditor.getAndSetEditorState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.markScale);
                  InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 100, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 270, 100, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 270, 100, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 290, 100, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                  return gameObject;
                };
                describe("test undo operate", (function () {
                        describe("test undo one step", (function () {
                                return Wonder_jest.test("\n            pick gameObject g1;\n            drag gizmo->x axis over +x axis to s1;\n            drag gizmo->x axis over +x axis to s2;\n            undo;\n\n            g1->localScale should be s1;\n            ", (function (param) {
                                              var gameObject = _prepare(sandbox);
                                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(3, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return TransformGameObjectEngineService$WonderEditor.getLocalScale(gameObject, param);
                                                                      })))), /* tuple */[
                                                          2,
                                                          1,
                                                          1
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test redo operate", (function () {
                        describe("test redo one step", (function () {
                                return Wonder_jest.test("\n            pick gameObject g1;\n            drag gizmo->x axis over +x axis to s1;\n            drag gizmo->x axis over +x axis to s2;\n            undo;\n            undo;\n            redo;\n\n            g1->localScale should be s1;\n            ", (function (param) {
                                              var gameObject = _prepare(sandbox);
                                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                              RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(3, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return TransformGameObjectEngineService$WonderEditor.getLocalScale(gameObject, param);
                                                                      })))), /* tuple */[
                                                          2,
                                                          1,
                                                          1
                                                        ]);
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
