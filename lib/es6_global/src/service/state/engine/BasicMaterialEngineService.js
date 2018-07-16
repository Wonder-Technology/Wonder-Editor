

import * as ColorService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/ColorService.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/material/BasicMaterialAPI.js";
import * as OperateBasicMaterialMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/material/basic/OperateBasicMaterialMainService.js";

function setColor(color, material, engineState) {
  return BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, engineState);
}

function setMap(map, material, engineState) {
  return BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material, map, engineState);
}

function convert16HexToRGBArr(hexStr) {
  var match = ColorService$Wonderjs.convert16HexToRGBA(hexStr);
  return /* array */[
          match[0],
          match[1],
          match[2]
        ];
}

var create = BasicMaterialAPI$Wonderjs.createBasicMaterial;

var getColor = BasicMaterialAPI$Wonderjs.getBasicMaterialColor;

var getMap = OperateBasicMaterialMainService$Wonderjs.getMap;

var unsafeGetMap = BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialMap;

export {
  create ,
  getColor ,
  setColor ,
  getMap ,
  unsafeGetMap ,
  setMap ,
  convert16HexToRGBArr ,
  
}
/* ColorService-Wonderjs Not a pure module */
