open CurrentNodeDataType;

open UpdateStore;

let onSelect = (dispatchFunc, nodeType, nodeId) => {
  StateEditorService.getState()
  |> AssetCurrentNodeDataEditorService.setCurrentNodeData({
       currentNodeId: nodeId,
       nodeType,
     })
  |> AssetCurrentNodeParentIdEditorService.setCurrentNodeParentId(nodeId)
  |> StateEditorService.setState
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
  let editorState = StateEditorService.getState();

  AssetUtils.isIdEqual(targetId, removedId) ?
    dispatchFunc(AppStore.UpdateAction(Update([|Asset|]))) :
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

      dispatchFunc(AppStore.UpdateAction(Update([|Asset|]))) |> ignore;
    };
};