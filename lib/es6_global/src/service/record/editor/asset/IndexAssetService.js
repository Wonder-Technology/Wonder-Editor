


function getIndex(assetRecord) {
  return assetRecord[/* index */1];
}

function increaseIndex(record) {
  return /* record */[
          /* assetTreeRoot */record[/* assetTreeRoot */0],
          /* index */record[/* index */1] + 1 | 0,
          /* imageIndex */record[/* imageIndex */2],
          /* removedAssetIdArray */record[/* removedAssetIdArray */3],
          /* currentNodeData */record[/* currentNodeData */4],
          /* currentNodeParentId */record[/* currentNodeParentId */5],
          /* textureNodeMap */record[/* textureNodeMap */6],
          /* folderNodeMap */record[/* folderNodeMap */7],
          /* wdbNodeMap */record[/* wdbNodeMap */8],
          /* materialNodeMap */record[/* materialNodeMap */9],
          /* materialNodeIdMap */record[/* materialNodeIdMap */10],
          /* imageNodeMap */record[/* imageNodeMap */11],
          /* geometryData */record[/* geometryData */12],
          /* materialData */record[/* materialData */13]
        ];
}

export {
  getIndex ,
  increaseIndex ,
  
}
/* No side effect */
