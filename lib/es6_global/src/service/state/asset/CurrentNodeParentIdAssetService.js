

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function getCurrentNodeParentId(assetState) {
  return assetState[/* currentNodeParentId */3];
}

function unsafeGetCurrentNodeParentId(assetState) {
  return OptionService$WonderEditor.unsafeGet(assetState[/* currentNodeParentId */3]);
}

function clearCurrentNodeParentId(assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeData */assetState[/* currentNodeData */2],
          /* currentNodeParentId : None */0,
          /* textureNodeMap */assetState[/* textureNodeMap */4],
          /* jsonNodeMap */assetState[/* jsonNodeMap */5],
          /* folderNodeMap */assetState[/* folderNodeMap */6],
          /* imageBase64Map */assetState[/* imageBase64Map */7]
        ];
}

function setCurrentNodeParentId(currentNodeParentId, assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeData */assetState[/* currentNodeData */2],
          /* currentNodeParentId : Some */[currentNodeParentId],
          /* textureNodeMap */assetState[/* textureNodeMap */4],
          /* jsonNodeMap */assetState[/* jsonNodeMap */5],
          /* folderNodeMap */assetState[/* folderNodeMap */6],
          /* imageBase64Map */assetState[/* imageBase64Map */7]
        ];
}

export {
  getCurrentNodeParentId ,
  unsafeGetCurrentNodeParentId ,
  clearCurrentNodeParentId ,
  setCurrentNodeParentId ,
  
}
/* OptionService-WonderEditor Not a pure module */
