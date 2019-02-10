let _refreshInspector = (editorState, engineState) => {
  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  let dispatchFunc = UIStateService.getDispatch();

  dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
  |> ignore;

  (StateEditorService.getState(), StateEngineService.unsafeGetState());
};

let _refreshInspectorForRotation = (editorState, engineState) => {
  let editorState =
    TransformEditorService.removeLocalEulerAngleData(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
        engineState,
      ),
      editorState,
    );

  _refreshInspector(editorState, engineState);
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
                      let editorState =
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
                           );

                      (editorState, engineState);
                    | Rotation =>
                      SelectRotationGizmoUtils.selectRotationGizmo(
                        event,
                        editorState,
                        engineState,
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

                    let (editorState, engineState) =
                      _refreshInspector(editorState, engineState);

                    let engineState =
                      StateLogicService.renderWhenStop(engineState);

                    (editorState, engineState);
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

                      let (editorState, engineState) =
                        _refreshInspectorForRotation(
                          editorState,
                          engineState,
                        );

                      let engineState =
                        StateLogicService.renderWhenStop(engineState);

                      (editorState, engineState);
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
                    )
                    |> CurrentTranslationGizmosUtils.restoreTranslationGizmoColor(
                         editorState,
                       );

                  engineState |> StateEngineService.setState |> ignore;

                  PositionBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
                    (UIStateService.getState(), UIStateService.getDispatch()),
                    transform,
                    OperateTranslationGizmoSceneViewEditorService.unsafeGetCurrentSceneTreeNodeStartPoint(
                      editorState,
                    ),
                  );

                  let engineState = StateEngineService.unsafeGetState();
                  let engineState =
                    StateLogicService.renderWhenStop(engineState);

                  (engineState, event);
                } :
                {
                  let editorState =
                    editorState
                    |> AngleRotationGizmoSceneViewEditorService.setLastTotalAngle(
                         None,
                       );

                  let engineState =
                    engineState
                    |> CurrentRotationGizmosUtils.restoreRotationGizmoColor(
                         editorState,
                       );

                  editorState |> StateEditorService.setState |> ignore;

                  let engineState =
                    StateLogicService.renderWhenStop(engineState);

                  (engineState, event);

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

              let engineState = StateLogicService.renderWhenStop(engineState);

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