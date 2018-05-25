'use strict';

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function getCurrentAssetChildrenNodeParent(assetRecord) {
  return assetRecord[/* currentAssetChildrenNodeParent */3];
}

function unsafeGetCurrentAssetChildrenNodeParent(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentAssetChildrenNodeParent */3]);
}

function clearCurrentAssetChildrenNodeParent(assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentAssetTreeNode */assetRecord[/* currentAssetTreeNode */2],
          /* currentAssetChildrenNodeParent : None */0,
          /* nodeMap */assetRecord[/* nodeMap */4]
        ];
}

function setCurrentAssetChildrenNodeParent(currentAssetChildrenNodeParent, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentAssetTreeNode */assetRecord[/* currentAssetTreeNode */2],
          /* currentAssetChildrenNodeParent : Some */[currentAssetChildrenNodeParent],
          /* nodeMap */assetRecord[/* nodeMap */4]
        ];
}

export {
  getCurrentAssetChildrenNodeParent       ,
  unsafeGetCurrentAssetChildrenNodeParent ,
  clearCurrentAssetChildrenNodeParent     ,
  setCurrentAssetChildrenNodeParent       ,
  
}
/* OptionService-WonderEditor Not a pure module */
