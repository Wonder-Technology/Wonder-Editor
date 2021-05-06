'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var JudgeTool$WonderEditor = require("../../../tool/JudgeTool.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var InitPickingJobTool$WonderEditor = require("../tool/InitPickingJobTool.js");
var GameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var EventTransformGizmosTool$WonderEditor = require("../tool/EventTransformGizmosTool.js");
var BasicMaterialEngineService$WonderEditor = require("../../../../src/service/state/engine/BasicMaterialEngineService.js");
var InitTransformGizmosJobTool$WonderEditor = require("../tool/InitTransformGizmosJobTool.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var OperateScaleGizmoSceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js");
var DataTransformGizmoSceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/transform/DataTransformGizmoSceneViewEditorService.js");
var OperateRotationGizmoSceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/transform/rotation/OperateRotationGizmoSceneViewEditorService.js");
var CurrentTransformGizmoSceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js");
var OperateTranslationGizmoSceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js");

Wonder_jest.describe("set current transform gizmo color", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _isGameObjectAndItsChildrenTargetColor = function (gameObject, targetColor, engineState) {
          return ArrayService$WonderCommonlib.reduceOneParam((function (isTargetColor, material) {
                        if (isTargetColor) {
                          return isTargetColor;
                        } else {
                          return JudgeTool$WonderEditor.isEqual(BasicMaterialEngineService$WonderEditor.getColor(material, engineState), targetColor);
                        }
                      }), false, GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState), engineState));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test translation gizmo", (function (param) {
                var prepareGameObject = function (sandbox) {
                  return InitTransformGizmosJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 200, 0, 0, /* tuple */[
                              0.1,
                              0.1,
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
                  var gameObject1 = prepareGameObject(sandbox);
                  InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                  return gameObject1;
                };
                Wonder_jest.describe("set current gizmo color when drag start", (function (param) {
                        Wonder_jest.describe("test axis gizmo", (function (param) {
                                return Wonder_jest.test("test current gizmo is x axis", (function (param) {
                                              _prepare(sandbox);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 280, 100, /* () */0);
                                              var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                              var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                                  }))), true);
                                            }));
                              }));
                        return Wonder_jest.describe("test plane gizmo", (function (param) {
                                      return Wonder_jest.test("test current gizmo is xy plane", (function (param) {
                                                    _prepare(sandbox);
                                                    EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 90, /* () */0);
                                                    var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                                    var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                                        }))), true);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("restore current gizmo color when drag drop", (function (param) {
                              return Wonder_jest.test("test current gizmo is xy plane", (function (param) {
                                            _prepare(sandbox);
                                            EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 90, /* () */0);
                                            EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                                            var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                            var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                                }))), false);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test rotation gizmo", (function (param) {
                var prepareGameObject = function (sandbox) {
                  return InitTransformGizmosJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 400, 0, 0, /* tuple */[
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
                };
                var _prepare = function (sandbox) {
                  var gameObject1 = prepareGameObject(sandbox);
                  StateLogicService$WonderEditor.getAndSetEditorState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.markRotation);
                  InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 200, /* () */0);
                  return gameObject1;
                };
                Wonder_jest.describe("set current gizmo color when drag start", (function (param) {
                        return Wonder_jest.test("test current gizmo is xy circle", (function (param) {
                                      _prepare(sandbox);
                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 226, 172, /* () */0);
                                      var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                      var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXYCircleGizmo);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                            return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                          }))), true);
                                    }));
                      }));
                return Wonder_jest.describe("restore current gizmo color when drag drop", (function (param) {
                              return Wonder_jest.test("test current gizmo is xy circle", (function (param) {
                                            _prepare(sandbox);
                                            EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 226, 172, /* () */0);
                                            EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                                            var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                            var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXYCircleGizmo);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                                }))), false);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test scale gizmo", (function (param) {
                      var prepareGameObject = function (sandbox) {
                        return InitTransformGizmosJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 200, 0, 0, /* tuple */[
                                    0.1,
                                    0.1,
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
                        var gameObject1 = prepareGameObject(sandbox);
                        StateLogicService$WonderEditor.getAndSetEditorState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.markScale);
                        InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                        return gameObject1;
                      };
                      Wonder_jest.describe("set current gizmo color when drag start", (function (param) {
                              Wonder_jest.describe("test axis gizmo", (function (param) {
                                      return Wonder_jest.test("test current gizmo is x axis", (function (param) {
                                                    _prepare(sandbox);
                                                    EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 280, 100, /* () */0);
                                                    var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                                    var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleXAxisGizmo);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                          return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                                        }))), true);
                                                  }));
                                    }));
                              return Wonder_jest.test("test center box gizmo", (function (param) {
                                            _prepare(sandbox);
                                            EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 250, 100, /* () */0);
                                            var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                            var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleCenterBoxGizmo);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                  return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                                }))), true);
                                          }));
                            }));
                      return Wonder_jest.describe("restore current gizmo color when drag drop", (function (param) {
                                    return Wonder_jest.test("test current gizmo is center box", (function (param) {
                                                  _prepare(sandbox);
                                                  EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 250, 100, /* () */0);
                                                  EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                                                  var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                                  var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleCenterBoxGizmo);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                        return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                                      }))), false);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
