open AssetTreeNodeType;

type assetRecord = {
  assetTree: option(array(assetTreeNodeType)),
  index: int,
  currentTreeNode: option(int),
  fileMap: array(FileType.fileResultType)
};