

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as InitPickingJobTool$WonderEditor from "../tool/InitPickingJobTool.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/state/StateEngineService.js";
import * as TransformGameObjectTool$WonderEditor from "../../../tool/TransformGameObjectTool.js";
import * as EventTransformGizmosTool$WonderEditor from "../tool/EventTransformGizmosTool.js";
import * as InitTransformGizmosJobTool$WonderEditor from "../tool/InitTransformGizmosJobTool.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js";
import * as CurrentTransformGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js";

describe("test set scale whole gizmo rotation", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("fix bug", (function () {
                var _prepareGameObject = function (sandbox) {
                  InitTransformGizmosJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 200, 0, 0, /* tuple */[
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
                  return StateLogicService$WonderEditor.getAndSetEditorState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.markScale);
                };
                var _prepare = function (sandbox) {
                  var gameObject1 = _prepareGameObject(sandbox);
                  InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                  return gameObject1;
                };
                describe("fix \"scale gizmo\"->\"set whole gizmo rotation\" bug:\n\n        description\n        now set scale whole gizmo rotation like Local coordinate system.\n        but this will cause one bug:\n        if drag x axis to scale to negative value, the whole gizmo->rotation will be changed(x axis is reverse!) and cause dithering!", (function () {
                        describe("if drag x axis to scale to negative value", (function () {
                                Wonder_jest.test("keep whole gizmo->rotation changed(x axis is reverse)", (function () {
                                        _prepare(sandbox);
                                        EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 100, /* () */0);
                                        EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 230, 100, /* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformGameObjectTool$WonderEditor.getEulerAngles(StateLogicService$WonderEditor.getEditorState(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleWholeGizmo), StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* tuple */[
                                                    0,
                                                    0,
                                                    180
                                                  ]);
                                      }));
                                return Wonder_jest.test("the scale x value should be negative", (function () {
                                              _prepare(sandbox);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 100, /* () */0);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 230, 100, /* () */0);
                                              var currentSceneTreeNodeLocalScale1 = InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 220, 100, /* () */0);
                                              var currentSceneTreeNodeLocalScale2 = InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              currentSceneTreeNodeLocalScale1,
                                                              currentSceneTreeNodeLocalScale2
                                                            ]), /* tuple */[
                                                          /* tuple */[
                                                            -2,
                                                            1,
                                                            1
                                                          ],
                                                          /* tuple */[
                                                            -3,
                                                            1,
                                                            1
                                                          ]
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
