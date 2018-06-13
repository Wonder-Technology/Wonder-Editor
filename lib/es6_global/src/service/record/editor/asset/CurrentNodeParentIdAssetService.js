

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
          /* currentNodeId */assetRecord[/* currentNodeId */2],
          /* currentNodeParentId : None */0,
          /* nodeMap */assetRecord[/* nodeMap */4]
        ];
}

function setCurrentNodeParentId(currentNodeParentId, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeId */assetRecord[/* currentNodeId */2],
          /* currentNodeParentId : Some */[currentNodeParentId],
          /* nodeMap */assetRecord[/* nodeMap */4]
        ];
}

export {
  getCurrentNodeParentId ,
  unsafeGetCurrentNodeParentId ,
  clearCurrentNodeParentId ,
  setCurrentNodeParentId ,
  
}
/* OptionService-WonderEditor Not a pure module */
