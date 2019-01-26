open EditorType;

open SceneViewType;

let unsafeGetTranslationWholeGizmo = editorState =>
  RecordTransformGizmoSceneViewEditorService.getData(
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
          RecordTransformGizmoSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        translationWholeGizmo: gameObject,
      }),
  },
};

let unsafeGetTranslationXAxisGizmo = editorState =>
  RecordTransformGizmoSceneViewEditorService.getData(
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
          RecordTransformGizmoSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        translationXAxisGizmo: gameObject,
      }),
  },
};

let unsafeGetTranslationYAxisGizmo = editorState =>
  RecordTransformGizmoSceneViewEditorService.getData(
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
          RecordTransformGizmoSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        translationYAxisGizmo: gameObject,
      }),
  },
};

let unsafeGetTranslationZAxisGizmo = editorState =>
  RecordTransformGizmoSceneViewEditorService.getData(
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
          RecordTransformGizmoSceneViewEditorService.getData(
            editorState.sceneViewRecord,
          ),
        translationZAxisGizmo: gameObject,
      }),
  },
};