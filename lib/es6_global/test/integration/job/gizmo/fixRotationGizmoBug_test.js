

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as MouseEventTool$WonderEditor from "../tool/MouseEventTool.js";
import * as Vector3Service$WonderEditor from "../../../../src/service/primitive/Vector3Service.js";
import * as EventToolEngine$WonderEditor from "../../../tool/engine/EventToolEngine.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as Vector3ToolEngine$WonderEditor from "../../../tool/engine/Vector3ToolEngine.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as QuaternionToolEngine$WonderEditor from "../../../tool/engine/QuaternionToolEngine.js";
import * as TransformEngineService$WonderEditor from "../../../../src/service/state/engine/TransformEngineService.js";
import * as TransformGameObjectTool$WonderEditor from "../../../tool/TransformGameObjectTool.js";
import * as PrepareRenderViewJobTool$WonderEditor from "../tool/PrepareRenderViewJobTool.js";
import * as InitTransformGizmosJobTool$WonderEditor from "../tool/InitTransformGizmosJobTool.js";
import * as BindRotationGizmoEventUtils$WonderEditor from "../../../../src/core/utils/engine/job/init/initTransformGizmosJob/rotation/BindRotationGizmoEventUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";

describe("fix rotation gizmo bug", (function () {
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

export {
  
}
/*  Not a pure module */
