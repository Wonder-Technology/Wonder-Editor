open AssetType;
open AssetNodeType;

let getJsonNodeMap = assetRecord => assetRecord.jsonNodeMap;

let setJsonNodeMap = (jsonNodeMap, assetRecord) => {
  ...assetRecord,
  jsonNodeMap,
};


let setResult = (index, result, assetRecord) => {
  ...assetRecord,
  jsonNodeMap:
    assetRecord.jsonNodeMap |> SparseMapService.immutableSet(index, result),
};
