

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as ControllerTool$WonderEditor from "../../../../integration/redo_undo/tool/ControllerTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";

describe("controller run and stop", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                TestTool$WonderEditor.closeContractCheck(/* () */0);
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
              }));
        afterEach((function () {
                TestTool$WonderEditor.openContractCheck(/* () */0);
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test run", (function () {
                return Wonder_jest.test("the requestAnimationFrame is called", (function () {
                              var request = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, request);
                              ControllerTool$WonderEditor.run(/* () */0);
                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](request));
                            }));
              }));
        describe("test stop", (function () {
                describe("stop current loop", (function () {
                        Wonder_jest.test("the cancelAnimationFrame is called", (function () {
                                var cancel = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, cancel);
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
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
