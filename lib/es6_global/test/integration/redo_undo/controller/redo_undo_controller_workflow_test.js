

import * as $$Array from "../../../../../../node_modules/bs-platform/lib/es6/array.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as ControllerTool$WonderEditor from "../tool/ControllerTool.js";
import * as GameObjectUtils$WonderEditor from "../../../../src/core/utils/engine/GameObjectUtils.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as StateHistoryToolEditor$WonderEditor from "../tool/StateHistoryToolEditor.js";
import * as OperateGameObjectEventTool$WonderEditor from "../../../tool/OperateGameObjectEventTool.js";

describe("redo_undo: controller workflow", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _addGameObjectWithCount = function (count) {
          return $$Array.iter((function () {
                        return BaseEventTool$WonderEditor.triggerComponentEvent(BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)), OperateGameObjectEventTool$WonderEditor.triggerClickAddBox);
                      }), Caml_array.caml_make_vect(count, 0));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                TestTool$WonderEditor.closeContractCheck(/* () */0);
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                return Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                return TestTool$WonderEditor.openContractCheck(/* () */0);
              }));
        Wonder_jest.test("init default scene", (function () {
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 4);
              }));
        Wonder_jest.test("add two gameObject", (function () {
                _addGameObjectWithCount(2);
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 6);
              }));
        Wonder_jest.test("undo one step", (function () {
                _addGameObjectWithCount(2);
                StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 5);
              }));
        Wonder_jest.test("click run button(which store all stack), add three gameObject", (function () {
                _addGameObjectWithCount(2);
                StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                ControllerTool$WonderEditor.run(/* () */0);
                _addGameObjectWithCount(3);
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 8);
              }));
        Wonder_jest.test("undo one step", (function () {
                _addGameObjectWithCount(2);
                StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                ControllerTool$WonderEditor.run(/* () */0);
                _addGameObjectWithCount(3);
                StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 7);
              }));
        Wonder_jest.test("redo one step", (function () {
                _addGameObjectWithCount(2);
                StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                ControllerTool$WonderEditor.run(/* () */0);
                _addGameObjectWithCount(3);
                StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                StateHistoryToolEditor$WonderEditor.redo(/* () */0);
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 8);
              }));
        Wonder_jest.test("click stop button(which restore all stack)", (function () {
                _addGameObjectWithCount(2);
                StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                ControllerTool$WonderEditor.run(/* () */0);
                _addGameObjectWithCount(3);
                StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                StateHistoryToolEditor$WonderEditor.redo(/* () */0);
                ControllerTool$WonderEditor.stop(/* () */0);
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 5);
              }));
        Wonder_jest.test("undo one step(which back to the initial state)", (function () {
                _addGameObjectWithCount(2);
                StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                ControllerTool$WonderEditor.run(/* () */0);
                _addGameObjectWithCount(3);
                StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                StateHistoryToolEditor$WonderEditor.redo(/* () */0);
                ControllerTool$WonderEditor.stop(/* () */0);
                StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 4);
              }));
        return Wonder_jest.test("redo two step", (function () {
                      _addGameObjectWithCount(2);
                      StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                      ControllerTool$WonderEditor.run(/* () */0);
                      _addGameObjectWithCount(3);
                      StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                      StateHistoryToolEditor$WonderEditor.redo(/* () */0);
                      ControllerTool$WonderEditor.stop(/* () */0);
                      StateHistoryToolEditor$WonderEditor.redo(/* () */0);
                      StateHistoryToolEditor$WonderEditor.redo(/* () */0);
                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 6);
                    }));
      }));

export {
  
}
/*  Not a pure module */
