

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function getCurrentNodeParentId(assetRecord) {
  return assetRecord[/* currentNodeParentId */5];
}

function unsafeGetCurrentNodeParentId(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentNodeParentId */5]);
}

function clearCurrentNodeParentId(assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* imageIndex */assetRecord[/* imageIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */assetRecord[/* currentNodeData */4],
          /* currentNodeParentId */undefined,
          /* textureNodeMap */assetRecord[/* textureNodeMap */6],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */7],
          /* folderNodeMap */assetRecord[/* folderNodeMap */8],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */9],
          /* materialNodeMap */assetRecord[/* materialNodeMap */10],
          /* imageBase64Map */assetRecord[/* imageBase64Map */11],
          /* geometryData */assetRecord[/* geometryData */12],
          /* clonedGameObjectMap */assetRecord[/* clonedGameObjectMap */13]
        ];
}

function setCurrentNodeParentId(currentNodeParentId, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* imageIndex */assetRecord[/* imageIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */assetRecord[/* currentNodeData */4],
          /* currentNodeParentId */currentNodeParentId,
          /* textureNodeMap */assetRecord[/* textureNodeMap */6],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */7],
          /* folderNodeMap */assetRecord[/* folderNodeMap */8],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */9],
          /* materialNodeMap */assetRecord[/* materialNodeMap */10],
          /* imageBase64Map */assetRecord[/* imageBase64Map */11],
          /* geometryData */assetRecord[/* geometryData */12],
          /* clonedGameObjectMap */assetRecord[/* clonedGameObjectMap */13]
        ];
}

export {
  getCurrentNodeParentId ,
  unsafeGetCurrentNodeParentId ,
  clearCurrentNodeParentId ,
  setCurrentNodeParentId ,
  
}
/* OptionService-WonderEditor Not a pure module */
