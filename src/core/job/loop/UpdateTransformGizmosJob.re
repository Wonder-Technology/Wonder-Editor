let _moveAndRotateTranslationWholeGizmoToCurrentSceneTreeNode =
    (currentSceneTreeNode, translationWholeGizmo, engineState) => {
  let currentSceneTreeNodeTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      currentSceneTreeNode,
      engineState,
    );
  let translationWholeGizmoTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      translationWholeGizmo,
      engineState,
    );

  engineState
  |> TransformEngineService.setPosition(
       translationWholeGizmoTransform,
       TransformEngineService.getPosition(
         currentSceneTreeNodeTransform,
         engineState,
       ),
     )
  |> TransformEngineService.setEulerAngles(
       translationWholeGizmoTransform,
       TransformEngineService.getEulerAngles(
         currentSceneTreeNodeTransform,
         engineState,
       ),
     );
};

let _scaleTranslationWholeGizmo =
    (
      currentSceneTreeNode,
      cameraGameObject,
      translationWholeGizmo,
      engineState,
    ) => {
  let scaleFactor =
    ComputeTranslationGizmoUtils.computeScaleFactorBasedOnDistanceToCamera(
      TransformGameObjectEngineService.getPosition(
        cameraGameObject,
        engineState,
      ),
      TransformGameObjectEngineService.getPosition(
        currentSceneTreeNode,
        engineState,
      ),
    );

  TransformGameObjectEngineService.setLocalScale(
    translationWholeGizmo,
    (scaleFactor, scaleFactor, scaleFactor),
    engineState,
  );
};

let updateTransformJob = (_, engineState) => {
  let editorState = StateEditorService.getState();

  IsTransformGizmoRenderSceneViewEditorService.isTranslationWholeGizmoRender(
    editorState,
  ) ?
    switch (SceneTreeEditorService.getCurrentSceneTreeNode(editorState)) {
    | None => engineState
    | Some(currentSceneTreeNode) =>
      let translationWholeGizmo =
        OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
          editorState,
        );

      let cameraGameObject =
        SceneViewEditorService.unsafeGetEditCamera(editorState);

      engineState
      |> _moveAndRotateTranslationWholeGizmoToCurrentSceneTreeNode(
           currentSceneTreeNode,
           translationWholeGizmo,
         )
      |> _scaleTranslationWholeGizmo(
           currentSceneTreeNode,
           cameraGameObject,
           translationWholeGizmo,
         );
    } :
    engineState;
};