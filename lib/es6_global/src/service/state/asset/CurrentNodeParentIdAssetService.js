

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
          /* currentNodeId */assetState[/* currentNodeId */2],
          /* currentNodeParentId : None */0,
          /* nodeMap */assetState[/* nodeMap */4]
        ];
}

function setCurrentNodeParentId(currentNodeParentId, assetState) {
  return /* record */[
          /* assetTreeRoot */assetState[/* assetTreeRoot */0],
          /* index */assetState[/* index */1],
          /* currentNodeId */assetState[/* currentNodeId */2],
          /* currentNodeParentId : Some */[currentNodeParentId],
          /* nodeMap */assetState[/* nodeMap */4]
        ];
}

export {
  getCurrentNodeParentId ,
  unsafeGetCurrentNodeParentId ,
  clearCurrentNodeParentId ,
  setCurrentNodeParentId ,
  
}
/* OptionService-WonderEditor Not a pure module */
