let getSign = () => "assetTreeRoot";

let onSelect = (dispatch, setNodeParentId, folderId) => {
  WonderLog.Log.print(("select:", folderId)) |> ignore;
  (
    (editorState) =>
      editorState
      |> AssetCurrentNodeIdEditorService.setCurrentNodeId(folderId)
      |> CurrentSourceEditorService.setCurrentSource(EditorType.AssetTree)
      |> SceneEditorService.clearCurrentSceneTreeNode
  )
  |> StateLogicService.getAndSetEditorState;
  setNodeParentId(folderId);
  dispatch(AppStore.ReLoad)
};