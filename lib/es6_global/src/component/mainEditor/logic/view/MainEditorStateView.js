'use strict';

import * as Log$WonderLog                from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as EditorStateView$WonderEditor from "../../../../logic/view/EditorStateView.js";
import * as EngineStateView$WonderEditor from "../../../../logic/view/EngineStateView.js";

function prepareState() {
  return /* tuple */[
          EditorStateView$WonderEditor.getEditorState(/* () */0),
          EngineStateView$WonderEditor.getEngineState(/* () */0)
        ];
}

function finishState(param) {
  Log$WonderLog.print("finish state");
  EditorStateView$WonderEditor.setEditorState(param[0]);
  EngineStateView$WonderEditor.setEngineState(param[1]);
  return /* () */0;
}

export {
  prepareState ,
  finishState  ,
  
}
/* Log-WonderLog Not a pure module */
