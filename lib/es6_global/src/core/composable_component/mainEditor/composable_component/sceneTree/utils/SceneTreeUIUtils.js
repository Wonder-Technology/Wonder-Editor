'use strict';

import * as OptionService$WonderEditor from "../../../../../../service/primitive/OptionService.js";

function getSign() {
  return "sceneTree";
}

function unsafeGetSceneGraphDataFromStore(store) {
  return OptionService$WonderEditor.unsafeGet(store[/* sceneTreeState */3][/* sceneGraphData */0]);
}

export {
  getSign                          ,
  unsafeGetSceneGraphDataFromStore ,
  
}
/* OptionService-WonderEditor Not a pure module */
