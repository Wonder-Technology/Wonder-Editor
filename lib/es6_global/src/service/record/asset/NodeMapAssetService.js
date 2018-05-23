'use strict';


function unsafeGetNodeMap(assetRecord) {
  return assetRecord[/* nodeMap */4];
}

function setNodeMap(nodeMap, assetRecord) {
  return /* record */[
          /* assetTree */assetRecord[/* assetTree */0],
          /* index */assetRecord[/* index */1],
          /* currentAssetTreeNode */assetRecord[/* currentAssetTreeNode */2],
          /* currentAssetChildrenNodeParent */assetRecord[/* currentAssetChildrenNodeParent */3],
          /* nodeMap */nodeMap
        ];
}

export {
  unsafeGetNodeMap ,
  setNodeMap       ,
  
}
/* No side effect */
