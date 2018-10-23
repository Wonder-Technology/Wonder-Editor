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

let _getExtName = () => ".wdb";

let getWDBTotalName = (currentNodeId, wdbNodeMap) =>
  wdbNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name}: wdbResultType) => name ++ _getExtName());

let getWDBParentId = (currentNodeId, wdbNodeMap) =>
  wdbNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({parentFolderNodeId}: wdbResultType) => parentFolderNodeId);

let buildWDBNodeResult =
    (name, parentFolderNodeId, wdbGameObject, wdbArrayBuffer) => {
  name,
  parentFolderNodeId,
  wdbGameObject,
  wdbArrayBuffer,
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