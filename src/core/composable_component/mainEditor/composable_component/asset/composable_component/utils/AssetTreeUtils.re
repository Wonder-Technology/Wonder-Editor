let getFlag = () => EditorType.AssetTree;

let handleFlag = startFlag =>
  switch (startFlag) {
  | None => false
  | Some(startFlag) => startFlag === getFlag()
  };

/* TODO all(sceneTree): first clear all current node(two node); then set current node

   (add CurrentNodeEditorService)
   */
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

let onDrop = (dispatchFunc, (targetId, removedId, currentDragSource)) =>
  switch (currentDragSource) {
  | None => WonderLog.Log.log({j|can't drop to assetTree|j})
  | Some(flag) =>
    flag === getFlag() ?
      {
        let editorState = StateEditorService.getState();
        AssetUtils.isIdEqual(targetId, removedId) ?
          dispatchFunc(AppStore.ReLoad) :
          {
            let (newAssetTreeRoot, removedTreeNode) =
              editorState
              |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
              |> AssetUtils.removeSpecificTreeNodeFromAssetTree(removedId);
            newAssetTreeRoot
            |> AssetUtils.insertNewTreeNodeToTargetTreeNode(
                 targetId,
                 removedTreeNode,
               )
            |. AssetTreeRootEditorService.setAssetTreeRoot(editorState)
            |> StateEditorService.setState
            |> ignore;
            dispatchFunc(AppStore.ReLoad);
          };
      } :
      WonderLog.Log.log({j|can't drop to assetTree|j})

  | _ =>
    /* TODO use warn */
    WonderLog.Log.log({j|can't drop to assetTree|j})
  };