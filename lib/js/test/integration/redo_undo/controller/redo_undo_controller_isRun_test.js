'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var ControllerTool$WonderEditor = require("../../../unit/composable_component/controller/tool/ControllerTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var MainEditorLeftHeaderTool$WonderEditor = require("../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js");

Wonder_jest.describe("redo_undo: controller isRun", (function (param) {
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
        return Wonder_jest.describe("undo to the state before run", (function (param) {
                      Wonder_jest.test("isRun should still be true", (function (param) {
                              MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                              ControllerTool$WonderEditor.run(/* () */0);
                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ControllerTool$WonderEditor.getIsRun(/* () */0)), true);
                            }));
                      Wonder_jest.describe("test stop", (function (param) {
                              Wonder_jest.test("isRun should be false", (function (param) {
                                      MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                                      ControllerTool$WonderEditor.run(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      ControllerTool$WonderEditor.stop(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ControllerTool$WonderEditor.getIsRun(/* () */0)), false);
                                    }));
                              return Wonder_jest.test("the cancelAnimationFrame is called", (function (param) {
                                            var cancel = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, cancel);
                                            MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                                            ControllerTool$WonderEditor.run(/* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            ControllerTool$WonderEditor.stop(/* () */0);
                                            return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](cancel));
                                          }));
                            }));
                      return Wonder_jest.describe("test redo to the state after run", (function (param) {
                                    return Wonder_jest.test("isRun should still be true", (function (param) {
                                                  MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                                                  ControllerTool$WonderEditor.run(/* () */0);
                                                  RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ControllerTool$WonderEditor.getIsRun(/* () */0)), true);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
