

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function getComponentTypeMap(inspectorRecord) {
  return inspectorRecord[/* componentTypeMap */0];
}

function setComponentTypeMap(componentTypeMap, inspectorRecord) {
  return /* record */[/* componentTypeMap */componentTypeMap];
}

function clearComponentTypeMap(inspectorRecord) {
  return /* record */[/* componentTypeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0)];
}

function _addComponentType(index, componentType, componentTypeMap) {
  var match = SparseMapService$WonderCommonlib.get(index, componentTypeMap);
  if (match !== undefined) {
    return ArrayService$WonderEditor.push(componentType, match.slice());
  } else {
    return ArrayService$WonderEditor.push(componentType, ArrayService$WonderEditor.create(/* () */0));
  }
}

function addComponentTypeToMap(index, componentType, inspectorRecord) {
  return /* record */[/* componentTypeMap */SparseMapService$WonderEditor.immutableSet(index, _addComponentType(index, componentType, inspectorRecord[/* componentTypeMap */0]), inspectorRecord[/* componentTypeMap */0])];
}

function removeComponentTypeToMap(index, componentType, inspectorRecord) {
  var match = SparseMapService$WonderCommonlib.get(index, inspectorRecord[/* componentTypeMap */0]);
  return /* record */[/* componentTypeMap */match !== undefined ? SparseMapService$WonderEditor.immutableSet(index, match.filter((function (componentTypeItem) {
                        return componentTypeItem !== componentType;
                      })), inspectorRecord[/* componentTypeMap */0]) : inspectorRecord[/* componentTypeMap */0]];
}

function clearComponentType(inspectorRecord) {
  return /* record */[/* componentTypeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0)];
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
