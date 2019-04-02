let setNodeData = (nodeId, nodeData, editorState) =>
  NodeAssetEditorService.setNodeData(
    nodeId,
    nodeData,
    ScriptEventFunctionNodeAssetService.buildNodeByNodeData,
    editorState,
  );

let addScriptNodeToAssetTree = (targetTreeNode, newNode, editorState) =>
  NodeAssetEditorService.addNodeToAssetTree(
    targetTreeNode,
    newNode,
    editorState,
  );

let isTreeScriptEventFunctionNodesHasTargetName = (name, editorState) =>
  ScriptEventFunctionNodeNameAssetService.isTreeScriptEventFunctionNodesHasTargetName(
    name,
    TreeAssetEditorService.unsafeGetTree(editorState),
  );

let setEventFunctionData = (name, eventFunctionData, editorState) => {};