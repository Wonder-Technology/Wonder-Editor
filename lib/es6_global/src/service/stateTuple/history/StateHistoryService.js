'use strict';

import * as Curry                              from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateLogicService$WonderEditor     from "../logic/StateLogicService.js";
import * as StateEditorService$WonderEditor    from "../../state/editor/StateEditorService.js";
import * as DirectorEngineService$WonderEditor from "../../state/engine/DirectorEngineService.js";

function getStateForHistory() {
  return /* tuple */[
          StateEditorService$WonderEditor.getState(/* () */0),
          StateLogicService$WonderEditor.getEditEngineState(/* () */0),
          StateLogicService$WonderEditor.getRunEngineState(/* () */0)
        ];
}

function refreshStateForHistory(param) {
  StateEditorService$WonderEditor.setState(param[0]);
  StateLogicService$WonderEditor.setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, param[1]));
  return StateLogicService$WonderEditor.setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, param[2]));
}

function getAndRefreshStateForHistory(handleFunc) {
  return refreshStateForHistory(Curry._1(handleFunc, getStateForHistory(/* () */0)));
}

export {
  getStateForHistory           ,
  refreshStateForHistory       ,
  getAndRefreshStateForHistory ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
