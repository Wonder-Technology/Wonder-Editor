open AssetTreeNodeType;

open AssetNodeType;

type assetState = {
  assetTreeRoot: option(assetTreeNodeType),
  index: int,
  currentNodeId: option(int),
  currentNodeParentId: option(int),
  nodeMap: WonderCommonlib.SparseMapService.t(nodeResultType)
};