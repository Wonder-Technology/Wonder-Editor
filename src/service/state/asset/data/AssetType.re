open AssetTreeNodeType;
open AssetNodeType;
open CurrentNodeDataType;

type assetState = {
  assetTreeRoot: option(assetTreeNodeType),
  index: int,
  currentNodeData: option(currentNodeDataType),
  currentNodeParentId: option(int),
  textureNodeMap: WonderCommonlib.SparseMapService.t(textureResultType),
  jsonNodeMap: WonderCommonlib.SparseMapService.t(jsonResultType),
  folderNodeMap: WonderCommonlib.SparseMapService.t(folderResultType),
  imageBase64Map: WonderCommonlib.SparseMapService.t(string),
};