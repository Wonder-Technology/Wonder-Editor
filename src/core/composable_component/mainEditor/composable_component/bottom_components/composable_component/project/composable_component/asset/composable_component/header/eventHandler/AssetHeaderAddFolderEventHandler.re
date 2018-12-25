module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    (
      editorState => {
        let (editorState, nodeId) =
          IdAssetEditorService.generateNodeId(editorState);

        FolderNodeAssetEditorService.addFolderNodeToAssetTree(
          editorState
          |> TreeAssetEditorService.getSelectedFolderNodeInAssetTree,
          FolderNodeAssetService.buildNode(
            ~nodeId,
            ~name=FolderNodeAssetService.getNewFolderName(),
            (),
          ),
          editorState,
        );
      }
    )
    |> StateLogicService.getAndSetEditorState;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);