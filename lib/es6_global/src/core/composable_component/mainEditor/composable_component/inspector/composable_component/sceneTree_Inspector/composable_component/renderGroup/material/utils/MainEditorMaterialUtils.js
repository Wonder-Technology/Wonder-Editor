

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
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
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getMaterialTypeByGameObject", "gameObject:" + (String(gameObject) + " should has material component"), "", "", ""));
  }
  
}

function handleSpecificFuncByMaterialType(materialType, param) {
  if (materialType) {
    return Curry._1(param[1], /* () */0);
  } else {
    return Curry._1(param[0], /* () */0);
  }
}

function getMaterialNameByMaterialType(materialType, materialComponent, engineState) {
  if (materialType) {
    return LightMaterialEngineService$WonderEditor.unsafeGetLightMaterialName(materialComponent, engineState);
  } else {
    return BasicMaterialEngineService$WonderEditor.unsafeGetBasicMaterialName(materialComponent, engineState);
  }
}

function renameMaterialByMaterialType(newName, materialType, materialComponent, engineState) {
  if (materialType) {
    return LightMaterialEngineService$WonderEditor.setLightMaterialName(materialComponent, newName, engineState);
  } else {
    return BasicMaterialEngineService$WonderEditor.setBasicMaterialName(materialComponent, newName, engineState);
  }
}

export {
  getMaterialOptions ,
  getMaterialTypeByGameObject ,
  handleSpecificFuncByMaterialType ,
  getMaterialNameByMaterialType ,
  renameMaterialByMaterialType ,
  
}
/* Log-WonderLog Not a pure module */
