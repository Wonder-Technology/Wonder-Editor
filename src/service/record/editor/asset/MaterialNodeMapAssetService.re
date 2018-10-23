open AssetType;
open AssetNodeType;

let getMaterialNodeMap = assetRecord => assetRecord.materialNodeMap;

let setMaterialNodeMap = (materialNodeMap, assetRecord) => {
  ...assetRecord,
  materialNodeMap,
};

let unsafeGetResult = (index, assetRecord) =>
  assetRecord.materialNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(index);

let setResult = (index, result, assetRecord) => {
  ...assetRecord,
  materialNodeMap:
    assetRecord.materialNodeMap
    |> SparseMapService.immutableSet(index, result),
};

let remove = (index, assetRecord) => {
  ...assetRecord,
  materialNodeMap:
    assetRecord.materialNodeMap
    |> Obj.magic
    |> SparseMapService.immutableDeleteVal(index)
    |> Obj.magic,
};