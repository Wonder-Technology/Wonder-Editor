let setNodeData = (nodeId, nodeData, buildNodeByNodeDataFunc, editorState) =>
  TreeAssetEditorService.unsafeGetTree(editorState)
  |> OperateTreeAssetService.updateNode(
       nodeId,
       nodeData,
       buildNodeByNodeDataFunc,
     )
  |> TreeAssetEditorService.setTree(_, editorState);

let addNodeToAssetTree = (targetTreeNode, newNode, editorState) => {
  let editorState =
    editorState
    |> OperateTreeAssetEditorService.insertNode(
         NodeAssetService.getNodeId(~node=targetTreeNode),
         newNode,
       );

  editorState;
};