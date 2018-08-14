

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";

function getJsonNodeMap(assetRecord) {
  return assetRecord[/* jsonNodeMap */5];
}

function setJsonNodeMap(jsonNodeMap, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeData */assetRecord[/* currentNodeData */2],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */3],
          /* textureNodeMap */assetRecord[/* textureNodeMap */4],
          /* jsonNodeMap */jsonNodeMap,
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
          /* textureNodeMap */assetRecord[/* textureNodeMap */4],
          /* jsonNodeMap */SparseMapService$WonderEditor.immutableSet(index, result, assetRecord[/* jsonNodeMap */5]),
          /* folderNodeMap */assetRecord[/* folderNodeMap */6],
          /* imageBase64Map */assetRecord[/* imageBase64Map */7]
        ];
}

export {
  getJsonNodeMap ,
  setJsonNodeMap ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
