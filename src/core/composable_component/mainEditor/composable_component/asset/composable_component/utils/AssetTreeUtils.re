let getFlag = () => EditorType.AssetTree;

let handleFlag = startFlag =>
  switch (startFlag) {
  | None => false
  | Some(startFlag) => startFlag === getFlag()
  };

let onSelect = (dispatchFunc, nodeId) => {
  StateAssetService.getState() |> CurrentNodeIdAssetService.clearCurrentNodeId
  |> CurrentNodeIdAssetService.setCurrentNodeId(nodeId)
  |> CurrentNodeParentIdAssetService.setCurrentNodeParentId(nodeId)
  |> StateAssetService.setState
  |> ignore;

  StateEditorService.getState()
  |> SceneEditorService.clearCurrentSceneTreeNode
  |> CurrentSelectSourceEditorService.setCurrentSelectSource(
       EditorType.AssetTree,
     )
  |> StateEditorService.setState
  |> ignore;

  dispatchFunc(AppStore.ReLoad);
};

let onDrop = (dispatchFunc, (targetId, removedId)) => {
  let assetState = StateAssetService.getState();

  AssetUtils.isIdEqual(targetId, removedId) ?
    dispatchFunc(AppStore.ReLoad) :
    {
      let (newAssetTreeRoot, removedTreeNode) =
        assetState
        |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
        |> AssetUtils.removeSpecificTreeNode(removedId);
      newAssetTreeRoot
      |> AssetUtils.insertSourceTreeNodeToTargetTreeNodeChildren(
           targetId,
           removedTreeNode,
         )
      |. AssetTreeRootAssetService.setAssetTreeRoot(assetState)
      |> StateAssetService.setState
      |> ignore;
      dispatchFunc(AppStore.ReLoad);
    };
};