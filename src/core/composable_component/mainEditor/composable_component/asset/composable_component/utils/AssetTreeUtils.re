let getAssetTreeSign = () => "assetTreeRoot";

let handleSign = (startSign) => startSign === getAssetTreeSign();

let onSelect = (dispatch, slientSetNodeParentId, folderId) => {
  (
    (editorState) =>
      editorState
      |> AssetCurrentNodeIdEditorService.setCurrentNodeId(folderId)
      |> CurrentSelectSourceEditorService.setCurrentSelectSource(EditorType.AssetTree)
      |> SceneEditorService.clearCurrentSceneTreeNode
  )
  |> StateLogicService.getAndSetEditorState;
WonderLog.Log.print("set node parent") |> ignore;
  slientSetNodeParentId(folderId);

WonderLog.Log.print("reload") |> ignore;
  dispatch(AppStore.ReLoad)
};

let onDrop = (dispatch, (targetId, removedId, currentDragSource)) =>
  switch currentDragSource {
  | sign when sign === getAssetTreeSign() =>
    let editorState = StateEditorService.getState();
    AssetUtils.isIdEqual(targetId, removedId) ?
      dispatch(AppStore.ReLoad) :
      {
        let (newAssetTree, removedTreeNode) =
          editorState
          |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
          |> AssetUtils.removeSpecificTreeNodeFromAssetTree(removedId);
        editorState
        |> AssetTreeRootEditorService.setAssetTreeRoot(
             AssetUtils.insertNewTreeNodeToTargetTreeNode(targetId, removedTreeNode, newAssetTree)
           )
        |> StateEditorService.setState;
        dispatch(AppStore.ReLoad)
      }
  | _ => WonderLog.Log.log({j|can't drop to assetTree|j})
  };