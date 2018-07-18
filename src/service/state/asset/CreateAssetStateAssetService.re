open AssetType;

let create = () => {
  assetTreeRoot: None,
  index: 0,
  currentNodeData: None,
  currentNodeParentId: None,
  textureNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
  jsonNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
  imageBase64Map: WonderCommonlib.SparseMapService.createEmpty(),
  folderNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
};