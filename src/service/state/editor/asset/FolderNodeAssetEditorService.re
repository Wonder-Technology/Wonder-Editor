let enterFolder = (nodeId, editorState) =>
  editorState
  |> CurrentNodeAssetEditorService.setCurrentNodeId(nodeId)
  |> SelectedFolderNodeInAssetTreeAssetEditorService.setSelectedFolderNodeIdInAssetTree(
       nodeId,
     )
  |> SceneEditorService.clearCurrentSceneTreeNode
  |> CurrentSelectSourceEditorService.setCurrentSelectSource(EditorType.Asset);

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