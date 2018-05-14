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
          /* currentFile */assetRecord[/* currentFile */3],
          /* fileMap */assetRecord[/* fileMap */4]
        ];
}

function setCurrentTreeNode(currentTreeNode, assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */assetRecord[/* index */1],
          /* currentTreeNode : Some */[currentTreeNode],
          /* currentFile */assetRecord[/* currentFile */3],
          /* fileMap */assetRecord[/* fileMap */4]
        ];
}

export {
  getCurrentTreeNode       ,
  unsafeGetCurrentTreeNode ,
  clearCurrentTreeNode     ,
  setCurrentTreeNode       ,
  
}
/* OptionService-WonderEditor Not a pure module */
