open EditorType;

let getCurrentNodeData = editorState =>
  editorState.assetRecord |> CurrentNodeDataAssetService.getCurrentNodeData;

let unsafeGetCurrentNodeData = editorState =>
  editorState.assetRecord
  |> CurrentNodeDataAssetService.unsafeGetCurrentNodeData;

let clearCurrentNodeData = editorState => {
  ...editorState,
  assetRecord:
    editorState.assetRecord |> CurrentNodeDataAssetService.clearCurrentNodeData,
};

let setCurrentNodeData = (currentNodeData, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> CurrentNodeDataAssetService.setCurrentNodeData(currentNodeData),
};