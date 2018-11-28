

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";
import * as AllHistoryService$WonderEditor from "../../../../src/service/stateTuple/history/AllHistoryService.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/StateEngineService.js";
import * as StateHistoryService$WonderEditor from "../../../../src/service/stateTuple/history/StateHistoryService.js";

function undoHistoryState($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var editorState = $staropt$star$2 !== undefined ? $staropt$star$2 : StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = $staropt$star$3 !== undefined ? $staropt$star$3 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return StateHistoryService$WonderEditor.refreshStateForHistory(AllHistoryService$WonderEditor.undoHistoryState(store, dispatchFunc, /* tuple */[
                  editorState,
                  engineState
                ]));
}

function redoHistoryState($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var editorState = $staropt$star$2 !== undefined ? $staropt$star$2 : StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = $staropt$star$3 !== undefined ? $staropt$star$3 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return StateHistoryService$WonderEditor.refreshStateForHistory(AllHistoryService$WonderEditor.redoHistoryState(store, dispatchFunc, /* tuple */[
                  editorState,
                  engineState
                ]));
}

function testRedoUndoOneStep(_, describeName, param, component) {
  var afterEachFunc = param[2];
  var beforeEachFunc = param[1];
  var simulateFunc = param[0];
  describe(describeName, (function () {
          beforeEach((function () {
                  return Curry._1(beforeEachFunc, /* () */0);
                }));
          afterEach((function () {
                  return Curry._1(afterEachFunc, /* () */0);
                }));
          describe("test undo operate", (function () {
                  Wonder_jest.test("test not undo", (function () {
                          Curry._1(simulateFunc, /* () */0);
                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                        }));
                  describe("test undo one step", (function () {
                          return Wonder_jest.test("undo step which from first to zero", (function () {
                                        Curry._1(simulateFunc, /* () */0);
                                        undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                      }));
                        }));
                  return /* () */0;
                }));
          describe("test redo operate", (function () {
                  describe("test redo one step", (function () {
                          return Wonder_jest.test("undo step which from first to zero, redo step which from zero to first", (function () {
                                        Curry._1(simulateFunc, /* () */0);
                                        undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                        redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                      }));
                        }));
                  return /* () */0;
                }));
          return /* () */0;
        }));
  return /* () */0;
}

function testRedoUndoTwoStep(_, describeName, param, component) {
  var afterEachFunc = param[2];
  var beforeEachFunc = param[1];
  var simulateFunc = param[0];
  describe(describeName, (function () {
          beforeEach((function () {
                  return Curry._1(beforeEachFunc, /* () */0);
                }));
          afterEach((function () {
                  return Curry._1(afterEachFunc, /* () */0);
                }));
          describe("test undo operate", (function () {
                  Wonder_jest.test("test not undo", (function () {
                          Curry._1(simulateFunc, /* () */0);
                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                        }));
                  describe("test undo one step", (function () {
                          return Wonder_jest.test("step which from second to first", (function () {
                                        Curry._1(simulateFunc, /* () */0);
                                        undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                      }));
                        }));
                  describe("test undo two step", (function () {
                          return Wonder_jest.test("step which from second to zero", (function () {
                                        Curry._1(simulateFunc, /* () */0);
                                        undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                        undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                      }));
                        }));
                  return /* () */0;
                }));
          describe("test redo operate", (function () {
                  describe("test redo one step", (function () {
                          return Wonder_jest.test("undo step which from second to zero, redo step which from zero to first", (function () {
                                        Curry._1(simulateFunc, /* () */0);
                                        undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                        undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                        redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                      }));
                        }));
                  describe("test redo two step", (function () {
                          return Wonder_jest.test("undo step which from second to zero,redo step which from zero to second", (function () {
                                        Curry._1(simulateFunc, /* () */0);
                                        undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                        undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                        redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                        redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                      }));
                        }));
                  return /* () */0;
                }));
          return /* () */0;
        }));
  return /* () */0;
}

export {
  undoHistoryState ,
  redoHistoryState ,
  testRedoUndoOneStep ,
  testRedoUndoTwoStep ,
  
}
/* Wonder_jest Not a pure module */
