


function getIndex(assetRecord) {
  return assetRecord[/* index */1];
}

function increaseIndex(record) {
  return /* record */[
          /* assetTreeRoot */record[/* assetTreeRoot */0],
          /* index */record[/* index */1] + 1 | 0,
          /* lastDefaultComponentIndex */record[/* lastDefaultComponentIndex */2],
          /* removedAssetIdArray */record[/* removedAssetIdArray */3],
          /* currentNodeData */record[/* currentNodeData */4],
          /* currentNodeParentId */record[/* currentNodeParentId */5],
          /* textureNodeMap */record[/* textureNodeMap */6],
          /* jsonNodeMap */record[/* jsonNodeMap */7],
          /* folderNodeMap */record[/* folderNodeMap */8],
          /* wdbNodeMap */record[/* wdbNodeMap */9],
          /* materialNodeMap */record[/* materialNodeMap */10],
          /* imageBase64Map */record[/* imageBase64Map */11],
          /* geometryNodeMap */record[/* geometryNodeMap */12],
          /* geometryData */record[/* geometryData */13]
        ];
}

function getLastDefaultComponentIndex(assetRecord) {
  return assetRecord[/* lastDefaultComponentIndex */2];
}

function setLastDefaultComponentIndex(lastDefaultComponentIndex, record) {
  return /* record */[
          /* assetTreeRoot */record[/* assetTreeRoot */0],
          /* index */record[/* index */1],
          /* lastDefaultComponentIndex */lastDefaultComponentIndex,
          /* removedAssetIdArray */record[/* removedAssetIdArray */3],
          /* currentNodeData */record[/* currentNodeData */4],
          /* currentNodeParentId */record[/* currentNodeParentId */5],
          /* textureNodeMap */record[/* textureNodeMap */6],
          /* jsonNodeMap */record[/* jsonNodeMap */7],
          /* folderNodeMap */record[/* folderNodeMap */8],
          /* wdbNodeMap */record[/* wdbNodeMap */9],
          /* materialNodeMap */record[/* materialNodeMap */10],
          /* imageBase64Map */record[/* imageBase64Map */11],
          /* geometryNodeMap */record[/* geometryNodeMap */12],
          /* geometryData */record[/* geometryData */13]
        ];
}

export {
  getIndex ,
  increaseIndex ,
  getLastDefaultComponentIndex ,
  setLastDefaultComponentIndex ,
  
}
/* No side effect */
