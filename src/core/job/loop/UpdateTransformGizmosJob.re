let _moveWholeGizmoToCurrentSceneTreeNode =
    (currentSceneTreeNode, wholeGizmo, engineState) => {
  let currentSceneTreeNodeTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      currentSceneTreeNode,
      engineState,
    );
  let wholeGizmoTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      wholeGizmo,
      engineState,
    );

  engineState
  |> TransformEngineService.setPosition(
       wholeGizmoTransform,
       TransformEngineService.getPosition(
         currentSceneTreeNodeTransform,
         engineState,
       ),
     );
};

let _scaleWholeGizmo =
    (currentSceneTreeNode, cameraGameObject, wholeGizmo, engineState) => {
  let scaleFactor =
    ComputeTransformGizmoScaleUtils.computeScaleFactorBasedOnDistanceToCamera(
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
    wholeGizmo,
    (scaleFactor, scaleFactor, scaleFactor),
    engineState,
  );
};

let updateTransformJob = (_, engineState) => {
  let editorState = StateEditorService.getState();

  IsTransformGizmoRenderSceneViewEditorService.isTransformGizmoRender(
    editorState,
  ) ?
    {
      let currentSceneTreeNode =
        SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState);

      let wholeGizmo =
        switch (
          CurrentTransformGizmoSceneViewEditorService.getCurrentGizmoType(
            editorState,
          )
        ) {
        | Translation =>
          OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
            editorState,
          )

        | Rotation =>
          OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
            editorState,
          )
        };

      let cameraGameObject =
        SceneViewEditorService.unsafeGetEditCamera(editorState);

      let engineState =
        engineState
        |> _moveWholeGizmoToCurrentSceneTreeNode(
             currentSceneTreeNode,
             wholeGizmo,
           )
        |> _scaleWholeGizmo(
             currentSceneTreeNode,
             cameraGameObject,
             wholeGizmo,
           );

      /* TODO test */
      engineState
      |> CoordinateSystemTransformGizmosUtils.rotateWholeGizmoToCurrentSceneTreeNode(
           currentSceneTreeNode,
           wholeGizmo,
           CoordinateSystemTransformGizmoSceneViewEditorService.getCoordinateSystem(
             editorState,
           ),
         );
    } :
    engineState;
  /* IsTransformGizmoRenderSceneViewEditorService.isTranslationWholeGizmoRender(
       editorState,
     ) ?
       switch (SceneTreeEditorService.getCurrentSceneTreeNode(editorState)) {
       | None => engineState
       | Some(currentSceneTreeNode) =>
         let wholeGizmo =
           OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
             editorState,
           );

         let cameraGameObject =
           SceneViewEditorService.unsafeGetEditCamera(editorState);

         engineState
         |> _moveAndRotateWholeGizmoToCurrentSceneTreeNode(
              currentSceneTreeNode,
              wholeGizmo,
            )
         |> _scaleWholeGizmo(
              currentSceneTreeNode,
              cameraGameObject,
              wholeGizmo,
            );
       } :
       engineState; */
};