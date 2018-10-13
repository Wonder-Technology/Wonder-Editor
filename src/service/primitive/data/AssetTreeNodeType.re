open AssetNodeType;

type assetTreeNodeType = {
  nodeId: int,
  children: array(assetTreeNodeType),
  type_: assetNodeType,
};