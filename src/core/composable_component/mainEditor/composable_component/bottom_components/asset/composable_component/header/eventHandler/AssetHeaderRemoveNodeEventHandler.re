open CurrentNodeDataType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;

  let _isRemoveAssetTreeNode = (currentNodeId, currentNodeParentId) =>
    TreeAssetEditorService.isIdEqual(currentNodeParentId, currentNodeId);

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let {currentNodeId} =
      editorState |> CurrentNodeDataAssetEditorService.unsafeGetCurrentNodeData;
    let (newAssetTreeRoot, removedTreeNode) =
      editorState
      |> TreeRootAssetEditorService.unsafeGetAssetTreeRoot
      |> RemoveNodeAssetTreeAssetEditorService.removeSpecificTreeNode(
           currentNodeId,
         );

    let ((editorState, engineState), removedAssetIdArr) =
      (editorState, engineState)
      |> RemoveNodeAssetTreeAssetEditorService.deepRemoveTreeNode(
           removedTreeNode,
         );

    StateLogicService.refreshEngineState(engineState);

    let editorState =
      editorState
      |> RemovedAssetIdArrayAssetEditorService.getRemovedAssetIdArray
      |> Js.Array.concat(removedAssetIdArr)
      |. RemovedAssetIdArrayAssetEditorService.setRemovedAssetIdArray(
           editorState,
         );

    let editorState =
      _isRemoveAssetTreeNode(
        currentNodeId,
        AssetTreeUtils.getTargetTreeNodeId(editorState),
      ) ?
        editorState
        |> CurrentNodeParentIdAssetEditorService.clearCurrentNodeParentId
        |> TreeRootAssetEditorService.setAssetTreeRoot(newAssetTreeRoot)
        |> CurrentNodeDataAssetEditorService.clearCurrentNodeData :
        editorState
        |> TreeRootAssetEditorService.setAssetTreeRoot(newAssetTreeRoot)
        |> CurrentNodeDataAssetEditorService.clearCurrentNodeData;

    editorState |> StateEditorService.setState |> ignore;

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