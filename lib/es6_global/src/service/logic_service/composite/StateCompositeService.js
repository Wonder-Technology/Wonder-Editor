'use strict';

import * as Curry                                from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as EditorStateView$WonderEditor         from "../../../core/logic/view/EditorStateView.js";
import * as EngineStateLogicService$WonderEditor from "../engineState/EngineStateLogicService.js";

function prepareState() {
  return /* tuple */[
          EditorStateView$WonderEditor.getEditorState(/* () */0),
          EngineStateLogicService$WonderEditor.getState(/* () */0)
        ];
}

function finishState(param) {
  EditorStateView$WonderEditor.setEditorState(param[0]);
  EngineStateLogicService$WonderEditor.setState(param[1]);
  return /* () */0;
}

function getState(handleFunc) {
  return Curry._1(handleFunc, prepareState(/* () */0));
}

var setState = finishState;

function getAndSetState(handleFunc) {
  return finishState(Curry._1(handleFunc, prepareState(/* () */0)));
}

export {
  prepareState   ,
  finishState    ,
  getState       ,
  setState       ,
  getAndSetState ,
  
}
/* EditorStateView-WonderEditor Not a pure module */
