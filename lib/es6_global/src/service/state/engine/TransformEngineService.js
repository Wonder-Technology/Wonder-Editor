

import * as TransformAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/TransformAPI.js";

function setLocalPosition(localPosition, transform, engineState) {
  return TransformAPI$Wonderjs.setTransformLocalPosition(transform, localPosition, engineState);
}

var getParent = TransformAPI$Wonderjs.unsafeGetTransformParent;

var setParent = TransformAPI$Wonderjs.setTransformParent;

var setParentKeepOrder = TransformAPI$Wonderjs.setTransformParentKeepOrder;

var getChildren = TransformAPI$Wonderjs.unsafeGetTransformChildren;

function setLocalScale(value, component, engineState) {
  return TransformAPI$Wonderjs.setTransformLocalScale(component, value, engineState);
}

var getLocalPosition = TransformAPI$Wonderjs.getTransformLocalPosition;

var getGameObjectByTransform = TransformAPI$Wonderjs.unsafeGetTransformGameObject;

var getLocalRotation = TransformAPI$Wonderjs.getTransformLocalRotation;

var setLocalRotation = TransformAPI$Wonderjs.setTransformLocalRotation;

var getRotation = TransformAPI$Wonderjs.getTransformRotation;

var setRotation = TransformAPI$Wonderjs.setTransformRotation;

var getLocalScale = TransformAPI$Wonderjs.getTransformLocalScale;

var getScale = TransformAPI$Wonderjs.getTransformScale;

var setScale = TransformAPI$Wonderjs.setTransformScale;

export {
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
  getLocalScale ,
  setLocalScale ,
  getScale ,
  setScale ,
  
}
/* TransformAPI-Wonderjs Not a pure module */
