

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";
import * as StateHistoryToolEditor$WonderEditor from "./StateHistoryToolEditor.js";

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
                                        StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                      }));
                        }));
                  return /* () */0;
                }));
          describe("test redo operate", (function () {
                  describe("test redo one step", (function () {
                          return Wonder_jest.test("undo step which from first to zero, redo step which from zero to first", (function () {
                                        Curry._1(simulateFunc, /* () */0);
                                        StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                        StateHistoryToolEditor$WonderEditor.redo(/* () */0);
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
                                        StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                      }));
                        }));
                  describe("test undo two step", (function () {
                          return Wonder_jest.test("step which from second to zero", (function () {
                                        Curry._1(simulateFunc, /* () */0);
                                        StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                        StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                      }));
                        }));
                  return /* () */0;
                }));
          describe("test redo operate", (function () {
                  describe("test redo one step", (function () {
                          return Wonder_jest.test("undo step which from second to zero, redo step which from zero to first", (function () {
                                        Curry._1(simulateFunc, /* () */0);
                                        StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                        StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                        StateHistoryToolEditor$WonderEditor.redo(/* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                      }));
                        }));
                  describe("test redo two step", (function () {
                          return Wonder_jest.test("undo step which from second to zero,redo step which from zero to second", (function () {
                                        Curry._1(simulateFunc, /* () */0);
                                        StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                        StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                        StateHistoryToolEditor$WonderEditor.redo(/* () */0);
                                        StateHistoryToolEditor$WonderEditor.redo(/* () */0);
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
  testRedoUndoOneStep ,
  testRedoUndoTwoStep ,
  
}
/* Wonder_jest Not a pure module */
