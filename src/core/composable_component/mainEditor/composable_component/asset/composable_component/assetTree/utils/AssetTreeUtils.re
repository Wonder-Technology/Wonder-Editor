let getSign = () => "assetTree";

let onSelect = (dispatch, folderId) => {
  (
    (editorState) =>
      editorState
      |> AssetEditorService.setCurrentAssetChildrenNodeParent(folderId)
      |> AssetEditorService.setCurrentAssetTreeNode(folderId)
      |> CurrentSourceEditorService.setCurrentSource(EditorType.AssetTree)
  )
  |> StateLogicService.getAndSetEditorState;
  dispatch(AppStore.ReLoad) |> ignore
};