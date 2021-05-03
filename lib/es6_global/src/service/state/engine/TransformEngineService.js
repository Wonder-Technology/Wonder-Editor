

import * as TransformAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/TransformAPI.js";
import * as HierachyTransformService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/transform/HierachyTransformService.js";
import * as RecordTransformMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/transform/RecordTransformMainService.js";

function setLocalPosition(localPosition, transform, engineState) {
  return TransformAPI$Wonderjs.setTransformLocalPosition(transform, localPosition, engineState);
}

function setTransformLocalEulerAngles(localEulerAngles, transform, engineState) {
  return TransformAPI$Wonderjs.setTransformLocalEulerAngles(transform, localEulerAngles, engineState);
}

function getParent(child, state) {
  return HierachyTransformService$Wonderjs.getParent(child, RecordTransformMainService$Wonderjs.getRecord(state));
}

var setParent = TransformAPI$Wonderjs.setTransformParent;

var setParentKeepOrder = TransformAPI$Wonderjs.setTransformParentKeepOrder;

var getChildren = TransformAPI$Wonderjs.unsafeGetTransformChildren;

function setLocalRotation(value, component, engineState) {
  return TransformAPI$Wonderjs.setTransformLocalRotation(component, value, engineState);
}

function setLocalEulerAngles(value, component, engineState) {
  return TransformAPI$Wonderjs.setTransformLocalEulerAngles(component, value, engineState);
}

function setLocalScale(value, component, engineState) {
  return TransformAPI$Wonderjs.setTransformLocalScale(component, value, engineState);
}

var getLocalToWorldMatrixTypeArray = TransformAPI$Wonderjs.getTransformLocalToWorldMatrixTypeArray;

var getPosition = TransformAPI$Wonderjs.getTransformPosition;

var setPosition = TransformAPI$Wonderjs.setTransformPosition;

var getLocalPosition = TransformAPI$Wonderjs.getTransformLocalPosition;

var changeChildOrder = TransformAPI$Wonderjs.changeChildOrder;

var getGameObjectByTransform = TransformAPI$Wonderjs.unsafeGetTransformGameObject;

var getLocalRotation = TransformAPI$Wonderjs.getTransformLocalRotation;

var getRotation = TransformAPI$Wonderjs.getTransformRotation;

var setRotation = TransformAPI$Wonderjs.setTransformRotation;

var getLocalEulerAngles = TransformAPI$Wonderjs.getTransformLocalEulerAngles;

var getEulerAngles = TransformAPI$Wonderjs.getTransformEulerAngles;

var setEulerAngles = TransformAPI$Wonderjs.setTransformEulerAngles;

var getLocalScale = TransformAPI$Wonderjs.getTransformLocalScale;

var getScale = TransformAPI$Wonderjs.getTransformScale;

var setScale = TransformAPI$Wonderjs.setTransformScale;

var lookAt = TransformAPI$Wonderjs.lookAt;

var rotateLocalOnAxis = TransformAPI$Wonderjs.rotateLocalOnAxis;

var rotateWorldOnAxis = TransformAPI$Wonderjs.rotateWorldOnAxis;

export {
  getPosition ,
  setPosition ,
  getLocalPosition ,
  setLocalPosition ,
  setTransformLocalEulerAngles ,
  getParent ,
  setParent ,
  setParentKeepOrder ,
  getChildren ,
  changeChildOrder ,
  getGameObjectByTransform ,
  getLocalRotation ,
  setLocalRotation ,
  getRotation ,
  setRotation ,
  getLocalEulerAngles ,
  setLocalEulerAngles ,
  getEulerAngles ,
  setEulerAngles ,
  getLocalScale ,
  setLocalScale ,
  getScale ,
  setScale ,
  getLocalToWorldMatrixTypeArray ,
  lookAt ,
  rotateLocalOnAxis ,
  rotateWorldOnAxis ,
  
}
/* TransformAPI-Wonderjs Not a pure module */
