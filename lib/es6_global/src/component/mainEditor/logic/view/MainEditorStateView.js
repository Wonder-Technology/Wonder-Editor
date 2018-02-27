'use strict';

import * as EditorStateView$WonderEditor from "../../../../logic/view/EditorStateView.js";
import * as EngineStateView$WonderEditor from "../../../../logic/view/EngineStateView.js";

function prepareState() {
  return /* tuple */[
          EditorStateView$WonderEditor.getEditorState(/* () */0),
          EngineStateView$WonderEditor.getEngineState(/* () */0)
        ];
}

function finishState(param) {
  EditorStateView$WonderEditor.setEditorState(param[0]);
  EngineStateView$WonderEditor.setEngineState(param[1]);
  return /* () */0;
}

export {
  prepareState ,
  finishState  ,
  
}
/* EditorStateView-WonderEditor Not a pure module */
