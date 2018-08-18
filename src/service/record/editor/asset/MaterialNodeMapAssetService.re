open AssetType;
open AssetNodeType;

let getMaterialNodeMap = assetRecord => assetRecord.materialNodeMap;

let setMaterialNodeMap = (materialNodeMap, assetRecord) => {
  ...assetRecord,
  materialNodeMap,
};


let setResult = (index, result, assetRecord) => {
  ...assetRecord,
  materialNodeMap:
    assetRecord.materialNodeMap |> SparseMapService.immutableSet(index, result),
};
