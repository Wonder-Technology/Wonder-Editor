open AssetType;
open AssetNodeType;

let getJsonNodeMap = assetRecord => assetRecord.jsonNodeMap;

let setJsonNodeMap = (jsonNodeMap, assetRecord) => {
  ...assetRecord,
  jsonNodeMap,
};

let clearJsonNodeMap = assetRecord => {
  ...assetRecord,
  jsonNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
};

let setResult = (index, result, assetRecord) => {
  ...assetRecord,
  jsonNodeMap:
    assetRecord.jsonNodeMap |> SparseMapService.immutableSet(index, result),
};

let getJsonBaseNameAndExtName = (currentNodeId, jsonNodeMap) =>
  jsonNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name, jsonResult}) => name)
  |> FileNameService.getBaseNameAndExtName;