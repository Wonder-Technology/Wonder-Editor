type assetTreeNodeType = {
  id: int,
  name: string,
  imgArray: array(int),
  jsonArray: array(int),
  children: array(assetTreeNodeType)
};
