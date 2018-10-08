let handleImportFolder = path => {
  let (nodeId, editorState) =
    path
    |> FileNameService.removePathPostfix
    |> Js.String.split("/")
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (parentNodeId, editorState), pathName) =>
           pathName === AssetTreeNodeUtils.getAssetTreeRootName() ?
             {
               let (nodeId, editorState) =
                 AssetTreeUtils.rebuildRootAssetTree(
                   parentNodeId,
                   pathName,
                   editorState,
                 );

               (Some(nodeId), editorState);
             } :
             {
               let (nodeId, editorState) =
                 AssetTreeUtils.rebuildFolder(
                   parentNodeId,
                   pathName,
                   editorState,
                 );

               (Some(nodeId), editorState);
             },
         (None, StateEditorService.getState()),
       );

  editorState |> StateEditorService.setState |> ignore;

  nodeId;
};