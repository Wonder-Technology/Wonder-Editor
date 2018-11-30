let addMaterialNodeToAssetTree =
    (material, isInWDB, (targetTreeNodeId, newNodeId), editorState) =>
  editorState
  |> FolderNodeUtils.addMaterialIntoNodeMap(
       newNodeId,
       targetTreeNodeId |. Some,
       material,
       isInWDB,
     )
  |> AssetTreeUtils.createNodeAndAddToTargetNodeChildren(
       targetTreeNodeId,
       newNodeId,
       AssetNodeType.Material,
     );