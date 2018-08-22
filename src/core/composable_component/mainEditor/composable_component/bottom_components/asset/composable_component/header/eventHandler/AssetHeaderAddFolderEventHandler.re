module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    (
      editorState => {
        let (editorState, newIndex) =
          AssetIdUtils.getAssetId(editorState);

        editorState
        |> AssetTreeNodeUtils.addFolderIntoNodeMap(newIndex)
        |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
             editorState |> AssetUtils.getTargetTreeNodeId,
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