

import * as FileNameService$WonderEditor from "../../atom/FileNameService.js";
import * as SparseMapService$WonderEditor from "../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function getFolderNodeMap(assetState) {
  return assetState[/* folderNodeMap */6];
}

function setFolderNodeMap(folderNodeMap, assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeData */assetState[/* currentNodeData */2],
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* textureNodeMap */assetState[/* textureNodeMap */4],
          /* jsonNodeMap */assetState[/* jsonNodeMap */5],
          /* folderNodeMap */folderNodeMap,
          /* imageBase64Map */assetState[/* imageBase64Map */7]
        ];
}

function clearFolderNodeMap(assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeData */assetState[/* currentNodeData */2],
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* textureNodeMap */assetState[/* textureNodeMap */4],
          /* jsonNodeMap */assetState[/* jsonNodeMap */5],
          /* folderNodeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* imageBase64Map */assetState[/* imageBase64Map */7]
        ];
}

function setResult(index, result, assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeData */assetState[/* currentNodeData */2],
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* textureNodeMap */assetState[/* textureNodeMap */4],
          /* jsonNodeMap */assetState[/* jsonNodeMap */5],
          /* folderNodeMap */SparseMapService$WonderEditor.immutableSet(index, result, assetState[/* folderNodeMap */6]),
          /* imageBase64Map */assetState[/* imageBase64Map */7]
        ];
}

function getFolderBaseNameAndExtName(currentNodeId, folderNodeMap) {
  return FileNameService$WonderEditor.getBaseNameAndExtName(SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, folderNodeMap)[/* name */0]);
}

export {
  getFolderNodeMap ,
  setFolderNodeMap ,
  clearFolderNodeMap ,
  setResult ,
  getFolderBaseNameAndExtName ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
