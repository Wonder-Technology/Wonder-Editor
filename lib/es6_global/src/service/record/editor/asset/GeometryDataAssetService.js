


function getGeometryData(assetRecord) {
  return assetRecord[/* geometryData */12];
}

function setGeometryData(geometryData, assetRecord) {
  return /* record */[
          /* assetTreeRoot */assetRecord[/* assetTreeRoot */0],
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
          /* geometryData */geometryData,
          /* materialData */assetRecord[/* materialData */13]
        ];
}

export {
  getGeometryData ,
  setGeometryData ,
  
}
/* No side effect */
