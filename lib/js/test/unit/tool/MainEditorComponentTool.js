'use strict';

var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");

function hasSourceInstanceComponent(gameObject) {
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.hasSourceInstanceComponent(gameObject, param);
              }));
}

exports.hasSourceInstanceComponent = hasSourceInstanceComponent;
/* StateLogicService-WonderEditor Not a pure module */
