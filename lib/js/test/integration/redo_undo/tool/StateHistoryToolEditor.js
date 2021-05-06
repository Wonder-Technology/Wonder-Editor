'use strict';

var AllStateData$WonderEditor = require("../../../../src/service/stateTuple/data/AllStateData.js");

function clearAllState(param) {
  return AllStateData$WonderEditor.setHistoryState(AllStateData$WonderEditor.createHistoryState(/* () */0));
}

exports.clearAllState = clearAllState;
/* No side effect */
