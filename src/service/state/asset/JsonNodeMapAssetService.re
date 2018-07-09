open AssetType;
open AssetNodeType;

let unsafeGetJsonNodeMap = assetState => assetState.jsonNodeMap;

let setJsonNodeMap = (jsonNodeMap, assetState) => {
  ...assetState,
  jsonNodeMap,
};

let clearJsonNodeMap = assetState => {
  ...assetState,
  jsonNodeMap: WonderCommonlib.SparseMapService.createEmpty(),
};

let setResult = (index, result, assetState) => {
  ...assetState,
  jsonNodeMap:
    assetState.jsonNodeMap |> SparseMapService.immutableSet(index, result),
};

let getJsonBaseNameAndExtName = (currentNodeId, jsonNodeMap) =>
  jsonNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name, jsonResult}) => name)
  |> FileNameService.getBaseNameAndExtName;