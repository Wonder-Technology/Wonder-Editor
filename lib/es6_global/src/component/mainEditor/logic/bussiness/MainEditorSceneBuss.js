'use strict';

import * as MainEditorSceneEdit$WonderEditor      from "../edit/MainEditorSceneEdit.js";
import * as MainEditorGameObjectOper$WonderEditor from "../operator/MainEditorGameObjectOper.js";

function unsafeGetScene(param) {
  return MainEditorSceneEdit$WonderEditor.unsafeGetScene(param[0]);
}

function getCurrentGameObject(param) {
  return MainEditorSceneEdit$WonderEditor.getCurrentGameObject(param[0]);
}

function hasCurrentGameObject(param) {
  return MainEditorSceneEdit$WonderEditor.hasCurrentGameObject(param[0]);
}

function setCurrentGameObject(gameObject, param) {
  return /* tuple */[
          MainEditorSceneEdit$WonderEditor.setCurrentGameObject(gameObject, param[0]),
          param[1]
        ];
}

function disposeGameObjectChildren(gameObject, param) {
  var engineState = param[1];
  return /* tuple */[
          param[0],
          MainEditorGameObjectOper$WonderEditor.getChildren(gameObject, engineState).reduce((function (engineState, gameObject) {
                  return MainEditorGameObjectOper$WonderEditor.disposeGameObject(gameObject, engineState);
                }), engineState)
        ];
}

export {
  unsafeGetScene            ,
  getCurrentGameObject      ,
  hasCurrentGameObject      ,
  setCurrentGameObject      ,
  disposeGameObjectChildren ,
  
}
/* MainEditorGameObjectOper-WonderEditor Not a pure module */
