let _moveAndRotateTranslationWholeGizmoToCurrentSceneTreeNode =
    (currentSceneTreeNode, translationWholeGizmo, editorState, engineState) => {
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

let _computeScaleFactorBasedOnDistanceToCamera =
    (cameraPos, currentSceneTreeNodePos) => {
  let factor = 0.03;

  switch (
    Vector3Service.length(
      Wonderjs.Vector3Service.sub(
        Wonderjs.Vector3Type.Float,
        cameraPos,
        currentSceneTreeNodePos,
      ),
    )
  ) {
  | 0. => 1.
  | distance => distance *. factor
  };
};

let _scaleTranslationWholeGizmo =
    (currentSceneTreeNode, translationWholeGizmo, editorState, engineState) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let factor =
    _computeScaleFactorBasedOnDistanceToCamera(
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
    (factor, factor, factor),
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
        TransformGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
          editorState,
        );

      engineState
      |> _moveAndRotateTranslationWholeGizmoToCurrentSceneTreeNode(
           currentSceneTreeNode,
           translationWholeGizmo,
           editorState,
         )
      |> _scaleTranslationWholeGizmo(
           currentSceneTreeNode,
           translationWholeGizmo,
           editorState,
         );
    } :
    engineState;
};