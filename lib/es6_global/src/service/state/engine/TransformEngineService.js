

import * as TransformAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/TransformAPI.js";

function setLocalPosition(localPosition, transform, engineState) {
  return TransformAPI$Wonderjs.setTransformLocalPosition(transform, localPosition, engineState);
}

var getParent = TransformAPI$Wonderjs.unsafeGetTransformParent;

var setParent = TransformAPI$Wonderjs.setTransformParent;

var setParentKeepOrder = TransformAPI$Wonderjs.setTransformParentKeepOrder;

var getChildren = TransformAPI$Wonderjs.unsafeGetTransformChildren;

var getLocalPosition = TransformAPI$Wonderjs.getTransformLocalPosition;

var getGameObjectByTransform = TransformAPI$Wonderjs.unsafeGetTransformGameObject;

var getTransformLocalRotation = TransformAPI$Wonderjs.getTransformLocalRotation;

var setTransformLocalRotation = TransformAPI$Wonderjs.setTransformLocalRotation;

var getTransformRotation = TransformAPI$Wonderjs.getTransformRotation;

var setTransformRotation = TransformAPI$Wonderjs.setTransformRotation;

var getTransformLocalScale = TransformAPI$Wonderjs.getTransformLocalScale;

var setTransformLocalScale = TransformAPI$Wonderjs.setTransformLocalScale;

var getTransformScale = TransformAPI$Wonderjs.getTransformScale;

var setTransformScale = TransformAPI$Wonderjs.setTransformScale;

export {
  getLocalPosition ,
  setLocalPosition ,
  getParent ,
  setParent ,
  setParentKeepOrder ,
  getChildren ,
  getGameObjectByTransform ,
  getTransformLocalRotation ,
  setTransformLocalRotation ,
  getTransformRotation ,
  setTransformRotation ,
  getTransformLocalScale ,
  setTransformLocalScale ,
  getTransformScale ,
  setTransformScale ,
  
}
/* TransformAPI-Wonderjs Not a pure module */
