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

let _triggerRefreshInspectorEvent = engineState => {
  let (engineState, _) =
    ManageEventEngineService.triggerCustomGlobalEvent(
      CreateCustomEventEngineService.create(
        EventEditorService.getRefreshInspectorEventName(),
        None,
      ),
      engineState,
    );

  engineState;
};

let _judgeWhetherTriggerRefreshInspectorEvent = engineState =>
  _isCurrentSceneTreeNodeHasArcballCameraControllerComponent(engineState) ?
    _triggerRefreshInspectorEvent(engineState) : engineState;

let initJob = (_, engineState) => {
  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=NameEventEngineService.getPointDragEventName(),
      ~handleFunc=
        (. event, engineState) => (
          _judgeWhetherTriggerRefreshInspectorEvent(engineState),
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
          _judgeWhetherTriggerRefreshInspectorEvent(engineState),
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
          _judgeWhetherTriggerRefreshInspectorEvent(engineState),
      ~state=engineState,
      (),
    );

  engineState;
};