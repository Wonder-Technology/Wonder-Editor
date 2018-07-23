open EditorType;

let getCurrentNodeParentId = editorState =>
  editorState.assetRecord
  |> CurrentNodeParentIdAssetService.getCurrentNodeParentId;

let unsafeGetCurrentNodeParentId = editorState =>
  editorState.assetRecord
  |> CurrentNodeParentIdAssetService.unsafeGetCurrentNodeParentId;

let clearCurrentNodeParentId = editorState => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId,
};

let setCurrentNodeParentId = (currentNodeParentId, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> CurrentNodeParentIdAssetService.setCurrentNodeParentId(
         currentNodeParentId,
       ),
};