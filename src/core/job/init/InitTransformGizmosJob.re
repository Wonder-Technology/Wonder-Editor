let _createTransformGizmos = ((editorState, engineState)) => {
  let (
    engineState,
    translationWholeGizmo,
    (xAxisGizmo, yAxisGizmo, zAxisGizmo),
    (xyPlaneGizmo, xzPlaneGizmo, yzPlaneGizmo),
  ) =
    CreateTranslationGizmosUtils.createTranslationGizmos(engineState);

  let (engineState, rotationWholeGizmo, (yzGizmo, xzGizmo, xyGizmo)) =
    CreateRotationGizmosUtils.createRotationGizmos(engineState);

  let (
    engineState,
    scaleWholeGizmo,
    (xAxisScaleGizmo, yAxisScaleGizmo, zAxisScaleGizmo),
    centerBoxScaleGizmo,
  ) =
    CreateScaleGizmosUtils.createScaleGizmos(engineState);

  let editorState =
    editorState
    |> CreateTransformGizmosUtils.setToEditorState(
         (
           translationWholeGizmo,
           (xAxisGizmo, yAxisGizmo, zAxisGizmo),
           (xyPlaneGizmo, xzPlaneGizmo, yzPlaneGizmo),
         ),
         (rotationWholeGizmo, (yzGizmo, xzGizmo, xyGizmo)),
         (
           scaleWholeGizmo,
           (xAxisScaleGizmo, yAxisScaleGizmo, zAxisScaleGizmo),
           centerBoxScaleGizmo,
         ),
       );

  (editorState, engineState);
};

let initJob = (_, engineState) => {
  let editorState = StateEditorService.getState();

  let (editorState, engineState) =
    _createTransformGizmos((editorState, engineState));

  let engineState = BindTransformGizmoEventUtils.bindEvent(engineState);

  editorState |> StateEditorService.setState |> ignore;

  engineState;
};