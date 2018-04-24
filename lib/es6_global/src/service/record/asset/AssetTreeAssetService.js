'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function unsafeGetAssetTree(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* assetTree */0]);
}

function setAssetTree(assetTree, assetRecord) {
  return /* record */[
          /* assetTree : Some */[assetTree],
          /* index */assetRecord[/* index */1],
          /* imageMap */assetRecord[/* imageMap */2]
        ];
}

export {
  unsafeGetAssetTree ,
  setAssetTree       ,
  
}
/* OptionService-WonderEditor Not a pure module */
