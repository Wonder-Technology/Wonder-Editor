'use strict';

import * as BasicMaterialLogicSingleService$WonderEditor from "../service/logic_service/single/BasicMaterialLogicSingleService.js";

function getColor(gameObjectMaterial, param) {
  return BasicMaterialLogicSingleService$WonderEditor.getColor(gameObjectMaterial, param[1]);
}

function setColor(gameObjectMaterial, color, param) {
  return /* tuple */[
          param[0],
          BasicMaterialLogicSingleService$WonderEditor.setColor(gameObjectMaterial, color, param[1])
        ];
}

var create = BasicMaterialLogicSingleService$WonderEditor.create;

export {
  create   ,
  getColor ,
  setColor ,
  
}
/* BasicMaterialLogicSingleService-WonderEditor Not a pure module */
