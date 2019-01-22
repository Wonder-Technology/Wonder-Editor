open HotKeysType;

let getHotKeyAction = hotKeyName =>
  switch (hotKeyName) {
  | "redo" => Redo
  | "undo" => Undo
  | "duplicate" => Duplicate
  | "delete" => Delete
  };

let getHandleFuncByHotKeyAction = hotKeyAction => {
  let uiState = UIStateService.getState();
  let dispatch = UIStateService.getDispatch();
  let isCurrentSceneTreeNodeCanBeOperate =
    GameObjectLogicService.isCurrentSceneTreeNodeCanBeOperate
    |> StateLogicService.getStateToGetData;

  switch (hotKeyAction) {
  | Undo => (() => AllHistoryService.handleUndo(uiState, dispatch))
  | Redo => (
      () =>
        OperateStateHistoryService.hasRedoState(
          AllStateData.getHistoryState(),
        ) ?
          AllHistoryService.redoHistoryState(uiState, dispatch)
          |> StateHistoryService.getAndRefreshStateForHistory :
          ()
    )

  | Duplicate => (
      () =>
        isCurrentSceneTreeNodeCanBeOperate ?
          MainEditorLeftHeader.Method.cloneCurrentSceneTreeNode(
            (uiState, dispatch),
            (),
            (),
          ) :
          ()
    )
  | Delete => (
      () =>
        isCurrentSceneTreeNodeCanBeOperate ?
          MainEditorLeftHeader.Method.disposeCurrentSceneTreeNode(
            (uiState, dispatch),
            (),
            (),
          ) :
          ()
    )
  };
};