

import * as LightMaterialEngineService$WonderEditor from "../../state/engine/LightMaterialEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/GameObjectComponentEngineService.js";

function getMaterialDefaultName() {
  return "New Material";
}

function createLightMaterialAndSetName(materialName, engineState) {
  var match = LightMaterialEngineService$WonderEditor.create(engineState);
  var material = match[1];
  return /* tuple */[
          material,
          LightMaterialEngineService$WonderEditor.setLightMaterialName(material, materialName, match[0])
        ];
}

var disposeLightMaterial = GameObjectComponentEngineService$WonderEditor.disposeLightMaterialComponent;

var addLightMaterial = GameObjectComponentEngineService$WonderEditor.addLightMaterialComponent;

var setLightMaterialColor = LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseColor;

export {
  getMaterialDefaultName ,
  createLightMaterialAndSetName ,
  disposeLightMaterial ,
  addLightMaterial ,
  setLightMaterialColor ,
  
}
/* LightMaterialEngineService-WonderEditor Not a pure module */
