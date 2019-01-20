

import * as ArrayService$WonderEditor from "../../../service/atom/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function getUpdateComponentTypeArr(store) {
  return store[/* updateState */3][/* componentTypeArr */0];
}

function getBottomCurrentComponentType(store) {
  return store[/* showComponentState */5][/* currentComponentType */0];
}

function geGameObjectisShowComponentFromStore(store, componentType) {
  var match = SparseMapService$WonderCommonlib.get(componentType, store[/* inspectorState */4][/* showComponentMap */0]);
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

function shouldComponentUpdateMany(componentTypeArr, updateComponentTypeArr) {
  if (ArrayService$WonderEditor.hasIntersect(updateComponentTypeArr, componentTypeArr)) {
    return true;
  } else {
    return updateComponentTypeArr.includes(/* All */1);
  }
}

export {
  getUpdateComponentTypeArr ,
  getBottomCurrentComponentType ,
  geGameObjectisShowComponentFromStore ,
  shouldComponentUpdate ,
  shouldComponentUpdateMany ,
  
}
/* ArrayService-WonderEditor Not a pure module */
