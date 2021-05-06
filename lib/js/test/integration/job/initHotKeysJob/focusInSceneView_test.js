'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var EventTool$WonderEditor = require("../tool/EventTool.js");
var FloatTool$WonderEditor = require("../../../tool/FloatTool.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var FloatService$WonderEditor = require("../../../../src/service/atom/FloatService.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var Vector3Service$WonderEditor = require("../../../../src/service/primitive/Vector3Service.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var InitHotKeysJobTool$WonderEditor = require("./tool/InitHotKeysJobTool.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var FlyCameraEngineService$WonderEditor = require("../../../../src/service/state/engine/FlyCameraEngineService.js");
var SceneViewEditorService$WonderEditor = require("../../../../src/service/state/editor/view/sceneView/SceneViewEditorService.js");
var TransformEngineService$WonderEditor = require("../../../../src/service/state/engine/TransformEngineService.js");
var ArcballCameraEngineService$WonderEditor = require("../../../../src/service/state/engine/ArcballCameraEngineService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var TransformGameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/TransformGameObjectEngineService.js");

Wonder_jest.describe("test focus in scene view", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("bind document hotKeys event, need add hot-key into SettingTool", (function (param) {
                      var triggerFocusHotKeyEvent = function (param) {
                        InitHotKeysJobTool$WonderEditor.execKeyboardEvent("keydown", 70, undefined, undefined, undefined, /* () */0);
                        return /* () */0;
                      };
                      beforeEach((function () {
                              InitHotKeysJobTool$WonderEditor.prepareKeyboardEvent(sandbox, /* () */0);
                              return Curry._1(EventTool$WonderEditor.buildFakeDocumentSetToWindow, /* () */0);
                            }));
                      afterEach((function () {
                              return EventTool$WonderEditor.restoreHotKeys(/* () */0);
                            }));
                      return Wonder_jest.describe("test bind focus hot-key", (function (param) {
                                    var _prepareSceneGameObject = function (setCurrentGameObjectFunc, targetGameObject, engineState) {
                                      Curry._1(setCurrentGameObjectFunc, /* () */0);
                                      var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(targetGameObject, engineState);
                                      var engineState$1 = TransformEngineService$WonderEditor.setScale(__x, /* tuple */[
                                            3,
                                            1,
                                            1
                                          ], engineState);
                                      var firstChild = MainEditorSceneTool$WonderEditor.getFirstCube(engineState$1);
                                      var secondChild = MainEditorSceneTool$WonderEditor.getSecondCube(engineState$1);
                                      var engineState$2 = TransformGameObjectEngineService$WonderEditor.setLocalPosition(secondChild, /* tuple */[
                                            -3,
                                            0,
                                            0
                                          ], TransformGameObjectEngineService$WonderEditor.setLocalPosition(firstChild, /* tuple */[
                                                2,
                                                0,
                                                0
                                              ], engineState$1));
                                      StateEngineService$WonderEditor.setState(engineState$2);
                                      return /* () */0;
                                    };
                                    Wonder_jest.describe("test editCamera has flyCameraController", (function (param) {
                                            beforeEach((function () {
                                                    MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                                    return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                                  }));
                                            Wonder_jest.describe("calc currentSceneTreeNode's all children and its self->aabb", (function (param) {
                                                    return Wonder_jest.describe("\n              use aabb's center and radius calc flyCamera transform position\n            ", (function (param) {
                                                                  var _getEditCameraTransformPosition = function (param) {
                                                                    var engineState = param[1];
                                                                    var __x = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(param[0]);
                                                                    var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(__x, engineState);
                                                                    return TransformEngineService$WonderEditor.getLocalPosition(__x$1, engineState);
                                                                  };
                                                                  var _getEditCameraTransformLocalEulerAngles = function (param) {
                                                                    var engineState = param[1];
                                                                    var __x = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(param[0]);
                                                                    var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(__x, engineState);
                                                                    return TransformEngineService$WonderEditor.getLocalEulerAngles(__x$1, engineState);
                                                                  };
                                                                  Wonder_jest.test("test the currentSceneTreeNode is scene gameObject", (function (param) {
                                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                          _prepareSceneGameObject((function (param) {
                                                                                  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0));
                                                                                }), MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), engineState);
                                                                          triggerFocusHotKeyEvent(/* () */0);
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(2, StateLogicService$WonderEditor.getStateToGetData(_getEditCameraTransformPosition))), /* tuple */[
                                                                                      -1.5,
                                                                                      0,
                                                                                      22.57
                                                                                    ]);
                                                                        }));
                                                                  Wonder_jest.test("test the currentSceneTreeNode is scene children", (function (param) {
                                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                          _prepareSceneGameObject((function (param) {
                                                                                  return MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                                                }), MainEditorSceneTool$WonderEditor.getFirstCube(engineState), engineState);
                                                                          triggerFocusHotKeyEvent(/* () */0);
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(2, StateLogicService$WonderEditor.getStateToGetData(_getEditCameraTransformPosition))), /* tuple */[
                                                                                      2,
                                                                                      0,
                                                                                      4.15
                                                                                    ]);
                                                                        }));
                                                                  return Wonder_jest.test("test editCamera transform rotation shouldn't change", (function (param) {
                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                _prepareSceneGameObject((function (param) {
                                                                                        return MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                                                      }), MainEditorSceneTool$WonderEditor.getFirstCube(engineState), engineState);
                                                                                var oldLocalEulerAngles = Vector3Service$WonderEditor.truncate(2, StateLogicService$WonderEditor.getStateToGetData(_getEditCameraTransformLocalEulerAngles));
                                                                                triggerFocusHotKeyEvent(/* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(2, StateLogicService$WonderEditor.getStateToGetData(_getEditCameraTransformLocalEulerAngles))), oldLocalEulerAngles);
                                                                              }));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("set speed", (function (param) {
                                                          var _unsafeGetEditCameraFlyCameraController = function (param) {
                                                            return GameObjectComponentEngineService$WonderEditor.unsafeGetFlyCameraControllerComponent(SceneViewEditorService$WonderEditor.unsafeGetEditCamera(param[0]), param[1]);
                                                          };
                                                          Wonder_jest.test("set edit camera->fly move speed", (function (param) {
                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                  _prepareSceneGameObject((function (param) {
                                                                          return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0));
                                                                        }), MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), engineState);
                                                                  triggerFocusHotKeyEvent(/* () */0);
                                                                  var cameraController = StateLogicService$WonderEditor.getStateToGetData(_unsafeGetEditCameraFlyCameraController);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatTool$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                            return FlyCameraEngineService$WonderEditor.unsafeGetFlyCameraControllerMoveSpeed(cameraController, param);
                                                                                          })))), 0.226);
                                                                }));
                                                          return Wonder_jest.test("set edit camera->fly wheel speed", (function (param) {
                                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                        _prepareSceneGameObject((function (param) {
                                                                                return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0));
                                                                              }), MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), engineState);
                                                                        triggerFocusHotKeyEvent(/* () */0);
                                                                        var partial_arg = StateLogicService$WonderEditor.getStateToGetData(_unsafeGetEditCameraFlyCameraController);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatTool$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                  return FlyCameraEngineService$WonderEditor.unsafeGetFlyCameraControllerWheelSpeed(partial_arg, param);
                                                                                                })))), 0.451);
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test editCamera has arcballCameraController", (function (param) {
                                                  var _unsafeGetEditCameraArcballCameraController = function (param) {
                                                    return GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(SceneViewEditorService$WonderEditor.unsafeGetEditCamera(param[0]), param[1]);
                                                  };
                                                  var _getDistance = function (param) {
                                                    var engineState = param[1];
                                                    var __x = ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance(_unsafeGetEditCameraArcballCameraController(/* tuple */[
                                                              param[0],
                                                              engineState
                                                            ]), engineState);
                                                    return FloatService$WonderEditor.truncateFloatValue(__x, 3);
                                                  };
                                                  var _getTarget = function (param) {
                                                    var engineState = param[1];
                                                    return Vector3Service$WonderEditor.truncate(3, ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTarget(_unsafeGetEditCameraArcballCameraController(/* tuple */[
                                                                        param[0],
                                                                        engineState
                                                                      ]), engineState));
                                                  };
                                                  beforeEach((function () {
                                                          MainEditorSceneTool$WonderEditor.createDefaultSceneWithArcballCamera(sandbox);
                                                          return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                                        }));
                                                  Wonder_jest.describe("calc currentSceneTreeNode's all children and its self->aabb", (function (param) {
                                                          Wonder_jest.describe("\n              use aabb's center as arcball camera controller target;\n              use aabb's radius * factor as arcball camera controller distance;\n            ", (function (param) {
                                                                  Wonder_jest.test("test the currentSceneTreeNode is scene gameObject", (function (param) {
                                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                          _prepareSceneGameObject((function (param) {
                                                                                  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0));
                                                                                }), MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), engineState);
                                                                          triggerFocusHotKeyEvent(/* () */0);
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                          StateLogicService$WonderEditor.getStateToGetData(_getDistance),
                                                                                          StateLogicService$WonderEditor.getStateToGetData(_getTarget)
                                                                                        ]), /* tuple */[
                                                                                      22.569,
                                                                                      /* tuple */[
                                                                                        -1.5,
                                                                                        0,
                                                                                        0
                                                                                      ]
                                                                                    ]);
                                                                        }));
                                                                  return Wonder_jest.test("test the currentSceneTreeNode is scene children", (function (param) {
                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                _prepareSceneGameObject((function (param) {
                                                                                        return MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                                                                      }), MainEditorSceneTool$WonderEditor.getFirstCube(engineState), engineState);
                                                                                triggerFocusHotKeyEvent(/* () */0);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                StateLogicService$WonderEditor.getStateToGetData(_getDistance),
                                                                                                StateLogicService$WonderEditor.getStateToGetData(_getTarget)
                                                                                              ]), /* tuple */[
                                                                                            4.146,
                                                                                            /* tuple */[
                                                                                              2,
                                                                                              0,
                                                                                              0
                                                                                            ]
                                                                                          ]);
                                                                              }));
                                                                }));
                                                          Wonder_jest.test("set edit camera->arcball move speed", (function (param) {
                                                                  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                  _prepareSceneGameObject((function (param) {
                                                                          return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0));
                                                                        }), MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), engineState);
                                                                  triggerFocusHotKeyEvent(/* () */0);
                                                                  var cameraController = StateLogicService$WonderEditor.getStateToGetData(_unsafeGetEditCameraArcballCameraController);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  FloatTool$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                              return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerMoveSpeedX(cameraController, param);
                                                                                            }))),
                                                                                  FloatTool$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                              return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerMoveSpeedY(cameraController, param);
                                                                                            })))
                                                                                ]), /* tuple */[
                                                                              0.226,
                                                                              0.226
                                                                            ]);
                                                                }));
                                                          return Wonder_jest.test("set edit camera->arcball wheel speed", (function (param) {
                                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                        _prepareSceneGameObject((function (param) {
                                                                                return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0));
                                                                              }), MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), engineState);
                                                                        triggerFocusHotKeyEvent(/* () */0);
                                                                        var partial_arg = StateLogicService$WonderEditor.getStateToGetData(_unsafeGetEditCameraArcballCameraController);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatTool$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                  return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerWheelSpeed(partial_arg, param);
                                                                                                })))), 0.451);
                                                                      }));
                                                        }));
                                                  return Wonder_jest.describe("fix bug", (function (param) {
                                                                return Wonder_jest.describe("if currentSceneTreeNode and its all children has no geometry component", (function (param) {
                                                                              var _prepareAndExec = function (param) {
                                                                                GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getCameraInDefaultScene));
                                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                                var camera = MainEditorSceneTool$WonderEditor.getCameraInDefaultScene(engineState);
                                                                                var pos = /* tuple */[
                                                                                  2,
                                                                                  0,
                                                                                  0
                                                                                ];
                                                                                var engineState$1 = TransformGameObjectEngineService$WonderEditor.setLocalPosition(camera, pos, engineState);
                                                                                StateEngineService$WonderEditor.setState(engineState$1);
                                                                                triggerFocusHotKeyEvent(/* () */0);
                                                                                return pos;
                                                                              };
                                                                              Wonder_jest.test("use currentSceneTreeNode->position as target", (function (param) {
                                                                                      var pos = _prepareAndExec(/* () */0);
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getStateToGetData(_getTarget)), pos);
                                                                                    }));
                                                                              Wonder_jest.test("use fixed value as distance", (function (param) {
                                                                                      _prepareAndExec(/* () */0);
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getStateToGetData(_getDistance)), 3);
                                                                                    }));
                                                                              return Wonder_jest.test("set wheel speed to 0.5", (function (param) {
                                                                                            _prepareAndExec(/* () */0);
                                                                                            var partial_arg = StateLogicService$WonderEditor.getStateToGetData(_unsafeGetEditCameraArcballCameraController);
                                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatTool$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                                      return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerWheelSpeed(partial_arg, param);
                                                                                                                    })))), 0.5);
                                                                                          }));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
