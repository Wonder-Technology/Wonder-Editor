open EditorType;

let getSelectedFolderNodeInAssetTree = editorState =>
  editorState.assetRecord
  |> SelectedFolderNodeInAssetTreeAssetService.getSelectedFolderNodeInAssetTree;

let unsafeGetSelectedFolderNodeInAssetTree = editorState =>
  editorState.assetRecord
  |> SelectedFolderNodeInAssetTreeAssetService.unsafeGetSelectedFolderNodeInAssetTree;

let clearSelectedFolderNodeInAssetTree = editorState => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> SelectedFolderNodeInAssetTreeAssetService.clearSelectedFolderNodeInAssetTree,
};

let setSelectedFolderNodeInAssetTree = (selectedFolderNodeInAssetTree, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> SelectedFolderNodeInAssetTreeAssetService.setSelectedFolderNodeInAssetTree(
         selectedFolderNodeInAssetTree,
       ),
};