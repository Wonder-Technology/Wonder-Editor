let _refreshInspector = (editorState, engineState) => {
  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  let dispatchFunc = UIStateService.getDispatch();

  dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
  |> ignore;

  (StateEditorService.getState(), StateEngineService.unsafeGetState());
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
                         )
                    | Rotation =>
                      editorState
                      |> SelectRotationGizmoUtils.selectRotationGizmo(
                           event,
                           engineState,
                         )
                    };
                  } :
                  editorState
                  |> SelectTransformGizmoSceneViewEditorService.markNotSelectAnyTransformGizmo;

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
                SelectTranslationGizmoSceneViewEditorService.isSelectAnyTranslationGizmo(
                  editorState,
                ) ?
                  {
                    let (editorState, engineState) =
                      AffectTranslationGizmosUtils.affectTranslationGizmo(
                        event,
                        (editorState, engineState),
                      );

                    _refreshInspector(editorState, engineState);
                  } :
                  SelectRotationGizmoSceneViewEditorService.isSelectAnyRotationGizmo(
                    editorState,
                  ) ?
                    {
                      let (editorState, engineState) =
                        AffectRotationGizmosUtils.affectRotationGizmo(
                          event,
                          (editorState, engineState),
                        );

                      _refreshInspector(editorState, engineState);
                    } :
                    (editorState, engineState);

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
          MouseEventService.isLeftMouseButton(event) ?
            {
              let editorState = StateEditorService.getState();

              SelectTranslationGizmoSceneViewEditorService.isSelectAnyTranslationGizmo(
                editorState,
              ) ?
                {
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
                {
                  let editorState =
                    editorState
                    |> AngleRotationGizmoSceneViewEditorService.setLastTotalAngle(
                         None,
                       );

                  editorState |> StateEditorService.setState |> ignore;

                  (engineState, event);
                };
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

let _createTransformGizmos = ((editorState, engineState)) => {
  let (
    engineState,
    translationWholeGizmo,
    (xAxisGizmo, yAxisGizmo, zAxisGizmo),
    (xyPlaneGizmo, xzPlaneGizmo, yzPlaneGizmo),
  ) =
    CreateTranslationGizmosUtils.createTranslationGizmos(engineState);

  let (engineState, rotationWholeGizmo, (yzGizmo, xzGizmo, xyGizmo)) =
    CreateRotationGizmosUtils.createRotationGizmos(engineState);

  let editorState =
    editorState
    |> CreateTransformGizmosUtils.setToEditorState(
         (
           translationWholeGizmo,
           (xAxisGizmo, yAxisGizmo, zAxisGizmo),
           (xyPlaneGizmo, xzPlaneGizmo, yzPlaneGizmo),
         ),
         (rotationWholeGizmo, (yzGizmo, xzGizmo, xyGizmo)),
       );

  (editorState, engineState);
};

let initJob = (_, engineState) => {
  let editorState = StateEditorService.getState();

  let (editorState, engineState) =
    _createTransformGizmos((editorState, engineState));

  let engineState = _bindEvent(editorState, engineState);

  editorState |> StateEditorService.setState |> ignore;

  engineState;
};