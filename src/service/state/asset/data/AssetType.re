open AssetTreeNodeType;

open AssetNodeType;

type assetState = {
  assetTreeRoot: option(assetTreeNodeType),
  index: int,
  currentNodeId: option(int),
  currentNodeParentId: option(int),
  /* TODO extract
     textureNodeMap: WonderCommonlib.SparseMapService.t(textureNodeResultType)
     jsonNodeMap: WonderCommonlib.SparseMapService.t(jsonNodeResultType)
     folderNodeMap: WonderCommonlib.SparseMapService.t(folderNodeResultType) */
  nodeMap: WonderCommonlib.SparseMapService.t(nodeResultType),
};