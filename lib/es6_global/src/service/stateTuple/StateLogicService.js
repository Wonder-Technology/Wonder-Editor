'use strict';

import * as Curry                           from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateEditorService$WonderEditor from "../state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../state/engine/StateEngineService.js";

function getEngineState(handleFunc) {
  return Curry._1(handleFunc, StateEngineService$WonderEditor.getState(/* () */0));
}

function getAndSetEngineState(handleFunc) {
  StateEngineService$WonderEditor.setState(Curry._1(handleFunc, StateEngineService$WonderEditor.getState(/* () */0)));
  return /* () */0;
}

function getEditorState(handleFunc) {
  return Curry._1(handleFunc, StateEditorService$WonderEditor.getState(/* () */0));
}

function getAndSetEditorState(handleFunc) {
  StateEditorService$WonderEditor.setState(Curry._1(handleFunc, StateEditorService$WonderEditor.getState(/* () */0)));
  return /* () */0;
}

function _prepareState() {
  return /* tuple */[
          StateEditorService$WonderEditor.getState(/* () */0),
          StateEngineService$WonderEditor.getState(/* () */0)
        ];
}

function _finishState(param) {
  StateEditorService$WonderEditor.setState(param[0]);
  StateEngineService$WonderEditor.setState(param[1]);
  return /* () */0;
}

function getState(handleFunc) {
  return Curry._1(handleFunc, _prepareState(/* () */0));
}

var setState = _finishState;

function getAndSetState(handleFunc) {
  return _finishState(Curry._1(handleFunc, _prepareState(/* () */0)));
}

export {
  getEngineState       ,
  getAndSetEngineState ,
  getEditorState       ,
  getAndSetEditorState ,
  _prepareState        ,
  _finishState         ,
  getState             ,
  setState             ,
  getAndSetState       ,
  
}
/* StateEngineService-WonderEditor Not a pure module */
