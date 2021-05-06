'use strict';

var DirectorMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/director/DirectorMainService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var TimeControllerToolEngine$WonderEditor = require("./TimeControllerToolEngine.js");

function prepare(state) {
  TimeControllerToolEngine$WonderEditor.setStartTime(0);
  return state;
}

var init = DirectorMainService$Wonderjs._noWorkerInit;

function run(state, $staropt$star, param) {
  var time = $staropt$star !== undefined ? $staropt$star : 0;
  return DirectorMainService$Wonderjs._run(time, state);
}

function runWithDefaultTime(state) {
  return DirectorMainService$Wonderjs._run(0, state);
}

function runWithDefaultTimeEngineState(param) {
  StateEngineService$WonderEditor.setState(DirectorMainService$Wonderjs._run(0, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function prepareAllEnginState(param) {
  var state = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  StateEngineService$WonderEditor.setState((TimeControllerToolEngine$WonderEditor.setStartTime(0), state));
  return /* () */0;
}

function initAllEnginState(param) {
  StateEngineService$WonderEditor.setState(DirectorMainService$Wonderjs._noWorkerInit(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function prepareAndInitAllEnginState(param) {
  prepareAllEnginState(/* () */0);
  return initAllEnginState(/* () */0);
}

exports.prepare = prepare;
exports.init = init;
exports.run = run;
exports.runWithDefaultTime = runWithDefaultTime;
exports.runWithDefaultTimeEngineState = runWithDefaultTimeEngineState;
exports.prepareAllEnginState = prepareAllEnginState;
exports.initAllEnginState = initAllEnginState;
exports.prepareAndInitAllEnginState = prepareAndInitAllEnginState;
/* DirectorMainService-Wonderjs Not a pure module */
