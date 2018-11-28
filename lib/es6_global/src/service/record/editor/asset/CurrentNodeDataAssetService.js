

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
          /* imageIndex */assetRecord[/* imageIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */undefined,
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */5],
          /* textureNodeMap */assetRecord[/* textureNodeMap */6],
          /* folderNodeMap */assetRecord[/* folderNodeMap */7],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */8],
          /* materialNodeMap */assetRecord[/* materialNodeMap */9],
          /* materialNodeIdMap */assetRecord[/* materialNodeIdMap */10],
          /* imageNodeMap */assetRecord[/* imageNodeMap */11],
          /* geometryData */assetRecord[/* geometryData */12],
          /* materialData */assetRecord[/* materialData */13]
        ];
}

function setCurrentNodeData(currentNodeData, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* imageIndex */assetRecord[/* imageIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */currentNodeData,
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */5],
          /* textureNodeMap */assetRecord[/* textureNodeMap */6],
          /* folderNodeMap */assetRecord[/* folderNodeMap */7],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */8],
          /* materialNodeMap */assetRecord[/* materialNodeMap */9],
          /* materialNodeIdMap */assetRecord[/* materialNodeIdMap */10],
          /* imageNodeMap */assetRecord[/* imageNodeMap */11],
          /* geometryData */assetRecord[/* geometryData */12],
          /* materialData */assetRecord[/* materialData */13]
        ];
}

export {
  getCurrentNodeData ,
  unsafeGetCurrentNodeData ,
  clearCurrentNodeData ,
  setCurrentNodeData ,
  
}
/* OptionService-WonderEditor Not a pure module */
