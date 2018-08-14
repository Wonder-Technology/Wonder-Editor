

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function getCurrentNodeParentId(assetRecord) {
  return assetRecord[/* currentNodeParentId */3];
}

function unsafeGetCurrentNodeParentId(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentNodeParentId */3]);
}

function clearCurrentNodeParentId(assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeData */assetRecord[/* currentNodeData */2],
          /* currentNodeParentId */undefined,
          /* textureNodeMap */assetRecord[/* textureNodeMap */4],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */5],
          /* folderNodeMap */assetRecord[/* folderNodeMap */6],
          /* imageBase64Map */assetRecord[/* imageBase64Map */7]
        ];
}

function setCurrentNodeParentId(currentNodeParentId, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeData */assetRecord[/* currentNodeData */2],
          /* currentNodeParentId */currentNodeParentId,
          /* textureNodeMap */assetRecord[/* textureNodeMap */4],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */5],
          /* folderNodeMap */assetRecord[/* folderNodeMap */6],
          /* imageBase64Map */assetRecord[/* imageBase64Map */7]
        ];
}

export {
  getCurrentNodeParentId ,
  unsafeGetCurrentNodeParentId ,
  clearCurrentNodeParentId ,
  setCurrentNodeParentId ,
  
}
/* OptionService-WonderEditor Not a pure module */
