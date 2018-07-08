


function getIndex(assetState) {
  return assetState[/* index */1];
}

function increaseIndex(record) {
  return /* record */[
          /* assetTreeRoot */record[/* assetTreeRoot */0],
          /* index */record[/* index */1] + 1 | 0,
          /* currentNodeData */record[/* currentNodeData */2],
          /* currentNodeParentId */record[/* currentNodeParentId */3],
          /* textureNodeMap */record[/* textureNodeMap */4],
          /* jsonNodeMap */record[/* jsonNodeMap */5],
          /* folderNodeMap */record[/* folderNodeMap */6],
          /* imageBase64Map */record[/* imageBase64Map */7]
        ];
}

export {
  getIndex ,
  increaseIndex ,
  
}
/* No side effect */
