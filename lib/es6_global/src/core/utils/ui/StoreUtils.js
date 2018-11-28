

import * as OptionService$WonderEditor from "../../../service/primitive/OptionService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function unsafeGetSceneGraphDataFromStore(store) {
  return OptionService$WonderEditor.unsafeGet(store[/* sceneTreeState */3][/* sceneGraphData */0]);
}

function getUpdateComponentTypeArr(store) {
  return store[/* updateState */4][/* componentTypeArr */0];
}

function geGameObjectisShowComponentFromStore(store, componentType) {
  var match = SparseMapService$WonderCommonlib.get(componentType, store[/* inspectorState */5][/* showComponentMap */0]);
  if (match !== undefined) {
    return match;
  } else {
    return true;
  }
}

function shouldComponentUpdate(componentType, updateComponentTypeArr) {
  if (updateComponentTypeArr.includes(componentType)) {
    return true;
  } else {
    return updateComponentTypeArr.includes(/* All */1);
  }
}

export {
  unsafeGetSceneGraphDataFromStore ,
  getUpdateComponentTypeArr ,
  geGameObjectisShowComponentFromStore ,
  shouldComponentUpdate ,
  
}
/* OptionService-WonderEditor Not a pure module */
