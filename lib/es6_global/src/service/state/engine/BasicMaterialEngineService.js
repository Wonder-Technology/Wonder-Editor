

import * as BasicMaterialAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/material/BasicMaterialAPI.js";
import * as ShaderEngineService$WonderEditor from "./ShaderEngineService.js";
import * as GameObjectBasicMaterialService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/material/basic/GameObjectBasicMaterialService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/material/basic/RecordBasicMaterialMainService.js";
import * as OperateBasicMaterialMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/material/basic/OperateBasicMaterialMainService.js";

function getBasicMaterialGameObjects(material, engineState) {
  return GameObjectBasicMaterialService$Wonderjs.getGameObjects(material, RecordBasicMaterialMainService$Wonderjs.getRecord(engineState));
}

function setColor(color, material, engineState) {
  return BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, engineState);
}

function setBasicMaterialMap(map, material, engineState) {
  return BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material, map, engineState);
}

function isBasicMaterialMap(material, texture, engineState) {
  var match = OperateBasicMaterialMainService$Wonderjs.getMap(material, engineState);
  if (match !== undefined) {
    return match === texture;
  } else {
    return false;
  }
}

function reInitAllBasicMaterialsAndClearShaderCache(materials, engineState) {
  return ShaderEngineService$WonderEditor.clearShaderCache(BasicMaterialAPI$Wonderjs.reInitMaterials(materials, engineState));
}

var create = BasicMaterialAPI$Wonderjs.createBasicMaterial;

var getColor = BasicMaterialAPI$Wonderjs.getBasicMaterialColor;

var unsafeGetBasicMaterialGameObjects = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects;

var unsafeGetBasicMaterialName = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialName;

var setBasicMaterialName = BasicMaterialAPI$Wonderjs.setBasicMaterialName;

var hasBasicMaterialMap = OperateBasicMaterialMainService$Wonderjs.hasMap;

var getBasicMaterialMap = OperateBasicMaterialMainService$Wonderjs.getMap;

var unsafeGetBasicMaterialMap = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialMap;

var removeBasicMaterialMap = BasicMaterialAPI$Wonderjs.removeBasicMaterialMap;

var _reInitMaterials = BasicMaterialAPI$Wonderjs.reInitMaterials;

var getAllBasicMaterials = BasicMaterialAPI$Wonderjs.getAllBasicMaterials;

export {
  create ,
  getColor ,
  unsafeGetBasicMaterialGameObjects ,
  getBasicMaterialGameObjects ,
  unsafeGetBasicMaterialName ,
  setBasicMaterialName ,
  setColor ,
  hasBasicMaterialMap ,
  getBasicMaterialMap ,
  unsafeGetBasicMaterialMap ,
  setBasicMaterialMap ,
  isBasicMaterialMap ,
  removeBasicMaterialMap ,
  _reInitMaterials ,
  reInitAllBasicMaterialsAndClearShaderCache ,
  getAllBasicMaterials ,
  
}
/* BasicMaterialAPI-Wonderjs Not a pure module */
