'use strict';

import * as MainEditorBasicMaterialOper$WonderEditor from "../../../../../../logic/operator/MainEditorBasicMaterialOper.js";

function getCurrentGameObjectBasicMaterialColor(currentGameObjectMaterial, param) {
  return MainEditorBasicMaterialOper$WonderEditor.getBasicMaterialColor(currentGameObjectMaterial, param[1]);
}

function setCurrentGameObjectBasicMaterialColor(currentGameObjectMaterial, color, param) {
  return /* tuple */[
          param[0],
          MainEditorBasicMaterialOper$WonderEditor.setBasicMaterialColor(currentGameObjectMaterial, color, param[1])
        ];
}

export {
  getCurrentGameObjectBasicMaterialColor ,
  setCurrentGameObjectBasicMaterialColor ,
  
}
/* MainEditorBasicMaterialOper-WonderEditor Not a pure module */
