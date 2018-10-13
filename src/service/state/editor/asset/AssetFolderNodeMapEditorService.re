open EditorType;

open AssetNodeType;

let getFolderNodeMap = editorState =>
  editorState.assetRecord |> FolderNodeMapAssetService.getFolderNodeMap;

let setFolderNodeMap = (folderNodeMap, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> FolderNodeMapAssetService.setFolderNodeMap(folderNodeMap),
};

let unsafeGetResult = (nodeId, editorState) =>
  editorState.assetRecord |> FolderNodeMapAssetService.unsafeGetResult(nodeId);

let setResult = (nodeId, result, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> FolderNodeMapAssetService.setResult(nodeId, result),
};

let getFolderName = (currentNodeId, folderNodeMap: array(folderResultType)) =>
  folderNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name}) => name);

let getFolderParentId =
    (currentNodeId, folderNodeMap: array(folderResultType)) =>
  folderNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({parentNodeId}) => parentNodeId);

let buildFolderResult = (parentNodeId, name) => {name, parentNodeId};

let renameFolderNodeResult = (name, folderNodeResult: folderResultType) => {
  ...folderNodeResult,
  name,
};

let setFolderNodeResultParent =
    (parentNodeId, folderNodeResult: folderResultType) => {
  ...folderNodeResult,
  parentNodeId,
};