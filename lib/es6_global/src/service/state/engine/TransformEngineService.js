

import * as TransformAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/TransformAPI.js";

function setLocalPosition(localPosition, transform, engineState) {
  return TransformAPI$Wonderjs.setTransformLocalPosition(transform, localPosition, engineState);
}

var getParent = TransformAPI$Wonderjs.unsafeGetTransformParent;

var setParent = TransformAPI$Wonderjs.setTransformParent;

var setParentKeepOrder = TransformAPI$Wonderjs.setTransformParentKeepOrder;

var getChildren = TransformAPI$Wonderjs.unsafeGetTransformChildren;

function setLocalEulerAngles(value, component, engineState) {
  return TransformAPI$Wonderjs.setTransformLocalEulerAngles(component, value, engineState);
}

function setLocalScale(value, component, engineState) {
  return TransformAPI$Wonderjs.setTransformLocalScale(component, value, engineState);
}

var getPosition = TransformAPI$Wonderjs.getTransformPosition;

var setPosition = TransformAPI$Wonderjs.setTransformPosition;

var getLocalPosition = TransformAPI$Wonderjs.getTransformLocalPosition;

var getGameObjectByTransform = TransformAPI$Wonderjs.unsafeGetTransformGameObject;

var getLocalRotation = TransformAPI$Wonderjs.getTransformLocalRotation;

var setLocalRotation = TransformAPI$Wonderjs.setTransformLocalRotation;

var getRotation = TransformAPI$Wonderjs.getTransformRotation;

var setRotation = TransformAPI$Wonderjs.setTransformRotation;

var getLocalEulerAngles = TransformAPI$Wonderjs.getTransformLocalEulerAngles;

var getEulerAngles = TransformAPI$Wonderjs.getTransformEulerAngles;

var setEulerAngles = TransformAPI$Wonderjs.setTransformEulerAngles;

var getLocalScale = TransformAPI$Wonderjs.getTransformLocalScale;

var getScale = TransformAPI$Wonderjs.getTransformScale;

var setScale = TransformAPI$Wonderjs.setTransformScale;

export {
  getPosition ,
  setPosition ,
  getLocalPosition ,
  setLocalPosition ,
  getParent ,
  setParent ,
  setParentKeepOrder ,
  getChildren ,
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
  
}
/* TransformAPI-Wonderjs Not a pure module */
