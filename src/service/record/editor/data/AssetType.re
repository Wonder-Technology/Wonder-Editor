open AssetTreeNodeType;

open AssetNodeType;

type assetRecord = {
  assetTreeRoot: option(assetTreeNodeType),
  index: int,
  currentNodeId: option(int),
  /* TODO move this in mainEditorAsset component state */
  currentAssetChildrenNodeParent: option(int),
  nodeMap: WonderCommonlib.SparseMapService.t(nodeResultType)
};