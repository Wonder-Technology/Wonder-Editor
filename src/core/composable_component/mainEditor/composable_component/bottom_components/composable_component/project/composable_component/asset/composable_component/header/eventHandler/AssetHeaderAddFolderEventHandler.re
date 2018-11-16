module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    (
      editorState => {
        let (editorState, newIndex) =
          AssetIdUtils.generateAssetId(editorState);
        let engineState = StateEngineService.unsafeGetState();

        let targetTreeNodeId =
          editorState |> AssetTreeUtils.getTargetTreeNodeId;

        AddFolderNodeUtils.addFolderNodeToAssetTree(
          FolderNodeUtils.getNewFolderName(),
          (targetTreeNodeId, newIndex),
          (editorState, engineState),
        );
      }
    )
    |> StateLogicService.getAndSetEditorState;

    dispatchFunc(
      AppStore.UpdateAction(Update([|UpdateStore.Project|])),
    )
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);