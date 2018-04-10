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

function getEngineStateToGetData(handleFunc) {
  return Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForRun(/* () */0)));
}

function getAndSetEditAndRunEngineState(handleFunc) {
  setEngineStateForEdit(Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForEdit(/* () */0))));
  return setEngineStateForRun(Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForRun(/* () */0))));
}

function getAndSetEditEngineState(handleFunc) {
  return setEngineStateForEdit(Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForEdit(/* () */0))));
}

function getAndSetRunEngineState(handleFunc) {
  return setEngineStateForRun(Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForRun(/* () */0))));
}

function refreshEngineState(handleFunc) {
  setEngineStateForEdit(DirectorEngineService$WonderEditor.loopBody(0, handleFunc));
  return setEngineStateForRun(DirectorEngineService$WonderEditor.loopBody(0, handleFunc));
}

function getAndRefreshEngineState(handleFunc) {
  setEngineStateForRun(DirectorEngineService$WonderEditor.loopBody(0, Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForRun(/* () */0)))));
  return setEngineStateForEdit(DirectorEngineService$WonderEditor.loopBody(0, Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForEdit(/* () */0)))));
}

function getEditorState(handleFunc) {
  return Curry._1(handleFunc, StateEditorService$WonderEditor.getState(/* () */0));
}

function getAndSetEditorState(handleFunc) {
  StateEditorService$WonderEditor.setState(Curry._1(handleFunc, StateEditorService$WonderEditor.getState(/* () */0)));
  return /* () */0;
}

function getStateToGetData(handleFunc) {
  return Curry._1(handleFunc, /* tuple */[
              StateEditorService$WonderEditor.getState(/* () */0),
              StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForRun(/* () */0))
            ]);
}

function getStateForHistory() {
  return /* tuple */[
          StateEditorService$WonderEditor.getState(/* () */0),
          StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForEdit(/* () */0)),
          StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEngineStateDataForRun(/* () */0))
        ];
}

function refreshStateForHistory(param) {
  StateEditorService$WonderEditor.setState(param[0]);
  setEngineStateForEdit(DirectorEngineService$WonderEditor.loopBody(0, param[1]));
  return setEngineStateForRun(DirectorEngineService$WonderEditor.loopBody(0, param[2]));
}

function getAndRefreshStateForHistory(handleFunc) {
  return refreshStateForHistory(Curry._1(handleFunc, getStateForHistory(/* () */0)));
}

export {
  getEngineStateForEdit          ,
  setEngineStateForEdit          ,
  getEngineStateForRun           ,
  setEngineStateForRun           ,
  getEngineStateToGetData        ,
  getAndSetEditAndRunEngineState ,
  getAndSetEditEngineState       ,
  getAndSetRunEngineState        ,
  refreshEngineState             ,
  getAndRefreshEngineState       ,
  getEditorState                 ,
  getAndSetEditorState           ,
  getStateToGetData              ,
  getStateForHistory             ,
  refreshStateForHistory         ,
  getAndRefreshStateForHistory   ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
