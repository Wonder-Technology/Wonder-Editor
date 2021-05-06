'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SettingTool$WonderEditor = require("../../../unit/tool/SettingTool.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var ControllerTool$WonderEditor = require("../../../unit/composable_component/controller/tool/ControllerTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var MainEditorLeftHeaderTool$WonderEditor = require("../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");

Wonder_jest.describe("redo_undo: test stack", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _addGameObjectWithCount = function (count) {
          return $$Array.iter((function (param) {
                        return MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                      }), Caml_array.caml_make_vect(count, 0));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("limit stack to max size", (function (param) {
                      beforeEach((function () {
                              return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                            return SettingTool$WonderEditor.setMaxStackSize(2, param);
                                          }));
                            }));
                      Wonder_jest.test("should only uiState max size stacks to undo stack", (function (param) {
                              _addGameObjectWithCount(3);
                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 1);
                            }));
                      Wonder_jest.test("not affect redo operation", (function (param) {
                              _addGameObjectWithCount(3);
                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                              RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                              RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 1);
                            }));
                      return Wonder_jest.describe("test controller", (function (param) {
                                    beforeEach((function () {
                                            Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                            return Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                          }));
                                    return Wonder_jest.describe("test stop", (function (param) {
                                                  return Wonder_jest.test("can undo to stack stored when play which is exceed max stack size", (function (param) {
                                                                _addGameObjectWithCount(1);
                                                                ControllerTool$WonderEditor.run(/* () */0);
                                                                _addGameObjectWithCount(3);
                                                                ControllerTool$WonderEditor.stop(/* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 1);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
