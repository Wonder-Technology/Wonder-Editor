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

        AddFolderNodeUtils.addFolderNodeToAssetTree(
          /* AssetTreeNodeUtils.getFolderDefaultName(newIndex, editorState), */
          AssetTreeNodeUtils.getNewFolderName(),
          (targetTreeNodeId, newIndex),
          (editorState, engineState),
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