/* TODO all: rename to getFlag */
/* TODO all: value should be sourceType */
let getFlag = () => "assetTreeRoot";

let handleFlag = startFlag => startFlag === getFlag();

/* TODO all(sceneTree): first clear all current node(two node); then set current node

(add CurrentNodeEditorService)
*/
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
  | flag when flag === getFlag() =>
    let editorState = StateEditorService.getState();
    AssetUtils.isIdEqual(targetId, removedId) ?
      dispatchFunc(AppStore.ReLoad) :
      {
        /* TODO rename newAssetTreeRoot to newAssetTreeRootRoot */
        let (newAssetTreeRoot, removedTreeNode) =
          editorState
          |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
          |> AssetUtils.removeSpecificTreeNodeFromAssetTree(removedId);
        editorState
        |> AssetTreeRootEditorService.setAssetTreeRoot(
             AssetUtils.insertNewTreeNodeToTargetTreeNode(
               targetId,
               removedTreeNode,
               newAssetTreeRoot,
             ),
           )
        |> StateEditorService.setState 
        |> ignore;
        dispatchFunc(AppStore.ReLoad);
      };
  | _ =>
  /* TODO use warn */
   WonderLog.Log.log({j|can't drop to assetTree|j})
  };