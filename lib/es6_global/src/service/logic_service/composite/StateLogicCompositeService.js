'use strict';

import * as Curry                                      from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as EditorStateLogicSingleService$WonderEditor from "../single/EditorStateLogicSingleService.js";
import * as EngineStateLogicSingleService$WonderEditor from "../single/EngineStateLogicSingleService.js";

function prepareState() {
  return /* tuple */[
          EditorStateLogicSingleService$WonderEditor.getState(/* () */0),
          EngineStateLogicSingleService$WonderEditor.getState(/* () */0)
        ];
}

function finishState(param) {
  EditorStateLogicSingleService$WonderEditor.setState(param[0]);
  EngineStateLogicSingleService$WonderEditor.setState(param[1]);
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
/* EditorStateLogicSingleService-WonderEditor Not a pure module */
