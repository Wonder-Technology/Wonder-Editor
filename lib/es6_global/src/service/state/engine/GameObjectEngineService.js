

import * as GameObjectAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";

function setGameObjectName(name, gameObject, engineState) {
  return GameObjectAPI$Wonderjs.setGameObjectName(gameObject, name, engineState);
}

var create = GameObjectAPI$Wonderjs.createGameObject;

var initGameObject = GameObjectAPI$Wonderjs.initGameObject;

var disposeGameObject = GameObjectAPI$Wonderjs.disposeGameObject;

var disposeGameObjectKeepOrder = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrder;

var unsafeGetGameObjectName = GameObjectAPI$Wonderjs.unsafeGetGameObjectName;

export {
  create ,
  initGameObject ,
  disposeGameObject ,
  disposeGameObjectKeepOrder ,
  unsafeGetGameObjectName ,
  setGameObjectName ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
