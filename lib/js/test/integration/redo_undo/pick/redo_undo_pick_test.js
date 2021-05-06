'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var InitPickingJobTool$WonderEditor = require("../../job/tool/InitPickingJobTool.js");

Wonder_jest.describe("redo_undo: pick", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareTwoGameObjects = function (sandbox) {
          return InitPickingJobTool$WonderEditor.prepareTwoGameObjects(sandbox, 510, 200, 10, 20, /* tuple */[
                      2.2987656593322754,
                      8.099184036254883,
                      1.1699984073638916
                    ], /* tuple */[
                      0,
                      0,
                      0
                    ], /* tuple */[
                      0,
                      0,
                      0
                    ], /* tuple */[
                      1,
                      2,
                      0
                    ], /* tuple */[
                      0,
                      0,
                      0
                    ], InitPickingJobTool$WonderEditor.createCube, InitPickingJobTool$WonderEditor.createCube, undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test undo operate", (function (param) {
                return Wonder_jest.describe("test undo one step", (function (param) {
                              Wonder_jest.describe("test undo \"pick one\" operation", (function (param) {
                                      Wonder_jest.test("if not undo any ui state before, undo should still work", (function (param) {
                                              _prepareTwoGameObjects(sandbox);
                                              InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 261, 111, /* () */0);
                                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                              return InitPickingJobTool$WonderEditor.notPick(/* () */0);
                                            }));
                                      return Wonder_jest.describe("else, undo work", (function (param) {
                                                    return Wonder_jest.test("step which from second to first", (function (param) {
                                                                  var match = _prepareTwoGameObjects(sandbox);
                                                                  InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 261, 111, /* () */0);
                                                                  InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 267, 120, /* () */0);
                                                                  RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                  return InitPickingJobTool$WonderEditor.pickOne(match[0]);
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test undo \"not pick\" operation", (function (param) {
                                            Wonder_jest.test("if not undo any ui state before, undo should still work", (function (param) {
                                                    var match = _prepareTwoGameObjects(sandbox);
                                                    InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 261, 111, /* () */0);
                                                    InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 461, 111, /* () */0);
                                                    RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                    return InitPickingJobTool$WonderEditor.pickOne(match[0]);
                                                  }));
                                            return Wonder_jest.describe("else, undo work", (function (param) {
                                                          Wonder_jest.test("test1", (function (param) {
                                                                  var match = _prepareTwoGameObjects(sandbox);
                                                                  InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 261, 111, /* () */0);
                                                                  InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 461, 111, /* () */0);
                                                                  RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                  return InitPickingJobTool$WonderEditor.pickOne(match[0]);
                                                                }));
                                                          return Wonder_jest.test("test2", (function (param) {
                                                                        _prepareTwoGameObjects(sandbox);
                                                                        InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 261, 111, /* () */0);
                                                                        InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 461, 111, /* () */0);
                                                                        InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 261, 111, /* () */0);
                                                                        RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                        return InitPickingJobTool$WonderEditor.notPick(/* () */0);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test redo operate", (function (param) {
                return Wonder_jest.describe("test redo one step", (function (param) {
                              return Wonder_jest.test("undo step which from second to first, redo step which from first to second", (function (param) {
                                            var match = _prepareTwoGameObjects(sandbox);
                                            InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 261, 111, /* () */0);
                                            InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 267, 120, /* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return InitPickingJobTool$WonderEditor.pickOne(match[1]);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      Wonder_jest.describe("if \"pick the same gameObject\" multiple times continuously, only push to stack once", (function (param) {
                              return Wonder_jest.test("test undo", (function (param) {
                                            var match = _prepareTwoGameObjects(sandbox);
                                            InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 261, 111, /* () */0);
                                            InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 267, 120, /* () */0);
                                            InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 267, 120, /* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return InitPickingJobTool$WonderEditor.pickOne(match[0]);
                                          }));
                            }));
                      return Wonder_jest.describe("if \"not pick\" multiple times continuously, only push to stack once", (function (param) {
                                    return Wonder_jest.test("test undo", (function (param) {
                                                  var match = _prepareTwoGameObjects(sandbox);
                                                  InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 261, 111, /* () */0);
                                                  InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 461, 111, /* () */0);
                                                  InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 461, 111, /* () */0);
                                                  RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  return InitPickingJobTool$WonderEditor.pickOne(match[0]);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
