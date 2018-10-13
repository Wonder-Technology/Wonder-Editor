let getFolderName = (nodeId, editorState) =>
  AssetFolderNodeMapEditorService.getFolderName(
    nodeId,
    AssetFolderNodeMapEditorService.getFolderNodeMap(editorState),
  );

let setFolderName = (nodeId, name, editorState) =>
  AssetFolderNodeMapEditorService.setResult(
    nodeId,
    AssetFolderNodeMapEditorService.unsafeGetResult(nodeId, editorState)
    |> AssetFolderNodeMapEditorService.renameFolderNodeResult(name),
    editorState,
  );

let getDefaultFolderName = () => AssetTreeNodeUtils.getDefaultFolderName();