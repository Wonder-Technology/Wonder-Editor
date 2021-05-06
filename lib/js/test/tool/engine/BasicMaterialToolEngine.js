'use strict';

var JobEngineService$WonderEditor = require("../../../src/service/state/engine/job/JobEngineService.js");
var BasicMaterialEngineService$WonderEditor = require("../../../src/service/state/engine/BasicMaterialEngineService.js");
var RecordBasicMaterialMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/material/basic/RecordBasicMaterialMainService.js");
var DisposeBasicMaterialMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/material/basic/DisposeBasicMaterialMainService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");

function replaceGameObjectLightMaterialToBasicMaterialAndRefreshDispose(gameObject, state) {
  var match = BasicMaterialEngineService$WonderEditor.create(state);
  var state$1 = match[0];
  return JobEngineService$WonderEditor.execDisposeJob(GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent(gameObject, match[1], GameObjectComponentEngineService$WonderEditor.disposeLightMaterialComponent(gameObject, GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, state$1), state$1)));
}

function isAlive(material, engineState) {
  return DisposeBasicMaterialMainService$Wonderjs.isAlive(material, RecordBasicMaterialMainService$Wonderjs.getRecord(engineState));
}

exports.replaceGameObjectLightMaterialToBasicMaterialAndRefreshDispose = replaceGameObjectLightMaterialToBasicMaterialAndRefreshDispose;
exports.isAlive = isAlive;
/* JobEngineService-WonderEditor Not a pure module */
