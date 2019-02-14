

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

function buildData(base64, uint8Array, name, mimeType, $staropt$star, _) {
  var blobObjectURL = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : undefined;
  return /* record */[
          /* base64 */base64,
          /* uint8Array */uint8Array,
          /* blobObjectURL */blobObjectURL,
          /* name */name,
          /* mimeType */mimeType
        ];
}

function unsafeGetData(index, record) {
  return ImmutableSparseMapService$WonderCommonlib.unsafeGet(index, record[/* imageDataMap */5]);
}

function setData(index, data, record) {
  return /* record */[
          /* nodeIndex */record[/* nodeIndex */0],
          /* imageDataMapIndex */record[/* imageDataMapIndex */1],
          /* tree */record[/* tree */2],
          /* currentNodeId */record[/* currentNodeId */3],
          /* selectedFolderNodeIdInAssetTree */record[/* selectedFolderNodeIdInAssetTree */4],
          /* imageDataMap */ImmutableSparseMapService$WonderCommonlib.set(index, data, record[/* imageDataMap */5]),
          /* geometryData */record[/* geometryData */6],
          /* materialData */record[/* materialData */7]
        ];
}

function removeData(index, record) {
  return /* record */[
          /* nodeIndex */record[/* nodeIndex */0],
          /* imageDataMapIndex */record[/* imageDataMapIndex */1],
          /* tree */record[/* tree */2],
          /* currentNodeId */record[/* currentNodeId */3],
          /* selectedFolderNodeIdInAssetTree */record[/* selectedFolderNodeIdInAssetTree */4],
          /* imageDataMap */ImmutableSparseMapService$WonderCommonlib.deleteVal(index, record[/* imageDataMap */5]),
          /* geometryData */record[/* geometryData */6],
          /* materialData */record[/* materialData */7]
        ];
}

export {
  buildData ,
  unsafeGetData ,
  setData ,
  removeData ,
  
}
/* ImmutableSparseMapService-WonderCommonlib Not a pure module */
