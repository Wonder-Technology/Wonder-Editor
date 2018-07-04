  let renameAssetTreeNode = (dispatchFunc, value, nodeId, assetState) => {
    assetState
    |> NodeMapAssetService.unsafeGetNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
    |> AssetTreeNodeUtils.renameNodeResult(value)
    |> NodeMapAssetService.setResult(nodeId, _, assetState)
    |> StateAssetService.setState
    |> ignore;
    dispatchFunc(AppStore.ReLoad);
  };