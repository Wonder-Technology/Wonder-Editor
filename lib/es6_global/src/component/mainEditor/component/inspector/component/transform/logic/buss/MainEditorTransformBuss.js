'use strict';

import * as MainEditorTransformOper$WonderEditor  from "../../../../../../logic/operator/MainEditorTransformOper.js";
import * as MainEditorGameObjectOper$WonderEditor from "../../../../../../logic/operator/MainEditorGameObjectOper.js";

function getCurrentGameObjectLocalPosition(param, currentGameObject) {
  var engineState = param[1];
  return MainEditorTransformOper$WonderEditor.getLocalPosition(MainEditorGameObjectOper$WonderEditor.getTransformComponent(currentGameObject, engineState), engineState);
}

function setCurrentGameObjectLocalPosition(currentGameObject, positionTuple, param) {
  var engineState = param[1];
  return /* tuple */[
          param[0],
          MainEditorTransformOper$WonderEditor.setLocalPosition(MainEditorGameObjectOper$WonderEditor.getTransformComponent(currentGameObject, engineState), positionTuple, engineState)
        ];
}

export {
  getCurrentGameObjectLocalPosition ,
  setCurrentGameObjectLocalPosition ,
  
}
/* MainEditorTransformOper-WonderEditor Not a pure module */
