let _getCurrentSceneTreeNodePosition = (editorState, engineState) =>
  TransformEngineService.getPosition(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    ),
    engineState,
  );

let _findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane =
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
      _getCurrentSceneTreeNodePosition(editorState, engineState),
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

let findMostOrthogonalPlaneForXAxis = (ray, (editorState, engineState)) =>
  _findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
    (
      AxisTransformGizmoSceneViewEditorService.getYAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGizmoSceneViewEditorService.buildXZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      AxisTransformGizmoSceneViewEditorService.getZAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGizmoSceneViewEditorService.buildXYPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );

let findMostOrthogonalPlaneForYAxis = (ray, (editorState, engineState)) =>
  _findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
    (
      AxisTransformGizmoSceneViewEditorService.getXAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGizmoSceneViewEditorService.buildYZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      AxisTransformGizmoSceneViewEditorService.getZAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGizmoSceneViewEditorService.buildXYPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );

let findMostOrthogonalPlaneForZAxis = (ray, (editorState, engineState)) =>
  _findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
    (
      AxisTransformGizmoSceneViewEditorService.getXAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGizmoSceneViewEditorService.buildYZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      AxisTransformGizmoSceneViewEditorService.getYAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTransformGizmoSceneViewEditorService.buildXZPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );