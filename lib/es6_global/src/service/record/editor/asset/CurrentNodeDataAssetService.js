

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function getCurrentNodeData(assetRecord) {
  return assetRecord[/* currentNodeData */3];
}

function unsafeGetCurrentNodeData(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentNodeData */3]);
}

function clearCurrentNodeData(assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */2],
          /* currentNodeData */undefined,
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

function setCurrentNodeData(currentNodeData, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */2],
          /* currentNodeData */currentNodeData,
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
  getCurrentNodeData ,
  unsafeGetCurrentNodeData ,
  clearCurrentNodeData ,
  setCurrentNodeData ,
  
}
/* OptionService-WonderEditor Not a pure module */
