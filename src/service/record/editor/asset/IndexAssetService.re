open AssetType;

let getNodeIndex = assetRecord => assetRecord.nodeIndex;

let setNodeIndex = (nodeIndex, assetRecord) => {...assetRecord, nodeIndex};

let getImageDataMapIndex = assetRecord => assetRecord.basicSourceTextureImageDataMapIndex;

let setImageDataMapIndex = (basicSourceTextureImageDataMapIndex, assetRecord) => {
  ...assetRecord,
  basicSourceTextureImageDataMapIndex,
};

let generateImageDataMapIndex = index => (index |> succ, index |> succ);