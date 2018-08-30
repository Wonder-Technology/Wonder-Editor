

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";

function getImageBase64Map(assetRecord) {
  return assetRecord[/* imageBase64Map */11];
}

function setImageBase64Map(imageBase64Map, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* lastDefaultComponentIndex */assetRecord[/* lastDefaultComponentIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */assetRecord[/* currentNodeData */4],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */5],
          /* textureNodeMap */assetRecord[/* textureNodeMap */6],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */7],
          /* folderNodeMap */assetRecord[/* folderNodeMap */8],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */9],
          /* materialNodeMap */assetRecord[/* materialNodeMap */10],
          /* imageBase64Map */imageBase64Map,
          /* geometryNodeMap */assetRecord[/* geometryNodeMap */12],
          /* geometryData */assetRecord[/* geometryData */13]
        ];
}

function setResult(textureIndex, base64, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* lastDefaultComponentIndex */assetRecord[/* lastDefaultComponentIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */assetRecord[/* currentNodeData */4],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */5],
          /* textureNodeMap */assetRecord[/* textureNodeMap */6],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */7],
          /* folderNodeMap */assetRecord[/* folderNodeMap */8],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */9],
          /* materialNodeMap */assetRecord[/* materialNodeMap */10],
          /* imageBase64Map */SparseMapService$WonderEditor.immutableSet(textureIndex, base64, assetRecord[/* imageBase64Map */11]),
          /* geometryNodeMap */assetRecord[/* geometryNodeMap */12],
          /* geometryData */assetRecord[/* geometryData */13]
        ];
}

export {
  getImageBase64Map ,
  setImageBase64Map ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
