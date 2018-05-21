let getSign = () => "assetTree";

let onSelect = (dispatch, folderId) => {
  (
    (editorState) =>
      editorState
      |> AssetEditorService.setCurrentAssetTreeNode(folderId)
      |> CurrentSourceEditorService.setCurrentSource(EditorType.AssetTree)
      |> AssetEditorService.clearCurrentAssetFileNode
  )
  |> StateLogicService.getAndSetEditorState;
  dispatch(AppStore.ReLoad) |> ignore
};