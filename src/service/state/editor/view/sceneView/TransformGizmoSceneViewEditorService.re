open EditorType;

open SceneViewType;

let unsafeGetTranslationWholeGizmo = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    translationWholeGizmo;

let setTranslationWholeGizmo = (gameObject, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState.sceneViewRecord,
          ),
        translationWholeGizmo: gameObject,
      }),
  },
};

let unsafeGetTranslationXAxisGizmo = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    translationXAxisGizmo;

let setTranslationXAxisGizmo = (gameObject, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState.sceneViewRecord,
          ),
        translationXAxisGizmo: gameObject,
      }),
  },
};

let unsafeGetTranslationYAxisGizmo = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    translationYAxisGizmo;

let setTranslationYAxisGizmo = (gameObject, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState.sceneViewRecord,
          ),
        translationYAxisGizmo: gameObject,
      }),
  },
};

let unsafeGetTranslationZAxisGizmo = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    translationZAxisGizmo;

let setTranslationZAxisGizmo = (gameObject, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState.sceneViewRecord,
          ),
        translationZAxisGizmo: gameObject,
      }),
  },
};

let unsafeGetTranslationXYPlaneGizmo = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    translationXYPlaneGizmo;

let setTranslationXYPlaneGizmo = (gameObject, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState.sceneViewRecord,
          ),
        translationXYPlaneGizmo: gameObject,
      }),
  },
};

let unsafeGetTranslationXZPlaneGizmo = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    translationXZPlaneGizmo;

let setTranslationXZPlaneGizmo = (gameObject, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState.sceneViewRecord,
          ),
        translationXZPlaneGizmo: gameObject,
      }),
  },
};

let unsafeGetTranslationYZPlaneGizmo = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    translationYZPlaneGizmo;

let setTranslationYZPlaneGizmo = (gameObject, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState.sceneViewRecord,
          ),
        translationYZPlaneGizmo: gameObject,
      }),
  },
};

let unsafeGetCurrentSceneTreeNodeStartPoint = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(
    editorState.sceneViewRecord,
  ).
    currentSceneTreeNodeStartPoint
  |> OptionService.unsafeGet;

let setCurrentSceneTreeNodeStartPoint =
    (currentSceneTreeNodeStartPoint, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState.sceneViewRecord,
          ),
        currentSceneTreeNodeStartPoint: Some(currentSceneTreeNodeStartPoint),
      }),
  },
};