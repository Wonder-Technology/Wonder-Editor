

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function getImageNodeMap(assetRecord) {
  return assetRecord[/* imageNodeMap */11];
}

function setImageNodeMap(imageNodeMap, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* imageIndex */assetRecord[/* imageIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */assetRecord[/* currentNodeData */4],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */5],
          /* textureNodeMap */assetRecord[/* textureNodeMap */6],
          /* folderNodeMap */assetRecord[/* folderNodeMap */7],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */8],
          /* materialNodeMap */assetRecord[/* materialNodeMap */9],
          /* materialNodeIdMap */assetRecord[/* materialNodeIdMap */10],
          /* imageNodeMap */imageNodeMap,
          /* geometryData */assetRecord[/* geometryData */12],
          /* materialData */assetRecord[/* materialData */13]
        ];
}

function unsafeGetResult(imageId, assetRecord) {
  return SparseMapService$WonderCommonlib.unsafeGet(imageId, assetRecord[/* imageNodeMap */11]);
}

function setResult(imageId, imageResult, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* imageIndex */assetRecord[/* imageIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */assetRecord[/* currentNodeData */4],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */5],
          /* textureNodeMap */assetRecord[/* textureNodeMap */6],
          /* folderNodeMap */assetRecord[/* folderNodeMap */7],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */8],
          /* materialNodeMap */assetRecord[/* materialNodeMap */9],
          /* materialNodeIdMap */assetRecord[/* materialNodeIdMap */10],
          /* imageNodeMap */SparseMapService$WonderEditor.immutableSet(imageId, imageResult, assetRecord[/* imageNodeMap */11]),
          /* geometryData */assetRecord[/* geometryData */12],
          /* materialData */assetRecord[/* materialData */13]
        ];
}

export {
  getImageNodeMap ,
  setImageNodeMap ,
  unsafeGetResult ,
  setResult ,
  
}
/* No side effect */
