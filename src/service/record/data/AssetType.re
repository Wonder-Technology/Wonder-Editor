open AssetTreeNodeType;

type assetRecord = {
  assetTree: option(array(assetTreeNodeType)),
  index: int,
  currentTreeNode: option(int),
  imageMap: option(array(Image.htmlImage))
};