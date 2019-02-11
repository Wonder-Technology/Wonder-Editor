open EditorType;

open SceneViewType;

let unsafeGetScaleWholeGizmo = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    scaleWholeGizmo;

let unsafeGetScaleXAxisGizmo = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    scaleXAxisGizmo;

let unsafeGetScaleYAxisGizmo = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    scaleYAxisGizmo;

let unsafeGetScaleZAxisGizmo = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    scaleZAxisGizmo;

let unsafeGetScaleCenterBoxGizmo = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    scaleCenterBoxGizmo;

let unsafeGetCurrentSceneTreeNodeStartLocalScale = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    currentSceneTreeNodeStartLocalScale
  |> OptionService.unsafeGet;

let setCurrentSceneTreeNodeStartLocalScale =
    (currentSceneTreeNodeStartLocalScale, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        scaleGizmoData: {
          ...
            RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState),
          currentSceneTreeNodeStartLocalScale:
            Some(currentSceneTreeNodeStartLocalScale),
        },
      }),
  },
};

let unsafeGetDragStartXAxisNormalizedVec = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    dragStartXAxisNormalizedVec
  |> OptionService.unsafeGet;

let setDragStartXAxisNormalizedVec =
    (dragStartXAxisNormalizedVec, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        scaleGizmoData: {
          ...
            RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState),
          dragStartXAxisNormalizedVec: Some(dragStartXAxisNormalizedVec),
        },
      }),
  },
};

let unsafeGetDragStartYAxisNormalizedVec = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    dragStartYAxisNormalizedVec
  |> OptionService.unsafeGet;

let setDragStartYAxisNormalizedVec =
    (dragStartYAxisNormalizedVec, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        scaleGizmoData: {
          ...
            RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState),
          dragStartYAxisNormalizedVec: Some(dragStartYAxisNormalizedVec),
        },
      }),
  },
};

let unsafeGetDragStartZAxisNormalizedVec = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    dragStartZAxisNormalizedVec
  |> OptionService.unsafeGet;

let setDragStartZAxisNormalizedVec =
    (dragStartZAxisNormalizedVec, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        scaleGizmoData: {
          ...
            RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState),
          dragStartZAxisNormalizedVec: Some(dragStartZAxisNormalizedVec),
        },
      }),
  },
};

let unsafeGetDragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray = editorState =>
  RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState).
    dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray
  |> OptionService.unsafeGet;

let setDragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray =
    (dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        scaleGizmoData: {
          ...
            RecordScaleGizmoSceneViewEditorService.unsafeGetData(editorState),
          dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray:
            Some(dragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray),
        },
      }),
  },
};