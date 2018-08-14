

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function getAssetTreeRoot(assetRecord) {
  return assetRecord[/* assetTreeRoot */0];
}

function unsafeGetAssetTreeRoot(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* assetTreeRoot */0]);
}

function setAssetTreeRoot(assetTreeRoot, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetTreeRoot,
          /* index */assetRecord[/* index */1],
          /* currentNodeData */assetRecord[/* currentNodeData */2],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */3],
          /* textureNodeMap */assetRecord[/* textureNodeMap */4],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */5],
          /* folderNodeMap */assetRecord[/* folderNodeMap */6],
          /* imageBase64Map */assetRecord[/* imageBase64Map */7]
        ];
}

export {
  getAssetTreeRoot ,
  unsafeGetAssetTreeRoot ,
  setAssetTreeRoot ,
  
}
/* OptionService-WonderEditor Not a pure module */
