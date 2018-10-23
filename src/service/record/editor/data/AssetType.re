open AssetTreeNodeType;

open AssetNodeType;

open CurrentNodeDataType;

open AssetGeometryDataType;

open AssetMaterialDataType;

type assetRecord = {
  assetTreeRoot: option(assetTreeNodeType),
  index: int,
  imageIndex: int,
  removedAssetIdArray: array(int),
  currentNodeData: option(currentNodeDataType),
  currentNodeParentId: option(int),
  textureNodeMap: WonderCommonlib.SparseMapService.t(textureResultType),
  folderNodeMap: WonderCommonlib.SparseMapService.t(folderResultType),
  wdbNodeMap: WonderCommonlib.SparseMapService.t(wdbResultType),
  materialNodeMap: WonderCommonlib.SparseMapService.t(materialResultType),
  materialNodeIdMap: WonderCommonlib.SparseMapService.t(nodeId),
  imageNodeMap: WonderCommonlib.SparseMapService.t(imageResultType),
  geometryData,
  materialData,
  clonedGameObjectMap: WonderCommonlib.SparseMapService.t(array(int)),
};