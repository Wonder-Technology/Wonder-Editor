let rotateWholeGizmoToCurrentSceneTreeNode =
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

let rotateWholeTransformGizmoToCurrentSceneTreeNode =
    (editorState, engineState) => {
  let currentSceneTreeNode =
    SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState);

  let coordinateSystem =
    CoordinateSystemTransformGizmoSceneViewEditorService.getCoordinateSystem(
      editorState,
    );

  engineState
  |> rotateWholeGizmoToCurrentSceneTreeNode(
       currentSceneTreeNode,
       OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
         editorState,
       ),
       coordinateSystem,
     )
  |> rotateWholeGizmoToCurrentSceneTreeNode(
       currentSceneTreeNode,
       OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
         editorState,
       ),
       coordinateSystem,
     );
};