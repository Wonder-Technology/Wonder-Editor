

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as MainUtils$WonderEditor from "../../../../src/core/utils/engine/MainUtils.js";
import * as Vector3Service$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as OptionService$WonderEditor from "../../../../src/service/primitive/OptionService.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as DirectorToolEngine$WonderEditor from "../../../tool/engine/DirectorToolEngine.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as TransformGizmosTool$WonderEditor from "../tool/TransformGizmosTool.js";
import * as MainEditorCameraTool$WonderEditor from "../../../tool/MainEditorCameraTool.js";
import * as TransformGameObjectTool$WonderEditor from "../../../tool/TransformGameObjectTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/TransformGameObjectEngineService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../src/service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js";

describe("update transform gizmos job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function (param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_transform_gizmos\"\n            }\n          ]\n        }\n      ]\n            ", "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n{\"name\": \"update_transform_gizmos\" }\n           ]\n         }\n       ]\n             ", undefined, undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
          return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                _prepareState(/* () */0);
                return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("if has current scene tree node", (function () {
                var _prepareForTestParent = function (param) {
                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                  var currentSceneTreeNode = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                  var parent = MainEditorSceneTool$WonderEditor.getSecondCube(engineState);
                  var engineState$1 = GameObjectTool$WonderEditor.addChild(parent, currentSceneTreeNode, engineState);
                  return /* tuple */[
                          engineState$1,
                          /* tuple */[
                            currentSceneTreeNode,
                            parent
                          ]
                        ];
                };
                beforeEach((function () {
                        return MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                      }));
                describe("test translation gizmo", (function () {
                        describe("update translation whole gizmo transform", (function () {
                                describe("move gizmo to current scene tree node position", (function () {
                                        return Wonder_jest.test("test current scene tree node has parent", (function (param) {
                                                      var match = _prepareForTestParent(/* () */0);
                                                      var match$1 = match[1];
                                                      var pos1 = /* tuple */[
                                                        1,
                                                        2,
                                                        3
                                                      ];
                                                      var pos2 = /* tuple */[
                                                        3,
                                                        2,
                                                        3
                                                      ];
                                                      var engineState = TransformGameObjectEngineService$WonderEditor.setLocalPosition(match$1[1], pos2, TransformGameObjectEngineService$WonderEditor.setLocalPosition(match$1[0], pos1, match[0]));
                                                      var engineState$1 = DirectorToolEngine$WonderEditor.runWithDefaultTime(engineState);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformGameObjectEngineService$WonderEditor.getPosition(StateLogicService$WonderEditor.getEditorState(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationWholeGizmo), engineState$1)), Vector3Service$Wonderjs.add(/* Float */0, pos1, pos2));
                                                    }));
                                      }));
                                describe("test rotate gizmo to current scene tree node rotation", (function () {
                                        var _setRotate = function (engineState, param) {
                                          return TransformGameObjectTool$WonderEditor.setLocalEulerAngles(param[1], /* tuple */[
                                                      3,
                                                      2,
                                                      3
                                                    ], TransformGameObjectTool$WonderEditor.setLocalEulerAngles(param[0], /* tuple */[
                                                          1,
                                                          2,
                                                          3
                                                        ], engineState));
                                        };
                                        var _judge = function (engineState, param, targetEulerAngles) {
                                          var engineState$1 = DirectorToolEngine$WonderEditor.runWithDefaultTime(engineState);
                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformGameObjectTool$WonderEditor.getEulerAngles(StateLogicService$WonderEditor.getEditorState(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationWholeGizmo), engineState$1)), targetEulerAngles);
                                        };
                                        describe("if coordinate system is local", (function () {
                                                describe("rotate", (function () {
                                                        describe("test current scene tree node has parent", (function () {
                                                                var _judge$1 = function (engineState, param) {
                                                                  return _judge(engineState, /* tuple */[
                                                                              param[0],
                                                                              param[1]
                                                                            ], /* tuple */[
                                                                              4.10583,
                                                                              3.8374,
                                                                              6.10583
                                                                            ]);
                                                                };
                                                                Wonder_jest.test("test only rotate current scene tree node and its parent", (function (param) {
                                                                        var match = _prepareForTestParent(/* () */0);
                                                                        var match$1 = match[1];
                                                                        var parent = match$1[1];
                                                                        var currentSceneTreeNode = match$1[0];
                                                                        TransformGizmosTool$WonderEditor.setCoordinateSystem(/* Local */1);
                                                                        var engineState = _setRotate(match[0], /* tuple */[
                                                                              currentSceneTreeNode,
                                                                              parent
                                                                            ]);
                                                                        return _judge$1(engineState, /* tuple */[
                                                                                    currentSceneTreeNode,
                                                                                    parent
                                                                                  ]);
                                                                      }));
                                                                return Wonder_jest.test("test translation+rotate current scene tree node and its parent", (function (param) {
                                                                              var match = _prepareForTestParent(/* () */0);
                                                                              var match$1 = match[1];
                                                                              var parent = match$1[1];
                                                                              var currentSceneTreeNode = match$1[0];
                                                                              TransformGizmosTool$WonderEditor.setCoordinateSystem(/* Local */1);
                                                                              var engineState = TransformGameObjectEngineService$WonderEditor.setLocalPosition(parent, /* tuple */[
                                                                                    3,
                                                                                    2,
                                                                                    3
                                                                                  ], TransformGameObjectEngineService$WonderEditor.setLocalPosition(currentSceneTreeNode, /* tuple */[
                                                                                        1,
                                                                                        2,
                                                                                        3
                                                                                      ], match[0]));
                                                                              var engineState$1 = _setRotate(engineState, /* tuple */[
                                                                                    currentSceneTreeNode,
                                                                                    parent
                                                                                  ]);
                                                                              return _judge$1(engineState$1, /* tuple */[
                                                                                          currentSceneTreeNode,
                                                                                          parent
                                                                                        ]);
                                                                            }));
                                                              }));
                                                        return /* () */0;
                                                      }));
                                                return /* () */0;
                                              }));
                                        describe("else, not rotate gizmo", (function () {
                                                describe("test current scene tree node has parent", (function () {
                                                        return Wonder_jest.test("test only rotate current scene tree node and its parent", (function (param) {
                                                                      var match = _prepareForTestParent(/* () */0);
                                                                      var match$1 = match[1];
                                                                      var parent = match$1[1];
                                                                      var currentSceneTreeNode = match$1[0];
                                                                      TransformGizmosTool$WonderEditor.setCoordinateSystem(/* World */0);
                                                                      var engineState = _setRotate(match[0], /* tuple */[
                                                                            currentSceneTreeNode,
                                                                            parent
                                                                          ]);
                                                                      var engineState$1 = engineState;
                                                                      var param$1 = /* tuple */[
                                                                        currentSceneTreeNode,
                                                                        parent
                                                                      ];
                                                                      return _judge(engineState$1, /* tuple */[
                                                                                  param$1[0],
                                                                                  param$1[1]
                                                                                ], /* tuple */[
                                                                                  0,
                                                                                  0,
                                                                                  0
                                                                                ]);
                                                                    }));
                                                      }));
                                                return /* () */0;
                                              }));
                                        return /* () */0;
                                      }));
                                describe("scale gizmo based on the distance between current scene tree node and camera", (function () {
                                        return Wonder_jest.test("the distance is more far, the scale of gizmo is more large", (function (param) {
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var currentSceneTreeNode = MainEditorSceneTool$WonderEditor.getFirstCube(engineState);
                                                      var camera = OptionService$WonderEditor.unsafeGet(MainEditorCameraTool$WonderEditor.getCurrentCameraGameObject(engineState));
                                                      var translationWholeGizmo = StateLogicService$WonderEditor.getEditorState(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationWholeGizmo);
                                                      var engineState$1 = TransformGameObjectEngineService$WonderEditor.setLocalPosition(camera, /* tuple */[
                                                            1,
                                                            0,
                                                            0
                                                          ], TransformGameObjectEngineService$WonderEditor.setLocalPosition(currentSceneTreeNode, /* tuple */[
                                                                0,
                                                                0,
                                                                0
                                                              ], engineState));
                                                      var engineState$2 = DirectorToolEngine$WonderEditor.runWithDefaultTime(engineState$1);
                                                      var localScale1 = TransformGameObjectTool$WonderEditor.getLocalScale(translationWholeGizmo, engineState$2);
                                                      var engineState$3 = TransformGameObjectEngineService$WonderEditor.setLocalPosition(camera, /* tuple */[
                                                            2,
                                                            0,
                                                            0
                                                          ], engineState$2);
                                                      var engineState$4 = DirectorToolEngine$WonderEditor.runWithDefaultTime(engineState$3);
                                                      var localScale2 = TransformGameObjectTool$WonderEditor.getLocalScale(translationWholeGizmo, engineState$4);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      localScale1,
                                                                      localScale2
                                                                    ]), /* tuple */[
                                                                  /* tuple */[
                                                                    0.03,
                                                                    0.03,
                                                                    0.03
                                                                  ],
                                                                  /* tuple */[
                                                                    0.06,
                                                                    0.06,
                                                                    0.06
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
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
