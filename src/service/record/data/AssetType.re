open AssetTreeNodeType;

type assetRecord = {
  assetTree: option(array(assetTreeNodeType)),
  index: int,
  currentAssetTreeNode: option(int),
  currentAssetFileNode: option(int),
  folderArray: array(int),
  fileMap: array(FileType.fileResultType)
};