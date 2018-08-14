

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Header$WonderEditor from "../../../../src/core/composable_component/header/ui/Header.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as BuildCanvasTool$WonderEditor from "../../../tool/BuildCanvasTool.js";
import * as EventListenerTool$WonderEditor from "../../../unit/tool/EventListenerTool.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as OperateComponentEventTool$WonderEditor from "../../../tool/OperateComponentEventTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";

describe("redo_undo: ambientLight", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _changeColorAndPushUndoStack = function (value) {
          var component = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
          BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateComponentEventTool$WonderEditor.triggerShowColorPickEvent);
          Header$WonderEditor.Method[/* changeColor */8](value);
          return BaseEventTool$WonderEditor.triggerComponentEvent(component, OperateComponentEventTool$WonderEditor.triggerCloseColorPickEvent);
        };
        var _simulateTwiceChangeAmbientLight = function () {
          BuildCanvasTool$WonderEditor.buildFakeCanvas(sandbox);
          var color1 = {
            hex: "#7df1e8",
            rgb: {
              r: 125,
              g: 241,
              b: 232
            }
          };
          var color2 = {
            hex: "#1918e8",
            rgb: {
              r: 25,
              g: 24,
              b: 232
            }
          };
          _changeColorAndPushUndoStack(color1);
          return _changeColorAndPushUndoStack(color2);
        };
        var _beforeEach = function () {
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                        return /* () */0;
                      }));
        };
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
