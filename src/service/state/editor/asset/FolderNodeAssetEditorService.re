let enterFolder = (nodeId, editorState) =>
  editorState
  |> CurrentNodeIdAssetEditorService.setCurrentNodeId(nodeId)
  |> SelectedFolderNodeIdInAssetTreeAssetEditorService.setSelectedFolderNodeIdInAssetTree(
       nodeId,
     )
  |> SceneEditorService.clearCurrentSceneTreeNode
  |> CurrentSelectSourceEditorService.setCurrentSelectSource(
       AssetWidgetService.getWidget(),
     );

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