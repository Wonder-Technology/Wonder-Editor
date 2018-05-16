let getSign = () => "assetTree";

let onSelect = (dispatch, id) => {
  (
    (editorState) =>
      editorState
      |> AssetEditorService.setCurrentTreeNode(id)
      |> CurrentSourceEditorService.setCurrentSource(EditorType.AssetTree)
      |> AssetEditorService.clearCurrentFile
  )
  |> StateLogicService.getAndSetEditorState;
  dispatch(AppStore.ReLoad) |> ignore
};