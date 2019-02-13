open HotKeysType;

open SettingType;

let _getHotKeyAction = hotKeyName =>
  switch (hotKeyName) {
  | "redo" => Redo
  | "undo" => Undo
  | "duplicate" => Duplicate
  | "delete" => Delete
  | "focus" => Focus
  };

let _getHandleFuncByHotKeyAction = hotKeyAction => {
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
  | Focus => (
      () =>
        ArcballCameraControllerLogicService.setEditorCameraFocusTargetGameObject(
          3.0,
          isCurrentSceneTreeNodeCanBeOperate,
          StateEditorService.getState(),
          StateEngineService.unsafeGetState(),
        )
        |> StateLogicService.refreshEngineState
    )
  };
};

let _preventBrowserHotKeys = event => {
  let e = ReactEventType.convertReactKeyboardEventToJsEvent(event);

  EventHelper.preventDefault(e);
};

let _handleHotKeyFunc = hotKeyDataArray =>
  hotKeyDataArray
  |> Js.Array.forEach(((hotKeys, hotKeyAction)) =>
       hotKeys
       |> Js.Array.joinWith(",")
       |. HotKeysJs.hotkeys((e, handler) => {
            _preventBrowserHotKeys(e);

            let handleFunc = _getHandleFuncByHotKeyAction(hotKeyAction);

            handleFunc();
          })
     );

let initHotKeysForEditorJob = (_, engineState) => {
  StateEditorService.getState()
  |> HotKeysSettingEditorService.getHotKeys
  |> Js.Array.map(({name, values}) => (values, _getHotKeyAction(name)))
  |> _handleHotKeyFunc;

  engineState;
};