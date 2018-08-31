

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
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */2],
          /* currentNodeData */assetRecord[/* currentNodeData */3],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */4],
          /* textureNodeMap */assetRecord[/* textureNodeMap */5],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */6],
          /* folderNodeMap */assetRecord[/* folderNodeMap */7],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */8],
          /* materialNodeMap */assetRecord[/* materialNodeMap */9],
          /* imageBase64Map */assetRecord[/* imageBase64Map */10],
          /* geometryData */assetRecord[/* geometryData */11]
        ];
}

export {
  getAssetTreeRoot ,
  unsafeGetAssetTreeRoot ,
  setAssetTreeRoot ,
  
}
/* OptionService-WonderEditor Not a pure module */
