let _refreshInspector = () => {
  let dispatchFunc = UIStateService.getDispatch();

  dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
  |> ignore;

  ();
};

let _bindEvent = (editorState, engineState) => {
  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointDragStartEventName(),
      ~handleFunc=
        (. event, engineState) =>
          MouseEventService.isLeftMouseButton(event) ?
            {
              let editorState = StateEditorService.getState();

              let editorState =
                SelectTransformGizmoUtils.selectTransformGizmo(
                  event,
                  engineState,
                  editorState,
                );

              editorState |> StateEditorService.setState |> ignore;

              (engineState, event);
            } :
            (engineState, event),
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointDragOverEventName(),
      ~handleFunc=
        (. event, engineState) =>
          MouseEventService.isLeftMouseButton(event) ?
            {
              let editorState = StateEditorService.getState();

              let (editorState, engineState) =
                AffectTransformGizmosUtils.affectTransformGizmo(
                  event,
                  (editorState, engineState),
                );

              SelectTransformGizmoSceneViewEditorService.isSelectAnyTransformGizmo(
                editorState,
              ) ?
                _refreshInspector() : ();

              editorState |> StateEditorService.setState |> ignore;

              (engineState, event);
            } :
            (engineState, event),
      ~state=engineState,
      (),
    );

  engineState;
};

let initJob = (_, engineState) => {
  let (engineState, wholeGizmo, (xAxisGizmo, yAxisGizmo, zAxisGizmo)) =
    CreateTransformGizmosUtils.createTransformGizmos(engineState);

  let editorState = StateEditorService.getState();

  let editorState =
    editorState
    |> CreateTransformGizmosUtils.setToEditorState(
         wholeGizmo,
         (xAxisGizmo, yAxisGizmo, zAxisGizmo),
       );

  let engineState = _bindEvent(editorState, engineState);

  editorState |> StateEditorService.setState |> ignore;

  engineState;
};