'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../tool/TestTool.js");
var CanvasTool$WonderEditor = require("../../../atom_component/canvas/tool/CanvasTool.js");
var ResizeUtils$WonderEditor = require("../../../../../src/core/utils/ui/ResizeUtils.js");
var OptionService$WonderEditor = require("../../../../../src/service/primitive/OptionService.js");
var ControllerTool$WonderEditor = require("../tool/ControllerTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var GameViewEditorService$WonderEditor = require("../../../../../src/service/state/editor/view/gameView/GameViewEditorService.js");
var FlyCameraEngineService$WonderEditor = require("../../../../../src/service/state/engine/FlyCameraEngineService.js");
var ArcballCameraEngineService$WonderEditor = require("../../../../../src/service/state/engine/ArcballCameraEngineService.js");
var DeviceManagerEngineService$WonderEditor = require("../../../../../src/service/state/engine/DeviceManagerEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var FlyCameraControllerToolEngine$WonderEditor = require("../../../../tool/engine/FlyCameraControllerToolEngine.js");
var ArcballCameraControllerToolEngine$WonderEditor = require("../../../../tool/engine/ArcballCameraControllerToolEngine.js");

Wonder_jest.describe("controller run and stop", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                TestTool$WonderEditor.closeContractCheck(/* () */0);
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
              }));
        afterEach((function () {
                TestTool$WonderEditor.openContractCheck(/* () */0);
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test run", (function (param) {
                Wonder_jest.test("the requestAnimationFrame is called", (function (param) {
                        var request = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, request);
                        ControllerTool$WonderEditor.run(/* () */0);
                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](request));
                      }));
                Wonder_jest.describe("bind game view active camera->fly camera controller event", (function (param) {
                        return Wonder_jest.test("test", (function (param) {
                                      Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                      var match = FlyCameraControllerToolEngine$WonderEditor.createGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                      var match$1 = match[3];
                                      var basicCameraView = match$1[1];
                                      StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                              return GameViewEditorService$WonderEditor.setActivedBasicCameraView(basicCameraView, param);
                                            }));
                                      StateEngineService$WonderEditor.setState(match[0]);
                                      ControllerTool$WonderEditor.run(/* () */0);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraEngineService$WonderEditor.isBindFlyCameraControllerEventForGameView(match$1[0], engineState)), true);
                                    }));
                      }));
                return Wonder_jest.describe("bind game view active camera->arcball camera controller event", (function (param) {
                              return Wonder_jest.test("test", (function (param) {
                                            Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                            var match = ArcballCameraControllerToolEngine$WonderEditor.createGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                            var match$1 = match[3];
                                            var basicCameraView = match$1[1];
                                            StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                    return GameViewEditorService$WonderEditor.setActivedBasicCameraView(basicCameraView, param);
                                                  }));
                                            StateEngineService$WonderEditor.setState(match[0]);
                                            ControllerTool$WonderEditor.run(/* () */0);
                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(match$1[0], engineState)), true);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test stop", (function (param) {
                Wonder_jest.describe("stop current loop", (function (param) {
                        Wonder_jest.test("the cancelAnimationFrame is called", (function (param) {
                                var cancel = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, cancel);
                                ControllerTool$WonderEditor.run(/* () */0);
                                ControllerTool$WonderEditor.stop(/* () */0);
                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](cancel));
                              }));
                        return Wonder_jest.describe("cancelAnimationFrame should called with current loopId", (function (param) {
                                      Wonder_jest.test("test run once", (function (param) {
                                              var cancel = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var request = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, request);
                                              Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, cancel);
                                              Sinon.returns(10, request);
                                              ControllerTool$WonderEditor.run(/* () */0);
                                              ControllerTool$WonderEditor.stop(/* () */0);
                                              return Sinon.toCalledWith(/* array */[10], Wonder_jest.Expect[/* expect */0](cancel));
                                            }));
                                      return Wonder_jest.test("test run twice", (function (param) {
                                                    var cancel = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var request = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, request);
                                                    Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, cancel);
                                                    Sinon.returns(10, Sinon.onCall(0, request));
                                                    Sinon.returns(11, Sinon.onCall(1, request));
                                                    ControllerTool$WonderEditor.run(/* () */0);
                                                    ControllerTool$WonderEditor.stop(/* () */0);
                                                    ControllerTool$WonderEditor.run(/* () */0);
                                                    ControllerTool$WonderEditor.stop(/* () */0);
                                                    return Sinon.toCalledWith(/* array */[11], Wonder_jest.Expect[/* expect */0](Sinon.getCall(1, cancel)));
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("unbind game view active camera->fly camera controller event", (function (param) {
                        return Wonder_jest.test("test", (function (param) {
                                      Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                      Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                      var match = FlyCameraControllerToolEngine$WonderEditor.createGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                      var match$1 = match[3];
                                      var basicCameraView = match$1[1];
                                      StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                              return GameViewEditorService$WonderEditor.setActivedBasicCameraView(basicCameraView, param);
                                            }));
                                      StateEngineService$WonderEditor.setState(match[0]);
                                      ControllerTool$WonderEditor.run(/* () */0);
                                      ControllerTool$WonderEditor.stop(/* () */0);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FlyCameraEngineService$WonderEditor.isBindFlyCameraControllerEventForGameView(match$1[0], engineState)), false);
                                    }));
                      }));
                return Wonder_jest.describe("unbind game view active camera->arcball camera controller event", (function (param) {
                              return Wonder_jest.test("test", (function (param) {
                                            Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                            Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                            var match = ArcballCameraControllerToolEngine$WonderEditor.createGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                            var match$1 = match[3];
                                            var basicCameraView = match$1[1];
                                            StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                                    return GameViewEditorService$WonderEditor.setActivedBasicCameraView(basicCameraView, param);
                                                  }));
                                            StateEngineService$WonderEditor.setState(match[0]);
                                            ControllerTool$WonderEditor.run(/* () */0);
                                            ControllerTool$WonderEditor.stop(/* () */0);
                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(match$1[0], engineState)), false);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      return Wonder_jest.test("if view size changed when run, resize screen when stop", (function (param) {
                                    Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                    Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                    CanvasTool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox, 300, 500, undefined, undefined, undefined, /* () */0);
                                    ResizeUtils$WonderEditor.resizeMainCanvasScreen(/* () */0);
                                    ControllerTool$WonderEditor.run(/* () */0);
                                    CanvasTool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox, 400, 500, undefined, undefined, undefined, /* () */0);
                                    ResizeUtils$WonderEditor.resizeMainCanvasScreen(/* () */0);
                                    var resizedViewport = OptionService$WonderEditor.unsafeGet(DeviceManagerEngineService$WonderEditor.getViewport(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                    ControllerTool$WonderEditor.stop(/* () */0);
                                    var viewportAfterStop = OptionService$WonderEditor.unsafeGet(DeviceManagerEngineService$WonderEditor.getViewport(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](viewportAfterStop), resizedViewport);
                                  }));
                    }));
      }));

/*  Not a pure module */
