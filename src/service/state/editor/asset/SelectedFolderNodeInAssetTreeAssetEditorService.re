open EditorType;

let getSelectedFolderNodeIdInAssetTree = editorState =>
  editorState.assetRecord
  |> SelectedFolderNodeInAssetTreeAssetService.getSelectedFolderNodeIdInAssetTree;

let unsafeGetSelectedFolderNodeIdInAssetTree = editorState =>
  editorState.assetRecord
  |> SelectedFolderNodeInAssetTreeAssetService.unsafeGetSelectedFolderNodeIdInAssetTree;

/* let getSelectedFolderNodeInAssetTree = editorState =>
     getSelectedFolderNodeIdInAssetTree(editorState)
     |> Js.Option.map((. selectedFolderNodeIdInAssetTree) =>
          OperateTreeAssetEditorService.unsafeFindNodeById(
            selectedFolderNodeIdInAssetTree,
          )
        );

   let unsafeGetSelectedFolderNodeInAssetTree = editorState =>
     getSelectedFolderNodeInAssetTree(editorState) |> OptionService.unsafeGet; */

let clearSelectedFolderNodeIdInAssetTree = editorState => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> SelectedFolderNodeInAssetTreeAssetService.clearSelectedFolderNodeIdInAssetTree,
};

let setSelectedFolderNodeIdInAssetTree =
    (selectedFolderNodeIdInAssetTree, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> SelectedFolderNodeInAssetTreeAssetService.setSelectedFolderNodeIdInAssetTree(
         selectedFolderNodeIdInAssetTree,
       ),
};