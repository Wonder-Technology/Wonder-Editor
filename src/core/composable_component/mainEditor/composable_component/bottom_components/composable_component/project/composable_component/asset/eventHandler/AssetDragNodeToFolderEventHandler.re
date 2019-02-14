module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (int, int);
  type return = unit;

  let handleSelfLogic =
      ((uiState, dispatchFunc), (), (targetFolderNodeId, sourceNodeId)) =>
    NodeAssetService.isIdEqual(targetFolderNodeId, sourceNodeId) ?
      dispatchFunc(AppStore.UpdateAction(Update([|Project|]))) |> ignore :
      {
        let editorState = StateEditorService.getState();
        let engineState = StateEngineService.unsafeGetState();

        let editorState =
          editorState
          |> OperateTreeAssetEditorService.setNodeIsShowChildren(
               targetFolderNodeId,
               true,
             );

        let sourceNode =
          OperateTreeAssetEditorService.unsafeFindNodeById(
            sourceNodeId,
            editorState,
          );

        let (engineState, sourceNode) =
          NodeNameAssetLogicService.updateNodeName(
            sourceNode,
            NodeNameAssetLogicService.getNodeName(sourceNode, engineState)
            |. OperateTreeAssetLogicService.getUniqueNodeName(
                 OperateTreeAssetEditorService.unsafeFindNodeById(
                   targetFolderNodeId,
                   editorState,
                 ),
                 engineState,
               ),
            engineState,
          );

        let editorState =
          OperateTreeAssetEditorService.removeNode(sourceNode, editorState);

        let editorState =
          OperateTreeAssetEditorService.insertNode(
            targetFolderNodeId,
            sourceNode,
            editorState,
          );

        editorState |> StateEditorService.setState |> ignore;
        engineState |> StateEngineService.setState |> ignore;

        dispatchFunc(AppStore.UpdateAction(Update([|Project|]))) |> ignore;
      };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);