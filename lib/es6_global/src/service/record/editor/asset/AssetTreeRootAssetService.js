'use strict';

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function getAssetTreeRoot(assetRecord) {
  return assetRecord[/* assetTreeRoot */0];
}

function unsafeGetAssetTreeRoot(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* assetTreeRoot */0]);
}

function setAssetTreeRoot(assetTreeRoot, assetRecord) {
  return /* record */[
          /* assetTreeRoot : Some */[assetTreeRoot],
          /* index */assetRecord[/* index */1],
          /* currentNodeId */assetRecord[/* currentNodeId */2],
          /* currentAssetChildrenNodeParent */assetRecord[/* currentAssetChildrenNodeParent */3],
          /* nodeMap */assetRecord[/* nodeMap */4]
        ];
}

export {
  getAssetTreeRoot       ,
  unsafeGetAssetTreeRoot ,
  setAssetTreeRoot       ,
  
}
/* OptionService-WonderEditor Not a pure module */
