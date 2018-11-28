

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
          /* jsonNodeMap */assetRecord[/* jsonNodeMap */7],
          /* folderNodeMap */assetRecord[/* folderNodeMap */8],
          /* wdbNodeMap */assetRecord[/* wdbNodeMap */9],
          /* materialNodeMap */assetRecord[/* materialNodeMap */10],
          /* imageBase64Map */assetRecord[/* imageBase64Map */11],
          /* geometryData */assetRecord[/* geometryData */12],
          /* clonedGameObjectMap */assetRecord[/* clonedGameObjectMap */13]
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
  getAssetTreeRoot ,
  unsafeGetAssetTreeRoot ,
  setAssetTreeRoot ,
  clearAsserTreeRoot ,
  
}
/* OptionService-WonderEditor Not a pure module */
