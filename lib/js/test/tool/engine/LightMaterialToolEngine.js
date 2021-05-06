'use strict';

var GameObjectAPI$Wonderjs = require("wonder.js/lib/js/src/api/GameObjectAPI.js");
var LightMaterialAPI$Wonderjs = require("wonder.js/lib/js/src/api/material/LightMaterialAPI.js");
var JobEngineService$WonderEditor = require("../../../src/service/state/engine/job/JobEngineService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var ComponentToolEngine$WonderEditor = require("./ComponentToolEngine.js");
var RecordLightMaterialMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/material/light/RecordLightMaterialMainService.js");
var DisposeLightMaterialMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/material/light/DisposeLightMaterialMainService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");

function createGameObject(state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$1[0]);
  return /* tuple */[
          state$1,
          gameObject,
          material
        ];
}

function replaceGameObjectLightMaterial(gameObject, newMaterial, engineState) {
  return GameObjectComponentEngineService$WonderEditor.addLightMaterialComponent(gameObject, newMaterial, JobEngineService$WonderEditor.execDisposeJob(GameObjectComponentEngineService$WonderEditor.disposeLightMaterialComponent(gameObject, GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState), engineState)));
}

function isAlive(material, engineState) {
  return DisposeLightMaterialMainService$Wonderjs.isAlive(material, RecordLightMaterialMainService$Wonderjs.getRecord(engineState));
}

function getNewLightMaterial($staropt$star, param) {
  var engineState = $staropt$star !== undefined ? $staropt$star : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var geometryRecord = RecordLightMaterialMainService$Wonderjs.getRecord(engineState);
  return ComponentToolEngine$WonderEditor.computeGeneratedIndex(geometryRecord[/* index */0], geometryRecord[/* disposedIndexArray */12])[0];
}

exports.createGameObject = createGameObject;
exports.replaceGameObjectLightMaterial = replaceGameObjectLightMaterial;
exports.isAlive = isAlive;
exports.getNewLightMaterial = getNewLightMaterial;
/* GameObjectAPI-Wonderjs Not a pure module */
