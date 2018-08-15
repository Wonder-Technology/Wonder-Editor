

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as SceneEditorService$WonderEditor from "../../state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";
import * as DiffComponentService$WonderEditor from "../../record/editor/scene/DiffComponentService.js";

function checkEditAndRunMaterialWithDiff(param, type_, editEngineState, runEngineState) {
  var runMaterial = param[1];
  var editMaterial = param[0];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("editMateral and runMaterial diff should == materialType diff value", "not"), (function () {
                        var diffValue = DiffComponentService$WonderEditor.getEditEngineComponent(type_, SceneEditorService$WonderEditor.unsafeGetDiffMap(StateEditorService$WonderEditor.getState(/* () */0)));
                        return Contract$WonderLog.Operators[/* = */0](editMaterial - runMaterial | 0, diffValue);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return /* tuple */[
          runMaterial,
          editEngineState,
          runEngineState
        ];
}

export {
  checkEditAndRunMaterialWithDiff ,
  
}
/* Log-WonderLog Not a pure module */
