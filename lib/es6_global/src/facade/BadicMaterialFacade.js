'use strict';

import * as BasicMaterialLogicService$WonderEditor from "../service/logic_service/material/BasicMaterialLogicService.js";

function getBasicMaterialColor(gameObjectMaterial, param) {
  return BasicMaterialLogicService$WonderEditor.getBasicMaterialColor(gameObjectMaterial, param[1]);
}

function setBasicMaterialColor(gameObjectMaterial, color, param) {
  return /* tuple */[
          param[0],
          BasicMaterialLogicService$WonderEditor.setBasicMaterialColor(gameObjectMaterial, color, param[1])
        ];
}

var createBasicMaterial = BasicMaterialLogicService$WonderEditor.createBasicMaterial;

export {
  createBasicMaterial   ,
  getBasicMaterialColor ,
  setBasicMaterialColor ,
  
}
/* BasicMaterialLogicService-WonderEditor Not a pure module */
