

import * as LightMaterialAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/material/LightMaterialAPI.js";
import * as ManageMapLightMaterialMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/material/light/mapManager/ManageMapLightMaterialMainService.js";

function setLightMaterialDiffuseColor(color, material, engineState) {
  return LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material, color, engineState);
}

var create = LightMaterialAPI$Wonderjs.createLightMaterial;

var unsafeGetLightMaterialGameObject = LightMaterialAPI$Wonderjs.unsafeGetLightMaterialGameObject;

var getLightMaterialDiffuseColor = LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor;

var getLightMaterialShininess = LightMaterialAPI$Wonderjs.getLightMaterialShininess;

var setLightMaterialShininess = LightMaterialAPI$Wonderjs.setLightMaterialShininess;

var unsafeGetLightMaterialDiffuseMap = LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap;

var getLightMaterialDiffuseMap = ManageMapLightMaterialMainService$Wonderjs.getDiffuseMap;

var setLightMaterialDiffuseMap = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap;

var hasLightMaterialDiffuseMap = LightMaterialAPI$Wonderjs.hasLightMaterialDiffuseMap;

var unsafeGetLightMaterialName = LightMaterialAPI$Wonderjs.unsafeGetLightMaterialName;

var setLightMaterialName = LightMaterialAPI$Wonderjs.setLightMaterialName;

export {
  create ,
  unsafeGetLightMaterialGameObject ,
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
  
}
/* LightMaterialAPI-Wonderjs Not a pure module */
