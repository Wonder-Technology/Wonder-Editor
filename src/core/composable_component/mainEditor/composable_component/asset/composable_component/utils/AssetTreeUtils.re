let getFlag = () => EditorType.AssetTree;

let handleFlag = startFlag =>
  switch (startFlag) {
  | None => false
  | Some(startFlag) => startFlag === getFlag()
  };

let onSelect = (dispatchFunc, nodeId) => {
  (
    editorState =>
      editorState
      |> CurrentNodeEditorService.clearCurrentNode
      |> AssetCurrentNodeIdEditorService.setCurrentNodeId(nodeId)
      |> AssetCurrentNodeParentIdEditorService.setCurrentNodeParentId(nodeId)
      |> CurrentSelectSourceEditorService.setCurrentSelectSource(
           EditorType.AssetTree,
         )
  )
  |> StateLogicService.getAndSetEditorState;

  dispatchFunc(AppStore.ReLoad);
};

let onDrop = (dispatchFunc, (targetId, removedId)) => {
  let editorState = StateEditorService.getState();
  AssetUtils.isIdEqual(targetId, removedId) ?
    dispatchFunc(AppStore.ReLoad) :
    {
      let (newAssetTreeRoot, removedTreeNode) =
        editorState
        |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
        |> AssetUtils.removeSpecificTreeNode(removedId);
      newAssetTreeRoot
      |> AssetUtils.insertSourceTreeNodeToTargetTreeNodeChildren(
           targetId,
           removedTreeNode,
         )
      |. AssetTreeRootEditorService.setAssetTreeRoot(editorState)
      |> StateEditorService.setState
      |> ignore;
      dispatchFunc(AppStore.ReLoad);
    };
};