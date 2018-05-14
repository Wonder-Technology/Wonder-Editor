'use strict';

import * as BasicMaterialAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/material/BasicMaterialAPI.js";

function setColor(color, material, engineState) {
  return BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, engineState);
}

var create = BasicMaterialAPI$Wonderjs.createBasicMaterial;

var getColor = BasicMaterialAPI$Wonderjs.getBasicMaterialColor;

export {
  create   ,
  getColor ,
  setColor ,
  
}
/* BasicMaterialAPI-Wonderjs Not a pure module */
