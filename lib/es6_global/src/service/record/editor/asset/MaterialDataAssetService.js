


function getMaterialData(assetRecord) {
  return assetRecord[/* materialData */7];
}

function setMaterialData(materialData, assetRecord) {
  return /* record */[
          /* nodeIndex */assetRecord[/* nodeIndex */0],
          /* imageDataMapIndex */assetRecord[/* imageDataMapIndex */1],
          /* tree */assetRecord[/* tree */2],
          /* currentNodeId */assetRecord[/* currentNodeId */3],
          /* selectedFolderNodeIdInAssetTree */assetRecord[/* selectedFolderNodeIdInAssetTree */4],
          /* imageDataMap */assetRecord[/* imageDataMap */5],
          /* geometryData */assetRecord[/* geometryData */6],
          /* materialData */materialData
        ];
}

export {
  getMaterialData ,
  setMaterialData ,
  
}
/* No side effect */
