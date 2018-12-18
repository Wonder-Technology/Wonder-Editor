

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../state/engine/StateEngineService.js";
import * as DirectorEngineService$WonderEditor from "../../state/engine/DirectorEngineService.js";

function getStateForHistory(param) {
  return /* tuple */[
          StateEditorService$WonderEditor.getState(/* () */0),
          StateEngineService$WonderEditor.unsafeGetState(/* () */0)
        ];
}

function refreshStateForHistory(param) {
  StateEditorService$WonderEditor.setState(param[0]);
  StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.loopBody(0, param[1]));
  return /* () */0;
}

function getAndRefreshStateForHistory(handleFunc) {
  return refreshStateForHistory(Curry._1(handleFunc, getStateForHistory(/* () */0)));
}

export {
  getStateForHistory ,
  refreshStateForHistory ,
  getAndRefreshStateForHistory ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
