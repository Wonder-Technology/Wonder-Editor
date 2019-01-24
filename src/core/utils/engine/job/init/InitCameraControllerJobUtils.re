let _isCurrentSceneTreeNodeHasArcballCameraControllerComponent = engineState => {
  let editorState = StateEditorService.getState();

  switch (SceneTreeEditorService.getCurrentSceneTreeNode(editorState)) {
  | None => false
  | Some(currentGameObject) =>
    GameObjectComponentEngineService.hasArcballCameraControllerComponent(
      currentGameObject,
      engineState,
    )
  };
};

let _refreshInspector = engineState => {
  let dispatchFunc = UIStateService.getDispatch();

  dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
  |> ignore;

  engineState;
};

let _handleTriggerRefreshInspectorEvent = engineState =>
  _isCurrentSceneTreeNodeHasArcballCameraControllerComponent(engineState) ?
    _refreshInspector(engineState) : engineState;

let initJob = (_, engineState) => {
  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=NameEventEngineService.getPointDragEventName(),
      ~handleFunc=
        (. event, engineState) => (
          _handleTriggerRefreshInspectorEvent(engineState),
          event,
        ),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=NameEventEngineService.getPointScaleEventName(),
      ~handleFunc=
        (. event, engineState) => (
          _handleTriggerRefreshInspectorEvent(engineState),
          event,
        ),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onKeyboardEvent(
      ~eventName=EventType.KeyDown |> Obj.magic,
      ~handleFunc=
        (. event, engineState) =>
          _handleTriggerRefreshInspectorEvent(engineState),
      ~state=engineState,
      (),
    );

  engineState;
};