

import * as ArrayService$WonderEditor from "../../../service/atom/ArrayService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

function getUpdateComponentTypeArr(uiState) {
  return uiState[/* updateState */3][/* componentTypeArr */0];
}

function getBottomCurrentComponentType(uiState) {
  return uiState[/* showComponentState */5][/* currentComponentType */0];
}

function geGameObjectisShowComponentFromStore(uiState, componentType) {
  var match = ImmutableSparseMapService$WonderCommonlib.get(componentType, uiState[/* inspectorState */4][/* showComponentMap */0]);
  if (match !== undefined) {
    return match;
  } else {
    return true;
  }
}

function shouldComponentUpdateWithAll(updateComponentTypeArr) {
  return updateComponentTypeArr.includes(/* All */1);
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
  shouldComponentUpdateWithAll ,
  shouldComponentUpdate ,
  shouldComponentUpdateMany ,
  
}
/* ArrayService-WonderEditor Not a pure module */
