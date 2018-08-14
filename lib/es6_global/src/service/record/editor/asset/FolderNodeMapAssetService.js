

import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";

function getFolderNodeMap(assetRecord) {
  return assetRecord[/* folderNodeMap */6];
}

function setFolderNodeMap(folderNodeMap, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeData */assetRecord[/* currentNodeData */2],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */3],
          /* textureNodeMap */assetRecord[/* textureNodeMap */4],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */5],
          /* folderNodeMap */folderNodeMap,
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
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */5],
          /* folderNodeMap */SparseMapService$WonderEditor.immutableSet(index, result, assetRecord[/* folderNodeMap */6]),
          /* imageBase64Map */assetRecord[/* imageBase64Map */7]
        ];
}

export {
  getFolderNodeMap ,
  setFolderNodeMap ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
