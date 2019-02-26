let handleDragStartEvent = (event, (editorState, engineState)) => {
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
};

let handleDragOverEvent = (event, (editorState, engineState)) => {
  let (editorState, engineState) =
    AffectRotationGizmosUtils.affectRotationGizmo(
      event,
      (editorState, engineState),
    );

  let (editorState, engineState) =
    TransformUtils.refreshTransform((editorState, engineState));

  let engineState = StateLogicService.renderWhenStop(engineState);

  (editorState, engineState);
};

let handleDragDropEvent = (event, (editorState, engineState)) => {
  let editorState =
    editorState
    |> AngleRotationGizmoSceneViewEditorService.setLastTotalAngle(None);

  let engineState =
    engineState
    |> CurrentRotationGizmosUtils.restoreRotationGizmoColor(editorState);

  let engineState =
    InitTransformGizmosUtils.pushUndoStack(
      OperateRotationGizmoSceneViewEditorService.unsafeGetCurrentSceneTreeNodeStartLocalEulerAngles(
        editorState,
      ),
      RotationBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState,
      editorState,
      engineState,
    )
    |> StateLogicService.renderWhenStop;

  (engineState, event);
};