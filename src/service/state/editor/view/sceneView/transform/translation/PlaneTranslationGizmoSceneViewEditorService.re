open EditorType;

open ShapeType;

let buildXYPlane = (editorState, engineState) =>
  PlaneTransformGizmoSceneViewEditorService.buildPlane(
    AxisTranslationGizmoSceneViewEditorService.getZAxisNormalizedVec(
      editorState,
      engineState,
    ),
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
      editorState,
    ),
    engineState,
  );

let buildXZPlane = (editorState, engineState) =>
  PlaneTransformGizmoSceneViewEditorService.buildPlane(
    AxisTranslationGizmoSceneViewEditorService.getYAxisNormalizedVec(
      editorState,
      engineState,
    ),
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
      editorState,
    ),
    engineState,
  );

let buildYZPlane = (editorState, engineState) =>
  PlaneTransformGizmoSceneViewEditorService.buildPlane(
    AxisTranslationGizmoSceneViewEditorService.getXAxisNormalizedVec(
      editorState,
      engineState,
    ),
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
      editorState,
    ),
    engineState,
  );