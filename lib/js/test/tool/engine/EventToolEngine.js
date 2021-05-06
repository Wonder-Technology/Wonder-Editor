'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var CreateCustomEventEngineService$WonderEditor = require("../../../src/service/state/engine/event/CreateCustomEventEngineService.js");

function buildCustomEvent($staropt$star, $staropt$star$1, param) {
  var userData = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var eventName = $staropt$star$1 !== undefined ? $staropt$star$1 : "custom event";
  return CreateCustomEventEngineService$WonderEditor.create(eventName, userData);
}

exports.buildCustomEvent = buildCustomEvent;
/* No side effect */
