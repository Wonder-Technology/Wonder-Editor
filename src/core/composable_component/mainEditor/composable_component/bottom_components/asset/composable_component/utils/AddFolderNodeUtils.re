let addFolderNodeToAssetTree =
    (name, (targetTreeNodeId, newNodeId), (editorState, engineState)) =>
  (editorState, engineState)
  |> AssetTreeNodeUtils.addFolderIntoNodeMap(
       newNodeId,
       targetTreeNodeId |. Some,
       name,
     )
  |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
       targetTreeNodeId,
       newNodeId,
       AssetNodeType.Folder,
     );