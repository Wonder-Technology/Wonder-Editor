open AssetType;

let unsafeGetNodeMap = assetRecord => assetRecord.nodeMap;

let setNodeMap = (nodeMap, assetRecord) => {...assetRecord, nodeMap};

let clearNodeMap = assetRecord => {
  ...assetRecord,
  nodeMap: WonderCommonlib.SparseMapService.createEmpty(),
};

let setResult = (index, result, assetState) => {
  ...assetState,
  nodeMap: assetState.nodeMap |> SparseMapService.immutableSet(index, result),
};