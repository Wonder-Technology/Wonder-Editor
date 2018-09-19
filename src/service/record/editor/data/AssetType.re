open AssetTreeNodeType;

open AssetNodeType;

open CurrentNodeDataType;

open AssetGeometryDataType;

type assetRecord = {
  assetTreeRoot: option(assetTreeNodeType),
  index: int,
  imageIndex:int,
  removedAssetIdArray: array(int),
  currentNodeData: option(currentNodeDataType),
  currentNodeParentId: option(int),
  textureNodeMap: WonderCommonlib.SparseMapService.t(textureResultType),
  jsonNodeMap: WonderCommonlib.SparseMapService.t(jsonResultType),
  folderNodeMap: WonderCommonlib.SparseMapService.t(folderResultType),
  wdbNodeMap: WonderCommonlib.SparseMapService.t(wdbResultType),
  materialNodeMap: WonderCommonlib.SparseMapService.t(materialResultType),
  imageBase64Map: WonderCommonlib.SparseMapService.t(imageResultType),
  geometryData,
  clonedGameObjectMap: WonderCommonlib.SparseMapService.t(array(int)),
};