open TreeAssetType;

open NodeAssetType;

open GeometryDataAssetType;

open MaterialDataAssetType;

open ImageDataType;

type assetRecord = {
  nodeIndex: int,
  imageDataMapIndex: int,
  tree: option(tree),
  currentNode: option(tree),
  selectedFolderNodeInAssetTree: option(tree),
  imageDataMap,
  geometryData,
  materialData,
};