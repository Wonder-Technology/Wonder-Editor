let handleDragStartEvent = (event, (editorState, engineState)) => {
  let editorState =
    editorState
    |> OperateScaleGizmoSceneViewEditorService.setCurrentSceneTreeNodeStartLocalScale(
         InitTransformGizmosUtils.getCurrentSceneTreeNodeLocalScale(
           editorState,
           engineState,
         ),
       )
    |> OperateScaleGizmoSceneViewEditorService.setDragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray(
         TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
           OperateScaleGizmoSceneViewEditorService.unsafeGetScaleWholeGizmo(
             editorState,
           ),
           engineState,
         )
         |> Wonderjs.Matrix4Service.invert(
              _,
              Wonderjs.Matrix4Service.createIdentityMatrix4(),
            ),
       )
    |> OperateScaleGizmoSceneViewEditorService.setDragStartXAxisNormalizedVec(
         AxisScaleGizmoSceneViewEditorService.getXAxisNormalizedVec(
           editorState,
           engineState,
         ),
       )
    |> OperateScaleGizmoSceneViewEditorService.setDragStartYAxisNormalizedVec(
         AxisScaleGizmoSceneViewEditorService.getYAxisNormalizedVec(
           editorState,
           engineState,
         ),
       )
    |> OperateScaleGizmoSceneViewEditorService.setDragStartZAxisNormalizedVec(
         AxisScaleGizmoSceneViewEditorService.getZAxisNormalizedVec(
           editorState,
           engineState,
         ),
       );

  let editorState =
    editorState |> SelectScaleGizmoUtils.selectScaleGizmo(event, engineState);

  (editorState, engineState);
};

let handleDragOverEvent = (event, (editorState, engineState)) => {
  let (editorState, engineState) =
    AffectScaleGizmosUtils.affectScaleGizmo(
      event,
      (editorState, engineState),
    );

  let (editorState, engineState) =
    InitTransformGizmosUtils.refreshInspector(editorState, engineState);

  let engineState = StateLogicService.renderWhenStop(engineState);

  (editorState, engineState);
};

let handleDragDropEvent = (event, (editorState, engineState)) => {
  let currentSceneTreeNode =
    SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState);

  let transform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      currentSceneTreeNode,
      engineState,
    );

  let engineState =
    engineState |> CurrentScaleGizmosUtils.restoreScaleGizmoColor(editorState);

  let engineState =
    InitTransformGizmosUtils.pushUndoStack(
      OperateScaleGizmoSceneViewEditorService.unsafeGetCurrentSceneTreeNodeStartLocalScale(
        editorState,
      ),
      ScaleBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState,
      editorState,
      engineState,
    )
    |> StateLogicService.renderWhenStop;

  (engineState, event);
};