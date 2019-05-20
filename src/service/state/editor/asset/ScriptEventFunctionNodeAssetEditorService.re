let setNodeData = (nodeId, nodeData, editorState) =>
  NodeAssetEditorService.setNodeData(
    nodeId,
    nodeData,
    ScriptEventFunctionNodeAssetService.buildNodeByNodeData,
    editorState,
  );

let addScriptEventFunctionNodeToAssetTree =
    (targetTreeNode, newNode, editorState) =>
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

let findAllScriptEventFunctionNodes = editorState =>
  IterateTreeAssetEditorService.filter(
    ~acc=[||],
    ~pushNodeFunc=(node, acc) => acc |> ArrayService.push(node),
    ~editorState,
    ~predScriptEventFunctionNodeFunc=node => true,
    (),
  );

let getNameAndData = (nodeId, editorState) => {
  let {name, eventFunctionData}: NodeAssetType.scriptEventFunctionNodeData =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId)
    |> StateLogicService.getEditorState
    |> ScriptEventFunctionNodeAssetService.getNodeData;

  (name, eventFunctionData);
};