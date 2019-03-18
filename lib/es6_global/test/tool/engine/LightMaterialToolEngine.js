

import * as GameObjectAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/material/LightMaterialAPI.js";
import * as JobEngineService$WonderEditor from "../../../src/service/state/engine/job/JobEngineService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/state/StateEngineService.js";
import * as ComponentToolEngine$WonderEditor from "./ComponentToolEngine.js";
import * as RecordLightMaterialMainService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/material/light/RecordLightMaterialMainService.js";
import * as DisposeLightMaterialMainService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/material/light/DisposeLightMaterialMainService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";

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
  return ComponentToolEngine$WonderEditor.computeGeneratedIndex(geometryRecord[/* index */0], geometryRecord[/* disposedIndexArray */14])[0];
}

export {
  createGameObject ,
  replaceGameObjectLightMaterial ,
  isAlive ,
  getNewLightMaterial ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
