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
  let scaleComponent =
    ComputeTransformGizmoScaleUtils.computeScaleComponentBasedOnDistanceToCamera(
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
    (scaleComponent, scaleComponent, scaleComponent),
    engineState,
  );
};

let _setWholeGizmoRotation =
    (
      wholeGizmo,
      (
        currentSceneTreeNode,
        currentGizmoType: SceneViewType.gizmo,
        coordinateSystem: SceneViewType.coordinateSystem,
      ),
      editorState,
      engineState,
    ) => {
  let wholeGizmoTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      wholeGizmo,
      engineState,
    );

  switch (currentGizmoType) {
  | Translation
  | Rotation =>
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
    }
  | Scale =>
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
  };
};

let updateTransformJob = (_, engineState) => {
  let editorState = StateEditorService.getState();

  IsTransformGizmoRenderSceneViewEditorService.isTransformGizmoRender(
    editorState,
    engineState,
  ) ?
    {
      let currentSceneTreeNode =
        SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState);

      let currentGizmoType =
        CurrentTransformGizmoSceneViewEditorService.getCurrentGizmoType(
          editorState,
        );

      let wholeGizmo =
        switch (currentGizmoType) {
        | Translation =>
          OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
            editorState,
          )
        | Rotation =>
          OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
            editorState,
          )
        | Scale =>
          OperateScaleGizmoSceneViewEditorService.unsafeGetScaleWholeGizmo(
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

      engineState
      |> _setWholeGizmoRotation(
           wholeGizmo,
           (
             currentSceneTreeNode,
             currentGizmoType,
             CoordinateSystemTransformGizmoSceneViewEditorService.getCoordinateSystem(
               editorState,
             ),
           ),
           editorState,
         );
    } :
    engineState;
};