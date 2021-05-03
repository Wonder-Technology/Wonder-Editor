

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as ControllerTool$WonderEditor from "../../controller/tool/ControllerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as GameViewEditorService$WonderEditor from "../../../../../src/service/state/editor/view/gameView/GameViewEditorService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as ArcballCameraControllerToolEngine$WonderEditor from "../../../../tool/engine/ArcballCameraControllerToolEngine.js";

describe("controller run and stop", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                TestTool$WonderEditor.closeContractCheck(/* () */0);
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
              }));
        afterEach((function () {
                TestTool$WonderEditor.openContractCheck(/* () */0);
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test run", (function () {
                Wonder_jest.test("the requestAnimationFrame is called", (function () {
                        var request = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, request);
                        ControllerTool$WonderEditor.run(/* () */0);
                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](request));
                      }));
                describe("bind game view active camera->arcball camera controller event", (function () {
                        return Wonder_jest.test("test", (function () {
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
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(match$1[0], engineState)), true);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test stop", (function () {
                describe("stop current loop", (function () {
                        Wonder_jest.test("the cancelAnimationFrame is called", (function () {
                                var cancel = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, cancel);
                                ControllerTool$WonderEditor.run(/* () */0);
                                ControllerTool$WonderEditor.stop(/* () */0);
                                return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](cancel));
                              }));
                        describe("cancelAnimationFrame should called with current loopId", (function () {
                                Wonder_jest.test("test run once", (function () {
                                        var cancel = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var request = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, request);
                                        Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, cancel);
                                        Sinon.returns(10, request);
                                        ControllerTool$WonderEditor.run(/* () */0);
                                        ControllerTool$WonderEditor.stop(/* () */0);
                                        return Sinon.toCalledWith(/* array */[10], Wonder_jest.Expect[/* expect */0](cancel));
                                      }));
                                return Wonder_jest.test("test run twice", (function () {
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
                        return /* () */0;
                      }));
                describe("unbind game view active camera->arcball camera controller event", (function () {
                        return Wonder_jest.test("test", (function () {
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
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(match$1[0], engineState)), false);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
