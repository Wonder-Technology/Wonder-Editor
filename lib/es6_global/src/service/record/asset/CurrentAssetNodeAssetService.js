'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function getCurrentAssetTreeNode(assetRecord) {
  return assetRecord[/* currentAssetTreeNode */2];
}

function unsafeGetCurrentAssetTreeNode(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentAssetTreeNode */2]);
}

function clearCurrentAssetTreeNode(assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */assetRecord[/* index */1],
          /* currentAssetTreeNode : None */0,
          /* currentAssetChildrenNodeParent */assetRecord[/* currentAssetChildrenNodeParent */3],
          /* nodeMap */assetRecord[/* nodeMap */4]
        ];
}

function setCurrentAssetTreeNode(currentAssetTreeNode, assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */assetRecord[/* index */1],
          /* currentAssetTreeNode : Some */[currentAssetTreeNode],
          /* currentAssetChildrenNodeParent */assetRecord[/* currentAssetChildrenNodeParent */3],
          /* nodeMap */assetRecord[/* nodeMap */4]
        ];
}

export {
  getCurrentAssetTreeNode       ,
  unsafeGetCurrentAssetTreeNode ,
  clearCurrentAssetTreeNode     ,
  setCurrentAssetTreeNode       ,
  
}
/* OptionService-WonderEditor Not a pure module */
