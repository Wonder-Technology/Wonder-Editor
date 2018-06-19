  let renameAssetTreeNode = (dispatchFunc, value, nodeId, editorState) => {
    editorState
    |> AssetNodeMapEditorService.unsafeGetNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
    |> AssetTreeNodeUtils.renameNodeResult(value)
    |> AssetNodeMapEditorService.setResult(nodeId, _, editorState)
    |> StateEditorService.setState
    |> ignore;
    dispatchFunc(AppStore.ReLoad);
  };