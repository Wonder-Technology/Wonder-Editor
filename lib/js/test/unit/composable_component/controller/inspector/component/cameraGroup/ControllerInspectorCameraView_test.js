'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ControllerTool$WonderEditor = require("../../../tool/ControllerTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var StateEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var GameViewEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/view/gameView/GameViewEditorService.js");
var FlyCameraEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/FlyCameraEngineService.js");
var MainEditorCameraViewTool$WonderEditor = require("../../../../../../integration/inspector/composable_component/sceneTree_inspector/cameraGroup/cameraView/tool/MainEditorCameraViewTool.js");
var ArcballCameraEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/ArcballCameraEngineService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../../../../../integration/inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");

Wonder_jest.describe("controller inspector cameraView", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return ControllerTool$WonderEditor.setIsRun(false);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test camera bind arcballCameraController event", (function (param) {
                return Wonder_jest.describe("test has two cameras with arcballCameraController component", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                                      Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                      return Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                    }));
                              Wonder_jest.describe("if is run", (function (param) {
                                      beforeEach((function () {
                                              return ControllerTool$WonderEditor.setIsRun(true);
                                            }));
                                      return Wonder_jest.test("set the current camera should unbind the other ones' event and bind the current one's event", (function (param) {
                                                    var match = MainEditorInspectorAddComponentTool$WonderEditor.buildTwoAddedArcballCameraControllerCamera(sandbox);
                                                    MainEditorSceneTool$WonderEditor.setSceneSecondCameraToBeCurrentSceneTreeNode(/* () */0);
                                                    MainEditorCameraViewTool$WonderEditor.setCurrentCamera(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicCameraView(/* () */0), undefined, undefined, undefined, /* () */0);
                                                    ControllerTool$WonderEditor.run(/* () */0);
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(match[0], engineState);
                                                    var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(match[1], engineState);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(__x, engineState),
                                                                    ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(__x$1, engineState)
                                                                  ]), /* tuple */[
                                                                false,
                                                                true
                                                              ]);
                                                  }));
                                    }));
                              Wonder_jest.describe("else if is stop", (function (param) {
                                      beforeEach((function () {
                                              return ControllerTool$WonderEditor.setIsRun(false);
                                            }));
                                      return Wonder_jest.test("set the current camera shouldn't bind the current one's event", (function (param) {
                                                    var match = MainEditorInspectorAddComponentTool$WonderEditor.buildTwoAddedArcballCameraControllerCamera(sandbox);
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(match[0], engineState);
                                                    var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(match[1], engineState);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(__x, engineState),
                                                                    ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(__x$1, engineState)
                                                                  ]), /* tuple */[
                                                                false,
                                                                false
                                                              ]);
                                                  }));
                                    }));
                              return Wonder_jest.describe("test change current camera when run", (function (param) {
                                            var _prepareAndExec = function (param) {
                                              var match = MainEditorInspectorAddComponentTool$WonderEditor.buildTwoAddedArcballCameraControllerCamera(sandbox);
                                              var camera2 = match[1];
                                              var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(camera2, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                              StateEngineService$WonderEditor.setState(ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEventForGameView(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                              MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode(/* () */0);
                                              MainEditorCameraViewTool$WonderEditor.setCurrentCamera(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicCameraView(/* () */0), undefined, undefined, undefined, /* () */0);
                                              return /* tuple */[
                                                      match[0],
                                                      camera2
                                                    ];
                                            };
                                            beforeEach((function () {
                                                    return ControllerTool$WonderEditor.run(/* () */0);
                                                  }));
                                            Wonder_jest.test("the target camera should bind event, and the source camera shouldn't bind event", (function (param) {
                                                    var match = _prepareAndExec(/* () */0);
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(match[0], engineState);
                                                    var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(match[1], engineState);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(__x, engineState),
                                                                    ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(__x$1, engineState)
                                                                  ]), /* tuple */[
                                                                true,
                                                                false
                                                              ]);
                                                  }));
                                            return Wonder_jest.test("active source camera->basicCameraView", (function (param) {
                                                          var match = _prepareAndExec(/* () */0);
                                                          var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameViewEditorService$WonderEditor.getActivedBasicCameraView(editorState)), GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(match[0], engineState));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test camera bind flyCameraController event", (function (param) {
                      return Wonder_jest.describe("test has two cameras with flyCameraController component", (function (param) {
                                    beforeEach((function () {
                                            MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                                            Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                            return Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                          }));
                                    Wonder_jest.describe("if is run", (function (param) {
                                            beforeEach((function () {
                                                    return ControllerTool$WonderEditor.setIsRun(true);
                                                  }));
                                            return Wonder_jest.test("set the current camera should unbind the other ones' event and bind the current one's event", (function (param) {
                                                          var match = MainEditorInspectorAddComponentTool$WonderEditor.buildTwoAddedFlyCameraControllerCamera(sandbox);
                                                          MainEditorSceneTool$WonderEditor.setSceneSecondCameraToBeCurrentSceneTreeNode(/* () */0);
                                                          MainEditorCameraViewTool$WonderEditor.setCurrentCamera(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicCameraView(/* () */0), undefined, undefined, undefined, /* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetFlyCameraControllerComponent(match[0], engineState);
                                                          var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetFlyCameraControllerComponent(match[1], engineState);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          FlyCameraEngineService$WonderEditor.isBindFlyCameraControllerEventForGameView(__x, engineState),
                                                                          FlyCameraEngineService$WonderEditor.isBindFlyCameraControllerEventForGameView(__x$1, engineState)
                                                                        ]), /* tuple */[
                                                                      false,
                                                                      true
                                                                    ]);
                                                        }));
                                          }));
                                    Wonder_jest.describe("else if is stop", (function (param) {
                                            beforeEach((function () {
                                                    return ControllerTool$WonderEditor.setIsRun(false);
                                                  }));
                                            return Wonder_jest.test("set the current camera shouldn't bind the current one's event", (function (param) {
                                                          var match = MainEditorInspectorAddComponentTool$WonderEditor.buildTwoAddedFlyCameraControllerCamera(sandbox);
                                                          MainEditorSceneTool$WonderEditor.setSceneSecondCameraToBeCurrentSceneTreeNode(/* () */0);
                                                          MainEditorCameraViewTool$WonderEditor.setCurrentCamera(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicCameraView(/* () */0), undefined, undefined, undefined, /* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetFlyCameraControllerComponent(match[1], engineState);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraEngineService$WonderEditor.isBindFlyCameraControllerEventForGameView(__x, engineState)), false);
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test change current camera when run", (function (param) {
                                                  var _prepareAndExec = function (param) {
                                                    var match = MainEditorInspectorAddComponentTool$WonderEditor.buildTwoAddedFlyCameraControllerCamera(sandbox);
                                                    var camera2 = match[1];
                                                    var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetFlyCameraControllerComponent(camera2, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                                    StateEngineService$WonderEditor.setState(FlyCameraEngineService$WonderEditor.bindFlyCameraControllerEventForGameView(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                                    MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode(/* () */0);
                                                    MainEditorCameraViewTool$WonderEditor.setCurrentCamera(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicCameraView(/* () */0), undefined, undefined, undefined, /* () */0);
                                                    return /* tuple */[
                                                            match[0],
                                                            camera2
                                                          ];
                                                  };
                                                  beforeEach((function () {
                                                          return ControllerTool$WonderEditor.run(/* () */0);
                                                        }));
                                                  Wonder_jest.test("the target camera should bind event, and the source camera shouldn't bind event", (function (param) {
                                                          var match = _prepareAndExec(/* () */0);
                                                          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                          var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetFlyCameraControllerComponent(match[0], engineState);
                                                          var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetFlyCameraControllerComponent(match[1], engineState);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          FlyCameraEngineService$WonderEditor.isBindFlyCameraControllerEventForGameView(__x, engineState),
                                                                          FlyCameraEngineService$WonderEditor.isBindFlyCameraControllerEventForGameView(__x$1, engineState)
                                                                        ]), /* tuple */[
                                                                      true,
                                                                      false
                                                                    ]);
                                                        }));
                                                  return Wonder_jest.test("active source camera->basicCameraView", (function (param) {
                                                                var match = _prepareAndExec(/* () */0);
                                                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameViewEditorService$WonderEditor.getActivedBasicCameraView(editorState)), GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(match[0], engineState));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
