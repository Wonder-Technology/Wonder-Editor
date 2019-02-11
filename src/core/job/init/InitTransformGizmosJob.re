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

let _pushUndoStack =
    (
      startData,
      pushUndoStackWithCopiedEngineStateFunc,
      editorState,
      engineState,
    ) => {
  let currentSceneTreeNode =
    SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState);

  let transform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      currentSceneTreeNode,
      engineState,
    );

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  pushUndoStackWithCopiedEngineStateFunc(
    (UIStateService.getState(), UIStateService.getDispatch()),
    transform,
    startData,
  );

  StateEngineService.unsafeGetState();
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
                           );

                      let editorState =
                        editorState
                        |> OperateTranslationGizmoSceneViewEditorService.setCurrentSceneTreeNodeStartLocalPosition(
                             InitTransformGizmosUtils.getCurrentSceneTreeNodeLocalPosition(
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
                      let editorState =
                        editorState
                        |> OperateRotationGizmoSceneViewEditorService.setCurrentSceneTreeNodeStartLocalEulerAngles(
                             InitTransformGizmosUtils.getCurrentSceneTreeNodeLocalEulerAngles(
                               editorState,
                               engineState,
                             ),
                           );

                      SelectRotationGizmoUtils.selectRotationGizmo(
                        event,
                        editorState,
                        engineState,
                      );
                    | Scale =>
                      let editorState =
                        editorState
                        |> OperateScaleGizmoSceneViewEditorService.setCurrentSceneTreeNodeStartLocalScale(
                             InitTransformGizmosUtils.getCurrentSceneTreeNodeLocalScale(
                               editorState,
                               engineState,
                             ),
                           );

                      let editorState =
                        editorState
                        |> SelectScaleGizmoUtils.selectScaleGizmo(
                             event,
                             engineState,
                           );

                      (editorState, engineState);
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
                    SelectScaleGizmoSceneViewEditorService.isSelectAnyScaleGizmo(
                      editorState,
                    ) ?
                      {
                        let (editorState, engineState) =
                          AffectScaleGizmosUtils.affectScaleGizmo(
                            event,
                            (editorState, engineState),
                          );

                        let (editorState, engineState) =
                          _refreshInspector(editorState, engineState);

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

                  let engineState =
                    _pushUndoStack(
                      OperateTranslationGizmoSceneViewEditorService.unsafeGetCurrentSceneTreeNodeStartLocalPosition(
                        editorState,
                      ),
                      PositionBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState,
                      editorState,
                      engineState,
                    )
                    |> StateLogicService.renderWhenStop;

                  (engineState, event);
                } :
                SelectRotationGizmoSceneViewEditorService.isSelectAnyRotationGizmo(
                  editorState,
                ) ?
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

                    let engineState =
                      _pushUndoStack(
                        OperateRotationGizmoSceneViewEditorService.unsafeGetCurrentSceneTreeNodeStartLocalEulerAngles(
                          editorState,
                        ),
                        RotationBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState,
                        editorState,
                        engineState,
                      )
                      |> StateLogicService.renderWhenStop;

                    (engineState, event);
                  } :
                  SelectScaleGizmoSceneViewEditorService.isSelectAnyScaleGizmo(
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
                        engineState
                        |> CurrentScaleGizmosUtils.restoreScaleGizmoColor(
                             editorState,
                           );

                      /* let engineState =
                         _pushUndoStack(
                           OperateScaleGizmoSceneViewEditorService.unsafeGetCurrentSceneTreeNodeStartLocalPosition(
                             editorState,
                           ),
                           PositionBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState,
                           editorState,
                           engineState,
                         )
                         |> StateLogicService.renderWhenStop; */

                      let engineState =
                        engineState |> StateLogicService.renderWhenStop;

                      (engineState, event);
                    } :
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

  let (
    engineState,
    scaleWholeGizmo,
    (xAxisScaleGizmo, yAxisScaleGizmo, zAxisScaleGizmo),
    centerBoxScaleGizmo,
  ) =
    CreateScaleGizmosUtils.createScaleGizmos(engineState);

  let editorState =
    editorState
    |> CreateTransformGizmosUtils.setToEditorState(
         (
           translationWholeGizmo,
           (xAxisGizmo, yAxisGizmo, zAxisGizmo),
           (xyPlaneGizmo, xzPlaneGizmo, yzPlaneGizmo),
         ),
         (rotationWholeGizmo, (yzGizmo, xzGizmo, xyGizmo)),
         (
           scaleWholeGizmo,
           (xAxisScaleGizmo, yAxisScaleGizmo, zAxisScaleGizmo),
           centerBoxScaleGizmo,
         ),
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