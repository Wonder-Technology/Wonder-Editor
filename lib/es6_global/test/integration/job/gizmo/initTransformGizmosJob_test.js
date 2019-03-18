

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as AppStore$WonderEditor from "../../../../src/core/ui/store/AppStore.js";
import * as ArrayTool$WonderEditor from "../../../tool/ArrayTool.js";
import * as EventTool$WonderEditor from "../tool/EventTool.js";
import * as MainUtils$WonderEditor from "../../../../src/core/utils/engine/MainUtils.js";
import * as ReactTool$WonderEditor from "../../../tool/ui/ReactTool.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as TransformUtils$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/utils/TransformUtils.js";
import * as Vector3Service$WonderEditor from "../../../../src/service/primitive/Vector3Service.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as InitPickingJobTool$WonderEditor from "../tool/InitPickingJobTool.js";
import * as RotationGizmosTool$WonderEditor from "../tool/RotationGizmosTool.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as TransformGizmosTool$WonderEditor from "../tool/TransformGizmosTool.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../src/service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/GameObjectEngineService.js";
import * as TransformGameObjectTool$WonderEditor from "../../../tool/TransformGameObjectTool.js";
import * as CustomEventEditorService$WonderEditor from "../../../../src/service/state/editor/event/CustomEventEditorService.js";
import * as EventTransformGizmosTool$WonderEditor from "../tool/EventTransformGizmosTool.js";
import * as ManageEventEngineService$WonderEditor from "../../../../src/service/state/engine/event/ManageEventEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../src/service/state/engine/MeshRendererEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../src/service/state/engine/BasicMaterialEngineService.js";
import * as InitTransformGizmosJobTool$WonderEditor from "../tool/InitTransformGizmosJobTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as CreateCustomEventEngineService$WonderEditor from "../../../../src/service/state/engine/event/CreateCustomEventEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/TransformGameObjectEngineService.js";
import * as DataScaleGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/scale/DataScaleGizmoSceneViewEditorService.js";
import * as SelectScaleGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/scale/SelectScaleGizmoSceneViewEditorService.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js";
import * as SelectRotationGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/rotation/SelectRotationGizmoSceneViewEditorService.js";
import * as OperateRotationGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/rotation/OperateRotationGizmoSceneViewEditorService.js";
import * as CurrentTransformGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js";
import * as SelectTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/translation/SelectTranslationGizmoSceneViewEditorService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js";

