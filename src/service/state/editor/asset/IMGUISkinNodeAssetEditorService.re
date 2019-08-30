let setNodeData = (nodeId, nodeData, editorState) =>
  NodeAssetEditorService.setNodeData(
    nodeId,
    nodeData,
    IMGUISkinNodeAssetService.buildNodeByNodeData,
    editorState,
  );

let addIMGUISkinNodeToAssetTree = (targetTreeNode, newNode, editorState) =>
  NodeAssetEditorService.addNodeToAssetTree(
    targetTreeNode,
    newNode,
    editorState,
  );

let findAllIMGUISkins = editorState =>
  IterateTreeAssetEditorService.filter(
    ~acc=[||],
    ~pushNodeFunc=(node, acc) => acc |> ArrayService.push(node),
    ~editorState,
    ~predIMGUISkinNodeFunc=node => true,
    (),
  );

let isTreeIMGUISkinNodesHasTargetName = (name, editorState) =>
  IMGUISkinNodeNameAssetService.isTreeIMGUISkinNodesHasTargetName(
    name,
    TreeAssetEditorService.unsafeGetTree(editorState),
  );