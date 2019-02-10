let setWholeGizmoRotation =
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