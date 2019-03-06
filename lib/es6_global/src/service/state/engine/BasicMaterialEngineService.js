

import * as BasicMaterialAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/material/BasicMaterialAPI.js";
import * as ShaderEngineService$WonderEditor from "./ShaderEngineService.js";
import * as NameBasicMaterialMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/material/basic/NameBasicMaterialMainService.js";
import * as GameObjectBasicMaterialService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/material/basic/GameObjectBasicMaterialService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/material/basic/RecordBasicMaterialMainService.js";

function getBasicMaterialGameObjects(material, engineState) {
  return GameObjectBasicMaterialService$Wonderjs.getGameObjects(material, RecordBasicMaterialMainService$Wonderjs.getRecord(engineState));
}

function hasBasicMaterialGameObjects(material, engineState) {
  var match = GameObjectBasicMaterialService$Wonderjs.getGameObjects(material, RecordBasicMaterialMainService$Wonderjs.getRecord(engineState));
  if (match !== undefined) {
    return match.length > 0;
  } else {
    return false;
  }
}

function setColor(color, material, engineState) {
  return BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, engineState);
}

function setIsDepthTest(isDepthTest, material, engineState) {
  return BasicMaterialAPI$Wonderjs.setBasicMaterialIsDepthTest(material, isDepthTest, engineState);
}

function reInitBasicMaterialsAndClearShaderCache(materials, engineState) {
  return ShaderEngineService$WonderEditor.clearInitShaderCache(BasicMaterialAPI$Wonderjs.reInitMaterials(materials, engineState));
}

var create = BasicMaterialAPI$Wonderjs.createBasicMaterial;

var getColor = BasicMaterialAPI$Wonderjs.getBasicMaterialColor;

var unsafeGetBasicMaterialGameObjects = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects;

var getBasicMaterialName = NameBasicMaterialMainService$Wonderjs.getName;

var unsafeGetBasicMaterialName = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialName;

var setBasicMaterialName = BasicMaterialAPI$Wonderjs.setBasicMaterialName;

var setAlpha = BasicMaterialAPI$Wonderjs.setBasicMaterialAlpha;

var reInitMaterials = BasicMaterialAPI$Wonderjs.reInitMaterials;

var getAllBasicMaterials = BasicMaterialAPI$Wonderjs.getAllBasicMaterials;

var batchDisposeBasicMaterial = BasicMaterialAPI$Wonderjs.batchDisposeBasicMaterial;

export {
  create ,
  getColor ,
  unsafeGetBasicMaterialGameObjects ,
  getBasicMaterialGameObjects ,
  hasBasicMaterialGameObjects ,
  getBasicMaterialName ,
  unsafeGetBasicMaterialName ,
  setBasicMaterialName ,
  setColor ,
  setIsDepthTest ,
  setAlpha ,
  reInitMaterials ,
  reInitBasicMaterialsAndClearShaderCache ,
  getAllBasicMaterials ,
  batchDisposeBasicMaterial ,
  
}
/* BasicMaterialAPI-Wonderjs Not a pure module */
