

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as InitPickingJobTool$WonderEditor from "../../job/tool/InitPickingJobTool.js";

describe("redo_undo: pick", (function () {
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
        describe("test undo operate", (function () {
                describe("test undo one step", (function () {
                        describe("test undo \"pick one\" operation", (function () {
                                Wonder_jest.test("if not undo any ui state before, undo should still work", (function () {
                                        _prepareTwoGameObjects(sandbox);
                                        InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 261, 111, /* () */0);
                                        RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                        return InitPickingJobTool$WonderEditor.notPick(/* () */0);
                                      }));
                                describe("else, undo work", (function () {
                                        return Wonder_jest.test("step which from second to first", (function () {
                                                      var match = _prepareTwoGameObjects(sandbox);
                                                      InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 261, 111, /* () */0);
                                                      InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 267, 120, /* () */0);
                                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                      return InitPickingJobTool$WonderEditor.pickOne(match[0]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test undo \"not pick\" operation", (function () {
                                Wonder_jest.test("if not undo any ui state before, undo should still work", (function () {
                                        var match = _prepareTwoGameObjects(sandbox);
                                        InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 261, 111, /* () */0);
                                        InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 461, 111, /* () */0);
                                        RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                        return InitPickingJobTool$WonderEditor.pickOne(match[0]);
                                      }));
                                describe("else, undo work", (function () {
                                        Wonder_jest.test("test1", (function () {
                                                var match = _prepareTwoGameObjects(sandbox);
                                                InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 261, 111, /* () */0);
                                                InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 461, 111, /* () */0);
                                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                return InitPickingJobTool$WonderEditor.pickOne(match[0]);
                                              }));
                                        return Wonder_jest.test("test2", (function () {
                                                      _prepareTwoGameObjects(sandbox);
                                                      InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 261, 111, /* () */0);
                                                      InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 461, 111, /* () */0);
                                                      InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 261, 111, /* () */0);
                                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                      return InitPickingJobTool$WonderEditor.notPick(/* () */0);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test redo operate", (function () {
                describe("test redo one step", (function () {
                        return Wonder_jest.test("undo step which from second to first, redo step which from first to second", (function () {
                                      var match = _prepareTwoGameObjects(sandbox);
                                      InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 261, 111, /* () */0);
                                      InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 267, 120, /* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return InitPickingJobTool$WonderEditor.pickOne(match[1]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("fix bug", (function () {
                describe("if \"pick the same gameObject\" multiple times continuously, only push to stack once", (function () {
                        return Wonder_jest.test("test undo", (function () {
                                      var match = _prepareTwoGameObjects(sandbox);
                                      InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 261, 111, /* () */0);
                                      InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 267, 120, /* () */0);
                                      InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 267, 120, /* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return InitPickingJobTool$WonderEditor.pickOne(match[0]);
                                    }));
                      }));
                describe("if \"not pick\" multiple times continuously, only push to stack once", (function () {
                        return Wonder_jest.test("test undo", (function () {
                                      var match = _prepareTwoGameObjects(sandbox);
                                      InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 261, 111, /* () */0);
                                      InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, 461, 111, /* () */0);
                                      InitPickingJobTool$WonderEditor.triggerPickingAndRestore(undefined, sandbox, 461, 111, /* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return InitPickingJobTool$WonderEditor.pickOne(match[0]);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
