let setNodeData = (nodeId, nodeData, editorState) =>
  NodeAssetEditorService.setNodeData(
    nodeId,
    nodeData,
    IMGUICustomControlNodeAssetService.buildNodeByNodeData,
    editorState,
  );

let addIMGUICustomControlNodeToAssetTree =
    (targetTreeNode, newNode, editorState) =>
  NodeAssetEditorService.addNodeToAssetTree(
    targetTreeNode,
    newNode,
    editorState,
  );

let findAllIMGUICustomControls = editorState =>
  IterateTreeAssetEditorService.filter(
    ~acc=[||],
    ~pushNodeFunc=(node, acc) => acc |> ArrayService.push(node),
    ~editorState,
    ~predIMGUICustomControlNodeFunc=node => true,
    (),
  );

let isTreeIMGUICustomControlNodesHasTargetName = (name, editorState) =>
  IMGUICustomControlNodeNameAssetService.isTreeIMGUICustomControlNodesHasTargetName(
    name,
    TreeAssetEditorService.unsafeGetTree(editorState),
  );

let getCustomControlFunc = (nodeId, editorState) =>
  OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
  |> IMGUICustomControlNodeAssetService.getNodeData
  |> IMGUICustomControlNodeAssetService.getCustomControlFunc;