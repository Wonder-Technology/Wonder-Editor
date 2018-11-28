

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";

function getRemovedAssetIdArray(assetRecord) {
  return assetRecord[/* removedAssetIdArray */3];
}

function hasUsableAssetId(assetRecord) {
  return ArrayService$WonderEditor.hasItem(assetRecord[/* removedAssetIdArray */3]);
}

function setRemovedAssetIdArray(removedAssetIdArray, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* imageIndex */assetRecord[/* imageIndex */2],
          /* removedAssetIdArray */removedAssetIdArray,
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
  getRemovedAssetIdArray ,
  hasUsableAssetId ,
  setRemovedAssetIdArray ,
  
}
/* ArrayService-WonderEditor Not a pure module */
