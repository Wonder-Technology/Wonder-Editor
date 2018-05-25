let getSign = () => "assetTreeRoot";

let onSelect = (dispatch, folderId) => {
  (
    (editorState) =>
      editorState
      |> AssetCurrentAssetChildrenNodeParentEditorService.setCurrentAssetChildrenNodeParent(
           folderId
         )
      |> AssetCurrentAssetTreeNodeEditorService.setCurrentAssetTreeNode(folderId)
      |> CurrentSourceEditorService.setCurrentSource(EditorType.AssetTree)
  )
  |> StateLogicService.getAndSetEditorState;
  dispatch(AppStore.ReLoad) |> ignore
};