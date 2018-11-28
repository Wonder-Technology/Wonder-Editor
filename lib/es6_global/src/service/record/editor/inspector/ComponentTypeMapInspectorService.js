

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function getComponentTypeMap(inspectorRecord) {
  return inspectorRecord[/* componentTypeMap */0];
}

function setComponentTypeMap(componentTypeMap, _) {
  return /* record */[/* componentTypeMap */componentTypeMap];
}

function clearComponentTypeMap() {
  return /* record */[/* componentTypeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0)];
}

function _getAddedComponentTypeArr(index, componentType, inspectorRecord) {
  var match = SparseMapService$WonderCommonlib.get(index, inspectorRecord[/* componentTypeMap */0]);
  if (match !== undefined) {
    return ArrayService$WonderEditor.push(componentType, match.slice());
  } else {
    return ArrayService$WonderEditor.push(componentType, ArrayService$WonderEditor.create(/* () */0));
  }
}

function addComponentTypeToMap(index, componentType, inspectorRecord) {
  return /* record */[/* componentTypeMap */SparseMapService$WonderEditor.immutableSet(index, _getAddedComponentTypeArr(index, componentType, inspectorRecord), inspectorRecord[/* componentTypeMap */0])];
}

function removeComponentTypeToMap(index, componentType, inspectorRecord) {
  return /* record */[/* componentTypeMap */SparseMapService$WonderEditor.immutableSet(index, SparseMapService$WonderCommonlib.unsafeGet(index, inspectorRecord[/* componentTypeMap */0]).filter((function (componentTypeItem) {
                      return componentTypeItem !== componentType;
                    })), inspectorRecord[/* componentTypeMap */0])];
}

export {
  getComponentTypeMap ,
  setComponentTypeMap ,
  clearComponentTypeMap ,
  _getAddedComponentTypeArr ,
  addComponentTypeToMap ,
  removeComponentTypeToMap ,
  
}
/* ArrayService-WonderEditor Not a pure module */
