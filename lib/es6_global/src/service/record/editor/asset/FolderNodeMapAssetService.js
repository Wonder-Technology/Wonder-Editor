

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";

function getFolderNodeMap(assetRecord) {
  return assetRecord[/* folderNodeMap */8];
}

function setFolderNodeMap(folderNodeMap, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* imageIndex */assetRecord[/* imageIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */assetRecord[/* currentNodeData */4],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */5],
          /* textureNodeMap */assetRecord[/* textureNodeMap */6],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */7],
          /* folderNodeMap */folderNodeMap,
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */9],
          /* materialNodeMap */assetRecord[/* materialNodeMap */10],
          /* imageBase64Map */assetRecord[/* imageBase64Map */11],
          /* geometryData */assetRecord[/* geometryData */12],
          /* clonedGameObjectMap */assetRecord[/* clonedGameObjectMap */13]
        ];
}

function setResult(index, result, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* imageIndex */assetRecord[/* imageIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */assetRecord[/* currentNodeData */4],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */5],
          /* textureNodeMap */assetRecord[/* textureNodeMap */6],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */7],
          /* folderNodeMap */SparseMapService$WonderEditor.immutableSet(index, result, assetRecord[/* folderNodeMap */8]),
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */9],
          /* materialNodeMap */assetRecord[/* materialNodeMap */10],
          /* imageBase64Map */assetRecord[/* imageBase64Map */11],
          /* geometryData */assetRecord[/* geometryData */12],
          /* clonedGameObjectMap */assetRecord[/* clonedGameObjectMap */13]
        ];
}

export {
  getFolderNodeMap ,
  setFolderNodeMap ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
