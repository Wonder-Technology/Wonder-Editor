let handleImportFolder = path => {
  let editorState = StateEditorService.getState();
  let engineState = StateEngineService.unsafeGetState();
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
                   (editorState, engineState),
                 );

               (Some(nodeId), editorState);
             },
         (None, editorState),
       );

  editorState |> StateEditorService.setState |> ignore;

  nodeId;
};