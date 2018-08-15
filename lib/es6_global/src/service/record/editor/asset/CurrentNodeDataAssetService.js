

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function getCurrentNodeData(assetRecord) {
  return assetRecord[/* currentNodeData */2];
}

function unsafeGetCurrentNodeData(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentNodeData */2]);
}

function clearCurrentNodeData(assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeData */undefined,
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */3],
          /* textureNodeMap */assetRecord[/* textureNodeMap */4],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */5],
          /* folderNodeMap */assetRecord[/* folderNodeMap */6],
          /* imageBase64Map */assetRecord[/* imageBase64Map */7]
        ];
}

function setCurrentNodeData(currentNodeData, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeData */currentNodeData,
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */3],
          /* textureNodeMap */assetRecord[/* textureNodeMap */4],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */5],
          /* folderNodeMap */assetRecord[/* folderNodeMap */6],
          /* imageBase64Map */assetRecord[/* imageBase64Map */7]
        ];
}

export {
  getCurrentNodeData ,
  unsafeGetCurrentNodeData ,
  clearCurrentNodeData ,
  setCurrentNodeData ,
  
}
/* OptionService-WonderEditor Not a pure module */
