'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function getCurrentTreeNode(assetRecord) {
  return assetRecord[/* currentTreeNode */2];
}

function unsafeGetCurrentTreeNode(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentTreeNode */2]);
}

function setCurrentTreeNode(currentTreeNode, assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */assetRecord[/* index */1],
          /* currentTreeNode : Some */[currentTreeNode],
          /* imageMap */assetRecord[/* imageMap */3]
        ];
}

export {
  getCurrentTreeNode       ,
  unsafeGetCurrentTreeNode ,
  setCurrentTreeNode       ,
  
}
/* OptionService-WonderEditor Not a pure module */
