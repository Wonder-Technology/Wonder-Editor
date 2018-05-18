open AssetTreeNodeType;

type assetRecord = {
  assetTree: option(array(assetTreeNodeType)),
  index: int,
  currentTreeNode: option(int),
  currentFile: option(int),
  folderArray: array(int),
  fileMap: array(FileType.fileResultType)
};