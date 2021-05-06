'use strict';

var StateAPI$Wonderjs = require("wonder.js/lib/js/src/api/StateAPI.js");
var StateDataMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/state/StateDataMainService.js");

function getStateData(param) {
  return StateAPI$Wonderjs.getStateData(/* () */0);
}

function setState(state) {
  return StateDataMainService$Wonderjs.setState(StateAPI$Wonderjs.getStateData(/* () */0), state);
}

function isEqual(state1, state2) {
  return state1 === state2;
}

exports.getStateData = getStateData;
exports.setState = setState;
exports.isEqual = isEqual;
/* StateAPI-Wonderjs Not a pure module */
