'use strict';

import * as DebugUtils$WonderCommonlib           from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/DebugUtils.js";
import * as MainEditorSceneBuss$WonderEditor     from "../../../../../../logic/bussiness/MainEditorSceneBuss.js";
import * as MainEditorTransformBuss$WonderEditor from "../buss/MainEditorTransformBuss.js";

function _isCurrentGameObjectExist(gameObject) {
  if (gameObject) {
    console.log("this is exist gameobject");
    return gameObject[0];
  } else {
    DebugUtils$WonderCommonlib.log("game object err");
    return 1;
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
