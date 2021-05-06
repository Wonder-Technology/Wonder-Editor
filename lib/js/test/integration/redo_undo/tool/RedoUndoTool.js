'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../tool/TestTool.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var AllHistoryService$WonderEditor = require("../../../../src/service/stateTuple/history/AllHistoryService.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var StateHistoryService$WonderEditor = require("../../../../src/service/stateTuple/history/StateHistoryService.js");

function undoHistoryState($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var editorState = $staropt$star$2 !== undefined ? $staropt$star$2 : StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = $staropt$star$3 !== undefined ? $staropt$star$3 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return StateHistoryService$WonderEditor.refreshStateForHistory(AllHistoryService$WonderEditor.undoHistoryState(uiState, dispatchFunc, /* tuple */[
                  editorState,
                  engineState
                ]));
}

function redoHistoryState($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var editorState = $staropt$star$2 !== undefined ? $staropt$star$2 : StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = $staropt$star$3 !== undefined ? $staropt$star$3 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return StateHistoryService$WonderEditor.refreshStateForHistory(AllHistoryService$WonderEditor.redoHistoryState(uiState, dispatchFunc, /* tuple */[
                  editorState,
                  engineState
                ]));
}

function testRedoUndoOneStep(sandbox, describeName, param, component) {
  var afterEachFunc = param[2];
  var beforeEachFunc = param[1];
  var simulateFunc = param[0];
  return Wonder_jest.describe(describeName, (function (param) {
                beforeEach((function () {
                        return Curry._1(beforeEachFunc, /* () */0);
                      }));
                afterEach((function () {
                        return Curry._1(afterEachFunc, /* () */0);
                      }));
                Wonder_jest.describe("test undo operate", (function (param) {
                        Wonder_jest.test("test not undo", (function (param) {
                                Curry._1(simulateFunc, /* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                              }));
                        return Wonder_jest.describe("test undo one step", (function (param) {
                                      return Wonder_jest.test("undo step which from first to zero", (function (param) {
                                                    Curry._1(simulateFunc, /* () */0);
                                                    undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test redo operate", (function (param) {
                              return Wonder_jest.describe("test redo one step", (function (param) {
                                            return Wonder_jest.test("undo step which from first to zero, redo step which from zero to first", (function (param) {
                                                          Curry._1(simulateFunc, /* () */0);
                                                          undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                                        }));
                                          }));
                            }));
              }));
}

function testRedoUndoTwoStep(sandbox, describeName, param, component) {
  var afterEachFunc = param[2];
  var beforeEachFunc = param[1];
  var simulateFunc = param[0];
  return Wonder_jest.describe(describeName, (function (param) {
                beforeEach((function () {
                        return Curry._1(beforeEachFunc, /* () */0);
                      }));
                afterEach((function () {
                        return Curry._1(afterEachFunc, /* () */0);
                      }));
                Wonder_jest.describe("test undo operate", (function (param) {
                        Wonder_jest.test("test not undo", (function (param) {
                                Curry._1(simulateFunc, /* () */0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                              }));
                        Wonder_jest.describe("test undo one step", (function (param) {
                                return Wonder_jest.test("step which from second to first", (function (param) {
                                              Curry._1(simulateFunc, /* () */0);
                                              undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                            }));
                              }));
                        return Wonder_jest.describe("test undo two step", (function (param) {
                                      return Wonder_jest.test("step which from second to zero", (function (param) {
                                                    Curry._1(simulateFunc, /* () */0);
                                                    undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test redo operate", (function (param) {
                              Wonder_jest.describe("test redo one step", (function (param) {
                                      return Wonder_jest.test("undo step which from second to zero, redo step which from zero to first", (function (param) {
                                                    Curry._1(simulateFunc, /* () */0);
                                                    undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test redo two step", (function (param) {
                                            return Wonder_jest.test("undo step which from second to zero,redo step which from zero to second", (function (param) {
                                                          Curry._1(simulateFunc, /* () */0);
                                                          undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(Curry._1(component, /* () */0));
                                                        }));
                                          }));
                            }));
              }));
}

exports.undoHistoryState = undoHistoryState;
exports.redoHistoryState = redoHistoryState;
exports.testRedoUndoOneStep = testRedoUndoOneStep;
exports.testRedoUndoTwoStep = testRedoUndoTwoStep;
/* Wonder_jest Not a pure module */
