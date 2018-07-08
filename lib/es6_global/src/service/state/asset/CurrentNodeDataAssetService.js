

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function getCurrentNodeData(assetState) {
  return assetState[/* currentNodeData */2];
}

function unsafeGetCurrentNodeData(assetState) {
  return OptionService$WonderEditor.unsafeGet(assetState[/* currentNodeData */2]);
}

function clearCurrentNodeData(assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeData : None */0,
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* textureNodeMap */assetState[/* textureNodeMap */4],
          /* jsonNodeMap */assetState[/* jsonNodeMap */5],
          /* folderNodeMap */assetState[/* folderNodeMap */6],
          /* imageBase64Map */assetState[/* imageBase64Map */7]
        ];
}

function setCurrentNodeData(currentNodeData, assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeData : Some */[currentNodeData],
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* textureNodeMap */assetState[/* textureNodeMap */4],
          /* jsonNodeMap */assetState[/* jsonNodeMap */5],
          /* folderNodeMap */assetState[/* folderNodeMap */6],
          /* imageBase64Map */assetState[/* imageBase64Map */7]
        ];
}

export {
  getCurrentNodeData ,
  unsafeGetCurrentNodeData ,
  clearCurrentNodeData ,
  setCurrentNodeData ,
  
}
/* OptionService-WonderEditor Not a pure module */
