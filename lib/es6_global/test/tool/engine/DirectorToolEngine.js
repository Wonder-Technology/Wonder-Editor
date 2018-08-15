

import * as DirectorAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/DirectorAPI.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as TimeControllerToolEngine$WonderEditor from "./TimeControllerToolEngine.js";

function prepare(state) {
  TimeControllerToolEngine$WonderEditor.setStartTime(0);
  return state;
}

var init = DirectorAPI$Wonderjs._noWorkerInit;

function run(state, $staropt$star, _) {
  var time = $staropt$star !== undefined ? $staropt$star : 0;
  return DirectorAPI$Wonderjs._run(time, state);
}

function runWithDefaultTime(state) {
  return DirectorAPI$Wonderjs._run(0, state);
}

function prepareAllEnginState() {
  var state = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
  StateLogicService$WonderEditor.setEditEngineState((TimeControllerToolEngine$WonderEditor.setStartTime(0), state));
  var state$1 = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
  return StateLogicService$WonderEditor.setRunEngineState((TimeControllerToolEngine$WonderEditor.setStartTime(0), state$1));
}

function initAllEnginState() {
  StateLogicService$WonderEditor.setEditEngineState(DirectorAPI$Wonderjs._noWorkerInit(StateLogicService$WonderEditor.getEditEngineState(/* () */0)));
  return StateLogicService$WonderEditor.setRunEngineState(DirectorAPI$Wonderjs._noWorkerInit(StateLogicService$WonderEditor.getRunEngineState(/* () */0)));
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
/* DirectorAPI-Wonderjs Not a pure module */
