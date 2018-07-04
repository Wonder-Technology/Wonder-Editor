

import * as SparseMapService$WonderEditor from "../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function unsafeGetNodeMap(assetRecord) {
  return assetRecord[/* nodeMap */4];
}

function setNodeMap(nodeMap, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeId */assetRecord[/* currentNodeId */2],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */3],
          /* nodeMap */nodeMap
        ];
}

function clearNodeMap(assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeId */assetRecord[/* currentNodeId */2],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */3],
          /* nodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function setResult(index, result, assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeId */assetState[/* currentNodeId */2],
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* nodeMap */SparseMapService$WonderEditor.immutableSet(index, result, assetState[/* nodeMap */4])
        ];
}

export {
  unsafeGetNodeMap ,
  setNodeMap ,
  clearNodeMap ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
