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
          /* currentTreeNode */assetRecord[/* currentTreeNode */2],
          /* currentFile */assetRecord[/* currentFile */3],
          /* fileMap */assetRecord[/* fileMap */4]
        ];
}

export {
  getAssetTree       ,
  unsafeGetAssetTree ,
  setAssetTree       ,
  
}
/* OptionService-WonderEditor Not a pure module */
