


function getGeometryData(assetRecord) {
  return assetRecord[/* geometryData */6];
}

function setGeometryData(geometryData, assetRecord) {
  return /* record */[
          /* nodeIndex */assetRecord[/* nodeIndex */0],
          /* imageDataMapIndex */assetRecord[/* imageDataMapIndex */1],
          /* tree */assetRecord[/* tree */2],
          /* currentNodeId */assetRecord[/* currentNodeId */3],
          /* selectedFolderNodeIdInAssetTree */assetRecord[/* selectedFolderNodeIdInAssetTree */4],
          /* imageDataMap */assetRecord[/* imageDataMap */5],
          /* geometryData */geometryData,
          /* materialData */assetRecord[/* materialData */7]
        ];
}

export {
  getGeometryData ,
  setGeometryData ,
  
}
/* No side effect */
