'use strict';

import * as BasicMaterialLogicService$WonderEditor from "../service/logic_service/component/BasicMaterialLogicService.js";

function getColor(gameObjectMaterial, param) {
  return BasicMaterialLogicService$WonderEditor.getBasicMaterialColor(gameObjectMaterial, param[1]);
}

function setColor(gameObjectMaterial, color, param) {
  return /* tuple */[
          param[0],
          BasicMaterialLogicService$WonderEditor.setBasicMaterialColor(gameObjectMaterial, color, param[1])
        ];
}

var create = BasicMaterialLogicService$WonderEditor.createBasicMaterial;

export {
  create   ,
  getColor ,
  setColor ,
  
}
/* BasicMaterialLogicService-WonderEditor Not a pure module */
