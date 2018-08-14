

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";

function getImageBase64Map(assetRecord) {
  return assetRecord[/* imageBase64Map */7];
}

function setImageBase64Map(imageBase64Map, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeData */assetRecord[/* currentNodeData */2],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */3],
          /* textureNodeMap */assetRecord[/* textureNodeMap */4],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */5],
          /* folderNodeMap */assetRecord[/* folderNodeMap */6],
          /* imageBase64Map */imageBase64Map
        ];
}

function setResult(textureIndex, base64, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeData */assetRecord[/* currentNodeData */2],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */3],
          /* textureNodeMap */assetRecord[/* textureNodeMap */4],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */5],
          /* folderNodeMap */assetRecord[/* folderNodeMap */6],
          /* imageBase64Map */SparseMapService$WonderEditor.immutableSet(textureIndex, base64, assetRecord[/* imageBase64Map */7])
        ];
}

export {
  getImageBase64Map ,
  setImageBase64Map ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
