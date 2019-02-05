open EditorType;

open SceneViewType;

let markTranslation = editorState => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        currentGizmoType: Translation,
      }),
  },
};

let markRotation = editorState => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        ...
          RecordTransformGizmoSceneViewEditorService.unsafeGetData(
            editorState,
          ),
        currentGizmoType: Rotation,
      }),
  },
};

let getCurrentGizmoType = editorState =>
  RecordTransformGizmoSceneViewEditorService.unsafeGetData(editorState).
    currentGizmoType;