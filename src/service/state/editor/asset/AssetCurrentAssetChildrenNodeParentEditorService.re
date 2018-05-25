open EditorType;

let getCurrentAssetChildrenNodeParent = (editorState) =>
  editorState.assetRecord
  |> CurrentAssetChildrenNodeParentAssetService.getCurrentAssetChildrenNodeParent;

let unsafeGetCurrentAssetChildrenNodeParent = (editorState) =>
  editorState.assetRecord
  |> CurrentAssetChildrenNodeParentAssetService.unsafeGetCurrentAssetChildrenNodeParent;

let clearCurrentAssetChildrenNodeParent = (editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> CurrentAssetChildrenNodeParentAssetService.clearCurrentAssetChildrenNodeParent
};

let setCurrentAssetChildrenNodeParent = (currentAssetChildrenNodeParent, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> CurrentAssetChildrenNodeParentAssetService.setCurrentAssetChildrenNodeParent(
         currentAssetChildrenNodeParent
       )
};