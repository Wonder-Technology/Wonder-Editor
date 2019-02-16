let findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane =
    (
      (axis1Vec, plane1: ShapeType.planeShape),
      (axis2Vec, plane2: ShapeType.planeShape),
      (editorState, engineState),
    ) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let currentSceneTreeNodeToCameraVec =
    Wonderjs.Vector3Service.sub(
      Wonderjs.Vector3Type.Float,
      InitTransformGizmosUtils.getCurrentSceneTreeNodePosition(
        editorState,
        engineState,
      ),
      TransformEngineService.getPosition(
        GameObjectComponentEngineService.unsafeGetTransformComponent(
          cameraGameObject,
          engineState,
        ),
        engineState,
      ),
    );

  Vector3Service.projectOnPlane(
    plane1.normal,
    currentSceneTreeNodeToCameraVec,
  )
  |>
  Vector3Service.length < (
                            Vector3Service.projectOnPlane(
                              plane2.normal,
                              currentSceneTreeNodeToCameraVec,
                            )
                            |> Vector3Service.length
                          ) ?
    plane1 : plane2;
  /*
   Vector3Service.dot(currentSceneTreeNodeToCameraVec, axis1Vec)
   > Vector3Service.dot(currentSceneTreeNodeToCameraVec, axis2Vec) ?
     plane2 : plane1; */
};

/* let findMostOrthogonalPlaneForXAxis =
       (
         ray,
         (yAxisNormalizedVec, zAxisNormalizedVec),
         (xzPlane, xyPlane),
         (editorState, engineState),
       ) =>
     _findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
       (yAxisNormalizedVec, xzPlane),
       (zAxisNormalizedVec, xyPlane),
       (editorState, engineState),
     );

   let findMostOrthogonalPlaneForYAxis =
       (
         ray,
         (xAxisNormalizedVec, zAxisNormalizedVec),
         (yzPlane, xyPlane),
         (editorState, engineState),
       ) =>
     _findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
       (xAxisNormalizedVec, yzPlane),
       (zAxisNormalizedVec, xyPlane),
       (editorState, engineState),
     );

   let findMostOrthogonalPlaneForZAxis =
       (
         ray,
         (xAxisNormalizedVec, yAxisNormalizedVec),
         (yzPlane, xzPlane),
         (editorState, engineState),
       ) =>
     _findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
       (xAxisNormalizedVec, yzPlane),
       (yAxisNormalizedVec, xzPlane),
       (editorState, engineState),
     ); */