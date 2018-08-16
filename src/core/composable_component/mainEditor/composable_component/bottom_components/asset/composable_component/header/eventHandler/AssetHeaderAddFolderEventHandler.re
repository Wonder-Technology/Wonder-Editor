module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    (
      editorState => {
        let editorState = editorState |> AssetIndexEditorService.increaseIndex;
        let nextIndex = editorState |> AssetIndexEditorService.getIndex;

        editorState
        |> AssetTreeNodeUtils.addFolderIntoNodeMap(nextIndex)
        |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
             editorState |> AssetUtils.getTargetTreeNodeId,
             nextIndex,
             Folder,
           );
      }
    )
    |> StateLogicService.getAndSetEditorState;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.BottomComponent|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);