

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";

function getJsonNodeMap(assetRecord) {
  return assetRecord[/* jsonNodeMap */7];
}

function setJsonNodeMap(jsonNodeMap, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* imageIndex */assetRecord[/* imageIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */assetRecord[/* currentNodeData */4],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */5],
          /* textureNodeMap */assetRecord[/* textureNodeMap */6],
          /* jsonNodeMap */jsonNodeMap,
          /* folderNodeMap */assetRecord[/* folderNodeMap */8],
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
          /* jsonNodeMap */SparseMapService$WonderEditor.immutableSet(index, result, assetRecord[/* jsonNodeMap */7]),
          /* folderNodeMap */assetRecord[/* folderNodeMap */8],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */9],
          /* materialNodeMap */assetRecord[/* materialNodeMap */10],
          /* imageBase64Map */assetRecord[/* imageBase64Map */11],
          /* geometryData */assetRecord[/* geometryData */12],
          /* clonedGameObjectMap */assetRecord[/* clonedGameObjectMap */13]
        ];
}

export {
  getJsonNodeMap ,
  setJsonNodeMap ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
