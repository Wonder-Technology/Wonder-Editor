'use strict';

import * as OptionService$WonderEditor from "../../primitive/OptionService.js";

function unsafeGetImageMap(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* imageMap */2]);
}

function setImageMap(imageMap, assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */assetRecord[/* index */1],
          /* imageMap : Some */[imageMap]
        ];
}

export {
  unsafeGetImageMap ,
  setImageMap       ,
  
}
/* OptionService-WonderEditor Not a pure module */
