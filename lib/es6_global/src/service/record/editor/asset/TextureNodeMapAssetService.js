

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function getTextureNodeMap(assetRecord) {
  return assetRecord[/* textureNodeMap */6];
}

function setTextureNodeMap(textureNodeMap, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* imageIndex */assetRecord[/* imageIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */assetRecord[/* currentNodeData */4],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */5],
          /* textureNodeMap */textureNodeMap,
          /* folderNodeMap */assetRecord[/* folderNodeMap */7],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */8],
          /* materialNodeMap */assetRecord[/* materialNodeMap */9],
          /* materialNodeIdMap */assetRecord[/* materialNodeIdMap */10],
          /* imageNodeMap */assetRecord[/* imageNodeMap */11],
          /* geometryData */assetRecord[/* geometryData */12],
          /* materialData */assetRecord[/* materialData */13]
        ];
}

function getResult(index, assetRecord) {
  return SparseMapService$WonderCommonlib.get(index, assetRecord[/* textureNodeMap */6]);
}

function setResult(index, result, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* imageIndex */assetRecord[/* imageIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */assetRecord[/* currentNodeData */4],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */5],
          /* textureNodeMap */SparseMapService$WonderEditor.immutableSet(index, result, assetRecord[/* textureNodeMap */6]),
          /* folderNodeMap */assetRecord[/* folderNodeMap */7],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */8],
          /* materialNodeMap */assetRecord[/* materialNodeMap */9],
          /* materialNodeIdMap */assetRecord[/* materialNodeIdMap */10],
          /* imageNodeMap */assetRecord[/* imageNodeMap */11],
          /* geometryData */assetRecord[/* geometryData */12],
          /* materialData */assetRecord[/* materialData */13]
        ];
}

export {
  getTextureNodeMap ,
  setTextureNodeMap ,
  getResult ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
