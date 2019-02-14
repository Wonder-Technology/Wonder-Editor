

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../../../../../../../../../utils/console/LogUtils.js";
import * as OptionService$WonderEditor from "../../../../../../../../../../../service/primitive/OptionService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function getMaterialOptions() {
  return /* array */[
          /* record */[
            /* key : BasicMaterial */0,
            /* value */"basic_material"
          ],
          /* record */[
            /* key : LightMaterial */1,
            /* value */"light_material"
          ]
        ];
}

function getMaterialTypeByGameObject(gameObject, engineState) {
  var match = GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(gameObject, engineState);
  var match$1 = GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(gameObject, engineState);
  var exit = 0;
  if (match) {
    if (match$1) {
      exit = 1;
    } else {
      return /* BasicMaterial */0;
    }
  } else if (match$1) {
    return /* LightMaterial */1;
  } else {
    exit = 1;
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("gameObject:" + (String(gameObject) + " should has material component"), "", "", ""));
  }
  
}

function handleSpecificFuncByMaterialType(type_, param) {
  if (type_) {
    return Curry._1(param[1], /* () */0);
  } else {
    return Curry._1(param[0], /* () */0);
  }
}

function createMaterialByType(type_, engineState) {
  if (type_) {
    return LightMaterialEngineService$WonderEditor.create(engineState);
  } else {
    return BasicMaterialEngineService$WonderEditor.create(engineState);
  }
}

function getMaterialComponentByType(gameObject, type_, engineState) {
  if (type_) {
    return GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState);
  } else {
    return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(gameObject, engineState);
  }
}

function renameMaterialByMaterialType(newName, type_, materialComponent, engineState) {
  if (type_) {
    return LightMaterialEngineService$WonderEditor.setLightMaterialName(materialComponent, newName, engineState);
  } else {
    return BasicMaterialEngineService$WonderEditor.setBasicMaterialName(materialComponent, newName, engineState);
  }
}

function getGameObjectsByType(material, type_, engineState) {
  if (type_) {
    return LightMaterialEngineService$WonderEditor.getLightMaterialGameObjects(material, engineState);
  } else {
    return BasicMaterialEngineService$WonderEditor.getBasicMaterialGameObjects(material, engineState);
  }
}

function unsafeGetGameObjectsByType(material, type_, engineState) {
  return OptionService$WonderEditor.unsafeGet(getGameObjectsByType(material, type_, engineState));
}

export {
  getMaterialOptions ,
  getMaterialTypeByGameObject ,
  handleSpecificFuncByMaterialType ,
  createMaterialByType ,
  getMaterialComponentByType ,
  renameMaterialByMaterialType ,
  getGameObjectsByType ,
  unsafeGetGameObjectsByType ,
  
}
/* Log-WonderLog Not a pure module */
