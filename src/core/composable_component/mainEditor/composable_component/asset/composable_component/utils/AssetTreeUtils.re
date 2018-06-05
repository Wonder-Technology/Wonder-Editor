let getAssetTreeSign = () => "assetTreeRoot";

let handleSign = startSign => startSign === getAssetTreeSign();

let onSelect = (dispatchFunc, nodeId) => {
  (
    editorState =>
      editorState
      |> AssetCurrentNodeIdEditorService.setCurrentNodeId(nodeId)
      |> AssetCurrentNodeParentIdEditorService.setCurrentNodeParentId(nodeId)
      |> CurrentSelectSourceEditorService.setCurrentSelectSource(
           EditorType.AssetTree,
         )
      |> SceneEditorService.clearCurrentSceneTreeNode
  )
  |> StateLogicService.getAndSetEditorState;

  dispatchFunc(AppStore.ReLoad);
};

let onDrop = (dispatchFunc, (targetId, removedId, currentDragSource)) =>
  switch (currentDragSource) {
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
             AssetUtils.insertNewTreeNodeToTargetTreeNode(
               targetId,
               removedTreeNode,
               newAssetTree,
             ),
           )
        |> StateEditorService.setState;
        dispatchFunc(AppStore.ReLoad);
      };
  | _ => WonderLog.Log.log({j|can't drop to assetTree|j})
  };