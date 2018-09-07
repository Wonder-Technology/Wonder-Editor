open CurrentNodeDataType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;

  let _isRemoveAssetTreeNode = (currentNodeId, currentNodeParentId) =>
    AssetUtils.isIdEqual(currentNodeParentId, currentNodeId);

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    (
      editorState => {
        let {currentNodeId} =
          editorState
          |> AssetCurrentNodeDataEditorService.unsafeGetCurrentNodeData;
        let (newAssetTreeRoot, removedTreeNode) =
          editorState
          |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
          |> AssetUtils.removeSpecificTreeNode(currentNodeId);
        let (editorState, removedAssetIdArr) =
          editorState |> AssetUtils.deepRemoveTreeNode(removedTreeNode);

        let editorState =
          editorState
          |> AssetRemovedAssetIdArrayEditorService.getRemovedAssetIdArray
          |> Js.Array.concat(removedAssetIdArr)
          |. AssetRemovedAssetIdArrayEditorService.setRemovedAssetIdArray(
               editorState,
             );

        _isRemoveAssetTreeNode(
          currentNodeId,
          AssetUtils.getTargetTreeNodeId(editorState),
        ) ?
          editorState
          |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
          |> AssetTreeRootEditorService.setAssetTreeRoot(newAssetTreeRoot)
          |> AssetCurrentNodeDataEditorService.clearCurrentNodeData :
          editorState
          |> AssetTreeRootEditorService.setAssetTreeRoot(newAssetTreeRoot)
          |> AssetCurrentNodeDataEditorService.clearCurrentNodeData;
      }
    )
    |> StateLogicService.getAndSetEditorState;

    dispatchFunc(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(
            SceneTreeUtils.getSceneGraphDataFromEngine
            |> StateLogicService.getStateToGetData,
          ),
        ),
      ),
    )
    |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|All|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);