open TreeAssetType;

open NodeAssetType;

open GeometryDataAssetType;

open MaterialDataAssetType;

open ImageDataType;

type assetRecord = {
  nodeIndex: int,
  basicSourceTextureImageDataMapIndex: int,
  cubemapTextureImageDataMapIndex: int,
  tree: option(tree),
  currentNodeId: option(nodeId),
  selectedFolderNodeIdInAssetTree: option(nodeId),
  basicSourceTextureImageDataMap,
  cubemapTextureImageDataMap,
  imguiCustomImageTextureContentMap,
  geometryData,
  materialData,
};