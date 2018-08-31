

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";

function getTextureNodeMap(assetRecord) {
  return assetRecord[/* textureNodeMap */5];
}

function setTextureNodeMap(textureNodeMap, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */2],
          /* currentNodeData */assetRecord[/* currentNodeData */3],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */4],
          /* textureNodeMap */textureNodeMap,
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */6],
          /* folderNodeMap */assetRecord[/* folderNodeMap */7],
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
          /* textureNodeMap */SparseMapService$WonderEditor.immutableSet(index, result, assetRecord[/* textureNodeMap */5]),
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */6],
          /* folderNodeMap */assetRecord[/* folderNodeMap */7],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */8],
          /* materialNodeMap */assetRecord[/* materialNodeMap */9],
          /* imageBase64Map */assetRecord[/* imageBase64Map */10],
          /* geometryData */assetRecord[/* geometryData */11]
        ];
}

export {
  getTextureNodeMap ,
  setTextureNodeMap ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
