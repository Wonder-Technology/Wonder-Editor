

import * as SparseMapService$WonderEditor from "../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function getTextureNodeMap(assetState) {
  return assetState[/* textureNodeMap */4];
}

function setTextureNodeMap(textureNodeMap, assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeData */assetState[/* currentNodeData */2],
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* textureNodeMap */textureNodeMap,
          /* jsonNodeMap */assetState[/* jsonNodeMap */5],
          /* folderNodeMap */assetState[/* folderNodeMap */6],
          /* imageBase64Map */assetState[/* imageBase64Map */7]
        ];
}

function clearTextureNodeMap(assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeData */assetState[/* currentNodeData */2],
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* textureNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* jsonNodeMap */assetState[/* jsonNodeMap */5],
          /* folderNodeMap */assetState[/* folderNodeMap */6],
          /* imageBase64Map */assetState[/* imageBase64Map */7]
        ];
}

function setResult(index, result, assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeData */assetState[/* currentNodeData */2],
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* textureNodeMap */SparseMapService$WonderEditor.immutableSet(index, result, assetState[/* textureNodeMap */4]),
          /* jsonNodeMap */assetState[/* jsonNodeMap */5],
          /* folderNodeMap */assetState[/* folderNodeMap */6],
          /* imageBase64Map */assetState[/* imageBase64Map */7]
        ];
}

export {
  getTextureNodeMap ,
  setTextureNodeMap ,
  clearTextureNodeMap ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
