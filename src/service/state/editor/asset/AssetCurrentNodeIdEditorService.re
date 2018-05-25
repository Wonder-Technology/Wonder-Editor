open EditorType;

let getCurrentNodeId = (editorState) =>
  editorState.assetRecord |> CurrentNodeIdAssetService.getCurrentNodeId;

let unsafeGetCurrentNodeId = (editorState) =>
  editorState.assetRecord |> CurrentNodeIdAssetService.unsafeGetCurrentNodeId;

let clearCurrentNodeId = (editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord |> CurrentNodeIdAssetService.clearCurrentNodeId
};

let setCurrentNodeId = (currentNodeId, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> CurrentNodeIdAssetService.setCurrentNodeId(currentNodeId)
};