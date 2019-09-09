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

let changeSkinData = (changeSkinDataFunc, editorState) =>
  IterateTreeAssetEditorService.map(
    ~editorState,
    ~imguiSkinNodeFunc=(_, nodeData) => changeSkinDataFunc(nodeData),
    (),
  );

let isTreeIMGUISkinNodesHasTargetName = (name, editorState) =>
  IMGUISkinNodeNameAssetService.isTreeIMGUISkinNodesHasTargetName(
    name,
    TreeAssetEditorService.unsafeGetTree(editorState),
  );

let getNodeName = (nodeId, editorState) =>
  OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
  |> IMGUISkinNodeAssetService.getNodeName;

let getSingleSkinData = (nodeId, editorState) =>
  OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
  |> IMGUISkinNodeAssetService.getNodeData
  |> IMGUISkinNodeAssetService.getSingleSkinData;

let getButtonSkinData = (nodeId, editorState) =>
  OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
  |> IMGUISkinNodeAssetService.getNodeData
  |> IMGUISkinNodeAssetService.getButtonSkinData;

let getAllCustomStyleData = (nodeId, editorState) =>
  OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState)
  |> IMGUISkinNodeAssetService.getNodeData
  |> IMGUISkinNodeAssetService.getAllCustomStyleData;