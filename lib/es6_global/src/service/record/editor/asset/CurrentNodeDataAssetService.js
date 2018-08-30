

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function getCurrentNodeData(assetRecord) {
  return assetRecord[/* currentNodeData */4];
}

function unsafeGetCurrentNodeData(assetRecord) {
  return OptionService$WonderEditor.unsafeGet(assetRecord[/* currentNodeData */4]);
}

function clearCurrentNodeData(assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* lastDefaultComponentIndex */assetRecord[/* lastDefaultComponentIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */undefined,
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */5],
          /* textureNodeMap */assetRecord[/* textureNodeMap */6],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */7],
          /* folderNodeMap */assetRecord[/* folderNodeMap */8],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */9],
          /* materialNodeMap */assetRecord[/* materialNodeMap */10],
          /* imageBase64Map */assetRecord[/* imageBase64Map */11],
          /* geometryNodeMap */assetRecord[/* geometryNodeMap */12],
          /* geometryData */assetRecord[/* geometryData */13]
        ];
}

function setCurrentNodeData(currentNodeData, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* lastDefaultComponentIndex */assetRecord[/* lastDefaultComponentIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */currentNodeData,
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */5],
          /* textureNodeMap */assetRecord[/* textureNodeMap */6],
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */7],
          /* folderNodeMap */assetRecord[/* folderNodeMap */8],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */9],
          /* materialNodeMap */assetRecord[/* materialNodeMap */10],
          /* imageBase64Map */assetRecord[/* imageBase64Map */11],
          /* geometryNodeMap */assetRecord[/* geometryNodeMap */12],
          /* geometryData */assetRecord[/* geometryData */13]
        ];
}

export {
  getCurrentNodeData ,
  unsafeGetCurrentNodeData ,
  clearCurrentNodeData ,
  setCurrentNodeData ,
  
}
/* OptionService-WonderEditor Not a pure module */
