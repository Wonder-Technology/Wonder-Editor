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

let _setWholeGizmoRotation =
    (
      currentSceneTreeNode,
      wholeGizmo,
      coordinateSystem: SceneViewType.coordinateSystem,
      engineState,
    ) => {
  let wholeGizmoTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      wholeGizmo,
      engineState,
    );

  switch (coordinateSystem) {
  | Local =>
    let currentSceneTreeNodeTransform =
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        currentSceneTreeNode,
        engineState,
      );

    engineState
    |> TransformEngineService.setEulerAngles(
         wholeGizmoTransform,
         TransformEngineService.getEulerAngles(
           currentSceneTreeNodeTransform,
           engineState,
         ),
       );
  | World =>
    engineState
    |> TransformEngineService.setEulerAngles(
         wholeGizmoTransform,
         (0., 0., 0.),
       )
  };
};

let updateTransformJob = (_, engineState) => {
  let editorState = StateEditorService.getState();

  IsTransformGizmoRenderSceneViewEditorService.isTransformGizmoRender(
    editorState,
  ) ?
    {
      let currentSceneTreeNode =
        SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState);

      let (wholeGizmo, isSetRotation) =
        switch (
          CurrentTransformGizmoSceneViewEditorService.getCurrentGizmoType(
            editorState,
          )
        ) {
        | Translation => (
            OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
              editorState,
            ),
            true,
          )
        | Rotation => (
            OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
              editorState,
            ),
            true,
          )
        | Scale => (
            OperateScaleGizmoSceneViewEditorService.unsafeGetScaleWholeGizmo(
              editorState,
            ),
            false,
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

      isSetRotation ?
        engineState
        |> _setWholeGizmoRotation(
             currentSceneTreeNode,
             wholeGizmo,
             CoordinateSystemTransformGizmoSceneViewEditorService.getCoordinateSystem(
               editorState,
             ),
           ) :
        engineState;
    } :
    engineState;
};