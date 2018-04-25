'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function unsafeGetImageMap(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* imageMap */3]);
}

function setImageMap(imageMap, assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */assetRecord[/* index */1],
          /* currentTreeNode */assetRecord[/* currentTreeNode */2],
          /* imageMap : Some */[imageMap]
        ];
}

export {
  unsafeGetImageMap ,
  setImageMap       ,
  
}
/* OptionService-WonderEditor Not a pure module */
