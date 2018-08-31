


function getIndex(assetRecord) {
  return assetRecord[/* index */1];
}

function increaseIndex(record) {
  return /* record */[
          /* assetTreeRoot */record[/* assetTreeRoot */0],
          /* index */record[/* index */1] + 1 | 0,
          /* removedAssetIdArray */record[/* removedAssetIdArray */2],
          /* currentNodeData */record[/* currentNodeData */3],
          /* currentNodeParentId */record[/* currentNodeParentId */4],
          /* textureNodeMap */record[/* textureNodeMap */5],
          /* jsonNodeMap */record[/* jsonNodeMap */6],
          /* folderNodeMap */record[/* folderNodeMap */7],
          /* wdbNodeMap */record[/* wdbNodeMap */8],
          /* materialNodeMap */record[/* materialNodeMap */9],
          /* imageBase64Map */record[/* imageBase64Map */10],
          /* geometryData */record[/* geometryData */11]
        ];
}

export {
  getIndex ,
  increaseIndex ,
  
}
/* No side effect */
