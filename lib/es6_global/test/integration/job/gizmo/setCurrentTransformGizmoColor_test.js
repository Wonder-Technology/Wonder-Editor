

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as JudgeTool$WonderEditor from "../../../tool/JudgeTool.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-imgui/node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as InitPickingJobTool$WonderEditor from "../tool/InitPickingJobTool.js";
import * as GameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/GameObjectEngineService.js";
import * as EventTransformGizmosTool$WonderEditor from "../tool/EventTransformGizmosTool.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../src/service/state/engine/BasicMaterialEngineService.js";
import * as InitTransformGizmosJobTool$WonderEditor from "../tool/InitTransformGizmosJobTool.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js";
import * as DataTransformGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/DataTransformGizmoSceneViewEditorService.js";
import * as OperateRotationGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/rotation/OperateRotationGizmoSceneViewEditorService.js";
import * as CurrentTransformGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js";

describe("set current transform gizmo color", (function () {
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
        describe("test translation gizmo", (function () {
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
                describe("set current gizmo color when drag start", (function () {
                        describe("test axis gizmo", (function () {
                                return Wonder_jest.test("test current gizmo is x axis", (function () {
                                              _prepare(sandbox);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 280, 100, /* () */0);
                                              var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                              var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                                  }))), true);
                                            }));
                              }));
                        describe("test plane gizmo", (function () {
                                return Wonder_jest.test("test current gizmo is xy plane", (function () {
                                              _prepare(sandbox);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 90, /* () */0);
                                              var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                              var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                                  }))), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("restore current gizmo color when drag drop", (function () {
                        return Wonder_jest.test("test current gizmo is xy plane", (function () {
                                      _prepare(sandbox);
                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 90, /* () */0);
                                      EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                                      var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                      var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                            return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                          }))), false);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test rotation gizmo", (function () {
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
                describe("set current gizmo color when drag start", (function () {
                        return Wonder_jest.test("test current gizmo is xy circle", (function () {
                                      _prepare(sandbox);
                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 226, 172, /* () */0);
                                      var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                      var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXYCircleGizmo);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                            return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                          }))), true);
                                    }));
                      }));
                describe("restore current gizmo color when drag drop", (function () {
                        return Wonder_jest.test("test current gizmo is xy circle", (function () {
                                      _prepare(sandbox);
                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 226, 172, /* () */0);
                                      EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                                      var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                      var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXYCircleGizmo);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                            return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                          }))), false);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test scale gizmo", (function () {
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
                describe("set current gizmo color when drag start", (function () {
                        describe("test axis gizmo", (function () {
                                return Wonder_jest.test("test current gizmo is x axis", (function () {
                                              _prepare(sandbox);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 280, 100, /* () */0);
                                              var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                              var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleXAxisGizmo);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                                  }))), true);
                                            }));
                              }));
                        return Wonder_jest.test("test center box gizmo", (function () {
                                      _prepare(sandbox);
                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 250, 100, /* () */0);
                                      var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                      var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleCenterBoxGizmo);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                            return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                          }))), true);
                                    }));
                      }));
                describe("restore current gizmo color when drag drop", (function () {
                        return Wonder_jest.test("test current gizmo is center box", (function () {
                                      _prepare(sandbox);
                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 250, 100, /* () */0);
                                      EventTransformGizmosTool$WonderEditor.triggerMouseUp(undefined, undefined, undefined, sandbox, /* () */0);
                                      var partial_arg = DataTransformGizmoSceneViewEditorService$WonderEditor.getColorForCurrentGizmo(/* () */0);
                                      var partial_arg$1 = StateLogicService$WonderEditor.getEditorState(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleCenterBoxGizmo);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                            return _isGameObjectAndItsChildrenTargetColor(partial_arg$1, partial_arg, param);
                                                          }))), false);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
