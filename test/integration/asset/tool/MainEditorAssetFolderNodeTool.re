let getFolderName = (nodeId, editorState) =>
  FolderNodeMapAssetEditorService.getFolderName(
    nodeId,
    FolderNodeMapAssetEditorService.getFolderNodeMap(editorState),
  );

let setFolderName = (nodeId, name, editorState) =>
  FolderNodeMapAssetEditorService.setResult(
    nodeId,
    FolderNodeMapAssetEditorService.unsafeGetResult(nodeId, editorState)
    |> FolderNodeMapAssetEditorService.renameFolderNodeResult(name),
    editorState,
  );

let getNoNameFolderName = () => FolderNodeUtils.getNoNameFolderName();

let getNodeIdByName = (folderName, editorState) =>
  switch (
    FolderNodeMapAssetEditorService.getFolderNodeMap(editorState)
    |> SparseMapService.getValidDataArr
    |> Js.Array.find(((nodeId, {name}: AssetNodeType.folderResultType)) =>
         name === folderName
       )
  ) {
  | None => None
  | Some((nodeId, _)) => Some(nodeId)
  };