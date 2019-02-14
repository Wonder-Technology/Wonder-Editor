let findMostOrthogonalPlaneForXAxis = (ray, (editorState, engineState)) =>
  FindPlaneForCheckIntersectUtils.findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
    (
      AxisTranslationGizmoSceneViewEditorService.getYAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTranslationGizmoSceneViewEditorService.buildXZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      AxisTranslationGizmoSceneViewEditorService.getZAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTranslationGizmoSceneViewEditorService.buildXYPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );

let findMostOrthogonalPlaneForYAxis = (ray, (editorState, engineState)) =>
  FindPlaneForCheckIntersectUtils.findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
    (
      AxisTranslationGizmoSceneViewEditorService.getXAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTranslationGizmoSceneViewEditorService.buildYZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      AxisTranslationGizmoSceneViewEditorService.getZAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTranslationGizmoSceneViewEditorService.buildXYPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );

let findMostOrthogonalPlaneForZAxis = (ray, (editorState, engineState)) =>
  FindPlaneForCheckIntersectUtils.findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
    (
      AxisTranslationGizmoSceneViewEditorService.getXAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTranslationGizmoSceneViewEditorService.buildYZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      AxisTranslationGizmoSceneViewEditorService.getYAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneTranslationGizmoSceneViewEditorService.buildXZPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );