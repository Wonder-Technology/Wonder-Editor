'use strict';

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

export {
  getLocalPosition         ,
  setLocalPosition         ,
  getParent                ,
  setParent                ,
  setParentKeepOrder       ,
  getChildren              ,
  getGameObjectByTransform ,
  
}
/* TransformAPI-Wonderjs Not a pure module */
