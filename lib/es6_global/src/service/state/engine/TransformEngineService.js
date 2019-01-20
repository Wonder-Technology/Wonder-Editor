

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as TransformAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/TransformAPI.js";
import * as ArrayService$WonderEditor from "../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as HierachyTransformService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/transform/HierachyTransformService.js";
import * as RecordTransformMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/transform/RecordTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/transform/ModelMatrixTransformService.js";

function setLocalPosition(localPosition, transform, engineState) {
  return TransformAPI$Wonderjs.setTransformLocalPosition(transform, localPosition, engineState);
}

function setTransformLocalEulerAngles(localEulerAngles, transform, engineState) {
  return TransformAPI$Wonderjs.setTransformLocalEulerAngles(transform, localEulerAngles, engineState);
}

function getParent(child, state) {
  return Js_primitive.undefined_to_opt(TransformAPI$Wonderjs.unsafeGetTransformParent(child, state));
}

var setParent = TransformAPI$Wonderjs.setTransformParent;

var setParentKeepOrder = TransformAPI$Wonderjs.setTransformParentKeepOrder;

var getChildren = TransformAPI$Wonderjs.unsafeGetTransformChildren;

function _changeChildOrder(sourceTransfrom, targetTransform, children, action) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (newChildren, child) {
                if (child === targetTransform) {
                  if (action) {
                    return ArrayService$WonderEditor.push(sourceTransfrom, ArrayService$WonderEditor.push(targetTransform, newChildren));
                  } else {
                    return ArrayService$WonderEditor.push(targetTransform, ArrayService$WonderEditor.push(sourceTransfrom, newChildren));
                  }
                } else if (child === sourceTransfrom) {
                  return newChildren;
                } else {
                  return ArrayService$WonderEditor.push(child, newChildren);
                }
              }), /* array */[], children);
}

function changeChildOrder(sourceTransfrom, targetTransform, targetParentTransform, action, state) {
  var state$1 = TransformAPI$Wonderjs.setTransformParentKeepOrder(targetParentTransform, sourceTransfrom, state);
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* transformRecord */11] = HierachyTransformService$Wonderjs._setChildren(RecordTransformMainService$Wonderjs.getRecord(state$1), targetParentTransform, _changeChildOrder(sourceTransfrom, targetTransform, TransformAPI$Wonderjs.unsafeGetTransformChildren(targetParentTransform, state$1), action));
  return newrecord;
}

function setLocalEulerAngles(value, component, engineState) {
  return TransformAPI$Wonderjs.setTransformLocalEulerAngles(component, value, engineState);
}

function setLocalScale(value, component, engineState) {
  return TransformAPI$Wonderjs.setTransformLocalScale(component, value, engineState);
}

function getLocalToWorldMatrixTypeArray(transform, engineState) {
  var match = RecordTransformMainService$Wonderjs.getRecord(engineState);
  var localToWorldMatrices = match[/* localToWorldMatrices */2];
  var localToWorldMatrixCacheMap = match[/* localToWorldMatrixCacheMap */19];
  return ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices, localToWorldMatrixCacheMap);
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

var lookAt = TransformAPI$Wonderjs.lookAt;

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
  _changeChildOrder ,
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
  
}
/* TransformAPI-Wonderjs Not a pure module */
