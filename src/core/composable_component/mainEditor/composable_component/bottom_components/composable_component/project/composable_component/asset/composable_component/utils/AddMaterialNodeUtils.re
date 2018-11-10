let addMaterialNodeToAssetTree =
    (material, (targetTreeNodeId, newNodeId), editorState) =>
  editorState
  |> FolderNodeUtils.addMaterialIntoNodeMap(
       newNodeId,
       targetTreeNodeId |. Some,
       material,
     )
  |> AssetTreeUtils.createNodeAndAddToTargetNodeChildren(
       targetTreeNodeId,
       newNodeId,
       AssetNodeType.Material,
     );