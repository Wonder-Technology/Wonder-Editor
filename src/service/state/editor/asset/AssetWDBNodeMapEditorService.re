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
    editorState.assetRecord |> WDBNodeMapAssetService.setResult(index, result),
};

let getWDBBaseName = (currentNodeId, wdbNodeMap) =>
  wdbNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name}: wdbResultType) => name);

let getWDBTotalName = (currentNodeId, wdbNodeMap) =>
  wdbNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name, postfix}: wdbResultType) => name ++ postfix);

let getWDBParentId = (currentNodeId, wdbNodeMap) =>
  wdbNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({parentNodeId}: wdbResultType) => parentNodeId);

let buildWDBNodeResult =
    (name, postfix, parentNodeId, wdbGameObject, wdbArrayBuffer) => {
  name,
  postfix,
  parentNodeId,
  wdbGameObject,
  wdbArrayBuffer,
};

let renameWDBNodeResult = (name, wdbNodeResult) : wdbResultType => {
  ...wdbNodeResult,
  name,
};

let setWDBNodeResultParent = (parentNodeId, wdbNodeResult) : wdbResultType => {
  ...wdbNodeResult,
  parentNodeId,
};