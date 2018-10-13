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

let getJsonBaseName = (currentNodeId, jsonNodeMap) =>
  jsonNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name, jsonResult}) => name);

let getJsonTotalName = (currentNodeId, jsonNodeMap) =>
  jsonNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name, postfix, jsonResult}) => name ++ postfix);

let getJsonParentId = (currentNodeId, jsonNodeMap) =>
  jsonNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({parentNodeId}: jsonResultType) => parentNodeId);

let buildJsonNodeResult = (postfix, fileResult, parentNodeId, name) => {
  name,
  postfix,
  parentNodeId,
  jsonResult: fileResult,
};

let renameJsonNodeResult = (name, jsonNodeResult: jsonResultType) => {
  ...jsonNodeResult,
  name,
};

let setJsonNodeResultParent = (parentNodeId, jsonNodeResult: jsonResultType) => {
  ...jsonNodeResult,
  parentNodeId,
};