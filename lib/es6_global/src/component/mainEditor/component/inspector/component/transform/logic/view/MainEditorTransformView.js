'use strict';

import * as MainEditorSceneBuss$WonderEditor     from "../../../../../../logic/bussiness/MainEditorSceneBuss.js";
import * as MainEditorTransformBuss$WonderEditor from "../buss/MainEditorTransformBuss.js";

function getCurrentGameObjectLocalPosition(stateTuple) {
  return MainEditorTransformBuss$WonderEditor.getCurrentGameObjectLocalPosition(stateTuple, MainEditorSceneBuss$WonderEditor.getCurrentGameObject(stateTuple));
}

function setCurrentGameObjectLocalPosition(positionTuple, stateTuple) {
  return MainEditorTransformBuss$WonderEditor.setCurrentGameObjectLocalPosition(MainEditorSceneBuss$WonderEditor.getCurrentGameObject(stateTuple), positionTuple, stateTuple);
}

export {
  getCurrentGameObjectLocalPosition ,
  setCurrentGameObjectLocalPosition ,
  
}
/* MainEditorSceneBuss-WonderEditor Not a pure module */
