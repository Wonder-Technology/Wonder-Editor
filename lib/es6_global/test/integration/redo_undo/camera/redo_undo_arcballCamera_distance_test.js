

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as InspectorTool$WonderEditor from "../../../tool/ui/InspectorTool.js";
import * as EventListenerTool$WonderEditor from "../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as AddableComponentTool$WonderEditor from "../../inspector/atom_component/addableComponent/tool/AddableComponentTool.js";
import * as MainEditorCameraTool$WonderEditor from "../../../tool/MainEditorCameraTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";

describe("redo_undo: arcballCameraController distance and minDistance", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _changeDistance = function (value) {
          var component = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
          BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                  return MainEditorCameraTool$WonderEditor.triggerChangeArcballDistance(value, param);
                }));
          return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                        return MainEditorCameraTool$WonderEditor.triggerBlurArcballDistance(value, param);
                      }));
        };
        var _simulateChangeDistanceAndChangeMinDistance = function () {
          _changeDistance(23.11);
          var value = 12.12;
          var component = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
          BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                  return MainEditorCameraTool$WonderEditor.triggerChangeArcballMinDistance(value, param);
                }));
          return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                        return MainEditorCameraTool$WonderEditor.triggerBlurArcballMinDistance(value, param);
                      }));
        };
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCameraTobeCurrentSceneTreeNode);
          StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                  return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                }));
          return AddableComponentTool$WonderEditor.addArcballCameraInCamera(/* () */0);
        };
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode to be camera", /* tuple */[
                    _simulateChangeDistanceAndChangeMinDistance,
                    _beforeEach,
                    (function () {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildInspectorComponent);
      }));

export {
  
}
/*  Not a pure module */
