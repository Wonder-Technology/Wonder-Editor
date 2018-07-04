open AssetType;

let create = () => {
  assetTreeRoot: None,
  index: 0,
  currentNodeId: None,
  currentNodeParentId: None,
  nodeMap: WonderCommonlib.SparseMapService.createEmpty(),
};