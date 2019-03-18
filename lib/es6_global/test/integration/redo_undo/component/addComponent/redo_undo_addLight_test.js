

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as RedoUndoTool$WonderEditor from "../../tool/RedoUndoTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../../unit/tool/MainEditorSceneTreeTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../tool/BuildComponentForCurryTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as MainEditorInspectorAddComponentTool$WonderEditor from "../../../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js";

describe("redo_undo: add light component", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulateAddLightComponent = function (param) {
          return MainEditorInspectorAddComponentTool$WonderEditor.addDirectionLightComponent(undefined, undefined, undefined, /* () */0);
        };
        var _beforeEach = function (param) {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
          var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
          StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                  return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                }));
          return MainEditorSceneTreeTool$WonderEditor.Select[/* selectGameObject */0](undefined, undefined, MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), /* () */0);
        };
        var _afterEach = function (param) {
          return /* () */0;
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return RedoUndoTool$WonderEditor.testRedoUndoOneStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateAddLightComponent,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentForCurryTool$WonderEditor.buildInspectorComponent);
      }));

export {
  
}
/*  Not a pure module */
