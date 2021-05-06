'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var Vector3Service$Wonderjs = require("wonder.js/lib/js/src/service/atom/Vector3Service.js");
var OptionService$WonderEditor = require("../../../../src/service/primitive/OptionService.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var DirectorToolEngine$WonderEditor = require("../../../tool/engine/DirectorToolEngine.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var TransformGizmosTool$WonderEditor = require("../tool/TransformGizmosTool.js");
var MainEditorCameraTool$WonderEditor = require("../../../tool/MainEditorCameraTool.js");
var TransformGameObjectTool$WonderEditor = require("../../../tool/TransformGameObjectTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var TransformGameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/TransformGameObjectEngineService.js");
var OperateTranslationGizmoSceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js");

Wonder_jest.describe("update transform gizmos job", (function (param) {
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
        return Wonder_jest.describe("if has current scene tree node", (function (param) {
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
                      return Wonder_jest.describe("test translation gizmo", (function (param) {
                                    return Wonder_jest.describe("update translation whole gizmo transform", (function (param) {
                                                  Wonder_jest.describe("move gizmo to current scene tree node position", (function (param) {
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
                                                  Wonder_jest.describe("test rotate gizmo to current scene tree node rotation", (function (param) {
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
                                                          Wonder_jest.describe("if coordinate system is local", (function (param) {
                                                                  return Wonder_jest.describe("rotate", (function (param) {
                                                                                return Wonder_jest.describe("test current scene tree node has parent", (function (param) {
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
                                                                              }));
                                                                }));
                                                          return Wonder_jest.describe("else, not rotate gizmo", (function (param) {
                                                                        return Wonder_jest.describe("test current scene tree node has parent", (function (param) {
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
                                                                      }));
                                                        }));
                                                  return Wonder_jest.describe("scale gizmo based on the distance between current scene tree node and camera", (function (param) {
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
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
