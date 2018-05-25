'use strict';

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function getCurrentNodeId(assetRecord) {
  return assetRecord[/* currentNodeId */2];
}

function unsafeGetCurrentNodeId(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentNodeId */2]);
}

function clearCurrentNodeId(assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeId : None */0,
          /* currentAssetChildrenNodeParent */assetRecord[/* currentAssetChildrenNodeParent */3],
          /* nodeMap */assetRecord[/* nodeMap */4]
        ];
}

function setCurrentNodeId(currentNodeId, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeId : Some */[currentNodeId],
          /* currentAssetChildrenNodeParent */assetRecord[/* currentAssetChildrenNodeParent */3],
          /* nodeMap */assetRecord[/* nodeMap */4]
        ];
}

export {
  getCurrentNodeId       ,
  unsafeGetCurrentNodeId ,
  clearCurrentNodeId     ,
  setCurrentNodeId       ,
  
}
/* OptionService-WonderEditor Not a pure module */
