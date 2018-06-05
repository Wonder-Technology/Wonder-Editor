


function unsafeGetNodeMap(assetRecord) {
  return assetRecord[/* nodeMap */4];
}

function setNodeMap(nodeMap, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
          /* index */assetRecord[/* index */1],
          /* currentNodeId */assetRecord[/* currentNodeId */2],
          /* currentNodeParentId */assetRecord[/* currentNodeParentId */3],
          /* nodeMap */nodeMap
        ];
}

export {
  unsafeGetNodeMap ,
  setNodeMap ,
  
}
/* No side effect */
