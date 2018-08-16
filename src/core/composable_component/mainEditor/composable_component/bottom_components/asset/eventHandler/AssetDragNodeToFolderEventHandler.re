open CurrentNodeDataType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (int, int);

  let handleSelfLogic = ((store, dispatchFunc), (), (targetId, removedId)) => {
    let editorState = StateEditorService.getState();

    AssetUtils.isIdEqual(targetId, removedId) ?
      dispatchFunc(AppStore.UpdateAction(Update([|BottomComponent|]))) |> ignore :
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

        dispatchFunc(AppStore.UpdateAction(Update([|BottomComponent|]))) |> ignore;
      };
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);