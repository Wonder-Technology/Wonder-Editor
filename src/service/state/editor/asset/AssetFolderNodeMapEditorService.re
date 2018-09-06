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

let setResult = (index, result, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> FolderNodeMapAssetService.setResult(index, result),
};

let getFolderName = (currentNodeId, folderNodeMap: array(folderResultType)) =>
  folderNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name}) => name);

let getFolderBaseNameAndExtName =
    (currentNodeId, folderNodeMap: array(folderResultType)) =>
  getFolderName(currentNodeId, folderNodeMap)
  |> FileNameService.getBaseNameAndExtName;

let buildFolderResult = (parentId, name) => {name, parentId};

let renameFolderNodeResult = (name, folderNodeResult: folderResultType) => {
  ...folderNodeResult,
  name,
};

let setFolderNodeResultParent = (parentId, folderNodeResult: folderResultType) => {
  ...folderNodeResult,
  parentId,
};