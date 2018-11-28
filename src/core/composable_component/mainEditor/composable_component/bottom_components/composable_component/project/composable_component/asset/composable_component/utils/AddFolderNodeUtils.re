let addFolderNodeToAssetTree =
    (name, (targetTreeNodeId, newNodeId), (editorState, engineState)) =>
  (editorState, engineState)
  |> FolderNodeUtils.addFolderIntoNodeMap(
       newNodeId,
       targetTreeNodeId |. Some,
       name,
     )
  |> AssetTreeUtils.createNodeAndAddToTargetNodeChildren(
       targetTreeNodeId,
       newNodeId,
       AssetNodeType.Folder,
     );