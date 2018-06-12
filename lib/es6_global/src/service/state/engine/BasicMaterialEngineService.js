

import * as BasicMaterialAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/material/BasicMaterialAPI.js";

function setColor(color, material, engineState) {
  return BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, engineState);
}

function setMap(map, material, engineState) {
  return BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material, map, engineState);
}

var create = BasicMaterialAPI$Wonderjs.createBasicMaterial;

var getColor = BasicMaterialAPI$Wonderjs.getBasicMaterialColor;

var unsafeGetMap = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialMap;

export {
  create ,
  getColor ,
  setColor ,
  unsafeGetMap ,
  setMap ,
  
}
/* BasicMaterialAPI-Wonderjs Not a pure module */
