open AssetTreeNodeType;

open AssetNodeType;

type assetRecord = {
  assetTreeRoot: option(assetTreeNodeType),
  index: int,
  currentAssetTreeNode: option(int),
  /* TODO move this in mainEditorAsset component state */
  currentAssetChildrenNodeParent: option(int),
  nodeMap: WonderCommonlib.SparseMapService.t(nodeResultType)
};