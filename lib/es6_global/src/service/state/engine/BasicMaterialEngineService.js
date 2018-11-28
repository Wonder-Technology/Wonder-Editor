

import * as BasicMaterialAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/material/BasicMaterialAPI.js";
import * as ShaderEngineService$WonderEditor from "./ShaderEngineService.js";
import * as NameBasicMaterialMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/material/basic/NameBasicMaterialMainService.js";
import * as GameObjectBasicMaterialService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/material/basic/GameObjectBasicMaterialService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/material/basic/RecordBasicMaterialMainService.js";

function getBasicMaterialGameObjects(material, engineState) {
  return GameObjectBasicMaterialService$Wonderjs.getGameObjects(material, RecordBasicMaterialMainService$Wonderjs.getRecord(engineState));
}

function setColor(color, material, engineState) {
  return BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, engineState);
}

function reInitAllBasicMaterialsAndClearShaderCache(materials, engineState) {
  return ShaderEngineService$WonderEditor.clearShaderCache(BasicMaterialAPI$Wonderjs.reInitMaterials(materials, engineState));
}

var create = BasicMaterialAPI$Wonderjs.createBasicMaterial;

var getColor = BasicMaterialAPI$Wonderjs.getBasicMaterialColor;

var unsafeGetBasicMaterialGameObjects = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects;

var getBasicMaterialName = NameBasicMaterialMainService$Wonderjs.getName;

var unsafeGetBasicMaterialName = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialName;

var setBasicMaterialName = BasicMaterialAPI$Wonderjs.setBasicMaterialName;

var reInitMaterials = BasicMaterialAPI$Wonderjs.reInitMaterials;

export {
  create ,
  getColor ,
  unsafeGetBasicMaterialGameObjects ,
  getBasicMaterialGameObjects ,
  getBasicMaterialName ,
  unsafeGetBasicMaterialName ,
  setBasicMaterialName ,
  setColor ,
  reInitMaterials ,
  reInitAllBasicMaterialsAndClearShaderCache ,
  
}
/* BasicMaterialAPI-Wonderjs Not a pure module */
