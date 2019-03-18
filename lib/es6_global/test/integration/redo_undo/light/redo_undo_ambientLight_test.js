

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as PickColorTool$WonderEditor from "../../../tool/PickColorTool.js";
import * as ControllerTool$WonderEditor from "../../../unit/composable_component/controller/tool/ControllerTool.js";
import * as BuildCanvasTool$WonderEditor from "../../../tool/BuildCanvasTool.js";
import * as EventListenerTool$WonderEditor from "../../../unit/tool/EventListenerTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";

describe("redo_undo: ambientLight", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _changeColorAndPushUndoStack = function (value) {
          var sourceColor = ControllerTool$WonderEditor.getColor(/* () */0);
          ControllerTool$WonderEditor.changeColor(value);
          return ControllerTool$WonderEditor.closeColorPicker(sourceColor, undefined, undefined, /* () */0);
        };
        var _simulateTwiceChangeAmbientLight = function () {
          BuildCanvasTool$WonderEditor.buildFakeCanvas(sandbox);
          var color1 = PickColorTool$WonderEditor.buildColor1(/* () */0);
          var color2 = PickColorTool$WonderEditor.buildColor2(/* () */0);
          _changeColorAndPushUndoStack(color1);
          return _changeColorAndPushUndoStack(color2);
        };
        var _beforeEach = function () {
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                        return /* () */0;
                      }));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceChangeAmbientLight,
                    _beforeEach,
                    (function () {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildHeader);
      }));

export {
  
}
/*  Not a pure module */
