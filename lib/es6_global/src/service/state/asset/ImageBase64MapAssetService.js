

import * as SparseMapService$WonderEditor from "../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function unsafeGetImageBase64Map(assetState) {
  return assetState[/* imageBase64Map */7];
}

function setImageBase64Map(imageBase64Map, assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeData */assetState[/* currentNodeData */2],
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* textureNodeMap */assetState[/* textureNodeMap */4],
          /* jsonNodeMap */assetState[/* jsonNodeMap */5],
          /* folderNodeMap */assetState[/* folderNodeMap */6],
          /* imageBase64Map */imageBase64Map
        ];
}

function clearImageBase64Map(assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeData */assetState[/* currentNodeData */2],
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* textureNodeMap */assetState[/* textureNodeMap */4],
          /* jsonNodeMap */assetState[/* jsonNodeMap */5],
          /* folderNodeMap */assetState[/* folderNodeMap */6],
          /* imageBase64Map */SparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function setResult(textureId, base64, assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeData */assetState[/* currentNodeData */2],
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* textureNodeMap */assetState[/* textureNodeMap */4],
          /* jsonNodeMap */assetState[/* jsonNodeMap */5],
          /* folderNodeMap */assetState[/* folderNodeMap */6],
          /* imageBase64Map */SparseMapService$WonderEditor.immutableSet(textureId, base64, assetState[/* imageBase64Map */7])
        ];
}

export {
  unsafeGetImageBase64Map ,
  setImageBase64Map ,
  clearImageBase64Map ,
  setResult ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
