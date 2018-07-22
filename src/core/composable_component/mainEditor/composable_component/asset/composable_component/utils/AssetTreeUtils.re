open CurrentNodeDataType;

open UpdateStore;

let onSelect = (dispatchFunc, nodeType, nodeId) => {
  StateAssetService.getState()
  |> CurrentNodeDataAssetService.setCurrentNodeData({
       currentNodeId: nodeId,
       nodeType,
     })
  |> CurrentNodeParentIdAssetService.setCurrentNodeParentId(nodeId)
  |> StateAssetService.setState
  |> ignore;

  StateEditorService.getState()
  |> SceneEditorService.clearCurrentSceneTreeNode
  |> CurrentSelectSourceEditorService.setCurrentSelectSource(
       EditorType.Asset,
     )
  |> StateEditorService.setState
  |> ignore;

  dispatchFunc(AppStore.UpdateAction(Update([|All|]))) |> ignore;
};

let onDrop = (dispatchFunc, (targetId, removedId)) => {
  let assetState = StateAssetService.getState();

  AssetUtils.isIdEqual(targetId, removedId) ?
    dispatchFunc(AppStore.UpdateAction(Update([|Asset|]))) :
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

      dispatchFunc(AppStore.UpdateAction(Update([|Asset|]))) |> ignore;
    };
};