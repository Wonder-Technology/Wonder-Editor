

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";

function getFolderNodeMap(assetRecord) {
  return assetRecord[/* folderNodeMap */7];
}

function setFolderNodeMap(folderNodeMap, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */2],
          /* currentNodeData */assetRecord[/* currentNodeData */3],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */4],
          /* textureNodeMap */assetRecord[/* textureNodeMap */5],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */6],
          /* folderNodeMap */folderNodeMap,
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */8],
          /* materialNodeMap */assetRecord[/* materialNodeMap */9],
          /* imageBase64Map */assetRecord[/* imageBase64Map */10],
          /* geometryData */assetRecord[/* geometryData */11]
        ];
}

function setResult(index, result, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */2],
          /* currentNodeData */assetRecord[/* currentNodeData */3],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */4],
          /* textureNodeMap */assetRecord[/* textureNodeMap */5],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */6],
          /* folderNodeMap */SparseMapService$WonderEditor.immutableSet(index, result, assetRecord[/* folderNodeMap */7]),
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */8],
          /* materialNodeMap */assetRecord[/* materialNodeMap */9],
          /* imageBase64Map */assetRecord[/* imageBase64Map */10],
          /* geometryData */assetRecord[/* geometryData */11]
        ];
}

export {
  getFolderNodeMap ,
  setFolderNodeMap ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
