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

let getWDBBaseName = (nodeId, wdbNodeMap) =>
  wdbNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
  |> (({name}: wdbResultType) => name);

let getWDBTotalName = (nodeId, wdbNodeMap) =>
  wdbNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
  |> (({name}: wdbResultType) => name ++ WDBService.getExtName());

let getWDBParentId = (nodeId, wdbNodeMap) =>
  wdbNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
  |> (({parentFolderNodeId}: wdbResultType) => parentFolderNodeId);

let buildWDBNodeResult = (name, parentFolderNodeId, wdbGameObject) => {
  name,
  parentFolderNodeId,
  wdbGameObject,
};

let renameWDBNodeResult = (name, wdbNodeResult) : wdbResultType => {
  ...wdbNodeResult,
  name,
};

let setWDBNodeResultParent =
    (parentFolderNodeId, wdbNodeResult)
    : wdbResultType => {
  ...wdbNodeResult,
  parentFolderNodeId,
};

let getValidValues = editorState =>
  getWDBNodeMap(editorState) |> SparseMapService.getValidValues;