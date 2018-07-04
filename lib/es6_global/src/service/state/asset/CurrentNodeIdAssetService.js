

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function getCurrentNodeId(assetState) {
  return assetState[/* currentNodeId */2];
}

function unsafeGetCurrentNodeId(assetState) {
  return OptionService$WonderEditor.unsafeGet(assetState[/* currentNodeId */2]);
}

function clearCurrentNodeId(assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeId : None */0,
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* nodeMap */assetState[/* nodeMap */4]
        ];
}

function setCurrentNodeId(currentNodeId, assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeId : Some */[currentNodeId],
          /* currentNodeParentId */assetState[/* currentNodeParentId */3],
          /* nodeMap */assetState[/* nodeMap */4]
        ];
}

export {
  getCurrentNodeId ,
  unsafeGetCurrentNodeId ,
  clearCurrentNodeId ,
  setCurrentNodeId ,
  
}
/* OptionService-WonderEditor Not a pure module */
