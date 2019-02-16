

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

function getComponentTypeMap(inspectorRecord) {
  return inspectorRecord[/* componentTypeMap */0];
}

function setComponentTypeMap(componentTypeMap, _) {
  return /* record */[/* componentTypeMap */componentTypeMap];
}

function clearComponentTypeMap() {
  return /* record */[/* componentTypeMap */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)];
}

function _addComponentType(index, componentType, componentTypeMap) {
  var match = ImmutableSparseMapService$WonderCommonlib.get(index, componentTypeMap);
  if (match !== undefined) {
    return ArrayService$WonderEditor.push(componentType, match.slice());
  } else {
    return ArrayService$WonderEditor.push(componentType, ArrayService$WonderEditor.create(/* () */0));
  }
}

function addComponentTypeToMap(index, componentType, inspectorRecord) {
  return /* record */[/* componentTypeMap */ImmutableSparseMapService$WonderCommonlib.set(index, _addComponentType(index, componentType, inspectorRecord[/* componentTypeMap */0]), inspectorRecord[/* componentTypeMap */0])];
}

function removeComponentTypeToMap(index, componentType, inspectorRecord) {
  var match = ImmutableSparseMapService$WonderCommonlib.get(index, inspectorRecord[/* componentTypeMap */0]);
  return /* record */[/* componentTypeMap */match !== undefined ? ImmutableSparseMapService$WonderCommonlib.set(index, match.filter((function (componentTypeItem) {
                        return componentTypeItem !== componentType;
                      })), inspectorRecord[/* componentTypeMap */0]) : inspectorRecord[/* componentTypeMap */0]];
}

function clearComponentType() {
  return /* record */[/* componentTypeMap */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)];
}

export {
  getComponentTypeMap ,
  setComponentTypeMap ,
  clearComponentTypeMap ,
  _addComponentType ,
  addComponentTypeToMap ,
  removeComponentTypeToMap ,
  clearComponentType ,
  
}
/* ArrayService-WonderEditor Not a pure module */
