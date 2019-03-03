let _toFixRotateOnAxisBug =
    (currentSceneTreeNodeLocalEulerAngles, editorState, engineState) =>
  TransformEngineService.setLocalEulerAngles(
    currentSceneTreeNodeLocalEulerAngles,
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    ),
    engineState,
  );

let handleDragStartEvent = (event, (editorState, engineState)) => {
  let currentSceneTreeNodeLocalEulerAngles =
    InitTransformGizmosUtils.getCurrentSceneTreeNodeLocalEulerAngles(
      editorState,
      engineState,
    );

  let editorState =
    editorState
    |> OperateRotationGizmoSceneViewEditorService.setCurrentSceneTreeNodeStartLocalEulerAngles(
         currentSceneTreeNodeLocalEulerAngles,
       );

  let engineState =
    _toFixRotateOnAxisBug(
      currentSceneTreeNodeLocalEulerAngles,
      editorState,
      engineState,
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