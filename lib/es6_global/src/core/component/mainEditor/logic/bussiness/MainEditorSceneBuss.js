'use strict';

import * as MainEditorGameObjectOper$WonderEditor from "../operator/MainEditorGameObjectOper.js";

function disposeCurrentGameObject(gameObject, param) {
  return /* tuple */[
          param[0],
          MainEditorGameObjectOper$WonderEditor.disposeGameObject(gameObject, param[1])
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
  disposeCurrentGameObject  ,
  disposeGameObjectChildren ,
  
}
/* MainEditorGameObjectOper-WonderEditor Not a pure module */
