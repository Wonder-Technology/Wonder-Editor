open AssetType;

let getClonedGameObjectMap = assetRecord => assetRecord.clonedGameObjectMap;

let setClonedGameObjectMap = (clonedGameObjectMap, assetRecord) => {
  ...assetRecord,
  clonedGameObjectMap,
};

let _buildResultArrIfNot = (index, result, assetRecord) =>
  switch (
    assetRecord.clonedGameObjectMap
    |> WonderCommonlib.HashMapService.get(index)
  ) {
  | None => [||] |> Js.Array.concat(result)
  | Some(clonedGameObjectArr) =>
    clonedGameObjectArr |> Js.Array.concat(result)
  };

let setResult = (index, result, assetRecord) => {
  ...assetRecord,
  clonedGameObjectMap:
    assetRecord.clonedGameObjectMap
    |> WonderCommonlib.HashMapService.set(
         index,
         _buildResultArrIfNot(index, result, assetRecord),
       ),
};