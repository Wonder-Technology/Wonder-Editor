'use strict';

import * as Curry                                     from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateEditorService$WonderEditor           from "../../state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor           from "../../state/engine/StateEngineService.js";
import * as DirectorEngineService$WonderEditor        from "../../state/engine/DirectorEngineService.js";
import * as EngineStateDataEditorService$WonderEditor from "../../state/editor/EngineStateDataEditorService.js";

function getEngineStateForEdit() {
  return StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForEdit(/* () */0));
}

function setEngineStateForEdit(state) {
  StateEngineService$WonderEditor.setStateToData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForEdit(/* () */0), state);
  return /* () */0;
}

function getEngineStateForRun() {
  return StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForRun(/* () */0));
}

function setEngineStateForRun(state) {
  StateEngineService$WonderEditor.setStateToData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForRun(/* () */0), state);
  return /* () */0;
}

function getEngineState(handleFunc) {
  var match = EngineStateDataEditorService$WonderEditor.getIsRun(/* () */0);
  if (match !== 0) {
    return Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForRun(/* () */0)));
  } else {
    return Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForEdit(/* () */0)));
  }
}

function getAndSetEngineState(handleFunc) {
  var match = EngineStateDataEditorService$WonderEditor.getIsRun(/* () */0);
  if (match !== 0) {
    setEngineStateForRun(Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForRun(/* () */0))));
  }
  return setEngineStateForEdit(Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForEdit(/* () */0))));
}

function refreshEngineState(handleFunc) {
  setEngineStateForEdit(DirectorEngineService$WonderEditor.loopBody(0, handleFunc));
  var match = EngineStateDataEditorService$WonderEditor.getIsRun(/* () */0);
  if (match !== 0) {
    return setEngineStateForRun(DirectorEngineService$WonderEditor.loopBody(0, handleFunc));
  } else {
    return /* () */0;
  }
}

function getAndRefreshEngineState(handleFunc) {
  var match = EngineStateDataEditorService$WonderEditor.getIsRun(/* () */0);
  if (match !== 0) {
    setEngineStateForRun(DirectorEngineService$WonderEditor.loopBody(0, Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForRun(/* () */0)))));
  }
  return setEngineStateForEdit(DirectorEngineService$WonderEditor.loopBody(0, Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForEdit(/* () */0)))));
}

function getEditorState(handleFunc) {
  return Curry._1(handleFunc, StateEditorService$WonderEditor.getState(/* () */0));
}

function getAndSetEditorState(handleFunc) {
  StateEditorService$WonderEditor.setState(Curry._1(handleFunc, StateEditorService$WonderEditor.getState(/* () */0)));
  return /* () */0;
}

function _prepareState() {
  var match = EngineStateDataEditorService$WonderEditor.getIsRun(/* () */0);
  return /* tuple */[
          StateEditorService$WonderEditor.getState(/* () */0),
          match !== 0 ? StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForRun(/* () */0)) : StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForEdit(/* () */0))
        ];
}

function _prepareStateForEdit() {
  return /* tuple */[
          StateEditorService$WonderEditor.getState(/* () */0),
          StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForEdit(/* () */0))
        ];
}

function _prepareStateForRun() {
  return /* tuple */[
          StateEditorService$WonderEditor.getState(/* () */0),
          StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForRun(/* () */0))
        ];
}

function _finishSetStateForEdit(param) {
  StateEditorService$WonderEditor.setState(param[0]);
  setEngineStateForEdit(param[1]);
  return /* () */0;
}

function _finishSetStateForRun(param) {
  StateEditorService$WonderEditor.setState(param[0]);
  setEngineStateForRun(param[1]);
  return /* () */0;
}

function _finishRefreshStateForEdit(param) {
  StateEditorService$WonderEditor.setState(param[0]);
  setEngineStateForEdit(DirectorEngineService$WonderEditor.loopBody(0, param[1]));
  return /* () */0;
}

function _finishRefreshStateForRun(param) {
  StateEditorService$WonderEditor.setState(param[0]);
  setEngineStateForRun(DirectorEngineService$WonderEditor.loopBody(0, param[1]));
  return /* () */0;
}

function getState(handleFunc) {
  return Curry._1(handleFunc, _prepareState(/* () */0));
}

function setState(stateTuple) {
  var match = EngineStateDataEditorService$WonderEditor.getIsRun(/* () */0);
  if (match !== 0) {
    _finishSetStateForRun(stateTuple);
  }
  return _finishSetStateForEdit(stateTuple);
}

function getAndSetState(handleFunc) {
  var match = EngineStateDataEditorService$WonderEditor.getIsRun(/* () */0);
  if (match !== 0) {
    _finishSetStateForRun(Curry._1(handleFunc, _prepareStateForRun(/* () */0)));
  }
  return _finishSetStateForEdit(Curry._1(handleFunc, _prepareStateForEdit(/* () */0)));
}

function getAndRefreshState(handleFunc) {
  var match = EngineStateDataEditorService$WonderEditor.getIsRun(/* () */0);
  if (match !== 0) {
    _finishRefreshStateForRun(Curry._1(handleFunc, _prepareStateForRun(/* () */0)));
  }
  return _finishRefreshStateForEdit(Curry._1(handleFunc, _prepareStateForEdit(/* () */0)));
}

export {
  getEngineStateForEdit      ,
  setEngineStateForEdit      ,
  getEngineStateForRun       ,
  setEngineStateForRun       ,
  getEngineState             ,
  getAndSetEngineState       ,
  refreshEngineState         ,
  getAndRefreshEngineState   ,
  getEditorState             ,
  getAndSetEditorState       ,
  _prepareState              ,
  _prepareStateForEdit       ,
  _prepareStateForRun        ,
  _finishSetStateForEdit     ,
  _finishSetStateForRun      ,
  _finishRefreshStateForEdit ,
  _finishRefreshStateForRun  ,
  getState                   ,
  setState                   ,
  getAndSetState             ,
  getAndRefreshState         ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
