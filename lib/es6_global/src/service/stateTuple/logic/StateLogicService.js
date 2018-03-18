'use strict';

import * as Curry                              from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateEditorService$WonderEditor    from "../../state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor    from "../../state/engine/StateEngineService.js";
import * as DirectorEngineService$WonderEditor from "../../state/engine/DirectorEngineService.js";

function getEngineState(handleFunc) {
  return Curry._1(handleFunc, StateEngineService$WonderEditor.getState(/* () */0));
}

function getAndSetEngineState(handleFunc) {
  StateEngineService$WonderEditor.setState(Curry._1(handleFunc, StateEngineService$WonderEditor.getState(/* () */0)));
  return /* () */0;
}

function refreshEngineState(handleFunc) {
  StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.loopBody(0, handleFunc));
  return /* () */0;
}

function getAndRefreshEngineState(handleFunc) {
  StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.loopBody(0, Curry._1(handleFunc, StateEngineService$WonderEditor.getState(/* () */0))));
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

function _finishSetState(param) {
  StateEditorService$WonderEditor.setState(param[0]);
  StateEngineService$WonderEditor.setState(param[1]);
  return /* () */0;
}

function _finishRefreshState(param) {
  StateEditorService$WonderEditor.setState(param[0]);
  StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.loopBody(0, param[1]));
  return /* () */0;
}

function getState(handleFunc) {
  return Curry._1(handleFunc, _prepareState(/* () */0));
}

var setState = _finishSetState;

function getAndSetState(handleFunc) {
  return _finishSetState(Curry._1(handleFunc, _prepareState(/* () */0)));
}

function getAndRefreshState(handleFunc) {
  return _finishRefreshState(Curry._1(handleFunc, _prepareState(/* () */0)));
}

export {
  getEngineState           ,
  getAndSetEngineState     ,
  refreshEngineState       ,
  getAndRefreshEngineState ,
  getEditorState           ,
  getAndSetEditorState     ,
  _prepareState            ,
  _finishSetState          ,
  _finishRefreshState      ,
  getState                 ,
  setState                 ,
  getAndSetState           ,
  getAndRefreshState       ,
  
}
/* StateEngineService-WonderEditor Not a pure module */
