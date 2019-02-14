open TreeAssetType;

open NodeAssetType;

open GeometryDataAssetType;

open MaterialDataAssetType;

open ImageDataType;

type assetRecord = {
  nodeIndex: int,
  imageDataMapIndex: int,
  tree: option(tree),
  currentNodeId: option(nodeId),
  selectedFolderNodeIdInAssetTree: option(nodeId),
  imageDataMap,
  geometryData,
  materialData,
};