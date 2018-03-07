'use strict';

import * as CurrentGameObjectLogicSingleService$WonderEditor from "../service/logic_service/single/CurrentGameObjectLogicSingleService.js";

function getCurrentGameObject(param) {
  return CurrentGameObjectLogicSingleService$WonderEditor.getCurrentGameObject(param[0]);
}

function unsafeGetCurrentGameObject(param) {
  return CurrentGameObjectLogicSingleService$WonderEditor.unsafeGetCurrentGameObject(param[0]);
}

function setCurrentGameObject(gameObject, param) {
  return /* tuple */[
          CurrentGameObjectLogicSingleService$WonderEditor.setCurrentGameObject(gameObject, param[0]),
          param[1]
        ];
}

function clearCurrentGameObject(param) {
  return /* tuple */[
          CurrentGameObjectLogicSingleService$WonderEditor.clearCurrentGameObject(param[0]),
          param[1]
        ];
}

function hasCurrentGameObject(param) {
  return CurrentGameObjectLogicSingleService$WonderEditor.hasCurrentGameObject(param[0]);
}

export {
  getCurrentGameObject       ,
  unsafeGetCurrentGameObject ,
  setCurrentGameObject       ,
  clearCurrentGameObject     ,
  hasCurrentGameObject       ,
  
}
/* CurrentGameObjectLogicSingleService-WonderEditor Not a pure module */
