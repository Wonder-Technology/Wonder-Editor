open EditorType;

let getCurrentAssetTreeNode = (editorState) =>
  editorState.assetRecord |> CurrentAssetTreeNodeAssetService.getCurrentAssetTreeNode;

let unsafeGetCurrentAssetTreeNode = (editorState) =>
  editorState.assetRecord |> CurrentAssetTreeNodeAssetService.unsafeGetCurrentAssetTreeNode;

let clearCurrentAssetTreeNode = (editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord |> CurrentAssetTreeNodeAssetService.clearCurrentAssetTreeNode
};

let setCurrentAssetTreeNode = (currentAssetTreeNode, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> CurrentAssetTreeNodeAssetService.setCurrentAssetTreeNode(currentAssetTreeNode)
};