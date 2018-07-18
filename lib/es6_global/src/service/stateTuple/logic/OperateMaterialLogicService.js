

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as SceneEditorService$WonderEditor from "../../state/editor/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";
import * as DiffComponentService$WonderEditor from "../../record/editor/scene/DiffComponentService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../state/engine/BasicMaterialEngineService.js";

function _checkEditAndRunMaterialWithDiff(editMaterial, runMaterial, type_, editEngineState, runEngineState) {
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

function createMaterial(editEngineState, runEngineState) {
  var match = BasicMaterialEngineService$WonderEditor.create(editEngineState);
  var match$1 = BasicMaterialEngineService$WonderEditor.create(runEngineState);
  return _checkEditAndRunMaterialWithDiff(match[1], match$1[1], /* Material */2, match[0], match$1[0]);
}

export {
  _checkEditAndRunMaterialWithDiff ,
  createMaterial ,
  
}
/* Log-WonderLog Not a pure module */
