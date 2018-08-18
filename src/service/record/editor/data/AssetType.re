open AssetTreeNodeType;
open AssetNodeType;
open CurrentNodeDataType;

type assetRecord = {
  assetTreeRoot: option(assetTreeNodeType),
  index: int,
  currentNodeData: option(currentNodeDataType),
  currentNodeParentId: option(int),
  textureNodeMap: WonderCommonlib.SparseMapService.t(textureResultType),
  jsonNodeMap: WonderCommonlib.SparseMapService.t(jsonResultType),
  folderNodeMap: WonderCommonlib.SparseMapService.t(folderResultType),
  materialNodeMap: WonderCommonlib.SparseMapService.t(materialResultType),
  imageBase64Map: WonderCommonlib.SparseMapService.t(string),
  geometryMap: WonderCommonlib.SparseMapService.t(int),
};