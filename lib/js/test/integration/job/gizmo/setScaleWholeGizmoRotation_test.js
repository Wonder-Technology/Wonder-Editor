'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var InitPickingJobTool$WonderEditor = require("../tool/InitPickingJobTool.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var TransformGameObjectTool$WonderEditor = require("../../../tool/TransformGameObjectTool.js");
var EventTransformGizmosTool$WonderEditor = require("../tool/EventTransformGizmosTool.js");
var InitTransformGizmosJobTool$WonderEditor = require("../tool/InitTransformGizmosJobTool.js");
var OperateScaleGizmoSceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js");
var CurrentTransformGizmoSceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js");

Wonder_jest.describe("test set scale whole gizmo rotation", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
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
                      return Wonder_jest.describe("fix \"scale gizmo\"->\"set whole gizmo rotation\" bug:\n\n        description\n        now set scale whole gizmo rotation like Local coordinate system.\n        but this will cause one bug:\n        if drag x axis to scale to negative value, the whole gizmo->rotation will be changed(x axis is reverse!) and cause dithering!", (function (param) {
                                    return Wonder_jest.describe("if drag x axis to scale to negative value", (function (param) {
                                                  Wonder_jest.test("keep whole gizmo->rotation changed(x axis is reverse)", (function (param) {
                                                          _prepare(sandbox);
                                                          EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 100, /* () */0);
                                                          EventTransformGizmosTool$WonderEditor.triggerFirstMouseDragOverEvent(undefined, sandbox, 230, 100, /* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformGameObjectTool$WonderEditor.getEulerAngles(StateLogicService$WonderEditor.getEditorState(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleWholeGizmo), StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* tuple */[
                                                                      0,
                                                                      0,
                                                                      180
                                                                    ]);
                                                        }));
                                                  return Wonder_jest.test("the scale x value should be negative", (function (param) {
                                                                _prepare(sandbox);
                                                                EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 100, /* () */0);
                                                                EventTransformGizmosTool$WonderEditor.triggerFirstMouseDragOverEvent(undefined, sandbox, 230, 100, /* () */0);
                                                                var currentSceneTreeNodeLocalScale1 = InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0);
                                                                EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 220, 100, /* () */0);
                                                                var currentSceneTreeNodeLocalScale2 = InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                                  }));
                    }));
      }));

/*  Not a pure module */
