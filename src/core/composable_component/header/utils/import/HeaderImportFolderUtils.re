let buildFolder = (path, (editorState, engineState)) => {
  let (nodeId, editorState) =
    path
    |> FileNameService.removePathPostfix
    |> Js.String.split("/")
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (parentFolderNodeId, editorState), pathName) =>
           pathName === FolderNodeUtils.getAssetTreeRootName() ?
             {
               let (nodeId, editorState) =
                 AssetTreeUtils.rebuildRootAssetTree(
                   parentFolderNodeId,
                   pathName,
                   (editorState, engineState),
                 );

               (Some(nodeId), editorState);
             } :
             {
               let (nodeId, editorState) =
                 AssetTreeUtils.rebuildFolder(
                   parentFolderNodeId,
                   pathName,
                   (editorState, engineState),
                 );

               (Some(nodeId), editorState);
             },
         (None, editorState),
       );

  (nodeId, editorState);
};