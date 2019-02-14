

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../state/engine/StateEngineService.js";
import * as DirectorEngineService$WonderEditor from "../../state/engine/DirectorEngineService.js";

function getEngineStateToGetData(handleFunc) {
  return Curry._1(handleFunc, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
}

function getAndSetEngineState(handleFunc) {
  StateEngineService$WonderEditor.setState(Curry._1(handleFunc, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function refreshEngineState(engineState) {
  StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.loopBody(0, engineState));
  return /* () */0;
}

function refreshEngineStateAndReturnEngineState(engineState) {
  return DirectorEngineService$WonderEditor.loopBody(0, engineState);
}

function getAndRefreshEngineState() {
  StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.loopBody(0, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function getAndRefreshEngineStateWithFunc(handleFunc) {
  StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.loopBody(0, Curry._1(handleFunc, StateEngineService$WonderEditor.unsafeGetState(/* () */0))));
  return /* () */0;
}

function loopBodyWhenStop(engineState) {
  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
  if (match) {
    return engineState;
  } else {
    return DirectorEngineService$WonderEditor.loopBody(0, engineState);
  }
}

function getAndRefreshEngineStateWhenStop() {
  StateEngineService$WonderEditor.setState(loopBodyWhenStop(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function renderWhenStop(engineState) {
  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
  if (match) {
    return engineState;
  } else {
    return DirectorEngineService$WonderEditor.loopBody(0, engineState);
  }
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
              StateEngineService$WonderEditor.unsafeGetState(/* () */0)
            ]);
}

function getAndSetStateToGetData(handleFunc) {
  var match = Curry._1(handleFunc, /* tuple */[
        StateEditorService$WonderEditor.getState(/* () */0),
        StateEngineService$WonderEditor.unsafeGetState(/* () */0)
      ]);
  StateEditorService$WonderEditor.setState(match[0]);
  StateEngineService$WonderEditor.setState(match[1]);
  return /* () */0;
}

function setState(param) {
  StateEditorService$WonderEditor.setState(param[0]);
  StateEngineService$WonderEditor.setState(param[1]);
  return /* () */0;
}

export {
  getEngineStateToGetData ,
  getAndSetEngineState ,
  refreshEngineState ,
  refreshEngineStateAndReturnEngineState ,
  getAndRefreshEngineState ,
  getAndRefreshEngineStateWithFunc ,
  loopBodyWhenStop ,
  getAndRefreshEngineStateWhenStop ,
  renderWhenStop ,
  getEditorState ,
  getAndSetEditorState ,
  getStateToGetData ,
  getAndSetStateToGetData ,
  setState ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
