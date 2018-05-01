'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function getCurrentTreeNode(assetRecord) {
  return assetRecord[/* currentTreeNode */2];
}

function unsafeGetCurrentTreeNode(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentTreeNode */2]);
}

function clearCurrentTreeNode(assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */assetRecord[/* index */1],
          /* currentTreeNode : None */0,
          /* fileMap */assetRecord[/* fileMap */3]
        ];
}

function setCurrentTreeNode(currentTreeNode, assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */assetRecord[/* index */1],
          /* currentTreeNode : Some */[currentTreeNode],
          /* fileMap */assetRecord[/* fileMap */3]
        ];
}

export {
  getCurrentTreeNode       ,
  unsafeGetCurrentTreeNode ,
  clearCurrentTreeNode     ,
  setCurrentTreeNode       ,
  
}
/* OptionService-WonderEditor Not a pure module */
