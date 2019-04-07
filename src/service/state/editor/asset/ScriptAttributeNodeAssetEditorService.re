let setNodeData = (nodeId, nodeData, editorState) =>
  NodeAssetEditorService.setNodeData(
    nodeId,
    nodeData,
    ScriptAttributeNodeAssetService.buildNodeByNodeData,
    editorState,
  );

let addScriptNodeToAssetTree = (targetTreeNode, newNode, editorState) =>
  NodeAssetEditorService.addNodeToAssetTree(
    targetTreeNode,
    newNode,
    editorState,
  );

let isTreeScriptAttributeNodesHasTargetName = (name, editorState) =>
  ScriptAttributeNodeNameAssetService.isTreeScriptAttributeNodesHasTargetName(
    name,
    TreeAssetEditorService.unsafeGetTree(editorState),
  );

let getNameAndAttribute = (nodeId, editorState) => {
  let {name, attribute}: NodeAssetType.scriptAttributeNodeData =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId)
    |> StateLogicService.getEditorState
    |> ScriptAttributeNodeAssetService.getNodeData;

  (name, attribute);
};