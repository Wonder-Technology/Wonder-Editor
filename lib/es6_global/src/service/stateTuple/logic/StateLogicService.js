'use strict';

import * as Curry                                     from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as SceneEditorService$WonderEditor           from "../../state/editor/SceneEditorService.js";
import * as StateEditorService$WonderEditor           from "../../state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor           from "../../state/engine/StateEngineService.js";
import * as DiffComponentService$WonderEditor         from "../../record/scene/DiffComponentService.js";
import * as DirectorEngineService$WonderEditor        from "../../state/engine/DirectorEngineService.js";
import * as EngineStateDataEditorService$WonderEditor from "../../state/editor/EngineStateDataEditorService.js";

function getEditEngineState() {
  return StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0));
}

function setEditEngineState(state) {
  StateEngineService$WonderEditor.setStateToData(EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0), state);
  return /* () */0;
}

function getRunEngineState() {
  return StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0));
}

function setRunEngineState(state) {
  StateEngineService$WonderEditor.setStateToData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0), state);
  return /* () */0;
}

function getEngineStateToGetData(handleFunc) {
  return Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0)));
}

function getAndSetEditAndRunEngineState(handleFunc) {
  setEditEngineState(Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0))));
  return setRunEngineState(Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0))));
}

function getAndSetEditEngineState(handleFunc) {
  return setEditEngineState(Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0))));
}

function getAndSetRunEngineState(handleFunc) {
  return setRunEngineState(Curry._1(handleFunc, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0))));
}

function getAndRefreshEngineStateWithDiff(componentForRun, type_, handleFunc) {
  var componentForEdit = componentForRun + DiffComponentService$WonderEditor.getEditEngineComponent(type_, SceneEditorService$WonderEditor.unsafeGetDiffMap(StateEditorService$WonderEditor.getState(/* () */0))) | 0;
  setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, Curry._2(handleFunc, componentForRun, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0)))));
  return setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, Curry._2(handleFunc, componentForEdit, StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0)))));
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
              StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0))
            ]);
}

function getStateForHistory() {
  return /* tuple */[
          StateEditorService$WonderEditor.getState(/* () */0),
          StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getEditEngineStateData(/* () */0)),
          StateEngineService$WonderEditor.getStateFromData(EngineStateDataEditorService$WonderEditor.getRunEngineStateData(/* () */0))
        ];
}

function refreshStateForHistory(param) {
  StateEditorService$WonderEditor.setState(param[0]);
  setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, param[1]));
  return setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, param[2]));
}

function getAndRefreshStateForHistory(handleFunc) {
  return refreshStateForHistory(Curry._1(handleFunc, getStateForHistory(/* () */0)));
}

export {
  getEditEngineState               ,
  setEditEngineState               ,
  getRunEngineState                ,
  setRunEngineState                ,
  getEngineStateToGetData          ,
  getAndSetEditAndRunEngineState   ,
  getAndSetEditEngineState         ,
  getAndSetRunEngineState          ,
  getAndRefreshEngineStateWithDiff ,
  getEditorState                   ,
  getAndSetEditorState             ,
  getStateToGetData                ,
  getStateForHistory               ,
  refreshStateForHistory           ,
  getAndRefreshStateForHistory     ,
  
}
/* SceneEditorService-WonderEditor Not a pure module */
