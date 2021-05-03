

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";

function get(uiState) {
  return uiState[0];
}

function map(func, uiState) {
  if (uiState.tag) {
    return /* Hide */Block.__(1, [Curry._1(func, uiState[0])]);
  } else {
    return /* Show */Block.__(0, [Curry._1(func, uiState[0])]);
  }
}

function mapChildren(seqMapFunc, func, uiState) {
  return map(Curry._1(seqMapFunc, func), uiState);
}

function build($staropt$star, $staropt$star$1, param) {
  var children = $staropt$star !== undefined ? $staropt$star : /* array */[];
  var isShowChildren = $staropt$star$1 !== undefined ? $staropt$star$1 : false;
  if (isShowChildren) {
    return /* Show */Block.__(0, [children]);
  } else {
    return /* Hide */Block.__(1, [children]);
  }
}

function buildByChangeStateType(changeStateType, children) {
  switch (changeStateType) {
    case 0 : 
        return children;
    case 1 : 
        return /* Show */Block.__(0, [children[0]]);
    case 2 : 
        return /* Hide */Block.__(1, [children[0]]);
    
  }
}

function getIsShowChildrenByState(uiState) {
  if (uiState.tag) {
    return false;
  } else {
    return true;
  }
}

function hasChildren(uiState) {
  return uiState[0].length > 0;
}

function fold(seqFoldFunc, func, acc, uiState) {
  return Curry._3(seqFoldFunc, Curry.__2(func), acc, uiState[0]);
}

function filter(seqFilterFunc, func, uiState) {
  if (uiState.tag) {
    return /* Hide */Block.__(1, [Curry._2(seqFilterFunc, func, uiState[0])]);
  } else {
    return /* Show */Block.__(0, [Curry._2(seqFilterFunc, func, uiState[0])]);
  }
}

function find(seqFindFunc, func, uiState) {
  return Curry._2(seqFindFunc, func, uiState[0]);
}

export {
  get ,
  map ,
  mapChildren ,
  build ,
  buildByChangeStateType ,
  getIsShowChildrenByState ,
  hasChildren ,
  fold ,
  filter ,
  find ,
  
}
/* No side effect */
