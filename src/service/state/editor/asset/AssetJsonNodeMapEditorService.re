open EditorType;

open AssetNodeType;

let getJsonNodeMap = editorState =>
  editorState.assetRecord |> JsonNodeMapAssetService.getJsonNodeMap;

let setJsonNodeMap = (jsonNodeMap, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> JsonNodeMapAssetService.setJsonNodeMap(jsonNodeMap),
};


let setResult = (index, result, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> JsonNodeMapAssetService.setResult(index, result),
};

let getJsonBaseNameAndExtName = (currentNodeId, jsonNodeMap) =>
  jsonNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name, jsonResult}) => name)
  |> FileNameService.getBaseNameAndExtName;