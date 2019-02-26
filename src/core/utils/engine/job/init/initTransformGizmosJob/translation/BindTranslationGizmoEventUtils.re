let handleDragStartEvent = (event, (editorState, engineState)) => {
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
    |> SelectTranslationGizmoUtils.selectTranslationGizmo(event, engineState);

  (editorState, engineState);
};

let handleDragOverEvent = (event, (editorState, engineState)) => {
  let (editorState, engineState) =
    AffectTranslationGizmosUtils.affectTranslationGizmo(
      event,
      (editorState, engineState),
    );

  let (editorState, engineState) =
    TransformUtils.refreshTransform((editorState, engineState));

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
    MoveTranslationPlaneGizmosUtils.moveTranslationPlaneGizmo(
      editorState,
      engineState,
    )
    |> CurrentTranslationGizmosUtils.restoreTranslationGizmoColor(editorState);

  let engineState =
    InitTransformGizmosUtils. pushUndoStack(
      OperateTranslationGizmoSceneViewEditorService.unsafeGetCurrentSceneTreeNodeStartLocalPosition(
        editorState,
      ),
      PositionBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState,
      editorState,
      engineState,
    )
    |> StateLogicService.renderWhenStop;

  (engineState, event);
};