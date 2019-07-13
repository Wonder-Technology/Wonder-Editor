open AssetType;

let getNodeIndex = assetRecord => assetRecord.nodeIndex;

let setNodeIndex = (nodeIndex, assetRecord) => {...assetRecord, nodeIndex};

let getBasicSourceTextureImageDataMapIndex = assetRecord =>
  assetRecord.basicSourceTextureImageDataMapIndex;

let setBasicSourceTextureImageDataMapIndex =
    (basicSourceTextureImageDataMapIndex, assetRecord) => {
  ...assetRecord,
  basicSourceTextureImageDataMapIndex,
};

let generateBasicSourceTextureImageDataMapIndex = index => (
  index |> succ,
  index |> succ,
);

let getCubemapTextureImageDataMapIndex = assetRecord =>
  assetRecord.cubemapTextureImageDataMapIndex;

let setCubemapTextureImageDataMapIndex =
    (cubemapTextureImageDataMapIndex, assetRecord) => {
  ...assetRecord,
  cubemapTextureImageDataMapIndex,
};

let generateCubemapTextureImageDataMapIndex = index => (
  index |> succ,
  index |> succ,
);