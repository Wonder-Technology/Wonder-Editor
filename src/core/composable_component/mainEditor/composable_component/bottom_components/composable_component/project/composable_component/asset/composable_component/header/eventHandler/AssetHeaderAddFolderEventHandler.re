module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    (
      editorState => {
        let engineState = StateEngineService.unsafeGetState();

        let (editorState, nodeId) =
          IdAssetEditorService.generateNodeId(editorState);

        let parentFolderNode =
          editorState
          |> OperateTreeAssetEditorService.unsafeGetSelectedFolderNodeInAssetTree;

        let editorState =
          FolderNodeAssetEditorService.addFolderNodeToAssetTree(
            parentFolderNode,
            FolderNodeAssetService.buildNode(
              ~nodeId,
              ~name=
                FolderNodeAssetService.getNewFolderName()
                |. OperateTreeAssetLogicService.getUniqueNodeName(
                     parentFolderNode,
                     engineState,
                   ),
              (),
            ),
            editorState,
          );

        editorState;
      }
    )
    |> StateLogicService.getAndSetEditorState;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);