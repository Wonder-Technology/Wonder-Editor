

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";

function getTextureNodeMap(assetRecord) {
  return assetRecord[/* textureNodeMap */6];
}

function setTextureNodeMap(textureNodeMap, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* lastDefaultComponentIndex */assetRecord[/* lastDefaultComponentIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */assetRecord[/* currentNodeData */4],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */5],
          /* textureNodeMap */textureNodeMap,
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */7],
          /* folderNodeMap */assetRecord[/* folderNodeMap */8],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */9],
          /* materialNodeMap */assetRecord[/* materialNodeMap */10],
          /* imageBase64Map */assetRecord[/* imageBase64Map */11],
          /* geometryNodeMap */assetRecord[/* geometryNodeMap */12],
          /* geometryData */assetRecord[/* geometryData */13]
        ];
}

function setResult(index, result, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* lastDefaultComponentIndex */assetRecord[/* lastDefaultComponentIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */assetRecord[/* currentNodeData */4],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */5],
          /* textureNodeMap */SparseMapService$WonderEditor.immutableSet(index, result, assetRecord[/* textureNodeMap */6]),
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */7],
          /* folderNodeMap */assetRecord[/* folderNodeMap */8],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */9],
          /* materialNodeMap */assetRecord[/* materialNodeMap */10],
          /* imageBase64Map */assetRecord[/* imageBase64Map */11],
          /* geometryNodeMap */assetRecord[/* geometryNodeMap */12],
          /* geometryData */assetRecord[/* geometryData */13]
        ];
}

export {
  getTextureNodeMap ,
  setTextureNodeMap ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
