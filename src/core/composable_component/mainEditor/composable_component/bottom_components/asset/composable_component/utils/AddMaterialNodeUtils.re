let addMaterialNodeToAssetTree =
    (material, (targetTreeNodeId, newNodeId), editorState) =>
  editorState
  |> AssetTreeNodeUtils.addMaterialIntoNodeMap(
       newNodeId,
       targetTreeNodeId |. Some,
       material,
     )
  |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
       targetTreeNodeId,
       newNodeId,
       AssetNodeType.Material,
     );