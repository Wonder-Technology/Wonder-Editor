module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = unit;
  type return = unit;

  let _isRemoveAssetTreeNode =
      (currentNodeId, selectedFolderNodeIdInAssetTree) =>
    NodeAssetService.isIdEqual(
      currentNodeId,
      selectedFolderNodeIdInAssetTree,
    );

  let handleSelfLogic = ((store, dispatchFunc), (), ()) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let currentNodeId =
      editorState |> CurrentNodeAssetEditorService.unsafeGetCurrentNodeId;

    let (editorState, engineState) =
      DisposeTreeAssetLogicService.disposeNode(
        OperateTreeAssetEditorService.unsafeFindNodeById(
          currentNodeId,
          editorState,
        ),
        (editorState, engineState),
      );

    StateLogicService.refreshEngineState(engineState);

    let editorState =
      _isRemoveAssetTreeNode(
        currentNodeId,
        TreeAssetEditorService.getSelectedFolderNodeIdInAssetTree(
          editorState,
        ),
      ) ?
        editorState
        |> SelectedFolderNodeInAssetTreeAssetEditorService.clearSelectedFolderNodeIdInAssetTree
        |> CurrentNodeAssetEditorService.clearCurrentNodeId :
        editorState |> CurrentNodeAssetEditorService.clearCurrentNodeId;

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