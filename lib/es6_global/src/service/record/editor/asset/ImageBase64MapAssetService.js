

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";

function getImageBase64Map(assetRecord) {
  return assetRecord[/* imageBase64Map */10];
}

function setImageBase64Map(imageBase64Map, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */2],
          /* currentNodeData */assetRecord[/* currentNodeData */3],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */4],
          /* textureNodeMap */assetRecord[/* textureNodeMap */5],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */6],
          /* folderNodeMap */assetRecord[/* folderNodeMap */7],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */8],
          /* materialNodeMap */assetRecord[/* materialNodeMap */9],
          /* imageBase64Map */imageBase64Map,
          /* geometryData */assetRecord[/* geometryData */11]
        ];
}

function setResult(textureIndex, base64, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */2],
          /* currentNodeData */assetRecord[/* currentNodeData */3],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */4],
          /* textureNodeMap */assetRecord[/* textureNodeMap */5],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */6],
          /* folderNodeMap */assetRecord[/* folderNodeMap */7],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */8],
          /* materialNodeMap */assetRecord[/* materialNodeMap */9],
          /* imageBase64Map */SparseMapService$WonderEditor.immutableSet(textureIndex, base64, assetRecord[/* imageBase64Map */10]),
          /* geometryData */assetRecord[/* geometryData */11]
        ];
}

export {
  getImageBase64Map ,
  setImageBase64Map ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
