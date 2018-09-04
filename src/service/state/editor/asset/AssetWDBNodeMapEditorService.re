open EditorType;
open AssetNodeType;

let getWDBNodeMap = editorState =>
  editorState.assetRecord |> WDBNodeMapAssetService.getWDBNodeMap;

let setWDBNodeMap = (wdbNodeMap, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> WDBNodeMapAssetService.setWDBNodeMap(wdbNodeMap),
};


let setResult = (index, result, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> WDBNodeMapAssetService.setResult(index, result),
};

let getWDBBaseNameAndExtName = (currentNodeId, wdbNodeMap) =>
  wdbNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name} : wdbResultType ) => name)
  |> FileNameService.getBaseNameAndExtName;