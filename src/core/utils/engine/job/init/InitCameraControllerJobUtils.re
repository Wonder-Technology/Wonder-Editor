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

let _refreshInspector = () => {
  let dispatchFunc = UIStateService.getDispatch();

  dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
  |> ignore;

  ();
};

let _handleTriggerRefreshInspectorEvent = engineState =>
  _isCurrentSceneTreeNodeHasArcballCameraControllerComponent(engineState) ?
    {
      _refreshInspector();
      engineState;
    } :
    engineState;

let initJob = (_, engineState) => {
  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=GameViewEventEditorService.getPointDragEventName(),
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
      ~eventName=GameViewEventEditorService.getPointScaleEventName(),
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
      ~eventName=EventType.KeyDown_GameView |> Obj.magic,
      ~handleFunc=
        (. event, engineState) =>
          _handleTriggerRefreshInspectorEvent(engineState),
      ~state=engineState,
      (),
    );

  engineState;
};