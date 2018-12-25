let enterFolder = (nodeId, editorState) => {
  let node =
    OperateTreeAssetEditorService.unsafeFindNodeById(nodeId, editorState);

  editorState
  |> CurrentNodeAssetEditorService.setCurrentNode(node)
  |> SelectedFolderNodeInAssetTreeAssetEditorService.setSelectedFolderNodeInAssetTree(
       node,
     )
  |> SceneEditorService.clearCurrentSceneTreeNode
  |> CurrentSelectSourceEditorService.setCurrentSelectSource(EditorType.Asset);
};

let addFolderNodeToAssetTree = (targetTreeNode, newNode, editorState) =>
  NodeAssetEditorService.addNodeToAssetTree(
    targetTreeNode,
    newNode,
    editorState,
  );

let findAllFolderNodes = editorState =>
  IterateTreeAssetEditorService.filter(
    ~acc=[||],
    ~pushNodeFunc=(node, acc) => acc |> ArrayService.push(node),
    ~editorState,
    ~predFolderNodeFunc=node => true,
    (),
  );