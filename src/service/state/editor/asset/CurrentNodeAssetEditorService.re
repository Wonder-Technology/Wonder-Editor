open EditorType;

let getCurrentNode = editorState =>
  editorState.assetRecord |> CurrentNodeAssetService.getCurrentNode;

let unsafeGetCurrentNode = editorState =>
  editorState.assetRecord |> CurrentNodeAssetService.unsafeGetCurrentNode;

let clearCurrentNode = editorState => {
  ...editorState,
  assetRecord:
    editorState.assetRecord |> CurrentNodeAssetService.clearCurrentNode,
};

let setCurrentNode = (currentNode, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> CurrentNodeAssetService.setCurrentNode(currentNode),
};