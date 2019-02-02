let _refreshInspector = () => {
  let dispatchFunc = UIStateService.getDispatch();

  dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
  |> ignore;

  ();
};

let _bindEvent = (editorState, engineState) => {
  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=CustomEventEditorService.getSelectSceneTreeNodeEventName(),
      ~handleFunc=
        (. event, engineState) => {
          let editorState = StateEditorService.getState();

          let engineState =
            engineState
            |> MoveTranslationPlaneGizmosUtils.moveTranslationPlaneGizmo(
                 editorState,
               );

          (engineState, event);
        },
      ~state=engineState,
      (),
    );

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
                  |> OperateTranslationGizmoSceneViewEditorService.setCurrentSceneTreeNodeStartPoint(
                       InitTransformGizmosUtils.getCurrentSceneTreeNodePosition(
                         editorState,
                         engineState,
                       ),
                     )
                  |> SelectTranslationGizmoUtils.selectTranslationGizmo(
                       event,
                       engineState,
                     ) :
                  editorState
                  |> SelectTranslationGizmoSceneViewEditorService.markNotSelectAnyTranslationGizmo;

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
          && SelectTranslationGizmoSceneViewEditorService.isSelectAnyTranslationGizmo
          |> StateLogicService.getEditorState ?
            {
              let editorState = StateEditorService.getState();

              let (editorState, engineState) =
                AffectTranslationGizmosUtils.affectTranslationGizmo(
                  event,
                  (editorState, engineState),
                );

              SelectTranslationGizmoSceneViewEditorService.isSelectAnyTranslationGizmo(
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
          && SelectTranslationGizmoSceneViewEditorService.isSelectAnyTranslationGizmo
          |> StateLogicService.getEditorState ?
            {
              let editorState = StateEditorService.getState();

              let currentSceneTreeNode =
                SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(
                  editorState,
                );

              let transform =
                GameObjectComponentEngineService.unsafeGetTransformComponent(
                  currentSceneTreeNode,
                  engineState,
                );

              let engineState =
                MoveTranslationPlaneGizmosUtils.moveTranslationPlaneGizmo(
                  editorState,
                  engineState,
                );

              engineState |> StateEngineService.setState |> ignore;

              PositionBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
                (UIStateService.getState(), UIStateService.getDispatch()),
                transform,
                OperateTranslationGizmoSceneViewEditorService.unsafeGetCurrentSceneTreeNodeStartPoint(
                  editorState,
                ),
              );

              (StateEngineService.unsafeGetState(), event);
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
          MouseEventService.isRightMouseButton(event)
          && IsTransformGizmoRenderSceneViewEditorService.isTranslationWholeGizmoRender
          |> StateLogicService.getEditorState ?
            {
              let editorState = StateEditorService.getState();

              let engineState =
                MoveTranslationPlaneGizmosUtils.moveTranslationPlaneGizmo(
                  editorState,
                  engineState,
                );

              (engineState, event);
            } :
            (engineState, event),
      ~state=engineState,
      (),
    );

  engineState;
};

let initJob = (_, engineState) => {
  let (
    engineState,
    wholeGizmo,
    (xAxisGizmo, yAxisGizmo, zAxisGizmo),
    (xyPlaneGizmo, xzPlaneGizmo, yzPlaneGizmo),
  ) =
    CreateTranslationGizmosUtils.createTranslationGizmos(engineState);

  let editorState = StateEditorService.getState();

  let editorState =
    editorState
    |> CreateTransformGizmosUtils.setToEditorState((
         wholeGizmo,
         (xAxisGizmo, yAxisGizmo, zAxisGizmo),
         (xyPlaneGizmo, xzPlaneGizmo, yzPlaneGizmo),
       ));

  let engineState = _bindEvent(editorState, engineState);

  editorState |> StateEditorService.setState |> ignore;

  engineState;
};