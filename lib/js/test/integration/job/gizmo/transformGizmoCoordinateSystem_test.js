'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var InitPickingJobTool$WonderEditor = require("../tool/InitPickingJobTool.js");
var TransformGizmosTool$WonderEditor = require("../tool/TransformGizmosTool.js");
var EventTransformGizmosTool$WonderEditor = require("../tool/EventTransformGizmosTool.js");
var InitTransformGizmosJobTool$WonderEditor = require("../tool/InitTransformGizmosJobTool.js");
var CurrentTransformGizmoSceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js");

Wonder_jest.describe("test transform gizmo coordinate system job", (function (param) {
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
        Wonder_jest.describe("test world coordinate system", (function (param) {
                Wonder_jest.describe("test translation gizmo", (function (param) {
                        Wonder_jest.describe("axis gizmos should be aligned with world axis", (function (param) {
                                return Wonder_jest.test("\n            pick gameObject;\n            select x axis;\n            mouse move (10px, 0px);\n\n            gameObject should move along +x axis;\n            ", (function (param) {
                                              _prepare(sandbox, /* World */0, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markTranslation);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 290, 200, /* () */0);
                                              EventTransformGizmosTool$WonderEditor.triggerFirstMouseDragOverEvent(undefined, sandbox, 300, 200, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodePosition(/* () */0)), /* tuple */[
                                                          0.577,
                                                          0,
                                                          0
                                                        ]);
                                            }));
                              }));
                        return Wonder_jest.describe("plane gizmos should be aligned with world axis", (function (param) {
                                      return Wonder_jest.test("\n            pick gameObject;\n            select xy plane;\n            mouse move (10px, 10px);\n\n            gameObject should move along xy plane;\n            ", (function (param) {
                                                    _prepare(sandbox, /* World */0, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markTranslation);
                                                    EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 264, 194, /* () */0);
                                                    EventTransformGizmosTool$WonderEditor.triggerFirstMouseDragOverEvent(undefined, sandbox, 274, 204, /* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodePosition(/* () */0)), /* tuple */[
                                                                0.618,
                                                                -0.967,
                                                                0
                                                              ]);
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test rotation gizmo", (function (param) {
                        return Wonder_jest.describe("circle gizmos should be aligned with world axis", (function (param) {
                                      return Wonder_jest.test("\n            pick gameObject;\n            select xy circle;\n            mouse move (10px, 0px);\n\n            gameObject should rotate along z axis;\n            ", (function (param) {
                                                    _prepare(sandbox, /* World */0, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markRotation);
                                                    var match = InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeEulerAngles(/* () */0);
                                                    EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 277, 172, /* () */0);
                                                    EventTransformGizmosTool$WonderEditor.triggerFirstMouseDragOverEvent(undefined, sandbox, 287, 172, /* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeEulerAngles(/* () */0)), /* tuple */[
                                                                match[0],
                                                                match[1],
                                                                match[2] - 8.2
                                                              ]);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test scale gizmo", (function (param) {
                              return Wonder_jest.describe("axis gizmos should be aligned with local axis", (function (param) {
                                            return Wonder_jest.test("\n            pick gameObject;\n            select x axis;\n            mouse move (5px, 0px);\n\n            gameObject should scale bigger in the x axis;\n            ", (function (param) {
                                                          _prepare(sandbox, /* World */0, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markScale);
                                                          EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 283, 162, /* () */0);
                                                          EventTransformGizmosTool$WonderEditor.triggerFirstMouseDragOverEvent(undefined, sandbox, 288, 162, /* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0)), /* tuple */[
                                                                      1.1,
                                                                      1,
                                                                      1
                                                                    ]);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test local coordinate system", (function (param) {
                      Wonder_jest.describe("test translation gizmo", (function (param) {
                              Wonder_jest.describe("axis gizmos should be aligned with local axis", (function (param) {
                                      return Wonder_jest.test("\n            pick gameObject;\n            select x axis;\n            mouse move (10px, 0px);\n\n            gameObject should move along +x axis;\n            ", (function (param) {
                                                    _prepare(sandbox, /* Local */1, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markTranslation);
                                                    EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 268, 182, /* () */0);
                                                    EventTransformGizmosTool$WonderEditor.triggerFirstMouseDragOverEvent(undefined, sandbox, 278, 182, /* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodePosition(/* () */0)), /* tuple */[
                                                                0.224,
                                                                0.091,
                                                                -0.242
                                                              ]);
                                                  }));
                                    }));
                              return Wonder_jest.describe("plane gizmos should be aligned with local axis", (function (param) {
                                            return Wonder_jest.test("\n            pick gameObject;\n            select xy plane;\n            mouse move (10px, 10px);\n\n            gameObject should move along xy plane;\n            ", (function (param) {
                                                          _prepare(sandbox, /* Local */1, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markTranslation);
                                                          EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 240, 199, /* () */0);
                                                          EventTransformGizmosTool$WonderEditor.triggerFirstMouseDragOverEvent(undefined, sandbox, 250, 209, /* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodePosition(/* () */0)), /* tuple */[
                                                                      0.548,
                                                                      -1.575,
                                                                      -0.419
                                                                    ]);
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test rotation gizmo", (function (param) {
                              return Wonder_jest.describe("circle gizmos should be aligned with local axis", (function (param) {
                                            return Wonder_jest.test("\n            pick gameObject;\n            select xy circle;\n            mouse move (0px, 10px);\n\n            gameObject should rotate;\n            ", (function (param) {
                                                          _prepare(sandbox, /* Local */1, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markRotation);
                                                          EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 220, 206, /* () */0);
                                                          EventTransformGizmosTool$WonderEditor.triggerFirstMouseDragOverEvent(undefined, sandbox, 220, 216, /* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeEulerAngles(/* () */0)), /* tuple */[
                                                                      26.8,
                                                                      39.2,
                                                                      43.8
                                                                    ]);
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test scale gizmo", (function (param) {
                                    return Wonder_jest.describe("axis gizmos should be aligned with local axis", (function (param) {
                                                  return Wonder_jest.test("\n            pick gameObject;\n            select x axis;\n            mouse move (5px, 0px);\n\n            gameObject should scale bigger in the x axis;\n            ", (function (param) {
                                                                _prepare(sandbox, /* Local */1, CurrentTransformGizmoSceneViewEditorService$WonderEditor.markScale);
                                                                EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 283, 162, /* () */0);
                                                                EventTransformGizmosTool$WonderEditor.triggerFirstMouseDragOverEvent(undefined, sandbox, 288, 162, /* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0)), /* tuple */[
                                                                            1.1,
                                                                            1,
                                                                            1
                                                                          ]);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
