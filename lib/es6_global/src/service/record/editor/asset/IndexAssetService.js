'use strict';


function getIndex(assetRecord) {
  return assetRecord[/* index */1];
}

function increaseIndex(record) {
  return /* record */[
          /* assetTreeRoot */record[/* assetTreeRoot */0],
          /* index */record[/* index */1] + 1 | 0,
          /* currentNodeId */record[/* currentNodeId */2],
          /* currentAssetChildrenNodeParent */record[/* currentAssetChildrenNodeParent */3],
          /* nodeMap */record[/* nodeMap */4]
        ];
}

export {
  getIndex      ,
  increaseIndex ,
  
}
/* No side effect */
