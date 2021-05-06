'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");

function setChromeFromEngineState(engineState) {
  var newrecord = Caml_array.caml_array_dup(engineState);
  newrecord[/* browserDetectRecord */42] = /* record */[/* browser : Chrome */0];
  return newrecord;
}

function setChrome(param) {
  return StateLogicService$WonderEditor.getAndSetEngineState(setChromeFromEngineState);
}

exports.setChromeFromEngineState = setChromeFromEngineState;
exports.setChrome = setChrome;
/* StateLogicService-WonderEditor Not a pure module */
