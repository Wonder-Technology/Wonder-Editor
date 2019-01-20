

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as RedoUndoTransformTool$WonderEditor from "./tool/RedoUndoTransformTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";

describe("redo_undo: transform position", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var partial_arg = 15;
        var partial_arg$1 = 11.25;
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "test simulate set currentSceneTreeNode", /* tuple */[
                    (function (param) {
                        return RedoUndoTransformTool$WonderEditor.simulateTwiceChangePosition(partial_arg$1, partial_arg, param);
                      }),
                    _beforeEach,
                    (function () {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildMainEditorTransformComponent);
      }));

export {
  
}
/*  Not a pure module */
