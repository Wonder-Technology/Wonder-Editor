

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../state/engine/state/StateEngineService.js";
import * as DirectorEngineService$WonderEditor from "../../state/engine/DirectorEngineService.js";
import * as StateInspectorEngineService$WonderEditor from "../../state/inspectorEngine/StateInspectorEngineService.js";
import * as ScriptEventFunctionEngineService$WonderEditor from "../../state/engine/script/ScriptEventFunctionEngineService.js";

function getEngineStateToGetData(handleFunc) {
  return Curry._1(handleFunc, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
}

function getInspectorEngineStateToGetData(handleFunc) {
  return Curry._1(handleFunc, StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0));
}

function getAndSetEngineState(handleFunc) {
  StateEngineService$WonderEditor.setState(Curry._1(handleFunc, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function getAndSetInspectorEngineState(handleFunc) {
  StateInspectorEngineService$WonderEditor.setState(Curry._1(handleFunc, StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function refreshEngineState(engineState) {
  StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.loopBody(0, engineState));
  return /* () */0;
}

function renderEngineStateAndReturnEngineState(engineState) {
  return DirectorEngineService$WonderEditor.loopBody(0, engineState);
}

function getAndRefreshEngineState(param) {
  StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.loopBody(0, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function getAndRefreshEngineStateForRunLoop(param) {
  StateEngineService$WonderEditor.setState(ScriptEventFunctionEngineService$WonderEditor.disableScriptEventFunction(DirectorEngineService$WonderEditor.loopBody(0, ScriptEventFunctionEngineService$WonderEditor.enableScriptEventFunction(StateEngineService$WonderEditor.unsafeGetState(/* () */0)))));
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

function getAndRefreshEngineStateWhenStop(param) {
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

function renderInspectorEngineStateWhenStop(inspectorEngineState) {
  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
  if (match) {
    return inspectorEngineState;
  } else {
    return DirectorEngineService$WonderEditor.loopBody(0, inspectorEngineState);
  }
}

function renderInspectorEngineStateAndReturnState(inspectorEngineState) {
  return DirectorEngineService$WonderEditor.loopBody(0, inspectorEngineState);
}

function refreshInspectorEngineState(inspectorEngineState) {
  StateInspectorEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.loopBody(0, inspectorEngineState));
  return /* () */0;
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

function getAndSetState(handleFunc) {
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
  getInspectorEngineStateToGetData ,
  getAndSetEngineState ,
  getAndSetInspectorEngineState ,
  refreshEngineState ,
  renderEngineStateAndReturnEngineState ,
  getAndRefreshEngineState ,
  getAndRefreshEngineStateForRunLoop ,
  getAndRefreshEngineStateWithFunc ,
  loopBodyWhenStop ,
  getAndRefreshEngineStateWhenStop ,
  renderWhenStop ,
  renderInspectorEngineStateWhenStop ,
  renderInspectorEngineStateAndReturnState ,
  refreshInspectorEngineState ,
  getEditorState ,
  getAndSetEditorState ,
  getStateToGetData ,
  getAndSetState ,
  setState ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
