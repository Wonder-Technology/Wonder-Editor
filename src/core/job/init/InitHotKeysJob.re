open HotKeysType;

open SettingType;

let _getHotKeyAction = hotKeyName =>
  switch (hotKeyName) {
  | "translation" => Translation
  | "rotation" => Rotation
  | "scale" => Scale
  | "redo" => Redo
  | "undo" => Undo
  | "duplicate" => Duplicate
  | "delete" => Delete
  | "focus" => Focus
  };

let _getHandleFuncByHotKeyAction = hotKeyAction => {
  let uiState = UIStateService.getState();
  let dispatch = UIStateService.getDispatch();
  let isCurrentSceneTreeNodeSceneChildren =
    GameObjectLogicService.isCurrentSceneTreeNodeSceneChildren
    |> StateLogicService.getStateToGetData;

  switch (hotKeyAction) {
  | Translation => (
      () =>
        Controller.Method.handleChangeCurrentTransformGizmoType(
          dispatch,
          SceneViewType.Translation,
        )
    )
  | Rotation => (
      () =>
        Controller.Method.handleChangeCurrentTransformGizmoType(
          dispatch,
          SceneViewType.Rotation,
        )
    )
  | Scale => (
      () =>
        Controller.Method.handleChangeCurrentTransformGizmoType(
          dispatch,
          SceneViewType.Scale,
        )
    )
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
        isCurrentSceneTreeNodeSceneChildren ?
          MainEditorLeftHeader.Method.cloneCurrentSceneTreeNode(
            (uiState, dispatch),
            (),
            (),
          ) :
          ()
    )
  | Delete => (
      () =>
        isCurrentSceneTreeNodeSceneChildren ?
          MainEditorLeftHeader.Method.disposeCurrentSceneTreeNode(
            (uiState, dispatch),
            (),
            (),
          ) :
          CurrentNodeIdAssetEditorService.couldRemoveCurrentNode
          |> StateLogicService.getEditorState ?
            MainEditorAssetHeader.Method.removeAssetNode(
              (uiState, dispatch),
              (),
              (),
            )
            |> ignore :
            ()
    )
  | Focus => (
      () => {
        let editorState = StateEditorService.getState();

        switch (editorState |> SceneTreeEditorService.getCurrentSceneTreeNode) {
        | None => ()
        | Some(currentSceneTreeNode) =>
          FocusUtils.setEditorCameraFocusTargetGameObject(
            editorState |> SceneViewEditorService.unsafeGetEditCamera,
            currentSceneTreeNode,
            editorState,
            StateEngineService.unsafeGetState(),
          )
          |> StateLogicService.refreshEngineState
        };
      }
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
       (hotKeys |> Js.Array.joinWith(","))
       ->(
           HotKeysJs.hotkeys((e, handler) => {
             _preventBrowserHotKeys(e);

             let handleFunc = _getHandleFuncByHotKeyAction(hotKeyAction);

             handleFunc();
           })
         )
     );

let initHotKeysForEditorJob = (_, engineState) => {
  StateEditorService.getState()
  |> HotKeysSettingEditorService.getHotKeys
  |> Js.Array.map(({name, values}) => (values, _getHotKeyAction(name)))
  |> _handleHotKeyFunc;

  engineState;
};