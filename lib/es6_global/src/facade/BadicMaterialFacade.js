'use strict';

import * as BasicMaterialLogicService$WonderEditor from "../service/logic_service/single/BasicMaterialLogicService.js";

function getColor(gameObjectMaterial, param) {
  return BasicMaterialLogicService$WonderEditor.getColor(gameObjectMaterial, param[1]);
}

function setColor(gameObjectMaterial, color, param) {
  return /* tuple */[
          param[0],
          BasicMaterialLogicService$WonderEditor.setColor(gameObjectMaterial, color, param[1])
        ];
}

var create = BasicMaterialLogicService$WonderEditor.create;

export {
  create   ,
  getColor ,
  setColor ,
  
}
/* BasicMaterialLogicService-WonderEditor Not a pure module */
