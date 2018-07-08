open AssetNodeType;

type assetTreeNodeType = {
  id: int,
  children: array(assetTreeNodeType),
  type_: assetNodeType,
};