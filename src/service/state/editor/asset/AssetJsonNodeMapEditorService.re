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
  jsonNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name, postfix, jsonResult}) => (name, postfix));

let buildJsonNodeResult =
    (postfix, fileResult: nodeResultType, parentId, name) => {
  name,
  postfix,
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