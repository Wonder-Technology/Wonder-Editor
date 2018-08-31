

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function getCurrentNodeParentId(assetRecord) {
  return assetRecord[/* currentNodeParentId */4];
}

function unsafeGetCurrentNodeParentId(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentNodeParentId */4]);
}

function clearCurrentNodeParentId(assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */2],
          /* currentNodeData */assetRecord[/* currentNodeData */3],
          /* currentNodeParentId */undefined,
          /* textureNodeMap */assetRecord[/* textureNodeMap */5],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */6],
          /* folderNodeMap */assetRecord[/* folderNodeMap */7],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */8],
          /* materialNodeMap */assetRecord[/* materialNodeMap */9],
          /* imageBase64Map */assetRecord[/* imageBase64Map */10],
          /* geometryData */assetRecord[/* geometryData */11]
        ];
}

function setCurrentNodeParentId(currentNodeParentId, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */2],
          /* currentNodeData */assetRecord[/* currentNodeData */3],
          /* currentNodeParentId */currentNodeParentId,
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
  getCurrentNodeParentId ,
  unsafeGetCurrentNodeParentId ,
  clearCurrentNodeParentId ,
  setCurrentNodeParentId ,
  
}
/* OptionService-WonderEditor Not a pure module */
