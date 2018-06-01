let getAssetTreeSign = () => "assetTreeRoot";

let handleSign = (startSign) => startSign === getAssetTreeSign();

/* TODO rnodeId folderId to nodeId */
/* TODO pass compile */
let onSelect = ((setNodeParentIdFunc, slientSetNodeParentIdFunc, dispatchFunc),nodeId ) => {
  let editorState = StateEditorService.getState();
  switch (AssetCurrentNodeIdEditorService.getCurrentNodeId(editorState)) {
  | None => slientSetNodeParentIdFunc(nodeId)
  | Some(id) =>
    AssetUtils.isIdEqual(id, nodeId) ?
      slientSetNodeParentIdFunc(nodeId) : setNodeParentIdFunc(nodeId)
  };
  editorState
  |> CurrentSelectSourceEditorService.setCurrentSelectSource(EditorType.AssetTree)
  |> SceneEditorService.clearCurrentSceneTreeNode;
  dispatchFunc(AppStore.ReLoad)
};

let onDrop = (dispatchFunc, (targetId, removedId, currentDragSource)) =>
  switch currentDragSource {
  | sign when sign === getAssetTreeSign() =>
    let editorState = StateEditorService.getState();
    AssetUtils.isIdEqual(targetId, removedId) ?
      dispatchFunc(AppStore.ReLoad) :
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
        dispatchFunc(AppStore.ReLoad)
      }
  | _ => WonderLog.Log.log({j|can't drop to assetTree|j})
  };