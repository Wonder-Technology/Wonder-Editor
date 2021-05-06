'use strict';

var StateDataMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/state/StateDataMainService.js");
var StateDataInspectorEngineService$WonderEditor = require("../../../src/service/state/inspectorEngine/StateDataInspectorEngineService.js");

function getStateData(param) {
  return StateDataInspectorEngineService$WonderEditor.getStateData(/* () */0);
}

function setState(state) {
  return StateDataMainService$Wonderjs.setState(StateDataInspectorEngineService$WonderEditor.getStateData(/* () */0), state);
}

function isEqual(state1, state2) {
  return state1 === state2;
}

exports.getStateData = getStateData;
exports.setState = setState;
exports.isEqual = isEqual;
/* StateDataMainService-Wonderjs Not a pure module */
