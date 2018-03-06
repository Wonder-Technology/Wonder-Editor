'use strict';

import * as CurrentGameObjectLogicService$WonderEditor from "../service/logic_service/currentGameObject/CurrentGameObjectLogicService.js";

function getCurrentGameObject(param) {
  return CurrentGameObjectLogicService$WonderEditor.getCurrentGameObject(param[0]);
}

function unsafeGetCurrentGameObject(param) {
  return CurrentGameObjectLogicService$WonderEditor.unsafeGetCurrentGameObject(param[0]);
}

function setCurrentGameObject(gameObject, param) {
  return /* tuple */[
          CurrentGameObjectLogicService$WonderEditor.setCurrentGameObject(gameObject, param[0]),
          param[1]
        ];
}

function clearCurrentGameObject(param) {
  return /* tuple */[
          CurrentGameObjectLogicService$WonderEditor.clearCurrentGameObject(param[0]),
          param[1]
        ];
}

function hasCurrentGameObject(param) {
  return CurrentGameObjectLogicService$WonderEditor.hasCurrentGameObject(param[0]);
}

export {
  getCurrentGameObject       ,
  unsafeGetCurrentGameObject ,
  setCurrentGameObject       ,
  clearCurrentGameObject     ,
  hasCurrentGameObject       ,
  
}
/* CurrentGameObjectLogicService-WonderEditor Not a pure module */
