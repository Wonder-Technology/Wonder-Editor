let getSign = () => "assetTree";

let onSelect = (dispatch, folderId) => {
  (
    (editorState) =>
      editorState
      |> AssetEditorService.setCurrentTreeNode(folderId)
      |> CurrentSourceEditorService.setCurrentSource(EditorType.AssetTree)
      |> AssetEditorService.clearCurrentFile
  )
  |> StateLogicService.getAndSetEditorState;
  dispatch(AppStore.ReLoad) |> ignore
};