open AssetType;

let getNodeIndex = assetRecord => assetRecord.nodeIndex;

let setNodeIndex = (nodeIndex, assetRecord) => {...assetRecord, nodeIndex};

let getImageDataMapIndex = assetRecord => assetRecord.imageDataMapIndex;

let setImageDataMapIndex = (imageDataMapIndex, assetRecord) => {
  ...assetRecord,
  imageDataMapIndex,
};

let generateImageDataMapIndex = index => (index |> succ, index |> succ);