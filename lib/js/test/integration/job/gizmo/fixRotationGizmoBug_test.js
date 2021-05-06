'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var MouseEventTool$WonderEditor = require("../tool/MouseEventTool.js");
var Vector3Service$WonderEditor = require("../../../../src/service/primitive/Vector3Service.js");
var EventToolEngine$WonderEditor = require("../../../tool/engine/EventToolEngine.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var Vector3ToolEngine$WonderEditor = require("../../../tool/engine/Vector3ToolEngine.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var QuaternionToolEngine$WonderEditor = require("../../../tool/engine/QuaternionToolEngine.js");
var TransformEngineService$WonderEditor = require("../../../../src/service/state/engine/TransformEngineService.js");
var TransformGameObjectTool$WonderEditor = require("../../../tool/TransformGameObjectTool.js");
var PrepareRenderViewJobTool$WonderEditor = require("../tool/PrepareRenderViewJobTool.js");
var InitTransformGizmosJobTool$WonderEditor = require("../tool/InitTransformGizmosJobTool.js");
var BindRotationGizmoEventUtils$WonderEditor = require("../../../../src/core/utils/engine/job/init/initTransformGizmosJob/rotation/BindRotationGizmoEventUtils.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");

Wonder_jest.describe("fix rotation gizmo bug", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                StateLogicService$WonderEditor.getAndSetState(InitTransformGizmosJobTool$WonderEditor.createTransformGizmos);
                return PrepareRenderViewJobTool$WonderEditor.setViewRect(undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.test("\n        load vc.glb;\n        drag vc to scene tree to be v1;\n        select v1 and rotate it by rotation gizmo;\n\n        the local euler angle should be correct.\n        ", (function (param) {
                      var currentSceneTreeNode = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                      var localRotation = /* tuple */[
                        -0.02508343756198883,
                        0,
                        0,
                        0.5063101649284363
                      ];
                      var localEulerAngles = QuaternionToolEngine$WonderEditor.getEulerAngles(localRotation);
                      var engineState$1 = TransformGameObjectTool$WonderEditor.setLocalRotation(currentSceneTreeNode, localRotation, engineState);
                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                      var match = BindRotationGizmoEventUtils$WonderEditor.handleDragStartEvent(EventToolEngine$WonderEditor.buildCustomEvent(Caml_option.some(Caml_option.some(MouseEventTool$WonderEditor.buildMouseEvent(undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0))), undefined, /* () */0), /* tuple */[
                            editorState,
                            engineState$1
                          ]);
                      var engineState$2 = match[1];
                      var engineState$3 = TransformEngineService$WonderEditor.rotateWorldOnAxis(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(currentSceneTreeNode, engineState$2), /* tuple */[
                            45,
                            /* tuple */[
                              1,
                              0,
                              0
                            ]
                          ], engineState$2);
                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(3, TransformGameObjectTool$WonderEditor.getLocalEulerAngles(currentSceneTreeNode, engineState$3))), Vector3Service$WonderEditor.truncate(3, Vector3ToolEngine$WonderEditor.add(/* Float */0, localEulerAngles, /* tuple */[
                                          45,
                                          0,
                                          0
                                        ])));
                    }));
      }));

/*  Not a pure module */
