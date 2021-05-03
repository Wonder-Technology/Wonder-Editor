

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as ControllerTool$WonderEditor from "../../../unit/composable_component/controller/tool/ControllerTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";

describe("redo_undo: controller isRun", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                return Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("undo to the state before run", (function () {
                Wonder_jest.test("isRun should still be true", (function () {
                        MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                        ControllerTool$WonderEditor.run(/* () */0);
                        RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ControllerTool$WonderEditor.getIsRun(/* () */0)), true);
                      }));
                describe("test stop", (function () {
                        Wonder_jest.test("isRun should be false", (function () {
                                MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                                ControllerTool$WonderEditor.run(/* () */0);
                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                ControllerTool$WonderEditor.stop(/* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ControllerTool$WonderEditor.getIsRun(/* () */0)), false);
                              }));
                        return Wonder_jest.test("the cancelAnimationFrame is called", (function () {
                                      var cancel = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, cancel);
                                      MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                                      ControllerTool$WonderEditor.run(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      ControllerTool$WonderEditor.stop(/* () */0);
                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](cancel));
                                    }));
                      }));
                describe("test redo to the state after run", (function () {
                        return Wonder_jest.test("isRun should still be true", (function () {
                                      MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                                      ControllerTool$WonderEditor.run(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ControllerTool$WonderEditor.getIsRun(/* () */0)), true);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
