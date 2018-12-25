module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let _isRemoveAssetTreeNode = (currentNode, selectedFolderNodeInAssetTree) =>
    NodeAssetService.isIdEqual(currentNode, selectedFolderNodeInAssetTree);

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let currentNode =
      editorState |> CurrentNodeAssetEditorService.unsafeGetCurrentNode;

    let (editorState, engineState) =
      DisposeTreeAssetLogicService.disposeNode(
        currentNode,
        (editorState, engineState),
      );

    StateLogicService.refreshEngineState(engineState);

    let editorState =
      _isRemoveAssetTreeNode(
        currentNode,
        TreeAssetEditorService.getSelectedFolderNodeInAssetTree(editorState),
      ) ?
        editorState
        |> SelectedFolderNodeInAssetTreeAssetEditorService.clearSelectedFolderNodeInAssetTree
        |> CurrentNodeAssetEditorService.clearCurrentNode :
        editorState |> CurrentNodeAssetEditorService.clearCurrentNode;

    editorState |> StateEditorService.setState |> ignore;

    dispatchFunc(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(
            SceneGraphUtils.getSceneGraphDataFromEngine
            |> StateLogicService.getStateToGetData,
          ),
        ),
      ),
    )
    |> ignore;

    dispatchFunc(AppStore.UpdateAction(Update([|All|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);