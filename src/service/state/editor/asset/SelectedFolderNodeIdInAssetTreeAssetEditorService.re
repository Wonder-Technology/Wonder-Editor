open EditorType;

let getSelectedFolderNodeIdInAssetTree = editorState =>
  editorState.assetRecord
  |> SelectedFolderNodeIdInAssetTreeAssetService.getSelectedFolderNodeIdInAssetTree;

let unsafeGetSelectedFolderNodeIdInAssetTree = editorState =>
  editorState.assetRecord
  |> SelectedFolderNodeIdInAssetTreeAssetService.unsafeGetSelectedFolderNodeIdInAssetTree;

let clearSelectedFolderNodeIdInAssetTree = editorState => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> SelectedFolderNodeIdInAssetTreeAssetService.clearSelectedFolderNodeIdInAssetTree,
};

let setSelectedFolderNodeIdInAssetTree =
    (selectedFolderNodeIdInAssetTree, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> SelectedFolderNodeIdInAssetTreeAssetService.setSelectedFolderNodeIdInAssetTree(
         selectedFolderNodeIdInAssetTree,
       ),
};