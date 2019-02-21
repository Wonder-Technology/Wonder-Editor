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

let _handleTriggerRefreshInspectorEvent = engineState =>
  _isCurrentSceneTreeNodeHasArcballCameraControllerComponent(engineState) ?
    {
      engineState |> StateEngineService.setState |> ignore;

      TransformUtils.refreshTransform |> StateLogicService.getAndSetState;

      let engineState =
        StateEngineService.unsafeGetState() |> StateLogicService.renderWhenStop;

      engineState;
    } :
    engineState;

let initJob = (_, engineState) => {
  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=GameViewEventEditorService.getPointDragOverEventName(),
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