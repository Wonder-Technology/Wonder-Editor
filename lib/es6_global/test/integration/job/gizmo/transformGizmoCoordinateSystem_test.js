

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as InitPickingJobTool$WonderEditor from "../tool/InitPickingJobTool.js";
import * as TransformGizmosTool$WonderEditor from "../tool/TransformGizmosTool.js";
import * as EventTransformGizmosTool$WonderEditor from "../tool/EventTransformGizmosTool.js";
import * as InitTransformGizmosJobTool$WonderEditor from "../tool/InitTransformGizmosJobTool.js";
import * as CurrentTransformGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js";

describe("test transform gizmo coordinate system job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var prepareGameObject = function (sandbox) {
          return InitTransformGizmosJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 400, 0, 0, /* tuple */[
                      0.1,
                      16.180339813232422,
                      11.755704879760742
                    ], /* tuple */[
                      0,
                      0,
                      0
                    ], /* tuple */[
                      12,
                      45,
                      22
                    ], /* () */0);
        };
        var _prepare = function (sandbox, coordinateSystem, markCurrentTransformGizmoFunc) {
          var gameObject1 = prepareGameObject(sandbox);
          StateLogicService$WonderEditor.getAndSetEditorState(markCurrentTransformGizmoFunc);
          TransformGizmosTool$WonderEditor.setCoordinateSystem(coordinateSystem);
          InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 200, /* () */0);
          return gameObject1;
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test world coordinate system", (function () {
                describe("test translation gizmo", (function () {
                        describe("axis gizmos should be aligned with world axis", (function () {
                                return Wonder_jest.test("\n            pick gameObject;\n            select x axis;\n            mouse move (10px, 0px);\n\n            gameObject should move along +x axis;\n            ", (function () {
                                              _prepare(sandbox, /* World */0, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markTranslation);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 290, 200, /* () */0);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 300, 200, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodePosition(/* () */0)), /* tuple */[
                                                          0.577,
                                                          0,
                                                          0
                                                        ]);
                                            }));
                              }));
                        describe("plane gizmos should be aligned with world axis", (function () {
                                return Wonder_jest.test("\n            pick gameObject;\n            select xy plane;\n            mouse move (10px, 10px);\n\n            gameObject should move along xy plane;\n            ", (function () {
                                              _prepare(sandbox, /* World */0, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markTranslation);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 264, 194, /* () */0);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 274, 204, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodePosition(/* () */0)), /* tuple */[
                                                          0.618,
                                                          -0.967,
                                                          0
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test rotation gizmo", (function () {
                        describe("circle gizmos should be aligned with world axis", (function () {
                                return Wonder_jest.test("\n            pick gameObject;\n            select xy circle;\n            mouse move (10px, 0px);\n\n            gameObject should rotate along z axis;\n            ", (function () {
                                              _prepare(sandbox, /* World */0, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markRotation);
                                              var match = InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeEulerAngles(/* () */0);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 277, 172, /* () */0);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 287, 172, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeEulerAngles(/* () */0)), /* tuple */[
                                                          match[0],
                                                          match[1],
                                                          match[2] - 8.2
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test scale gizmo", (function () {
                        describe("axis gizmos should be aligned with local axis", (function () {
                                return Wonder_jest.test("\n            pick gameObject;\n            select x axis;\n            mouse move (5px, 0px);\n\n            gameObject should scale bigger in the x axis;\n            ", (function () {
                                              _prepare(sandbox, /* World */0, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markScale);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 283, 162, /* () */0);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 288, 162, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0)), /* tuple */[
                                                          1.1,
                                                          1,
                                                          1
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test local coordinate system", (function () {
                describe("test translation gizmo", (function () {
                        describe("axis gizmos should be aligned with local axis", (function () {
                                return Wonder_jest.test("\n            pick gameObject;\n            select x axis;\n            mouse move (10px, 0px);\n\n            gameObject should move along +x axis;\n            ", (function () {
                                              _prepare(sandbox, /* Local */1, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markTranslation);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 268, 182, /* () */0);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 278, 182, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodePosition(/* () */0)), /* tuple */[
                                                          0.224,
                                                          0.091,
                                                          -0.242
                                                        ]);
                                            }));
                              }));
                        describe("plane gizmos should be aligned with local axis", (function () {
                                return Wonder_jest.test("\n            pick gameObject;\n            select xy plane;\n            mouse move (10px, 10px);\n\n            gameObject should move along xy plane;\n            ", (function () {
                                              _prepare(sandbox, /* Local */1, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markTranslation);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 240, 199, /* () */0);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 250, 209, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodePosition(/* () */0)), /* tuple */[
                                                          0.548,
                                                          -1.575,
                                                          -0.419
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test rotation gizmo", (function () {
                        describe("circle gizmos should be aligned with local axis", (function () {
                                return Wonder_jest.test("\n            pick gameObject;\n            select xy circle;\n            mouse move (0px, 10px);\n\n            gameObject should rotate;\n            ", (function () {
                                              _prepare(sandbox, /* Local */1, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markRotation);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 220, 206, /* () */0);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 220, 216, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeEulerAngles(/* () */0)), /* tuple */[
                                                          26.8,
                                                          39.2,
                                                          43.8
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test scale gizmo", (function () {
                        describe("axis gizmos should be aligned with local axis", (function () {
                                return Wonder_jest.test("\n            pick gameObject;\n            select x axis;\n            mouse move (5px, 0px);\n\n            gameObject should scale bigger in the x axis;\n            ", (function () {
                                              _prepare(sandbox, /* Local */1, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markScale);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 283, 162, /* () */0);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 288, 162, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0)), /* tuple */[
                                                          1.1,
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
