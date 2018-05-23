'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function getAssetTree(assetRecord) {
  return assetRecord[/* assetTree */0];
}

function unsafeGetAssetTree(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* assetTree */0]);
}

function setAssetTree(assetTree, assetRecord) {
  return /* record */[
          /* assetTree : Some */[assetTree],
          /* index */assetRecord[/* index */1],
          /* currentAssetTreeNode */assetRecord[/* currentAssetTreeNode */2],
          /* currentAssetChildrenNodeParent */assetRecord[/* currentAssetChildrenNodeParent */3],
          /* nodeMap */assetRecord[/* nodeMap */4]
        ];
}

function clearAssetTree(assetRecord) {
  return /* record */[
          /* assetTree : None */0,
          /* index */assetRecord[/* index */1],
          /* currentAssetTreeNode */assetRecord[/* currentAssetTreeNode */2],
          /* currentAssetChildrenNodeParent */assetRecord[/* currentAssetChildrenNodeParent */3],
          /* nodeMap */assetRecord[/* nodeMap */4]
        ];
}

export {
  getAssetTree       ,
  unsafeGetAssetTree ,
  setAssetTree       ,
  clearAssetTree     ,
  
}
/* OptionService-WonderEditor Not a pure module */
