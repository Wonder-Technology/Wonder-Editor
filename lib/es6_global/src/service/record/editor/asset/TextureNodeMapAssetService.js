

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";

function getTextureNodeMap(assetRecord) {
  return assetRecord[/* textureNodeMap */4];
}

function setTextureNodeMap(textureNodeMap, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeData */assetRecord[/* currentNodeData */2],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */3],
          /* textureNodeMap */textureNodeMap,
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */5],
          /* folderNodeMap */assetRecord[/* folderNodeMap */6],
          /* imageBase64Map */assetRecord[/* imageBase64Map */7]
        ];
}

function setResult(index, result, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeData */assetRecord[/* currentNodeData */2],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */3],
          /* textureNodeMap */SparseMapService$WonderEditor.immutableSet(index, result, assetRecord[/* textureNodeMap */4]),
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */5],
          /* folderNodeMap */assetRecord[/* folderNodeMap */6],
          /* imageBase64Map */assetRecord[/* imageBase64Map */7]
        ];
}

export {
  getTextureNodeMap ,
  setTextureNodeMap ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
