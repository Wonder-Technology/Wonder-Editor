let setNodeData = (nodeId, nodeData, editorState) =>
  NodeAssetEditorService.setNodeData(
    nodeId,
    nodeData,
    IMGUIExecFuncDataNodeAssetService.buildNodeByNodeData,
    editorState,
  );

let addIMGUIExecFuncDataNodeToAssetTree =
    (targetTreeNode, newNode, editorState) =>
  NodeAssetEditorService.addNodeToAssetTree(
    targetTreeNode,
    newNode,
    editorState,
  );

let findAllIMGUIExecFuncs = editorState =>
  IterateTreeAssetEditorService.filter(
    ~acc=[||],
    ~pushNodeFunc=(node, acc) => acc |> ArrayService.push(node),
    ~editorState,
    ~predIMGUIExecFuncDataNodeFunc=node => true,
    (),
  );

let isTreeIMGUIExecFuncDataNodesHasTargetName = (name, editorState) =>
  IMGUIExecFuncDataNodeNameAssetService.isTreeIMGUIExecFuncDataNodesHasTargetName(
    name,
    TreeAssetEditorService.unsafeGetTree(editorState),
  );

let getZIndex = (nodeId, editorState) =>
  OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
  |> IMGUIExecFuncDataNodeAssetService.getNodeData
  |> IMGUIExecFuncDataNodeAssetService.getZIndex;

let getExecFunc = (nodeId, editorState) =>
  OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
  |> IMGUIExecFuncDataNodeAssetService.getNodeData
  |> IMGUIExecFuncDataNodeAssetService.getExecFunc;