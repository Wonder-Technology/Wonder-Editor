

import * as DirectorMainService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/director/DirectorMainService.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
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

function prepareAllEnginState() {
  var state = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
  StateLogicService$WonderEditor.setEditEngineState((TimeControllerToolEngine$WonderEditor.setStartTime(0), state));
  var state$1 = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
  return StateLogicService$WonderEditor.setRunEngineState((TimeControllerToolEngine$WonderEditor.setStartTime(0), state$1));
}

function initAllEnginState() {
  StateLogicService$WonderEditor.setEditEngineState(DirectorMainService$Wonderjs._noWorkerInit(StateLogicService$WonderEditor.getEditEngineState(/* () */0)));
  return StateLogicService$WonderEditor.setRunEngineState(DirectorMainService$Wonderjs._noWorkerInit(StateLogicService$WonderEditor.getRunEngineState(/* () */0)));
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
  prepareAllEnginState ,
  initAllEnginState ,
  prepareAndInitAllEnginState ,
  
}
/* DirectorMainService-Wonderjs Not a pure module */
