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

let getNodeIdByName = (folderName, editorState) =>
  switch (
    AssetFolderNodeMapEditorService.getFolderNodeMap(editorState)
    |> WonderLog.Log.print
    |> SparseMapService.getValidDataArr
    |> Js.Array.find(((nodeId, {name}: AssetNodeType.folderResultType)) =>
         name === folderName
       )
  ) {
  | None => None
  | Some((nodeId, _)) => Some(nodeId)
  };