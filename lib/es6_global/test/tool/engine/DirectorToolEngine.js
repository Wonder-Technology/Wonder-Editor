

import * as DirectorMainService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/director/DirectorMainService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/StateEngineService.js";
import * as TimeControllerToolEngine$WonderEditor from "./TimeControllerToolEngine.js";

function prepare(state) {
  TimeControllerToolEngine$WonderEditor.setStartTime(0);
  return state;
}

var init = DirectorMainService$Wonderjs._noWorkerInit;

function run(state, $staropt$star, _) {
  var time = $staropt$star !== undefined ? $staropt$star : 0;
  return DirectorMainService$Wonderjs._run(time, state);
}

function runWithDefaultTime(state) {
  return DirectorMainService$Wonderjs._run(0, state);
}

function runWithDefaultTimeEngineState() {
  StateEngineService$WonderEditor.setState(DirectorMainService$Wonderjs._run(0, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function prepareAllEnginState() {
  var state = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  StateEngineService$WonderEditor.setState((TimeControllerToolEngine$WonderEditor.setStartTime(0), state));
  return /* () */0;
}

function initAllEnginState() {
  StateEngineService$WonderEditor.setState(DirectorMainService$Wonderjs._noWorkerInit(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function prepareAndInitAllEnginState() {
  prepareAllEnginState(/* () */0);
  return initAllEnginState(/* () */0);
}

export {
  prepare ,
  init ,
  run ,
  runWithDefaultTime ,
  runWithDefaultTimeEngineState ,
  prepareAllEnginState ,
  initAllEnginState ,
  prepareAndInitAllEnginState ,
  
}
/* DirectorMainService-Wonderjs Not a pure module */
