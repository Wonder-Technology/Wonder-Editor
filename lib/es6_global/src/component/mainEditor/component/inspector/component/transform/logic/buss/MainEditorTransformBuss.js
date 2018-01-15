'use strict';

import * as MainEditorTransformOper$WonderEditor from "../../../../../../logic/operator/MainEditorTransformOper.js";

function getCurrentGameObjectLocalPosition(currentGameObjectTransform, param) {
  return MainEditorTransformOper$WonderEditor.getLocalPosition(currentGameObjectTransform, param[1]);
}

function setCurrentGameObjectLocalPosition(currentGameObjectTransform, positionTuple, param) {
  return /* tuple */[
          param[0],
          MainEditorTransformOper$WonderEditor.setLocalPosition(currentGameObjectTransform, positionTuple, param[1])
        ];
}

export {
  getCurrentGameObjectLocalPosition ,
  setCurrentGameObjectLocalPosition ,
  
}
/* MainEditorTransformOper-WonderEditor Not a pure module */
