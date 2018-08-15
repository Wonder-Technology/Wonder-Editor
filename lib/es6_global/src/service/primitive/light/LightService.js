

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as SceneEditorService$WonderEditor from "../../state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";
import * as DiffComponentService$WonderEditor from "../../record/editor/scene/DiffComponentService.js";

function checkEditAndRunLightWithDiff(param, type_, editEngineState, runEngineState) {
  var runLight = param[1];
  var editLight = param[0];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("editLight and runLight diff should == lightType diff value", "not"), (function () {
                        var diffValue = DiffComponentService$WonderEditor.getEditEngineComponent(type_, SceneEditorService$WonderEditor.unsafeGetDiffMap(StateEditorService$WonderEditor.getState(/* () */0)));
                        return Contract$WonderLog.Operators[/* = */0](editLight - runLight | 0, diffValue);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return /* tuple */[
          runLight,
          editEngineState,
          runEngineState
        ];
}

export {
  checkEditAndRunLightWithDiff ,
  
}
/* Log-WonderLog Not a pure module */
