let getSign = () => "assetTreeRoot";

let onSelect = (dispatch, setNodeParentId, folderId) => {
  (
    (editorState) =>
      editorState
      |> AssetCurrentNodeIdEditorService.setCurrentNodeId(folderId)
      |> CurrentSelectSourceEditorService.setCurrentSelectSource(EditorType.AssetTree)
      |> SceneEditorService.clearCurrentSceneTreeNode
  )
  |> StateLogicService.getAndSetEditorState;
  setNodeParentId(folderId);
  dispatch(AppStore.ReLoad)
};