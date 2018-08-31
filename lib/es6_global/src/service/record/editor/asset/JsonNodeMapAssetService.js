

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";

function getJsonNodeMap(assetRecord) {
  return assetRecord[/* jsonNodeMap */6];
}

function setJsonNodeMap(jsonNodeMap, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */2],
          /* currentNodeData */assetRecord[/* currentNodeData */3],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */4],
          /* textureNodeMap */assetRecord[/* textureNodeMap */5],
          /* jsonNodeMap */jsonNodeMap,
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
          /* textureNodeMap */assetRecord[/* textureNodeMap */5],
          /* jsonNodeMap */SparseMapService$WonderEditor.immutableSet(index, result, assetRecord[/* jsonNodeMap */6]),
          /* folderNodeMap */assetRecord[/* folderNodeMap */7],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */8],
          /* materialNodeMap */assetRecord[/* materialNodeMap */9],
          /* imageBase64Map */assetRecord[/* imageBase64Map */10],
          /* geometryData */assetRecord[/* geometryData */11]
        ];
}

export {
  getJsonNodeMap ,
  setJsonNodeMap ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
