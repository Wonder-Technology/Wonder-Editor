'use strict';

import * as MainEditorSceneBuss$WonderEditor     from "../../../../../../logic/bussiness/MainEditorSceneBuss.js";
import * as MainEditorTransformBuss$WonderEditor from "../buss/MainEditorTransformBuss.js";

function _isCurrentGameObjectExist(gameObject) {
  if (gameObject) {
    return gameObject[0];
  } else {
    console.warn("getCurrentGameObjectLocalPosition:current gameObject not exist");
    return /* () */0;
  }
}

function getCurrentGameObjectLocalPosition(stateTuple) {
  return MainEditorTransformBuss$WonderEditor.getCurrentGameObjectLocalPosition(stateTuple, _isCurrentGameObjectExist(MainEditorSceneBuss$WonderEditor.getCurrentGameObject(stateTuple)));
}

function setCurrentGameObjectLocalPosition(positionTuple, stateTuple) {
  return MainEditorTransformBuss$WonderEditor.setCurrentGameObjectLocalPosition(_isCurrentGameObjectExist(MainEditorSceneBuss$WonderEditor.getCurrentGameObject(stateTuple)), positionTuple, stateTuple);
}

export {
  _isCurrentGameObjectExist         ,
  getCurrentGameObjectLocalPosition ,
  setCurrentGameObjectLocalPosition ,
  
}
/* MainEditorSceneBuss-WonderEditor Not a pure module */
