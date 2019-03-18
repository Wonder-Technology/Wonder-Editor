

import * as $$Array from "../../../../../../node_modules/bs-platform/lib/es6/array.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SettingTool$WonderEditor from "../../../unit/tool/SettingTool.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as ControllerTool$WonderEditor from "../../../unit/composable_component/controller/tool/ControllerTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

describe("redo_undo: test stack", (function () {
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
        describe("limit stack to max size", (function () {
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
                describe("test controller", (function () {
                        beforeEach((function () {
                                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                return Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                              }));
                        describe("test stop", (function () {
                                return Wonder_jest.test("can undo to stack stored when play which is exceed max stack size", (function (param) {
                                              _addGameObjectWithCount(1);
                                              ControllerTool$WonderEditor.run(/* () */0);
                                              _addGameObjectWithCount(3);
                                              ControllerTool$WonderEditor.stop(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 1);
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