describe("init transform gizmos job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("create transform gizmos", (function () {
                var _prepareState = function (sandbox) {
                  MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n               [\n           {\n             \"name\": \"default\",\n             \"jobs\": [\n               {\n                 \"name\": \"init_transform_gizmos\"\n               }\n             ]\n           }\n         ]\n               ", undefined, undefined, undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
                  MainEditorSceneTool$WonderEditor.prepareGl(sandbox);
                  return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                };
                describe("create translation gizmos", (function () {
                        beforeEach((function () {
                                return _prepareState(sandbox);
                              }));
                        describe("create three axis gizmos", (function () {
                                Wonder_jest.test("translation whole gizmo has three axis gizmos", (function (param) {
                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.hasTargetChildren(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationWholeGizmo(editorState), /* array */[
                                                            OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo(editorState),
                                                            OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYAxisGizmo(editorState),
                                                            OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationZAxisGizmo(editorState)
                                                          ], engineState)), true);
                                      }));
                                describe("test each axis gizmo", (function () {
                                        describe("test y axis gizmo", (function () {
                                                Wonder_jest.test("contain two gameObjects: cone gameObject as arrow and cylinder gameObject as line", (function (param) {
                                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                        var translationYAxisGizmo = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYAxisGizmo(editorState);
                                                        var __x = TransformGizmosTool$WonderEditor.getArrowFromAxisGameObject(translationYAxisGizmo, engineState);
                                                        var __x$1 = TransformGizmosTool$WonderEditor.getLineFromAxisGameObject(translationYAxisGizmo, engineState);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(__x, engineState),
                                                                        GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(__x$1, engineState)
                                                                      ]), /* tuple */[
                                                                    "arrow",
                                                                    "line"
                                                                  ]);
                                                      }));
                                                Wonder_jest.test("set arrow and cylinder->meshRenderer->isRender to false", (function (param) {
                                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                        var translationYAxisGizmo = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYAxisGizmo(editorState);
                                                        var __x = TransformGizmosTool$WonderEditor.getArrowFromAxisGameObject(translationYAxisGizmo, engineState);
                                                        var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(__x, engineState);
                                                        var __x$2 = TransformGizmosTool$WonderEditor.getLineFromAxisGameObject(translationYAxisGizmo, engineState);
                                                        var __x$3 = GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(__x$2, engineState);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        MeshRendererEngineService$WonderEditor.getMeshRendererIsRender(__x$1, engineState),
                                                                        MeshRendererEngineService$WonderEditor.getMeshRendererIsRender(__x$3, engineState)
                                                                      ]), /* tuple */[
                                                                    false,
                                                                    false
                                                                  ]);
                                                      }));
                                                return Wonder_jest.test("test arrow and cylinder->local position", (function (param) {
                                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                              var translationYAxisGizmo = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYAxisGizmo(editorState);
                                                              var __x = TransformGizmosTool$WonderEditor.getArrowFromAxisGameObject(translationYAxisGizmo, engineState);
                                                              var __x$1 = TransformGizmosTool$WonderEditor.getLineFromAxisGameObject(translationYAxisGizmo, engineState);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              TransformGameObjectEngineService$WonderEditor.getLocalPosition(__x, engineState),
                                                                              TransformGameObjectEngineService$WonderEditor.getLocalPosition(__x$1, engineState)
                                                                            ]), /* tuple */[
                                                                          /* tuple */[
                                                                            0,
                                                                            5.5,
                                                                            0
                                                                          ],
                                                                          /* tuple */[
                                                                            0,
                                                                            2.5,
                                                                            0
                                                                          ]
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test axis gizmo color", (function () {
                                        Wonder_jest.test("x axis gizmo is red", (function (param) {
                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                var translationXAxisGizmo = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo(editorState);
                                                var __x = TransformGizmosTool$WonderEditor.getArrowFromAxisGameObject(translationXAxisGizmo, engineState);
                                                var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x, engineState);
                                                var __x$2 = TransformGizmosTool$WonderEditor.getArrowFromAxisGameObject(translationXAxisGizmo, engineState);
                                                var __x$3 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x$2, engineState);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                BasicMaterialEngineService$WonderEditor.getColor(__x$1, engineState),
                                                                BasicMaterialEngineService$WonderEditor.getColor(__x$3, engineState)
                                                              ]), /* tuple */[
                                                            /* array */[
                                                              1,
                                                              0,
                                                              0
                                                            ],
                                                            /* array */[
                                                              1,
                                                              0,
                                                              0
                                                            ]
                                                          ]);
                                              }));
                                        Wonder_jest.test("y axis gizmo is green", (function (param) {
                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                var translationYAxisGizmo = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYAxisGizmo(editorState);
                                                var __x = TransformGizmosTool$WonderEditor.getArrowFromAxisGameObject(translationYAxisGizmo, engineState);
                                                var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x, engineState);
                                                var __x$2 = TransformGizmosTool$WonderEditor.getArrowFromAxisGameObject(translationYAxisGizmo, engineState);
                                                var __x$3 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x$2, engineState);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                BasicMaterialEngineService$WonderEditor.getColor(__x$1, engineState),
                                                                BasicMaterialEngineService$WonderEditor.getColor(__x$3, engineState)
                                                              ]), /* tuple */[
                                                            /* array */[
                                                              0,
                                                              1,
                                                              0
                                                            ],
                                                            /* array */[
                                                              0,
                                                              1,
                                                              0
                                                            ]
                                                          ]);
                                              }));
                                        return Wonder_jest.test("z axis gizmo is blue", (function (param) {
                                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var translationZAxisGizmo = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationZAxisGizmo(editorState);
                                                      var __x = TransformGizmosTool$WonderEditor.getArrowFromAxisGameObject(translationZAxisGizmo, engineState);
                                                      var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x, engineState);
                                                      var __x$2 = TransformGizmosTool$WonderEditor.getArrowFromAxisGameObject(translationZAxisGizmo, engineState);
                                                      var __x$3 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x$2, engineState);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      BasicMaterialEngineService$WonderEditor.getColor(__x$1, engineState),
                                                                      BasicMaterialEngineService$WonderEditor.getColor(__x$3, engineState)
                                                                    ]), /* tuple */[
                                                                  /* array */[
                                                                    0,
                                                                    0,
                                                                    1
                                                                  ],
                                                                  /* array */[
                                                                    0,
                                                                    0,
                                                                    1
                                                                  ]
                                                                ]);
                                                    }));
                                      }));
                                Wonder_jest.test("x axis gizmo should rotate -90 by z axis", (function (param) {
                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var translationXAxisGizmo = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo(editorState);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformGameObjectTool$WonderEditor.getLocalEulerAngles(translationXAxisGizmo, engineState)), /* tuple */[
                                                    0,
                                                    0,
                                                    -90
                                                  ]);
                                      }));
                                Wonder_jest.test("z axis gizmo should rotate 90 by x axis", (function (param) {
                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var translationZAxisGizmo = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationZAxisGizmo(editorState);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformGameObjectTool$WonderEditor.getLocalEulerAngles(translationZAxisGizmo, engineState)), /* tuple */[
                                                    90,
                                                    0,
                                                    0
                                                  ]);
                                      }));
                                describe("test axis gizmos->draw order", (function () {
                                        describe("should draw z->y->x axis gizmo", (function () {
                                                return Wonder_jest.test("translation whole gizmo->children order should be: z,y,x axis gizmo", (function (param) {
                                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                              var translationWholeGizmo = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationWholeGizmo(editorState);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              GameObjectTool$WonderEditor.getChild(translationWholeGizmo, 0, engineState),
                                                                              GameObjectTool$WonderEditor.getChild(translationWholeGizmo, 1, engineState),
                                                                              GameObjectTool$WonderEditor.getChild(translationWholeGizmo, 2, engineState)
                                                                            ]), /* tuple */[
                                                                          OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationZAxisGizmo(editorState),
                                                                          OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYAxisGizmo(editorState),
                                                                          OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo(editorState)
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("create three plane gizmos", (function () {
                                Wonder_jest.test("translation whole gizmo has three plane gizmos", (function (param) {
                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.hasTargetChildren(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationWholeGizmo(editorState), /* array */[
                                                            OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo(editorState),
                                                            OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXZPlaneGizmo(editorState),
                                                            OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYZPlaneGizmo(editorState)
                                                          ], engineState)), true);
                                      }));
                                describe("test each plane gizmo", (function () {
                                        describe("test xy plane gizmo", (function () {
                                                Wonder_jest.test("set plane->isRender to false", (function (param) {
                                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                        var __x = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo(editorState);
                                                        var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(__x, engineState);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererEngineService$WonderEditor.getMeshRendererIsRender(__x$1, engineState)), false);
                                                      }));
                                                return Wonder_jest.test("plane->local position should be ( 0,0,0 )", (function (param) {
                                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                              var __x = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo(editorState);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformGameObjectEngineService$WonderEditor.getLocalPosition(__x, engineState)), /* tuple */[
                                                                          0,
                                                                          0,
                                                                          0
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test plane gizmo color", (function () {
                                        Wonder_jest.test("yz plane gizmo is red", (function (param) {
                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                var __x = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYZPlaneGizmo(editorState);
                                                var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x, engineState);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialEngineService$WonderEditor.getColor(__x$1, engineState)), /* array */[
                                                            1,
                                                            0,
                                                            0
                                                          ]);
                                              }));
                                        Wonder_jest.test("xz axis gizmo is green", (function (param) {
                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                var __x = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXZPlaneGizmo(editorState);
                                                var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x, engineState);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialEngineService$WonderEditor.getColor(__x$1, engineState)), /* array */[
                                                            0,
                                                            1,
                                                            0
                                                          ]);
                                              }));
                                        return Wonder_jest.test("xy plane gizmo is blue", (function (param) {
                                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var __x = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo(editorState);
                                                      var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x, engineState);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialEngineService$WonderEditor.getColor(__x$1, engineState)), /* array */[
                                                                  0,
                                                                  0,
                                                                  1
                                                                ]);
                                                    }));
                                      }));
                                Wonder_jest.test("xz plane gizmo should local rotate (90,0,0)", (function (param) {
                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var __x = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXZPlaneGizmo(editorState);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformGameObjectTool$WonderEditor.getLocalEulerAngles(__x, engineState)), /* tuple */[
                                                    90,
                                                    0,
                                                    0
                                                  ]);
                                      }));
                                describe("test plane gizmos->draw order", (function () {
                                        return Wonder_jest.test("should draw after axis gizmo", (function (param) {
                                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var translationWholeGizmo = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationWholeGizmo(editorState);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      GameObjectTool$WonderEditor.getChild(translationWholeGizmo, 3, engineState),
                                                                      GameObjectTool$WonderEditor.getChild(translationWholeGizmo, 4, engineState),
                                                                      GameObjectTool$WonderEditor.getChild(translationWholeGizmo, 5, engineState)
                                                                    ]), /* tuple */[
                                                                  OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo(editorState),
                                                                  OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXZPlaneGizmo(editorState),
                                                                  OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYZPlaneGizmo(editorState)
                                                                ]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("create rotation gizmos", (function () {
                        beforeEach((function () {
                                return _prepareState(sandbox);
                              }));
                        describe("create three circle gizmos", (function () {
                                Wonder_jest.test("rotation whole gizmo has three circle gizmos", (function (param) {
                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.hasTargetChildren(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationWholeGizmo(editorState), /* array */[
                                                            OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXYCircleGizmo(editorState),
                                                            OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXZCircleGizmo(editorState),
                                                            OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationYZCircleGizmo(editorState)
                                                          ], engineState)), true);
                                      }));
                                describe("test each circle gizmo", (function () {
                                        describe("test xy circle gizmo", (function () {
                                                Wonder_jest.test("set gizmo->meshRenderer->isRender to false", (function (param) {
                                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                        var __x = OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXYCircleGizmo(editorState);
                                                        var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(__x, engineState);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererEngineService$WonderEditor.getMeshRendererIsRender(__x$1, engineState)), false);
                                                      }));
                                                return Wonder_jest.test("set gizmo->drawMode to line_strip", (function (param) {
                                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                              var __x = OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXYCircleGizmo(editorState);
                                                              var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(__x, engineState);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererEngineService$WonderEditor.getDrawMode(__x$1, engineState)), /* Line_strip */3);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test circle gizmo color", (function () {
                                        Wonder_jest.test("yz circle gizmo is red", (function (param) {
                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                var __x = OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationYZCircleGizmo(editorState);
                                                var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x, engineState);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialEngineService$WonderEditor.getColor(__x$1, engineState)), /* array */[
                                                            1,
                                                            0,
                                                            0
                                                          ]);
                                              }));
                                        Wonder_jest.test("xz circle gizmo is green", (function (param) {
                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                var __x = OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXZCircleGizmo(editorState);
                                                var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x, engineState);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialEngineService$WonderEditor.getColor(__x$1, engineState)), /* array */[
                                                            0,
                                                            1,
                                                            0
                                                          ]);
                                              }));
                                        return Wonder_jest.test("xy circle gizmo is blue", (function (param) {
                                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var __x = OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXYCircleGizmo(editorState);
                                                      var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x, engineState);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicMaterialEngineService$WonderEditor.getColor(__x$1, engineState)), /* array */[
                                                                  0,
                                                                  0,
                                                                  1
                                                                ]);
                                                    }));
                                      }));
                                Wonder_jest.test("yz circle gizmo should rotate 90 by y axis", (function (param) {
                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var __x = OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationYZCircleGizmo(editorState);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformGameObjectTool$WonderEditor.getLocalEulerAngles(__x, engineState)), /* tuple */[
                                                    0,
                                                    90,
                                                    0
                                                  ]);
                                      }));
                                return Wonder_jest.test("xz circle gizmo should rotate 90 by x axis", (function (param) {
                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var __x = OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXZCircleGizmo(editorState);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformGameObjectTool$WonderEditor.getLocalEulerAngles(__x, engineState)), /* tuple */[
                                                          90,
                                                          0,
                                                          0
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("create scale gizmos", (function () {
                        beforeEach((function () {
                                return _prepareState(sandbox);
                              }));
                        describe("create three axis gizmos", (function () {
                                Wonder_jest.test("scale whole gizmo has three axis gizmos", (function (param) {
                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.hasTargetChildren(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleWholeGizmo(editorState), /* array */[
                                                            OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleXAxisGizmo(editorState),
                                                            OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleYAxisGizmo(editorState),
                                                            OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleZAxisGizmo(editorState)
                                                          ], engineState)), true);
                                      }));
                                describe("test each axis gizmo", (function () {
                                        describe("test y axis gizmo", (function () {
                                                Wonder_jest.test("contain two gameObjects: cube gameObject as cube and cylinder gameObject as line", (function (param) {
                                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                        var scaleYAxisGizmo = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleYAxisGizmo(editorState);
                                                        var __x = TransformGizmosTool$WonderEditor.getCubeFromAxisGameObject(scaleYAxisGizmo, engineState);
                                                        var __x$1 = TransformGizmosTool$WonderEditor.getLineFromAxisGameObject(scaleYAxisGizmo, engineState);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(__x, engineState),
                                                                        GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(__x$1, engineState)
                                                                      ]), /* tuple */[
                                                                    "cube",
                                                                    "line"
                                                                  ]);
                                                      }));
                                                Wonder_jest.test("set cube and cylinder->meshRenderer->isRender to false", (function (param) {
                                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                        var scaleYAxisGizmo = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleYAxisGizmo(editorState);
                                                        var __x = TransformGizmosTool$WonderEditor.getCubeFromAxisGameObject(scaleYAxisGizmo, engineState);
                                                        var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(__x, engineState);
                                                        var __x$2 = TransformGizmosTool$WonderEditor.getLineFromAxisGameObject(scaleYAxisGizmo, engineState);
                                                        var __x$3 = GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(__x$2, engineState);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        MeshRendererEngineService$WonderEditor.getMeshRendererIsRender(__x$1, engineState),
                                                                        MeshRendererEngineService$WonderEditor.getMeshRendererIsRender(__x$3, engineState)
                                                                      ]), /* tuple */[
                                                                    false,
                                                                    false
                                                                  ]);
                                                      }));
                                                return Wonder_jest.test("test cube and cylinder->local position", (function (param) {
                                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                              var scaleYAxisGizmo = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleYAxisGizmo(editorState);
                                                              var __x = TransformGizmosTool$WonderEditor.getCubeFromAxisGameObject(scaleYAxisGizmo, engineState);
                                                              var __x$1 = TransformGizmosTool$WonderEditor.getLineFromAxisGameObject(scaleYAxisGizmo, engineState);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              TransformGameObjectEngineService$WonderEditor.getLocalPosition(__x, engineState),
                                                                              TransformGameObjectEngineService$WonderEditor.getLocalPosition(__x$1, engineState)
                                                                            ]), /* tuple */[
                                                                          /* tuple */[
                                                                            0,
                                                                            5.5,
                                                                            0
                                                                          ],
                                                                          /* tuple */[
                                                                            0,
                                                                            2.5,
                                                                            0
                                                                          ]
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test axis gizmo color", (function () {
                                        Wonder_jest.test("x axis gizmo is red", (function (param) {
                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                var scaleXAxisGizmo = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleXAxisGizmo(editorState);
                                                var __x = TransformGizmosTool$WonderEditor.getCubeFromAxisGameObject(scaleXAxisGizmo, engineState);
                                                var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x, engineState);
                                                var __x$2 = TransformGizmosTool$WonderEditor.getCubeFromAxisGameObject(scaleXAxisGizmo, engineState);
                                                var __x$3 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x$2, engineState);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                BasicMaterialEngineService$WonderEditor.getColor(__x$1, engineState),
                                                                BasicMaterialEngineService$WonderEditor.getColor(__x$3, engineState)
                                                              ]), /* tuple */[
                                                            /* array */[
                                                              1,
                                                              0,
                                                              0
                                                            ],
                                                            /* array */[
                                                              1,
                                                              0,
                                                              0
                                                            ]
                                                          ]);
                                              }));
                                        Wonder_jest.test("y axis gizmo is green", (function (param) {
                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                var scaleYAxisGizmo = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleYAxisGizmo(editorState);
                                                var __x = TransformGizmosTool$WonderEditor.getCubeFromAxisGameObject(scaleYAxisGizmo, engineState);
                                                var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x, engineState);
                                                var __x$2 = TransformGizmosTool$WonderEditor.getCubeFromAxisGameObject(scaleYAxisGizmo, engineState);
                                                var __x$3 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x$2, engineState);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                BasicMaterialEngineService$WonderEditor.getColor(__x$1, engineState),
                                                                BasicMaterialEngineService$WonderEditor.getColor(__x$3, engineState)
                                                              ]), /* tuple */[
                                                            /* array */[
                                                              0,
                                                              1,
                                                              0
                                                            ],
                                                            /* array */[
                                                              0,
                                                              1,
                                                              0
                                                            ]
                                                          ]);
                                              }));
                                        return Wonder_jest.test("z axis gizmo is blue", (function (param) {
                                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var scaleZAxisGizmo = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleZAxisGizmo(editorState);
                                                      var __x = TransformGizmosTool$WonderEditor.getCubeFromAxisGameObject(scaleZAxisGizmo, engineState);
                                                      var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x, engineState);
                                                      var __x$2 = TransformGizmosTool$WonderEditor.getCubeFromAxisGameObject(scaleZAxisGizmo, engineState);
                                                      var __x$3 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x$2, engineState);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      BasicMaterialEngineService$WonderEditor.getColor(__x$1, engineState),
                                                                      BasicMaterialEngineService$WonderEditor.getColor(__x$3, engineState)
                                                                    ]), /* tuple */[
                                                                  /* array */[
                                                                    0,
                                                                    0,
                                                                    1
                                                                  ],
                                                                  /* array */[
                                                                    0,
                                                                    0,
                                                                    1
                                                                  ]
                                                                ]);
                                                    }));
                                      }));
                                Wonder_jest.test("x axis gizmo should rotate -90 by z axis", (function (param) {
                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var scaleXAxisGizmo = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleXAxisGizmo(editorState);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformGameObjectTool$WonderEditor.getLocalEulerAngles(scaleXAxisGizmo, engineState)), /* tuple */[
                                                    0,
                                                    0,
                                                    -90
                                                  ]);
                                      }));
                                return Wonder_jest.test("z axis gizmo should rotate 90 by x axis", (function (param) {
                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var scaleZAxisGizmo = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleZAxisGizmo(editorState);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformGameObjectTool$WonderEditor.getLocalEulerAngles(scaleZAxisGizmo, engineState)), /* tuple */[
                                                          90,
                                                          0,
                                                          0
                                                        ]);
                                            }));
                              }));
                        describe("create center box gizmo", (function () {
                                Wonder_jest.test("scale whole gizmo has one center box gizmo", (function (param) {
                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.hasTargetChildren(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleWholeGizmo(editorState), /* array */[OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleCenterBoxGizmo(editorState)], engineState)), true);
                                      }));
                                Wonder_jest.test("set center box->isRender to false", (function (param) {
                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var __x = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleCenterBoxGizmo(editorState);
                                        var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(__x, engineState);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererEngineService$WonderEditor.getMeshRendererIsRender(__x$1, engineState)), false);
                                      }));
                                Wonder_jest.test("center box->local position should be ( 0,0,0 )", (function (param) {
                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var __x = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleCenterBoxGizmo(editorState);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformGameObjectEngineService$WonderEditor.getLocalPosition(__x, engineState)), /* tuple */[
                                                    0,
                                                    0,
                                                    0
                                                  ]);
                                      }));
                                Wonder_jest.test("center box gizmo color should be grey", (function (param) {
                                        var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var __x = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleCenterBoxGizmo(editorState);
                                        var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(__x, engineState);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayTool$WonderEditor.truncate(1, BasicMaterialEngineService$WonderEditor.getColor(__x$1, engineState))), DataScaleGizmoSceneViewEditorService$WonderEditor.getCenterBoxColor(/* () */0));
                                      }));
                                describe("test center box gizmos->draw order", (function () {
                                        return Wonder_jest.test("should draw after axis gizmo", (function (param) {
                                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var scaleWholeGizmo = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleWholeGizmo(editorState);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.getChild(scaleWholeGizmo, 3, engineState)), OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleCenterBoxGizmo(editorState));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test move translation plane gizmos", (function () {
                var _prepareState = function (sandbox) {
                  MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_camera\"\n            },\n            {\n              \"name\": \"init_transform_gizmos\"\n            },\n            {\n              \"name\": \"init_picking\"\n            }\n          ]\n        }\n      ]\n            ", "\n              [\n    {\n        \"name\": \"default\",\n        \"jobs\": [\n            {\n                \"name\": \"update_transform_gizmos\"\n            },\n            {\n                \"name\": \"update_transform\"\n            }\n        ]\n    }\n]\n              ", undefined, undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
                  MainEditorSceneTool$WonderEditor.prepareGl(sandbox);
                  return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                };
                var _prepare = function ($staropt$star, $staropt$star$1, $staropt$star$2, sandbox, cameraPos, gameObjectPos, gameObjectEulerAngles, param) {
                  var createGameObjectFunc = $staropt$star !== undefined ? $staropt$star : InitPickingJobTool$WonderEditor.createSphere;
                  var viewWidth = $staropt$star$1 !== undefined ? $staropt$star$1 : 500;
                  var viewHeight = $staropt$star$2 !== undefined ? $staropt$star$2 : 200;
                  _prepareState(sandbox);
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                  var match = InitPickingJobTool$WonderEditor.prepareCamera(cameraPos, /* tuple */[
                        viewWidth,
                        viewHeight
                      ], /* tuple */[
                        editorState,
                        engineState
                      ]);
                  var match$1 = match[1];
                  var match$2 = InitPickingJobTool$WonderEditor.prepareGameObject(gameObjectPos, gameObjectEulerAngles, createGameObjectFunc, match$1[1]);
                  StateEditorService$WonderEditor.setState(match$1[0]);
                  StateEngineService$WonderEditor.setState(match$2[0]);
                  GameObjectTool$WonderEditor.setCurrentSceneTreeNode(match$2[1]);
                  return TransformGizmosTool$WonderEditor.setCoordinateSystem(/* Local */1);
                };
                describe("move based on the camera pos in the local coordinate system of the current scene tree node", (function () {
                        var _getAllPlaneGizmoLocalPos = function (editorState, engineState) {
                          return /* tuple */[
                                  TransformGameObjectEngineService$WonderEditor.getLocalPosition(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo(editorState), engineState),
                                  TransformGameObjectEngineService$WonderEditor.getLocalPosition(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXZPlaneGizmo(editorState), engineState),
                                  TransformGameObjectEngineService$WonderEditor.getLocalPosition(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYZPlaneGizmo(editorState), engineState)
                                ];
                        };
                        var _test = function ($staropt$star, $staropt$star$1, sandbox, cameraPos, allPlaneGizmoLocalPos, param) {
                          var gameObjectPos = $staropt$star !== undefined ? $staropt$star : /* tuple */[
                              2,
                              0,
                              0
                            ];
                          var gameObjectEulerAngles = $staropt$star$1 !== undefined ? $staropt$star$1 : /* tuple */[
                              0,
                              0,
                              0
                            ];
                          _prepare(undefined, undefined, undefined, sandbox, cameraPos, gameObjectPos, gameObjectEulerAngles, /* () */0);
                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                          var match = ManageEventEngineService$WonderEditor.triggerCustomGlobalEvent(CreateCustomEventEngineService$WonderEditor.create(CustomEventEditorService$WonderEditor.getSelectSceneTreeNodeEventName(/* () */0), undefined), engineState);
                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllPlaneGizmoLocalPos(editorState, match[0])), allPlaneGizmoLocalPos);
                        };
                        Wonder_jest.test("test camera is in px,py,pz", (function (param) {
                                return _test(undefined, undefined, sandbox, /* tuple */[
                                            10,
                                            1,
                                            3
                                          ], /* tuple */[
                                            /* tuple */[
                                              1,
                                              1,
                                              0
                                            ],
                                            /* tuple */[
                                              1,
                                              0,
                                              1
                                            ],
                                            /* tuple */[
                                              0,
                                              1,
                                              1
                                            ]
                                          ], /* () */0);
                              }));
                        Wonder_jest.test("test camera is in nx,py,pz", (function (param) {
                                return _test(undefined, undefined, sandbox, /* tuple */[
                                            1,
                                            0.1,
                                            3
                                          ], /* tuple */[
                                            /* tuple */[
                                              -1,
                                              1,
                                              0
                                            ],
                                            /* tuple */[
                                              -1,
                                              0,
                                              1
                                            ],
                                            /* tuple */[
                                              0,
                                              1,
                                              1
                                            ]
                                          ], /* () */0);
                              }));
                        Wonder_jest.test("test camera is in px,ny,pz", (function (param) {
                                return _test(undefined, undefined, sandbox, /* tuple */[
                                            10,
                                            -1,
                                            3
                                          ], /* tuple */[
                                            /* tuple */[
                                              1,
                                              -1,
                                              0
                                            ],
                                            /* tuple */[
                                              1,
                                              0,
                                              1
                                            ],
                                            /* tuple */[
                                              0,
                                              -1,
                                              1
                                            ]
                                          ], /* () */0);
                              }));
                        Wonder_jest.test("test camera is in px,py,nz", (function (param) {
                                return _test(undefined, undefined, sandbox, /* tuple */[
                                            10,
                                            1,
                                            -3
                                          ], /* tuple */[
                                            /* tuple */[
                                              1,
                                              1,
                                              0
                                            ],
                                            /* tuple */[
                                              1,
                                              0,
                                              -1
                                            ],
                                            /* tuple */[
                                              0,
                                              1,
                                              -1
                                            ]
                                          ], /* () */0);
                              }));
                        Wonder_jest.test("test camera is in nx,ny,pz", (function (param) {
                                return _test(undefined, undefined, sandbox, /* tuple */[
                                            1,
                                            -1,
                                            3
                                          ], /* tuple */[
                                            /* tuple */[
                                              -1,
                                              -1,
                                              0
                                            ],
                                            /* tuple */[
                                              -1,
                                              0,
                                              1
                                            ],
                                            /* tuple */[
                                              0,
                                              -1,
                                              1
                                            ]
                                          ], /* () */0);
                              }));
                        Wonder_jest.test("test camera is in nx,py,nz", (function (param) {
                                return _test(undefined, undefined, sandbox, /* tuple */[
                                            1,
                                            1,
                                            -3
                                          ], /* tuple */[
                                            /* tuple */[
                                              -1,
                                              1,
                                              0
                                            ],
                                            /* tuple */[
                                              -1,
                                              0,
                                              -1
                                            ],
                                            /* tuple */[
                                              0,
                                              1,
                                              -1
                                            ]
                                          ], /* () */0);
                              }));
                        Wonder_jest.test("test camera is in px,ny,nz", (function (param) {
                                return _test(undefined, undefined, sandbox, /* tuple */[
                                            10,
                                            -1,
                                            -3
                                          ], /* tuple */[
                                            /* tuple */[
                                              1,
                                              -1,
                                              0
                                            ],
                                            /* tuple */[
                                              1,
                                              0,
                                              -1
                                            ],
                                            /* tuple */[
                                              0,
                                              -1,
                                              -1
                                            ]
                                          ], /* () */0);
                              }));
                        return Wonder_jest.test("test camera is in nx,ny,nz", (function (param) {
                                      return _test(undefined, undefined, sandbox, /* tuple */[
                                                  1,
                                                  -1,
                                                  -3
                                                ], /* tuple */[
                                                  /* tuple */[
                                                    -1,
                                                    -1,
                                                    0
                                                  ],
                                                  /* tuple */[
                                                    -1,
                                                    0,
                                                    -1
                                                  ],
                                                  /* tuple */[
                                                    0,
                                                    -1,
                                                    -1
                                                  ]
                                                ], /* () */0);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("bind event", (function () {
                afterEach((function () {
                        return EventTool$WonderEditor.restore(/* () */0);
                      }));
                describe("bind point drag start event", (function () {
                        describe("test translation gizmo", (function () {
                                var prepareGameObject = function (sandbox) {
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
                                describe("if mouse button isn't left button", (function () {
                                        return Wonder_jest.test("if point down x axis, still not select x axis", (function (param) {
                                                      prepareGameObject(sandbox);
                                                      InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(2, sandbox, 260, 100, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectTranslationGizmoSceneViewEditorService$WonderEditor.isTranslationXAxisGizmoSelected)), false);
                                                    }));
                                      }));
                                describe("else if translation gizmo isn't render, not select gizmo", (function () {
                                        describe("if not has current scene tree node", (function () {
                                                return Wonder_jest.test("not render translation gizmo", (function (param) {
                                                              prepareGameObject(sandbox);
                                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 100, /* () */0);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectTranslationGizmoSceneViewEditorService$WonderEditor.isTranslationXAxisGizmoSelected)), false);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("else", (function () {
                                        var _prepare = function (sandbox) {
                                          var gameObject1 = prepareGameObject(sandbox);
                                          TransformGizmosTool$WonderEditor.setCoordinateSystem(/* Local */1);
                                          InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                          return gameObject1;
                                        };
                                        describe("if point down any axis, select that axis", (function () {
                                                describe("test point down x axis", (function () {
                                                        describe("should mark x axis selected", (function () {
                                                                Wonder_jest.test("test point down arrow", (function (param) {
                                                                        _prepare(sandbox);
                                                                        EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 280, 100, /* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectTranslationGizmoSceneViewEditorService$WonderEditor.isTranslationXAxisGizmoSelected)), true);
                                                                      }));
                                                                Wonder_jest.test("test point down line", (function (param) {
                                                                        _prepare(sandbox);
                                                                        EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 252, 100, /* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectTranslationGizmoSceneViewEditorService$WonderEditor.isTranslationXAxisGizmoSelected)), true);
                                                                      }));
                                                                return Wonder_jest.test("if not point down arrow or line, not mark", (function (param) {
                                                                              _prepare(sandbox);
                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 270, 130, /* () */0);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectTranslationGizmoSceneViewEditorService$WonderEditor.isTranslationXAxisGizmoSelected)), false);
                                                                            }));
                                                              }));
                                                        return /* () */0;
                                                      }));
                                                return /* () */0;
                                              }));
                                        Wonder_jest.test("else, mark not select any axis", (function (param) {
                                                _prepare(sandbox);
                                                EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 290, 70, /* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                StateLogicService$WonderEditor.getEditorState(SelectTranslationGizmoSceneViewEditorService$WonderEditor.isTranslationXAxisGizmoSelected),
                                                                StateLogicService$WonderEditor.getEditorState(SelectTranslationGizmoSceneViewEditorService$WonderEditor.isTranslationYAxisGizmoSelected),
                                                                StateLogicService$WonderEditor.getEditorState(SelectTranslationGizmoSceneViewEditorService$WonderEditor.isTranslationZAxisGizmoSelected)
                                                              ]), /* tuple */[
                                                            false,
                                                            false,
                                                            false
                                                          ]);
                                              }));
                                        describe("fix bug", (function () {
                                                describe("\"select translation gizmo\" should intersect \"with mesh\" instead of \"with aabb\"", (function () {
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
                                                                      12,
                                                                      45,
                                                                      22
                                                                    ], /* () */0);
                                                        };
                                                        var _prepare = function (sandbox) {
                                                          var gameObject1 = prepareGameObject(sandbox);
                                                          TransformGizmosTool$WonderEditor.setCoordinateSystem(/* Local */1);
                                                          InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 200, /* () */0);
                                                          return gameObject1;
                                                        };
                                                        return Wonder_jest.test("test not select x axis", (function (param) {
                                                                      _prepare(sandbox);
                                                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 262, 159, /* () */0);
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectTranslationGizmoSceneViewEditorService$WonderEditor.isTranslationXAxisGizmoSelected)), false);
                                                                    }));
                                                      }));
                                                return /* () */0;
                                              }));
                                        return /* () */0;
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
                                  TransformGizmosTool$WonderEditor.setCoordinateSystem(/* Local */1);
                                  InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 200, /* () */0);
                                  return gameObject1;
                                };
                                describe("if circle gizmo is unused, not select it", (function () {
                                        return Wonder_jest.test("test yz circle gizmo", (function (param) {
                                                      _prepare(sandbox);
                                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 250, 200, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectRotationGizmoSceneViewEditorService$WonderEditor.isYZCircleGizmoSelected)), false);
                                                    }));
                                      }));
                                describe("else if point down the not visible part of the circle gizmo, not select it", (function () {
                                        return Wonder_jest.test("test xy circle gizmo", (function (param) {
                                                      _prepare(sandbox);
                                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 201, 199, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectRotationGizmoSceneViewEditorService$WonderEditor.isXYCircleGizmoSelected)), false);
                                                    }));
                                      }));
                                describe("else if point down any circle gizmo, select it", (function () {
                                        describe("test point down xy circle gizmo", (function () {
                                                describe("if point down", (function () {
                                                        return Wonder_jest.test("should mark circle gizmo selected", (function (param) {
                                                                      _prepare(sandbox);
                                                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 223, 172, /* () */0);
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectRotationGizmoSceneViewEditorService$WonderEditor.isXYCircleGizmoSelected)), true);
                                                                    }));
                                                      }));
                                                return Wonder_jest.test("else, not mark", (function (param) {
                                                              _prepare(sandbox);
                                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 350, 172, /* () */0);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectRotationGizmoSceneViewEditorService$WonderEditor.isXYCircleGizmoSelected)), false);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return Wonder_jest.test("else, mark not select any circle gizmo", (function (param) {
                                              _prepare(sandbox);
                                              StateLogicService$WonderEditor.getAndSetEditorState(SelectRotationGizmoSceneViewEditorService$WonderEditor.onlySelectXZCircleGizmo);
                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 314, 229, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              StateLogicService$WonderEditor.getEditorState(SelectRotationGizmoSceneViewEditorService$WonderEditor.isXYCircleGizmoSelected),
                                                              StateLogicService$WonderEditor.getEditorState(SelectRotationGizmoSceneViewEditorService$WonderEditor.isXZCircleGizmoSelected),
                                                              StateLogicService$WonderEditor.getEditorState(SelectRotationGizmoSceneViewEditorService$WonderEditor.isYZCircleGizmoSelected)
                                                            ]), /* tuple */[
                                                          false,
                                                          false,
                                                          false
                                                        ]);
                                            }));
                              }));
                        describe("test scale gizmo", (function () {
                                var prepareGameObject = function (sandbox) {
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
                                describe("if mouse button isn't left button", (function () {
                                        return Wonder_jest.test("if point down x axis, still not select x axis", (function (param) {
                                                      prepareGameObject(sandbox);
                                                      InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(2, sandbox, 260, 100, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectScaleGizmoSceneViewEditorService$WonderEditor.isScaleXAxisGizmoSelected)), false);
                                                    }));
                                      }));
                                describe("else if scale gizmo isn't render, not select gizmo", (function () {
                                        describe("if not has current scene tree node", (function () {
                                                return Wonder_jest.test("not render scale gizmo", (function (param) {
                                                              prepareGameObject(sandbox);
                                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 100, /* () */0);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectScaleGizmoSceneViewEditorService$WonderEditor.isScaleXAxisGizmoSelected)), false);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("else", (function () {
                                        var _prepare = function (sandbox) {
                                          var gameObject1 = prepareGameObject(sandbox);
                                          InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                          return gameObject1;
                                        };
                                        describe("if point down any axis, select that axis", (function () {
                                                describe("test point down x axis", (function () {
                                                        describe("should mark x axis selected", (function () {
                                                                Wonder_jest.test("test point down cube", (function (param) {
                                                                        _prepare(sandbox);
                                                                        EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 280, 100, /* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectScaleGizmoSceneViewEditorService$WonderEditor.isScaleXAxisGizmoSelected)), true);
                                                                      }));
                                                                Wonder_jest.test("test point down line", (function (param) {
                                                                        _prepare(sandbox);
                                                                        EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 270, 98, /* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectScaleGizmoSceneViewEditorService$WonderEditor.isScaleXAxisGizmoSelected)), true);
                                                                      }));
                                                                return Wonder_jest.test("if not point down cube or line, not mark", (function (param) {
                                                                              _prepare(sandbox);
                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 270, 130, /* () */0);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectScaleGizmoSceneViewEditorService$WonderEditor.isScaleXAxisGizmoSelected)), false);
                                                                            }));
                                                              }));
                                                        return /* () */0;
                                                      }));
                                                return /* () */0;
                                              }));
                                        Wonder_jest.test("else, not select any axis", (function (param) {
                                                _prepare(sandbox);
                                                EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 290, 70, /* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                StateLogicService$WonderEditor.getEditorState(SelectScaleGizmoSceneViewEditorService$WonderEditor.isScaleXAxisGizmoSelected),
                                                                StateLogicService$WonderEditor.getEditorState(SelectScaleGizmoSceneViewEditorService$WonderEditor.isScaleYAxisGizmoSelected),
                                                                StateLogicService$WonderEditor.getEditorState(SelectScaleGizmoSceneViewEditorService$WonderEditor.isScaleZAxisGizmoSelected)
                                                              ]), /* tuple */[
                                                            false,
                                                            false,
                                                            false
                                                          ]);
                                              }));
                                        Wonder_jest.test("if point down center box, select it", (function (param) {
                                                _prepare(sandbox);
                                                EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 250, 100, /* () */0);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectScaleGizmoSceneViewEditorService$WonderEditor.isScaleCenterBoxGizmoSelected)), true);
                                              }));
                                        return Wonder_jest.test("else, not select it", (function (param) {
                                                      _prepare(sandbox);
                                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 230, 100, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEditorState(SelectScaleGizmoSceneViewEditorService$WonderEditor.isScaleCenterBoxGizmoSelected)), false);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("bind point drag over event", (function () {
                        describe("test translation gizmo", (function () {
                                Wonder_jest.test("if mouse button isn't left button, not affect gizmo", (function (param) {
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
                                        InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                        EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 100, /* () */0);
                                        EventTransformGizmosTool$WonderEditor.triggerMouseMove(2, sandbox, 270, 100, /* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodePosition(/* () */0)), /* tuple */[
                                                    0,
                                                    0,
                                                    0
                                                  ]);
                                      }));
                                describe("else", (function () {
                                        describe("affect gizmo", (function () {
                                                var _prepare = function (sandbox, prepareGameObjectFunc) {
                                                  var gameObject1 = Curry._1(prepareGameObjectFunc, sandbox);
                                                  InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                  return gameObject1;
                                                };
                                                describe("test affect plane gizmos", (function () {
                                                        describe("test affect xy plane gizmo", (function () {
                                                                describe("should move current scene tree node along the xy plane", (function () {
                                                                        describe("test current scene tree node not rotate", (function () {
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
                                                                                return Wonder_jest.test("\n            pick gameObject;\n            select xy plane;\n            mouse move (10px, 10px);\n\n            gameObject should move (10px, 10px) along xy plane;\n            ", (function (param) {
                                                                                              _prepare(sandbox, prepareGameObject);
                                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 90, /* () */0);
                                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 270, 100, /* () */0);
                                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodePosition(/* () */0)), /* tuple */[
                                                                                                          0.173,
                                                                                                          -0.173,
                                                                                                          0
                                                                                                        ]);
                                                                                            }));
                                                                              }));
                                                                        return /* () */0;
                                                                      }));
                                                                return /* () */0;
                                                              }));
                                                        return /* () */0;
                                                      }));
                                                describe("test affect axis gizmos", (function () {
                                                        describe("test affect x axis", (function () {
                                                                describe("should move current scene tree node along the x axis", (function () {
                                                                        describe("test current scene tree node not rotate", (function () {
                                                                                var prepareGameObject = function (sandbox) {
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
                                                                                Wonder_jest.test("\n            pick gameObject;\n            select x axis;\n            mouse move (10px, 0px);\n\n            gameObject should move (10px, 0px);\n            ", (function (param) {
                                                                                        _prepare(sandbox, prepareGameObject);
                                                                                        EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 100, /* () */0);
                                                                                        EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 270, 100, /* () */0);
                                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodePosition(/* () */0)), /* tuple */[
                                                                                                    0.173,
                                                                                                    0,
                                                                                                    0
                                                                                                  ]);
                                                                                      }));
                                                                                Wonder_jest.test("\n            pick gameObject;\n            select x axis;\n            mouse move (10px, 20px);\n\n            gameObject should move (10px, 0px);\n            ", (function (param) {
                                                                                        _prepare(sandbox, prepareGameObject);
                                                                                        EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 100, /* () */0);
                                                                                        EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 270, 120, /* () */0);
                                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodePosition(/* () */0)), /* tuple */[
                                                                                                    0.173,
                                                                                                    0,
                                                                                                    0
                                                                                                  ]);
                                                                                      }));
                                                                                return Wonder_jest.test("\n            pick gameObject;\n            select x axis;\n            mouse move (10px, 0px);\n            mouse move (10px, 0px);\n\n            gameObject should move (20px, 0px);\n            ", (function (param) {
                                                                                              _prepare(sandbox, prepareGameObject);
                                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 100, /* () */0);
                                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 270, 100, /* () */0);
                                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 280, 100, /* () */0);
                                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodePosition(/* () */0)), /* tuple */[
                                                                                                          0.173 * 2,
                                                                                                          0,
                                                                                                          0
                                                                                                        ]);
                                                                                            }));
                                                                              }));
                                                                        describe("test current scene tree node rotate", (function () {
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
                                                                                              12,
                                                                                              45,
                                                                                              22
                                                                                            ], /* () */0);
                                                                                };
                                                                                var _prepare = function (sandbox) {
                                                                                  var gameObject1 = prepareGameObject(sandbox);
                                                                                  TransformGizmosTool$WonderEditor.setCoordinateSystem(/* Local */1);
                                                                                  InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 200, /* () */0);
                                                                                  return gameObject1;
                                                                                };
                                                                                return Wonder_jest.test("\n            pick gameObject;\n            select x axis;\n            mouse move (10px, 0px);\n\n            gameObject should move along +x axis;\n            ", (function (param) {
                                                                                              _prepare(sandbox);
                                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 275, 165, /* () */0);
                                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 285, 165, /* () */0);
                                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodePosition(/* () */0)), /* tuple */[
                                                                                                          0.22,
                                                                                                          0.089,
                                                                                                          -0.238
                                                                                                        ]);
                                                                                            }));
                                                                              }));
                                                                        return /* () */0;
                                                                      }));
                                                                describe("should move translation whole gizmo along the x axis", (function () {
                                                                        var prepareGameObject = function (sandbox) {
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
                                                                        return Wonder_jest.test("\n            pick gameObject;\n            select x axis;\n            mouse move (10px, 0px);\n\n            whole gizmo should move (10px, 0px);\n            ", (function (param) {
                                                                                      _prepare(sandbox, prepareGameObject);
                                                                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 100, /* () */0);
                                                                                      EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 270, 100, /* () */0);
                                                                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(3, TransformGameObjectEngineService$WonderEditor.getPosition(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationWholeGizmo(editorState), engineState))), /* tuple */[
                                                                                                  0.173,
                                                                                                  0,
                                                                                                  0
                                                                                                ]);
                                                                                    }));
                                                                      }));
                                                                return /* () */0;
                                                              }));
                                                        describe("test current scene tree node has parent", (function () {
                                                                var prepareGameObject = function (sandbox) {
                                                                  return InitTransformGizmosJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 200, 0, 0, /* tuple */[
                                                                              0,
                                                                              0,
                                                                              3
                                                                            ], /* tuple */[
                                                                              -1,
                                                                              0,
                                                                              0
                                                                            ], /* tuple */[
                                                                              0,
                                                                              23,
                                                                              22
                                                                            ], /* () */0);
                                                                };
                                                                var createParentGameObject = function (gameObjectPos, gameObjectEulerAngles, childGameObject, engineState) {
                                                                  var match = InitPickingJobTool$WonderEditor.prepareGameObject(gameObjectPos, gameObjectEulerAngles, InitPickingJobTool$WonderEditor.createCube, engineState);
                                                                  var parentGameObject = match[1];
                                                                  var engineState$1 = GameObjectTool$WonderEditor.addChild(parentGameObject, childGameObject, match[0]);
                                                                  return /* tuple */[
                                                                          engineState$1,
                                                                          parentGameObject
                                                                        ];
                                                                };
                                                                return Wonder_jest.test("\n            create parent gameObject p1;\n            set p1->local position to (1.0, 0.0, 0.0);\n            set p1->local eulerAngles to (12.0, 22.0, 0.0);\n            add child gameObject c1;\n            set c1->local position to (-1.0, 0.0, 0.0);\n            set c1->local eulerAngles to (0.0, 23.0, 22.0);\n            pick c1;\n            select axis;\n            mouse move (10px, 0px);\n\n            c1 should move along axis in world coordinate system;\n            ", (function (param) {
                                                                              var gameObject1 = prepareGameObject(sandbox);
                                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                              var match = createParentGameObject(/* tuple */[
                                                                                    1,
                                                                                    0,
                                                                                    0
                                                                                  ], /* tuple */[
                                                                                    12,
                                                                                    45,
                                                                                    22
                                                                                  ], gameObject1, engineState);
                                                                              StateEngineService$WonderEditor.setState(match[0]);
                                                                              InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 270, 90, /* () */0);
                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 280, 90, /* () */0);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodePosition(/* () */0)), /* tuple */[
                                                                                          0.344,
                                                                                          -0.265,
                                                                                          0.707
                                                                                        ]);
                                                                            }));
                                                              }));
                                                        return /* () */0;
                                                      }));
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test refresh inspector", (function () {
                                        var _prepare = function (sandbox) {
                                          var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
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
                                          InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                          return dispatchFuncStub;
                                        };
                                        Wonder_jest.test("if select any gizmo, refresh", (function (param) {
                                                var dispatchFuncStub = _prepare(sandbox);
                                                EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 100, /* () */0);
                                                EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 270, 100, /* () */0);
                                                return Sinon.toCalledWith(/* array */[[
                                                              AppStore$WonderEditor.UpdateAction,
                                                              /* Update */[/* array */[/* Inspector */2]]
                                                            ]], Wonder_jest.Expect[/* expect */0](dispatchFuncStub));
                                              }));
                                        return Wonder_jest.test("else, not refresh inspector", (function (param) {
                                                      var dispatchFuncStub = _prepare(sandbox);
                                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 300, 50, /* () */0);
                                                      EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 270, 100, /* () */0);
                                                      return Sinon.toCalledWith(/* array */[[
                                                                    AppStore$WonderEditor.UpdateAction,
                                                                    /* Update */[/* array */[/* Inspector */2]]
                                                                  ]], Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](dispatchFuncStub)));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test rotation gizmo", (function () {
                                var _prepare = function ($staropt$star, sandbox, param) {
                                  var cameraPos = $staropt$star !== undefined ? $staropt$star : /* tuple */[
                                      0,
                                      16.180339813232422,
                                      11.755704879760742
                                    ];
                                  var gameObject1 = InitTransformGizmosJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 400, 0, 0, cameraPos, /* tuple */[
                                        0,
                                        0,
                                        0
                                      ], /* tuple */[
                                        0,
                                        0,
                                        0
                                      ], /* () */0);
                                  StateLogicService$WonderEditor.getAndSetEditorState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.markRotation);
                                  TransformGizmosTool$WonderEditor.setCoordinateSystem(/* Local */1);
                                  InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 200, /* () */0);
                                  return gameObject1;
                                };
                                describe("affect gizmo", (function () {
                                        describe("test affect circle gizmos", (function () {
                                                describe("test affect xy circle", (function () {
                                                        describe("should rotate current scene tree node along the local z axis(compute the angle based on the point projected mouse to xy plane of the circle)", (function () {
                                                                Wonder_jest.test("\n            pick gameObject;\n            select xy circle;\n            mouse move (10px, 0px);\n\n            gameObject should rotate;\n            ", (function (param) {
                                                                        _prepare(undefined, sandbox, /* () */0);
                                                                        EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 226, 172, /* () */0);
                                                                        EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 236, 172, /* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeEulerAngles(/* () */0)), /* tuple */[
                                                                                    0,
                                                                                    0,
                                                                                    -10.4
                                                                                  ]);
                                                                      }));
                                                                return Wonder_jest.test("\n            pick gameObject;\n            select xy circle;\n            mouse move (10px, 0px);\n            mouse move (0px, 10px);\n\n            gameObject should rotate;\n            ", (function (param) {
                                                                              _prepare(undefined, sandbox, /* () */0);
                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 226, 172, /* () */0);
                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 236, 172, /* () */0);
                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 236, 182, /* () */0);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeEulerAngles(/* () */0)), /* tuple */[
                                                                                          0,
                                                                                          0,
                                                                                          -2.2
                                                                                        ]);
                                                                            }));
                                                              }));
                                                        describe("should rotate translation whole gizmo along the local z axis", (function () {
                                                                return Wonder_jest.test("\n            pick gameObject;\n            select xy circle;\n            mouse move (10px, 0px);\n\n            whole gizmo should rotate;\n            ", (function (param) {
                                                                              _prepare(undefined, sandbox, /* () */0);
                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 226, 172, /* () */0);
                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 236, 172, /* () */0);
                                                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(1, TransformGameObjectTool$WonderEditor.getEulerAngles(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationWholeGizmo(editorState), engineState))), /* tuple */[
                                                                                          0,
                                                                                          0,
                                                                                          -10.4
                                                                                        ]);
                                                                            }));
                                                              }));
                                                        return /* () */0;
                                                      }));
                                                describe("test affect xy+xz circle", (function () {
                                                        describe("should rotate current scene tree node along the local z and y axis", (function () {
                                                                return Wonder_jest.test("\n            pick gameObject;\n            select xy circle;\n            mouse move (30px, 0px);\n            select xz circle;\n            mouse move (0px, -20px);\n\n            gameObject should rotate;\n            ", (function (param) {
                                                                              _prepare(undefined, sandbox, /* () */0);
                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 226, 172, /* () */0);
                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 256, 172, /* () */0);
                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 216, 218, /* () */0);
                                                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 216, 198, /* () */0);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeEulerAngles(/* () */0)), /* tuple */[
                                                                                          -0,
                                                                                          9.5,
                                                                                          -33.9
                                                                                        ]);
                                                                            }));
                                                              }));
                                                        return /* () */0;
                                                      }));
                                                describe("fix bug", (function () {
                                                        describe("test camera is look at the negative plane of the circle", (function () {
                                                                describe("test xy circle", (function () {
                                                                        return Wonder_jest.test("\n            pick gameObject;\n            select xy circle;\n            mouse move (30px, 0px);\n\n            gameObject should rotate;\n            ", (function (param) {
                                                                                      _prepare(/* tuple */[
                                                                                            -0.11191991716623306,
                                                                                            14.925893783569336,
                                                                                            -13.311843872070312
                                                                                          ], sandbox, /* () */0);
                                                                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 213, 172, /* () */0);
                                                                                      EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 243, 172, /* () */0);
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeEulerAngles(/* () */0)), /* tuple */[
                                                                                                  0,
                                                                                                  0,
                                                                                                  32.1
                                                                                                ]);
                                                                                    }));
                                                                      }));
                                                                return /* () */0;
                                                              }));
                                                        return /* () */0;
                                                      }));
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test refresh inspector", (function () {
                                        describe("if select any circle gizmo", (function () {
                                                Wonder_jest.test("remove current scene tree node->local euler angle data from editorState", (function (param) {
                                                        _prepare(undefined, sandbox, /* () */0);
                                                        EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 226, 172, /* () */0);
                                                        EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 236, 172, /* () */0);
                                                        RotationGizmosTool$WonderEditor.refreshInspectorTransform(/* () */0);
                                                        EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 246, 172, /* () */0);
                                                        var partial_arg = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                                        var localEulerAngle = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                return TransformUtils$WonderEditor.getTransformRotationData(partial_arg, param);
                                                              }));
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(3, localEulerAngle)), /* tuple */[
                                                                    0,
                                                                    0,
                                                                    -21.94
                                                                  ]);
                                                      }));
                                                return Wonder_jest.test("refresh", (function (param) {
                                                              _prepare(undefined, sandbox, /* () */0);
                                                              var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                              EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 226, 172, /* () */0);
                                                              EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 236, 172, /* () */0);
                                                              return Sinon.toCalledWith(/* array */[[
                                                                            AppStore$WonderEditor.UpdateAction,
                                                                            /* Update */[/* array */[/* Inspector */2]]
                                                                          ]], Wonder_jest.Expect[/* expect */0](dispatchFuncStub));
                                                            }));
                                              }));
                                        return Wonder_jest.test("else, not refresh inspector", (function (param) {
                                                      _prepare(undefined, sandbox, /* () */0);
                                                      var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
                                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 0, 0, /* () */0);
                                                      EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 20, 0, /* () */0);
                                                      return Sinon.toCalledWith(/* array */[[
                                                                    AppStore$WonderEditor.UpdateAction,
                                                                    /* Update */[/* array */[/* Inspector */2]]
                                                                  ]], Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](dispatchFuncStub)));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test scale gizmo", (function () {
                                Wonder_jest.test("if mouse button isn't left button, not affect gizmo", (function (param) {
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
                                        StateLogicService$WonderEditor.getAndSetEditorState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.markScale);
                                        InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                        EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 270, 100, /* () */0);
                                        EventTransformGizmosTool$WonderEditor.triggerMouseMove(2, sandbox, 270, 100, /* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0)), /* tuple */[
                                                    1,
                                                    1,
                                                    1
                                                  ]);
                                      }));
                                describe("else", (function () {
                                        describe("affect gizmo", (function () {
                                                var _prepare = function (sandbox, prepareGameObjectFunc) {
                                                  var gameObject1 = Curry._1(prepareGameObjectFunc, sandbox);
                                                  StateLogicService$WonderEditor.getAndSetEditorState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.markScale);
                                                  InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                                  return gameObject1;
                                                };
                                                describe("test affect center box gizmos", (function () {
                                                        describe("should scale the same value for x,y,z together", (function () {
                                                                var prepareGameObject = function (sandbox) {
                                                                  return InitTransformGizmosJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 200, 0, 0, /* tuple */[
                                                                              0.0,
                                                                              2.0,
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
                                                                describe("based on mouse location in view", (function () {
                                                                        Wonder_jest.test("if mouse move up, scale bigger", (function (param) {
                                                                                _prepare(sandbox, prepareGameObject);
                                                                                EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 250, 100, /* () */0);
                                                                                EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 250, 80, /* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0)), /* tuple */[
                                                                                            1.5,
                                                                                            1.5,
                                                                                            1.5
                                                                                          ]);
                                                                              }));
                                                                        Wonder_jest.test("if mouse move right, scale bigger", (function (param) {
                                                                                _prepare(sandbox, prepareGameObject);
                                                                                EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 250, 100, /* () */0);
                                                                                EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 270, 100, /* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0)), /* tuple */[
                                                                                            1.5,
                                                                                            1.5,
                                                                                            1.5
                                                                                          ]);
                                                                              }));
                                                                        Wonder_jest.test("if mouse move down, scale smaller", (function (param) {
                                                                                _prepare(sandbox, prepareGameObject);
                                                                                EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 250, 100, /* () */0);
                                                                                EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 250, 120, /* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0)), /* tuple */[
                                                                                            0.5,
                                                                                            0.5,
                                                                                            0.5
                                                                                          ]);
                                                                              }));
                                                                        Wonder_jest.test("if mouse move left, scale smaller", (function (param) {
                                                                                _prepare(sandbox, prepareGameObject);
                                                                                EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 250, 100, /* () */0);
                                                                                EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 230, 100, /* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0)), /* tuple */[
                                                                                            0.5,
                                                                                            0.5,
                                                                                            0.5
                                                                                          ]);
                                                                              }));
                                                                        return Wonder_jest.test("should avoid scale to 0", (function (param) {
                                                                                      _prepare(sandbox, prepareGameObject);
                                                                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 250, 100, /* () */0);
                                                                                      EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 210, 100, /* () */0);
                                                                                      var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(3, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                                return TransformGameObjectEngineService$WonderEditor.getLocalScale(partial_arg, param);
                                                                                                              })))), /* tuple */[
                                                                                                  0.001,
                                                                                                  0.001,
                                                                                                  0.001
                                                                                                ]);
                                                                                    }));
                                                                      }));
                                                                return /* () */0;
                                                              }));
                                                        return /* () */0;
                                                      }));
                                                describe("test affect axis gizmos", (function () {
                                                        describe("test affect y axis", (function () {
                                                                describe("should scale current scene tree node in the y axis", (function () {
                                                                        var prepareGameObject = function (sandbox) {
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
                                                                        Wonder_jest.test("\n            pick gameObject;\n            select y axis;\n            mouse move (0px, -5px);\n\n            gameObject should scale bigger in the y axis;\n            ", (function (param) {
                                                                                _prepare(sandbox, prepareGameObject);
                                                                                EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 250, 90, /* () */0);
                                                                                EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 250, 85, /* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0)), /* tuple */[
                                                                                            1,
                                                                                            1.5,
                                                                                            1
                                                                                          ]);
                                                                              }));
                                                                        Wonder_jest.test("\n            pick gameObject;\n            select y axis;\n            mouse move (10px, -5px);\n\n            gameObject should scale to the same value as mouse move (0px, -5px);\n            ", (function (param) {
                                                                                _prepare(sandbox, prepareGameObject);
                                                                                EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 250, 90, /* () */0);
                                                                                EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 260, 85, /* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0)), /* tuple */[
                                                                                            1,
                                                                                            1.5,
                                                                                            1
                                                                                          ]);
                                                                              }));
                                                                        Wonder_jest.test("\n            pick gameObject;\n            select y axis;\n            mouse move (0px, +5px);\n\n            gameObject should scale smaller in the y axis;\n            ", (function (param) {
                                                                                _prepare(sandbox, prepareGameObject);
                                                                                EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 250, 90, /* () */0);
                                                                                EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 250, 95, /* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InitTransformGizmosJobTool$WonderEditor.getCurrentSceneTreeNodeLocalScale(/* () */0)), /* tuple */[
                                                                                            1,
                                                                                            0.5,
                                                                                            1
                                                                                          ]);
                                                                              }));
                                                                        return Wonder_jest.test("\n            pick gameObject;\n            select y axis;\n            mouse move to the position of the whole scale gizmo;\n\n            gameObject should scale to 0.001 in the y axis;\n            ", (function (param) {
                                                                                      _prepare(sandbox, prepareGameObject);
                                                                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 250, 90, /* () */0);
                                                                                      EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 250, 100, /* () */0);
                                                                                      var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(3, StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                                return TransformGameObjectEngineService$WonderEditor.getLocalScale(partial_arg, param);
                                                                                                              })))), /* tuple */[
                                                                                                  1,
                                                                                                  0.001,
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
                                        return /* () */0;
                                      }));
                                describe("test refresh inspector", (function () {
                                        var _prepare = function (sandbox) {
                                          var dispatchFuncStub = ReactTool$WonderEditor.createDispatchFuncStub(sandbox);
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
                                          StateLogicService$WonderEditor.getAndSetEditorState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.markScale);
                                          InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 250, 100, /* () */0);
                                          return dispatchFuncStub;
                                        };
                                        Wonder_jest.test("if select any gizmo, refresh", (function (param) {
                                                var dispatchFuncStub = _prepare(sandbox);
                                                EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 260, 100, /* () */0);
                                                EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 270, 100, /* () */0);
                                                return Sinon.toCalledWith(/* array */[[
                                                              AppStore$WonderEditor.UpdateAction,
                                                              /* Update */[/* array */[/* Inspector */2]]
                                                            ]], Wonder_jest.Expect[/* expect */0](dispatchFuncStub));
                                              }));
                                        return Wonder_jest.test("else, not refresh inspector", (function (param) {
                                                      var dispatchFuncStub = _prepare(sandbox);
                                                      EventTransformGizmosTool$WonderEditor.triggerMouseDown(undefined, sandbox, 300, 50, /* () */0);
                                                      EventTransformGizmosTool$WonderEditor.triggerMouseMove(undefined, sandbox, 270, 100, /* () */0);
                                                      return Sinon.toCalledWith(/* array */[[
                                                                    AppStore$WonderEditor.UpdateAction,
                                                                    /* Update */[/* array */[/* Inspector */2]]
                                                                  ]], Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](dispatchFuncStub)));
                                                    }));
                                      }));
                                return /* () */0;
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
