

import * as BasicMaterialEngineService$WonderEditor from "../../../state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../state/engine/LightMaterialEngineService.js";

function isDefaultBasicMaterial(material, defaultMaterialName, engineState) {
  return BasicMaterialEngineService$WonderEditor.getBasicMaterialName(material, engineState) === defaultMaterialName;
}

function isDefaultLightMaterial(material, defaultMaterialName, engineState) {
  return LightMaterialEngineService$WonderEditor.getLightMaterialName(material, engineState) === defaultMaterialName;
}

export {
  isDefaultBasicMaterial ,
  isDefaultLightMaterial ,
  
}
/* BasicMaterialEngineService-WonderEditor Not a pure module */
