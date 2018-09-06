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

let getJsonName = (currentNodeId, jsonNodeMap) =>
  jsonNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name, jsonResult}) => name);

let getJsonBaseNameAndExtName = (currentNodeId, jsonNodeMap) =>
  getJsonName(currentNodeId, jsonNodeMap)
  |> FileNameService.getBaseNameAndExtName;

let buildJsonNodeResult = (fileResult: nodeResultType, parentId) => {
  name: fileResult.name,
  parentId,
  jsonResult: fileResult.result |> FileReader.convertResultToString,
};

let renameJsonNodeResult = (name, jsonNodeResult: jsonResultType) => {
  ...jsonNodeResult,
  name,
};

let setJsonNodeResultParent = (parentId, jsonNodeResult: jsonResultType) => {
  ...jsonNodeResult,
  parentId,
};