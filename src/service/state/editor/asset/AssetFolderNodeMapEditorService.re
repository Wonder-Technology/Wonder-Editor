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

let getFolderBaseNameAndExtName =
    (currentNodeId, folderNodeMap: array(folderResultType)) =>
  folderNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({name}) => name)
  |> FileNameService.getBaseNameAndExtName;