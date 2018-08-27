open EditorType;
open AssetNodeType;

let getWdbNodeMap = editorState =>
  editorState.assetRecord |> WdbNodeMapAssetService.getWdbNodeMap;

let setWdbNodeMap = (wdbNodeMap, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> WdbNodeMapAssetService.setWdbNodeMap(wdbNodeMap),
};


let setResult = (index, result, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> WdbNodeMapAssetService.setResult(index, result),
};

let getWdbBaseNameAndExtName = (currentNodeId, wdbNodeMap) =>
  wdbNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name} : wdbResultType ) => name)
  |> FileNameService.getBaseNameAndExtName;