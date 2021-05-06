'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var EventTool$WonderEditor = require("../../job/tool/EventTool.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var Vector3Service$WonderEditor = require("../../../../src/service/primitive/Vector3Service.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var InitPickingJobTool$WonderEditor = require("../../job/tool/InitPickingJobTool.js");
var RotationGizmosTool$WonderEditor = require("../../job/tool/RotationGizmosTool.js");
var EventTransformGizmosTool$WonderEditor = require("../../job/tool/EventTransformGizmosTool.js");
var BuildComponentForCurryTool$WonderEditor = require("../../../tool/BuildComponentForCurryTool.js");
var InitTransformGizmosJobTool$WonderEditor = require("../../job/tool/InitTransformGizmosJobTool.js");
var TransformGameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/TransformGameObjectEngineService.js");
var CurrentTransformGizmoSceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js");

Wonder_jest.describe("redo_undo: transform gizmo", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                return EventTool$WonderEditor.restore(/* () */0);
              }));
        Wonder_jest.describe("test translation gizmo", (function (param) {
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
                  EventTransformGizmosTool$WonderEditor.triggerFirstMouseDragOverEvent(undefined, sandbox, 270, 100, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                  return gameObject;
                };
                Wonder_jest.describe("test undo operate", (function (param) {
                        return Wonder_jest.describe("test undo one step", (function (param) {
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
                      }));
                return Wonder_jest.describe("test redo operate", (function (param) {
                              return Wonder_jest.describe("test redo one step", (function (param) {
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
                            }));
              }));
        Wonder_jest.describe("test rotation gizmo", (function (param) {
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
                  EventTransformGizmosTool$WonderEditor.triggerFirstMouseDragOverEvent(undefined, sandbox, 236, 172, /* () */0);
                  RotationGizmosTool$WonderEditor.refreshInspectorTransform(/* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 236, 172, /* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerFirstMouseDragOverEvent(undefined, sandbox, 246, 172, /* () */0);
                  RotationGizmosTool$WonderEditor.refreshInspectorTransform(/* () */0);
                  EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                  return gameObject1;
                };
                Wonder_jest.describe("test undo operate", (function (param) {
                        return Wonder_jest.describe("test undo one step", (function (param) {
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
                      }));
                Wonder_jest.describe("test redo operate", (function (param) {
                        return Wonder_jest.describe("test redo one step", (function (param) {
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
                      }));
                return Wonder_jest.describe("fix bug", (function (param) {
                              return Wonder_jest.test("\n            pick gameObject g1;\n            drag rotate by xy circle gizmo to r1;\n            drag rotate by xy circle gizmo to r2;\n            undo;\n\n            ui->inspector->transform->g1->rotation should be r1\n            ", (function (param) {
                                            _prepare(sandbox);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentForCurryTool$WonderEditor.buildMainEditorTransformComponent(/* () */0));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test scale gizmo", (function (param) {
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
                        EventTransformGizmosTool$WonderEditor.triggerFirstMouseDragOverEvent(undefined, sandbox, 270, 100, /* () */0);
                        EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                        EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 270, 100, /* () */0);
                        EventTransformGizmosTool$WonderEditor.triggerFirstMouseDragOverEvent(undefined, sandbox, 290, 100, /* () */0);
                        EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                        return gameObject;
                      };
                      Wonder_jest.describe("test undo operate", (function (param) {
                              return Wonder_jest.describe("test undo one step", (function (param) {
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
                            }));
                      return Wonder_jest.describe("test redo operate", (function (param) {
                                    return Wonder_jest.describe("test redo one step", (function (param) {
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
                                  }));
                    }));
      }));

/*  Not a pure module */
