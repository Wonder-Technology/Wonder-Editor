

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
          /* imageIndex */assetRecord[/* imageIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */assetRecord[/* currentNodeData */4],
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

function clearAsserTreeRoot(assetRecord) {
  return /* record */[
          /* assetTreeRoot */undefined,
          /* index */assetRecord[/* index */1],
          /* imageIndex */assetRecord[/* imageIndex */2],
          /* removedAssetIdArray */assetRecord[/* removedAssetIdArray */3],
          /* currentNodeData */assetRecord[/* currentNodeData */4],
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
  getAssetTreeRoot ,
  unsafeGetAssetTreeRoot ,
  setAssetTreeRoot ,
  clearAsserTreeRoot ,
  
}
/* OptionService-WonderEditor Not a pure module */
