


function getNodeIndex(assetRecord) {
  return assetRecord[/* nodeIndex */0];
}

function setNodeIndex(nodeIndex, assetRecord) {
  return /* record */[
          /* nodeIndex */nodeIndex,
          /* imageDataMapIndex */assetRecord[/* imageDataMapIndex */1],
          /* tree */assetRecord[/* tree */2],
          /* currentNodeId */assetRecord[/* currentNodeId */3],
          /* selectedFolderNodeIdInAssetTree */assetRecord[/* selectedFolderNodeIdInAssetTree */4],
          /* imageDataMap */assetRecord[/* imageDataMap */5],
          /* geometryData */assetRecord[/* geometryData */6],
          /* materialData */assetRecord[/* materialData */7]
        ];
}

function getImageDataMapIndex(assetRecord) {
  return assetRecord[/* imageDataMapIndex */1];
}

function setImageDataMapIndex(imageDataMapIndex, assetRecord) {
  return /* record */[
          /* nodeIndex */assetRecord[/* nodeIndex */0],
          /* imageDataMapIndex */imageDataMapIndex,
          /* tree */assetRecord[/* tree */2],
          /* currentNodeId */assetRecord[/* currentNodeId */3],
          /* selectedFolderNodeIdInAssetTree */assetRecord[/* selectedFolderNodeIdInAssetTree */4],
          /* imageDataMap */assetRecord[/* imageDataMap */5],
          /* geometryData */assetRecord[/* geometryData */6],
          /* materialData */assetRecord[/* materialData */7]
        ];
}

function generateImageDataMapIndex(index) {
  return /* tuple */[
          index + 1 | 0,
          index + 1 | 0
        ];
}

export {
  getNodeIndex ,
  setNodeIndex ,
  getImageDataMapIndex ,
  setImageDataMapIndex ,
  generateImageDataMapIndex ,
  
}
/* No side effect */
