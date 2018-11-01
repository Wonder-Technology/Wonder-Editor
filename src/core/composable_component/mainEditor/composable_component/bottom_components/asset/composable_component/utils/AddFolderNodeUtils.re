let addFolderNodeToAssetTree =
    ((targetTreeNodeId, newNodeId), (editorState, engineState)) =>
  (editorState, engineState)
  |> AssetTreeNodeUtils.addFolderIntoNodeMap(
       newNodeId,
       targetTreeNodeId |. Some,
     )
  |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
       targetTreeNodeId,
       newNodeId,
       AssetNodeType.Folder,
     );