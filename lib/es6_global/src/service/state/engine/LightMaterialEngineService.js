

import * as LightMaterialAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/material/LightMaterialAPI.js";
import * as ManageMapLightMaterialMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/material/light/mapManager/ManageMapLightMaterialMainService.js";

function disposeLightMaterial(materialArr, state) {
  return LightMaterialAPI$Wonderjs.batchDisposeLightMaterial(state, materialArr);
}

function setLightMaterialDiffuseColor(color, material, engineState) {
  return LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material, color, engineState);
}

function setLightMaterialShininess(shininess, material, engineState) {
  return LightMaterialAPI$Wonderjs.setLightMaterialShininess(material, shininess, engineState);
}

function setLightMaterialDiffuseMap(map, material, engineState) {
  return LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, map, engineState);
}

var create = LightMaterialAPI$Wonderjs.createLightMaterial;

var unsafeGetLightMaterialGameObject = LightMaterialAPI$Wonderjs.unsafeGetLightMaterialGameObject;

var getLightMaterialDiffuseColor = LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor;

var getLightMaterialShininess = LightMaterialAPI$Wonderjs.getLightMaterialShininess;

var unsafeGetLightMaterialDiffuseMap = LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap;

var getLightMaterialDiffuseMap = ManageMapLightMaterialMainService$Wonderjs.getDiffuseMap;

var hasLightMaterialDiffuseMap = LightMaterialAPI$Wonderjs.hasLightMaterialDiffuseMap;

var unsafeGetLightMaterialName = LightMaterialAPI$Wonderjs.unsafeGetLightMaterialName;

var setLightMaterialName = LightMaterialAPI$Wonderjs.setLightMaterialName;

var reInitMaterials = LightMaterialAPI$Wonderjs.reInitMaterials;

export {
  create ,
  unsafeGetLightMaterialGameObject ,
  disposeLightMaterial ,
  getLightMaterialDiffuseColor ,
  setLightMaterialDiffuseColor ,
  getLightMaterialShininess ,
  setLightMaterialShininess ,
  unsafeGetLightMaterialDiffuseMap ,
  getLightMaterialDiffuseMap ,
  setLightMaterialDiffuseMap ,
  hasLightMaterialDiffuseMap ,
  unsafeGetLightMaterialName ,
  setLightMaterialName ,
  reInitMaterials ,
  
}
/* LightMaterialAPI-Wonderjs Not a pure module */
