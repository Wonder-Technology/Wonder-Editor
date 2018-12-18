

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";

describe("redo_undo: add gameObject", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulateTwiceAddGameObject = function (param) {
          MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
          return MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
        };
        var _beforeEach = function (param) {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
        };
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceAddGameObject,
                    _beforeEach,
                    (function (param) {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildSceneTree);
      }));

export {
  
}
/*  Not a pure module */
