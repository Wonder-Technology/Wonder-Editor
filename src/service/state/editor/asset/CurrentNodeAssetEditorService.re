open EditorType;

let getCurrentNodeId = editorState =>
  editorState.assetRecord |> CurrentNodeAssetService.getCurrentNodeId;

let unsafeGetCurrentNodeId = editorState =>
  editorState.assetRecord |> CurrentNodeAssetService.unsafeGetCurrentNodeId;

let clearCurrentNodeId = editorState => {
  ...editorState,
  assetRecord:
    editorState.assetRecord |> CurrentNodeAssetService.clearCurrentNodeId,
};

let setCurrentNodeId = (currentNodeId, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> CurrentNodeAssetService.setCurrentNodeId(currentNodeId),
};