module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    (
      editorState => {
        let (editorState, newIndex) = AssetIdUtils.getAssetId(editorState);
        let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

        editorState
        |> AssetTreeNodeUtils.addFolderIntoNodeMap(
             newIndex,
             targetTreeNodeId |. Some,
           )
        |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
             targetTreeNodeId,
             newIndex,
             Folder,
           );
      }
    )
    |> StateLogicService.getAndSetEditorState;

    dispatchFunc(
      AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])),
    )
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);