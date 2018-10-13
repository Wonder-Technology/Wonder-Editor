module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    (
      editorState => {
        let (editorState, newIndex) =
          AssetIdUtils.generateAssetId(editorState);
        let engineState = StateEngineService.unsafeGetState();

        let targetTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;

        (editorState, engineState)
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