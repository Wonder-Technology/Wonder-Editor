

import * as BasicMaterialAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/material/BasicMaterialAPI.js";
import * as OperateBasicMaterialMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/material/basic/OperateBasicMaterialMainService.js";

function disposeBasicMaterial(materialArr, state) {
  return BasicMaterialAPI$Wonderjs.batchDisposeBasicMaterial(state, materialArr);
}

function setColor(color, material, engineState) {
  return BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, engineState);
}

function setMap(map, material, engineState) {
  return BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material, map, engineState);
}

var create = BasicMaterialAPI$Wonderjs.createBasicMaterial;

var getColor = BasicMaterialAPI$Wonderjs.getBasicMaterialColor;

var unsafeGetBasicMaterialName = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialName;

var setBasicMaterialName = BasicMaterialAPI$Wonderjs.setBasicMaterialName;

var getMap = OperateBasicMaterialMainService$Wonderjs.getMap;

var unsafeGetMap = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialMap;

export {
  create ,
  getColor ,
  disposeBasicMaterial ,
  unsafeGetBasicMaterialName ,
  setBasicMaterialName ,
  setColor ,
  getMap ,
  unsafeGetMap ,
  setMap ,
  
}
/* BasicMaterialAPI-Wonderjs Not a pure module */
