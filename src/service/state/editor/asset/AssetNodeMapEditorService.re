open AssetType;

open EditorType;

let unsafeGetNodeMap = (editorState) =>
  editorState.assetRecord |> NodeMapAssetService.unsafeGetNodeMap;

let setResult = (index, result, {assetRecord} as state) => {
  ...state,
  assetRecord: {
    ...assetRecord,
    nodeMap: assetRecord.nodeMap
    |> SparseMapService.copy
    |> WonderCommonlib.SparseMapService.set(index, result)
  }
};