let _bindSelectSceneTreeNodeEventName = engineState =>
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

let _bindDragStartEvent = engineState =>
  ManageEventEngineService.onCustomGlobalEvent(
    ~eventName=SceneViewEventEditorService.getPointDragStartEventName(),
    ~handleFunc=
      (. event, engineState) =>
        MouseEventService.isLeftMouseButton(event) ?
          {
            let editorState = StateEditorService.getState();

            let (editorState, engineState) =
              IsTransformGizmoRenderSceneViewEditorService.isTransformGizmoRender(
                editorState,
              ) ?
                {
                  let currentSceneTreeNode =
                    SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(
                      editorState,
                    );

                  switch (
                    CurrentTransformGizmoSceneViewEditorService.getCurrentGizmoType(
                      editorState,
                    )
                  ) {
                  | Translation =>
                    BindTranslationGizmoEventUtils.handleDragStartEvent(
                      event,
                      (editorState, engineState),
                    )
                  | Rotation =>
                    BindRotationGizmoEventUtils.handleDragStartEvent(
                      event,
                      (editorState, engineState),
                    )
                  | Scale =>
                    BindScaleGizmoEventUtils.handleDragStartEvent(
                      event,
                      (editorState, engineState),
                    )
                  };
                } :
                (
                  editorState
                  |> SelectTransformGizmoSceneViewEditorService.markNotSelectAnyTransformGizmo,
                  engineState,
                );

            let engineState = StateLogicService.renderWhenStop(engineState);

            editorState |> StateEditorService.setState |> ignore;

            (engineState, event);
          } :
          (engineState, event),
    ~state=engineState,
    (),
  );

let _bindDragOverEvent = engineState =>
  ManageEventEngineService.onCustomGlobalEvent(
    ~eventName=SceneViewEventEditorService.getPointDragOverEventName(),
    ~handleFunc=
      (. event, engineState) =>
        MouseEventService.isLeftMouseButton(event) ?
          {
            let editorState = StateEditorService.getState();

            let (editorState, engineState) =
              SelectTranslationGizmoSceneViewEditorService.isSelectAnyTranslationGizmo(
                editorState,
              ) ?
                BindTranslationGizmoEventUtils.handleDragOverEvent(
                  event,
                  (editorState, engineState),
                ) :
                SelectRotationGizmoSceneViewEditorService.isSelectAnyRotationGizmo(
                  editorState,
                ) ?
                  BindRotationGizmoEventUtils.handleDragOverEvent(
                    event,
                    (editorState, engineState),
                  ) :
                  SelectScaleGizmoSceneViewEditorService.isSelectAnyScaleGizmo(
                    editorState,
                  ) ?
                    BindScaleGizmoEventUtils.handleDragOverEvent(
                      event,
                      (editorState, engineState),
                    ) :
                    (editorState, engineState);

            editorState |> StateEditorService.setState |> ignore;

            (engineState, event);
          } :
          (engineState, event),
    ~state=engineState,
    (),
  );

let _bindDragGizmoDropEvent = engineState =>
  ManageEventEngineService.onCustomGlobalEvent(
    ~eventName=SceneViewEventEditorService.getPointDragDropEventName(),
    ~handleFunc=
      (. event, engineState) =>
        MouseEventService.isLeftMouseButton(event) ?
          {
            let editorState = StateEditorService.getState();

            SelectTranslationGizmoSceneViewEditorService.isSelectAnyTranslationGizmo(
              editorState,
            ) ?
              BindTranslationGizmoEventUtils.handleDragDropEvent(
                event,
                (editorState, engineState),
              ) :
              SelectRotationGizmoSceneViewEditorService.isSelectAnyRotationGizmo(
                editorState,
              ) ?
                BindRotationGizmoEventUtils.handleDragDropEvent(
                  event,
                  (editorState, engineState),
                ) :
                SelectScaleGizmoSceneViewEditorService.isSelectAnyScaleGizmo(
                  editorState,
                ) ?
                  BindScaleGizmoEventUtils.handleDragDropEvent(
                    event,
                    (editorState, engineState),
                  ) :
                  (engineState, event);
          } :
          (engineState, event),
    ~state=engineState,
    (),
  );

let _bindDragEditCameraDropEvent = engineState =>
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

            let engineState = StateLogicService.renderWhenStop(engineState);

            (engineState, event);
          } :
          (engineState, event),
    ~state=engineState,
    (),
  );

let _bindDragDropEvent = engineState => {
  let engineState = _bindDragGizmoDropEvent(engineState);

  _bindDragEditCameraDropEvent(engineState);
};

let bindEvent = engineState =>
  engineState
  |> _bindSelectSceneTreeNodeEventName
  |> _bindDragStartEvent
  |> _bindDragOverEvent
  |> _bindDragDropEvent;