open AssetTreeNodeType;

type assetRecord = {
  assetTree: option(array(assetTreeNodeType)),
  index: int,
  currentAssetTreeNode: option(int),
  currentAssetChildrenNodeParent: option(int),
  nodeMap: WonderCommonlib.SparseMapService.t(FileType.fileResultType)
};