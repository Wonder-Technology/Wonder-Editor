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
                IsTransformGizmoRenderSceneViewEditorService.isTranslationWholeGizmoRender(
                  editorState,
                ) ?
                  editorState
                  |> TransformGizmoSceneViewEditorService.setCurrentSceneTreeNodeStartPoint(
                       InitTransformGizmosUtils.getCurrentSceneTreeNodePosition(
                         editorState,
                         engineState,
                       ),
                     )
                  |> SelectTransformGizmoUtils.selectTransformGizmo(
                       event,
                       engineState,
                     ) :
                  editorState
                  |> SelectTransformGizmoSceneViewEditorService.markNotSelectAnyTranslationGizmo;

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
          MouseEventService.isLeftMouseButton(event)
          && SelectTransformGizmoSceneViewEditorService.isSelectAnyTransformGizmo
          |> StateLogicService.getEditorState ?
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

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=SceneViewEventEditorService.getPointDragDropEventName(),
      ~handleFunc=
        (. event, engineState) =>
          MouseEventService.isLeftMouseButton(event)
          && SelectTransformGizmoSceneViewEditorService.isSelectAnyTransformGizmo
          |> StateLogicService.getEditorState ?
            {
              let editorState = StateEditorService.getState();
              let transform =
                GameObjectComponentEngineService.unsafeGetTransformComponent(
                  SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(
                    editorState,
                  ),
                  engineState,
                );
              engineState |> StateEngineService.setState |> ignore;

              PositionBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
                (UIStateService.getState(), UIStateService.getDispatch()),
                transform,
                TransformGizmoSceneViewEditorService.unsafeGetCurrentSceneTreeNodeStartPoint(
                  editorState,
                ),
              );

              (StateEngineService.unsafeGetState(), event);
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