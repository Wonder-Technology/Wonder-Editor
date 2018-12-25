module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (int, int);
  type return = unit;

  let handleSelfLogic =
      ((store, dispatchFunc), (), (targetNodeId, sourceNodeId)) => {
    let editorState = StateEditorService.getState();

    NodeAssetService.isIdEqual(targetNodeId, sourceNodeId) ?
      dispatchFunc(AppStore.UpdateAction(Update([|Project|]))) |> ignore :
      {
        let editorState =
          editorState
          |> OperateTreeAssetEditorService.setNodeIsShowChildren(
               targetNodeId,
               true,
             );

        let sourceNode =
          OperateTreeAssetEditorService.unsafeFindNodeById(
            sourceNodeId,
            editorState,
          );

        let editorState =
          OperateTreeAssetEditorService.removeNode(sourceNode, editorState);

        let editorState =
          OperateTreeAssetEditorService.insertNode(
            targetNodeId,
            sourceNode,
            editorState,
          );

        editorState |> StateEditorService.setState |> ignore;

        dispatchFunc(AppStore.UpdateAction(Update([|Project|]))) |> ignore;
      };
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);