

import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

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

export {
  unsafeGetNodeMap ,
  setNodeMap ,
  clearNodeMap ,
  
}
/* No side effect */
